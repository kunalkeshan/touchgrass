import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const getAllHabits = mutation({
	args: { userId: v.id('users') },
	handler: async (ctx, args) => {
		return await ctx.db
			.query('habits')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.collect();
	},
});

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

export const createUserMessageEntry = mutation({
	args: { habitId: v.id('habits'), message: v.string() },
	handler: async (ctx, args) => {
		// await ctx.db.insert("messages", {
		//   type: 'user',
		//   habitId: args.habitId,
		//   message: args.message,
		// });
		const habit = await ctx.db.get(args.habitId);
		return habit?.name ?? 'habit';
	},
});
