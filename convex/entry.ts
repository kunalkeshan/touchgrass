import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const updateEntry = mutation({
	args: {
		entryId: v.id('entries'),
		value: v.union(v.literal('P'), v.literal('A'), v.literal('N')),
	},
	handler: async (ctx, args) => {
		return await ctx.db.patch(args.entryId, { value: args.value });
	},
});
