import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

/**
 * Defines the data schema for the habit tracking application.
 *
 * This function utilizes the Convex server library to define the following tables within the schema:
 *  - `users`: Stores user information, including:
 *      - `name`: User's name (string).
 *      - `tokenIdentifier`: Unique identifier for user authentication (string).
 *  - `habits`: Stores habit data associated with users, including:
 *      - `name`: Name of the habit (string).
 *      - `userId`: Foreign key referencing a user document in the `users` table (ID of type string).
 *  - `entries`: Stores daily habit entries for specific habits, including:
 *      - `habitId`: Foreign key referencing a habit document in the `habits` table (ID of type string).
 *      - `date`: Date of the habit entry (string).
 *      - `value`: Habit completion status for the entry:
 *          - "P" (string): Represents presence (completed).
 *          - "A" (string): Represents absence (missed).
 *          - "N" (string): Represents not recorded.
 *  - `messages`: Stores messages associated with specific habits, including:
 *      - `habitId`: Foreign key referencing a habit document in the `habits` table (ID of type string).
 *      - `prompt`: Text prompt of the message (string).
 *      - `response`: Optional response to the prompt (string or null).
 *
 * 	Additionally, the function defines indexes for efficient data retrieval:
 *  	- `by_token` index on the `users` table for faster user lookup by token identifier.
 *  	- `by_user` index on the `habits` table for efficient retrieval of habits belonging to a specific user.
 *  	- `by_habit` index on both `entries` and `messages` tables for faster lookups by habit ID.
 */
export default defineSchema({
	users: defineTable({
		name: v.string(),
		tokenIdentifier: v.string(),
	}).index('by_token', ['tokenIdentifier']),
	habits: defineTable({
		name: v.string(),
		userId: v.id('users'),
	}).index('by_user', ['userId']),
	entries: defineTable({
		habitId: v.id('habits'),
		date: v.string(),
		// P for present, A for absent, N for not recorded
		value: v.union(v.literal('P'), v.literal('A'), v.literal('N')),
	}).index('by_habit', ['habitId']),
	messages: defineTable({
		habitId: v.id('habits'),
		prompt: v.string(),
		response: v.union(v.string(), v.null()),
	}).index('by_habit', ['habitId']),
});
