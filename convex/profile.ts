import { mutation } from './_generated/server';
import { v } from 'convex/values';

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
				return {
					name: habit.name,
					_id: habit._id,
					_creationTime: new Date(habit._creationTime)
						.toISOString()
						.split('T')[0],
					entries,
				};
			})
		);
		return { habits };
	},
});
