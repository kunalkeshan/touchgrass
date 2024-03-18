import { mutation } from './_generated/server';
import { v } from 'convex/values';

/**
 * Retrieves all habits belonging to a specific user.
 *
 * This function takes the user ID (`userId`) as an argument. It performs the following actions:
 * 1. Queries the database for all habit documents.
 * 2. Filters the results to include only habits where the `userId` field matches the provided `userId`.
 * 3. Returns an array of all matching habit documents.
 *
 * @param {string} userId - The ID of the user whose habits to retrieve.
 * @returns {Promise<Array<any>>} A promise that resolves to an array of habit documents, where each document represents a habit belonging to the specified user. The exact structure of the habit documents may depend on the database schema.
 * @throws {Error} Can potentially throw errors from underlying database operations (e.g., `ctx.db.query`).
 */
export const getAllHabits = mutation({
	args: { userId: v.id('users') },
	handler: async (ctx, args) => {
		return await ctx.db
			.query('habits')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.collect();
	},
});

/**
 * Retrieves all messages associated with a specific habit, ordered by creation date (ascending).
 *
 * This function takes the habit ID (`habitId`) as an argument. It performs the following actions:
 * 1. Queries the database for all message documents.
 * 2. Filters the results to include only messages where the `habitId` field matches the provided `habitId`.
 * 3. Orders the filtered messages by their creation date in ascending order (oldest first).
 * 4. Returns an array of all matching message documents.
 *
 * @param {string} habitId - The ID of the habit for which to retrieve messages.
 * @returns {Promise<Array<any>>} A promise that resolves to an array of message documents, ordered by creation date (ascending), where each document represents a message associated with the specified habit. The exact structure of the message documents may depend on the database schema.
 * @throws {Error} Can potentially throw errors from underlying database operations (e.g., `ctx.db.query`).
 */
export const listMessagesForHabit = mutation({
	args: { habitId: v.id('habits') },
	handler: async (ctx, args) => {
		return await ctx.db
			.query('messages')
			.filter((q) => q.eq(args.habitId, q.field('habitId')))
			.order('asc')
			.collect();
	},
});

/**
 * Creates a new message entry for a specific habit and returns the newly created message along with the habit name.
 *
 * This function takes the habit ID (`habitId`) and message content (`message`) as arguments. It performs the following actions:
 * 1. Inserts a new message document into the database with:
 *      - `habitId` set to the provided `habitId`.
 *      - `prompt` set to the provided `message`.
 *      - `response` initially set to `null`.
 * 2. Retrieves the newly created message document using its ID.
 * 3. Retrieves the habit document associated with the `habitId`.
 * 4. Returns an object containing:
 *      - `habitName`: The name of the habit (extracted from the habit document, or a default value if not found).
 *      - `newMessage`: The newly created message document.
 *
 * @param {string} habitId - The ID of the habit for which to create the message entry.
 * @param {string} message - The content of the message to be stored as the prompt.
 * @returns {Promise<{ habitName: string, newMessage: any }>} A promise that resolves to an object containing the habit name and the newly created message document.
 * @throws {Error} Can potentially throw errors from underlying database operations (e.g., `ctx.db.insert`, `ctx.db.get`).
 */
export const createUserMessageEntry = mutation({
	args: { habitId: v.id('habits'), message: v.string() },
	handler: async (ctx, args) => {
		const messageId = await ctx.db.insert('messages', {
			habitId: args.habitId,
			prompt: args.message,
			response: null,
		});
		const newMessage = await ctx.db.get(messageId);
		const habit = await ctx.db.get(args.habitId);
		return { habitName: habit?.name ?? 'habit', newMessage: newMessage! };
	},
});

/**
 * Updates the response field of a message entry identified by its ID.
 *
 * This function takes the message ID (`messageId`) and the new response content (`response`) as arguments. It performs the following action:
 *  - Updates the `response` property of the message document in the database using a patch operation.
 *
 * @param {string} messageId - The ID of the message entry to update.
 * @param {string} response - The new content to set for the response field.
 * @returns {Promise<void>} A promise that resolves after the message entry's response is updated. No value is returned upon successful update.
 * @throws {Error} Can potentially throw errors from underlying database operations (e.g., `ctx.db.patch`).
 */
export const updatePromptMessageEntry = mutation({
	args: { messageId: v.id('messages'), response: v.string() },
	handler: async (ctx, args) => {
		await ctx.db.patch(args.messageId, { response: args.response });
	},
});
