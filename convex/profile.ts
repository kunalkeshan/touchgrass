import { mutation } from './_generated/server';
import { v } from 'convex/values';


/**
 * Exports all habit and message data associated with a specific user.
 *
 * This function takes the user ID (`userId`) as an argument. It performs the following actions:
 * 1. Queries for all habit documents where the `userId` field matches the provided `userId`.
 * 2. If no habits are found for the user, returns an object with an empty `habits` array.
 * 3. Iterates through each retrieved habit document:
 *    - Queries for all entry documents where the `habitId` matches the current habit's ID.
 *    - Transforms each entry document into a user-friendly format, converting value ("A", "P") to "Failed", "Passed", or "Not Marked".
 *    - Queries for all message documents where the `habitId` matches the current habit's ID.
 *    - Transforms each message document into a user-friendly format, converting `_creationTime` to ISO 8601 date string (YYYY-MM-DD).
 * 4. Returns an object containing an array of habit objects, where each habit object includes:
 *    - `_id`: The habit's ID.
 *    - `name`: The habit's name.
 *    - `_creationTime`: The habit's creation date in ISO 8601 format (YYYY-MM-DD).
 *    - `entries`: An array of entry objects for the habit, with `_id`, `date`, and user-friendly `value` ("Failed", "Passed", or "Not Marked").
 *    - `messages`: An array of message objects for the habit, with `_id`, `prompt`, `response`, and `_creationTime` in ISO 8601 format (YYYY-MM-DD).
 *
 * @param {string} userId - The ID of the user for whom to export data.
 * @returns {Promise<{ habits: Array<{ _id: string, name: string, _creationTime: string, entries: Array<{ _id: string, date: string, value: string }>, messages: Array<{ _id: string, prompt: string, response: string, _creationTime: string }> }>}>} A promise that resolves to an object containing an array of habit objects with their associated entries and messages. The structure of habit, entry, and message objects may vary depending on the database schema.
* @throws {Error} Can potentially throw errors from underlying database operations (e.g., `ctx.db.query`, `ctx.db.collect`).
*/

export const exportUserData = mutation({
	args: { userId: v.id('users') },
	handler: async (ctx, args) => {
		const allHabits = await ctx.db
			.query('habits')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.collect();
		if (!allHabits.length) {
			return { habits: [] };
		}
		const habits = await Promise.all(
			allHabits.map(async (habit) => {
				const allEntries = await ctx.db
					.query('entries')
					.filter((q) => q.eq(q.field('habitId'), habit._id))
					.collect();
				const entries = allEntries.map((entry) => {
					return {
						_id: entry._id,
						date: entry.date,
						value:
							entry.value === 'A'
								? 'Failed'
								: entry.value === 'P'
								? 'Passed'
								: 'Not Marked',
					};
				});
				const allMessages = await ctx.db
					.query('messages')
					.filter((q) => q.eq(q.field('habitId'), habit._id))
					.collect();
				const messages = allMessages.map((message) => {
					return {
						_id: message._id,
						prompth: message.prompt,
						resonse: message.response,
						_creationTime: new Date(message._creationTime)
							.toISOString()
							.split('T')[0],
					};
				});
				return {
					name: habit.name,
					_id: habit._id,
					_creationTime: new Date(habit._creationTime)
						.toISOString()
						.split('T')[0],
					entries,
					messages,
				};
			})
		);
		return { habits };
	},
});
