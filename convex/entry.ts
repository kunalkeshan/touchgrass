import { mutation } from './_generated/server';
import { v } from 'convex/values';

/**
 * Updates the value of an existing habit entry.
 *
 * This function takes the ID of the entry (`entryId`) and the new value (`value`) as arguments. The `value` can be one of the following:
 *  - "P" (literal value): Indicates the habit was completed for that day.
 *  - "A" (literal value): Indicates the habit was missed for that day.
 *  - "N" (literal value): Indicates the habit completion wasn't recorded for that day.
 *
 * The function updates the `value` property of the entry in the database using a patch operation.
 *
 * @param {string} entryId - The ID of the habit entry to update.
 * @param {string} value - The new value for the entry ("P", "A", or "N").
 * @returns {Promise<void>} A promise that resolves after the entry value is updated. No value is returned upon successful update.
 */
export const updateEntry = mutation({
	args: {
		entryId: v.id('entries'),
		value: v.union(v.literal('P'), v.literal('A'), v.literal('N')),
	},
	handler: async (ctx, args) => {
		return await ctx.db.patch(args.entryId, { value: args.value });
	},
});
