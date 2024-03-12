import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const getHabits = mutation({
	args: { userId: v.id('users') },
	handler: async (ctx, args) => {
		const allhabits = await ctx.db
			.query('habits')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.collect();
		const habits = await Promise.all(
			allhabits.map(async (habit) => {
				const today = new Date().toISOString().split('T')[0];
				let entry = await ctx.db
					.query('entries')
					.filter((q) =>
						q.and(
							q.eq(q.field('habitId'), habit._id),
							q.eq(q.field('date'), today)
						)
					)
					.unique();
				if (!entry) {
					await ctx.db.insert('entries', {
						habitId: habit._id,
						date: today,
						value: 'N',
					});
				}
				entry = await ctx.db
					.query('entries')
					.filter((q) =>
						q.and(
							q.eq(q.field('habitId'), habit._id),
							q.eq(q.field('date'), today)
						)
					)
					.unique();
				return { habitId: habit._id, habit, entry: entry! };
			})
		);
		return habits;
	},
});

export const createHabit = mutation({
	args: { name: v.string(), userId: v.id('users') },
	handler: async (ctx, args) => {
		const habitId = await ctx.db.insert('habits', {
			name: args.name,
			userId: args.userId,
		});
		return await ctx.db.insert('entries', {
			habitId,
			date: new Date().toISOString().split('T')[0],
			value: 'N',
		});
	},
});

export const getHabitAndEntries = mutation({
	args: { habitId: v.id('habits') },
	handler: async (ctx, args) => {
		const habit = await ctx.db.get(args.habitId);
		const entries = await ctx.db
			.query('entries')
			.order('desc')
			.filter((q) => q.eq(q.field('habitId'), args.habitId))
			.collect();
		return { ...habit, entries };
	},
});
