import { redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { string, z } from 'zod';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { or, eq } from 'drizzle-orm';
import { verify } from '@node-rs/argon2';
import {
	generateSessionToken,
	createSession,
	setSessionTokenCookie
} from '$lib/server/auth';

export const load = (async (event) => {
	if (event.locals.user) {
		console.log(event.locals.user);
		return redirect(302, '/');
	}
	const form = await superValidate(zod(existingUserSchema));

	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(existingUserSchema));
		if (!form.valid) {
			return { form };
		}
		const { usernameOrEmail, password } = form.data;

		const existingUsers = await db
			.select()
			.from(user)
			.where(
				or(eq(user.username, usernameOrEmail), eq(user.email, usernameOrEmail))
			);

		if (existingUsers.length === 0) {
			return message(form, "User doesn't exist");
		}

		const isPasswordCorrect = await verifyPasswordHash(
			existingUsers[0].passwordHash,
			password
		);

		if (!isPasswordCorrect) {
			return message(form, 'The password is incorrect');
		}
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUsers[0].id);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(302, '/');
	}
};

async function verifyPasswordHash(
	hash: string,
	password: string
): Promise<boolean> {
	return await verify(hash, password);
}

const existingUserSchema = z.object({
	usernameOrEmail: z.string().min(6).max(255),
	password: z.string().min(8).max(127)
});
