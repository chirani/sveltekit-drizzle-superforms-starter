import {
	pgTable,
	serial,
	text,
	integer,
	timestamp,
	boolean
} from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	email: text('phone_number').notNull().unique(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const userMetaData = pgTable('user_metadata', {
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	isEmailVerfied: boolean('is_email_verified').default(false),
	phoneNumber: text('phone_number').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull(),
	deletedAt: timestamp('deleted_at', {
		withTimezone: true,
		mode: 'date'
	})
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
