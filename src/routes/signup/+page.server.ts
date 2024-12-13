import { redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { hash } from '@node-rs/argon2';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { or, eq } from 'drizzle-orm';
export const load = (async () => {
	const form = await superValidate(zod(newUserSchema));

	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(newUserSchema));
		if (!form.valid) {
			return { form };
		}

		const { username, email, password } = form.data;
		const passwordHash = await hashPassword(password);

		const newUserData = {
			id: generateUserId(),
			username,
			email,
			passwordHash
		};

		const existingUsers = await db
			.select()
			.from(user)
			.where(or(eq(user.username, username), eq(user.email, email)));

		if (existingUsers.length) {
			return message(form, 'Email or Username is already used');
		}

		await db.insert(user).values(newUserData);

		return redirect(301, '/');
	}
};

function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}

const newUserSchema = z
	.object({
		username: z.string().min(6).max(255),
		email: z.string().email(),
		password: z.string().min(8).max(127),
		retypePassword: z.string()
	})
	.refine((data) => data.password === data.retypePassword, {
		message: "Passwords don't match",
		path: ['retypePassword']
	});

async function hashPassword(password: string): Promise<string> {
	return await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
}

/*
async function verifyPasswordHash(
	hash: string,
	password: string
): Promise<boolean> {
	return await verify(hash, password);
}*/
