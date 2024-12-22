import {
	pgTable,
	serial,
	text,
	integer,
	timestamp,
	boolean
} from 'drizzle-orm/pg-core';

const timestampSchema = {
	creartedAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).defaultNow(),
	deletedAt: timestamp('deleted_at', {
		withTimezone: true,
		mode: 'date'
	})
};
const timestampSchemaWithExpiration = {
	...timestampSchema,
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
};

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	email: text('phone_number').notNull().unique(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	...timestampSchema
});

export const userMetaData = pgTable('user_metadata', {
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	isEmailVerfied: boolean('is_email_verified').default(false),
	isPhoneVerified: boolean('is_phone_verified').default(false),
	phoneNumber: text('phone_number').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	...timestampSchemaWithExpiration
});

export type Session = typeof session.$inferInsert;
export type User = typeof user.$inferInsert;
