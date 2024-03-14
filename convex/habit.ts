import { DataModel } from './_generated/dataModel';
import { mutation } from './_generated/server';
import { v } from 'convex/values';

function parseISOString(s: string) {
	const dateString = `${s}T00:00:00.000Z`;
	const b = dateString.split(/\D+/).map((n) => parseInt(n, 10));
	return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

export const getHabits = mutation({
	args: { userId: v.id('users'), date: v.string() },
	handler: async (ctx, args) => {
		const allhabits = await ctx.db
			.query('habits')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.collect();
		const habits = await Promise.all(
			allhabits
				.filter((habit) => {
					const userSelectedDate = parseISOString(args.date);
					const habitCreatedDate = new Date(habit._creationTime);
					habitCreatedDate.setHours(0, 0, 0, 0);
					return userSelectedDate >= habitCreatedDate;
				})
				.map(async (habit) => {
					let entry = await ctx.db
						.query('entries')
						.filter((q) =>
							q.and(
								q.eq(q.field('habitId'), habit._id),
								q.eq(q.field('date'), args.date)
							)
						)
						.unique();
					if (!entry) {
						await ctx.db.insert('entries', {
							habitId: habit._id,
							date: args.date,
							value: 'N',
						});
					}
					entry = await ctx.db
						.query('entries')
						.filter((q) =>
							q.and(
								q.eq(q.field('habitId'), habit._id),
								q.eq(q.field('date'), args.date)
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
		if (!habit) {
			throw new Error('Habit not found');
		}
		const allEntries = await ctx.db
			.query('entries')
			.order('asc')
			.filter((q) => q.eq(q.field('habitId'), args.habitId))
			.collect();
		let [daysShowedUp, daysMissed, progress] = [0, 0, 1];
		const entries = allEntries.map((entry) => {
			if (entry.value === 'A') daysMissed++;
			else if (entry.value === 'P') daysShowedUp++;
			progress = 1.01 ** (daysShowedUp - daysMissed);
			return { ...entry, progress };
		});
		const averageProgress =
			entries?.reduce((acc, curr) => acc + curr.progress, 0) /
			entries?.length;
		return { ...habit, entries, averageProgress };
	},
});

export const getOverallHabitStats = mutation({
	args: { userId: v.id('users') },
	handler: async (ctx, args) => {
		const allHabits = await ctx.db
			.query('habits')
			.order('desc')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.collect();
		const habits = await Promise.all(
			allHabits.map(async (habit) => {
				const entries = await ctx.db
					.query('entries')
					.order('asc')
					.filter((q) => q.eq(q.field('habitId'), habit._id))
					.collect();
				return { ...habit, entries };
			})
		);

		type OnePercentProgressHabitData = DataModel['entries']['document'] & {
			habitName: string;
			[key: string]: number | string;
		};

		const onePercentProgressHabits: Array<OnePercentProgressHabitData> = [];
		habits.forEach((habit) => {
			let [daysShowedUp, daysMissed, progress] = [0, 0, 1];
			habit.entries.forEach((entry) => {
				if (entry.value === 'A') daysMissed++;
				else if (entry.value === 'P') daysShowedUp++;
				progress = 1.01 ** (daysShowedUp - daysMissed);
				onePercentProgressHabits.push({
					...entry,
					[habit.name]: progress,
					habitName: habit.name,
				} as OnePercentProgressHabitData);
			});
		});

		return { habits, onePercentProgressHabits };
	},
});

export const updateHabitName = mutation({
	args: { habitId: v.id('habits'), name: v.string() },
	handler: async (ctx, args) => {
		return await ctx.db.patch(args.habitId, { name: args.name });
	},
});

export const deleteHabitAndEntries = mutation({
	args: { habitId: v.id('habits') },
	handler: async (ctx, args) => {
		const entries = await ctx.db
			.query('entries')
			.filter((q) => q.eq(q.field('habitId'), args.habitId))
			.collect();
		await Promise.all(
			entries.map(async (entry) => {
				await ctx.db.delete(entry._id);
			})
		);
		return await ctx.db.delete(args.habitId);
	},
});
