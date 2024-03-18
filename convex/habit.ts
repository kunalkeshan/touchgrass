import { DataModel } from './_generated/dataModel';
import { mutation } from './_generated/server';
import { v } from 'convex/values';

/**
 * Parses an ISO 8601 formatted string with optional time and timezone offset into a JavaScript Date object.
 *
 * This function takes an ISO 8601 formatted string (`s`) as input and parses it into a Date object. 
 * The supported format includes:
 *  - YYYY-MM-DD (date only)
 *  - YYYY-MM-DDTHH:mm:ss[.sss]Z (date with time and optional milliseconds and timezone offset)
 *
 * If no time or timezone offset is provided, the time is assumed to be 00:00:00.000Z (Coordinated Universal Time).
 *
 * @param {string} s - The ISO 8601 formatted string to parse.
 * @returns {Date} A JavaScript Date object representing the parsed date and time.
 * @throws {Error} If the input string is not in a valid ISO 8601 format.
 */
function parseISOString(s: string) {
	const dateString = `${s}T00:00:00.000Z`;
	const b = dateString.split(/\D+/).map((n) => parseInt(n, 10));
	return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}


/**
 * Creates a comparator function for sorting objects by a date string property in ascending or descending order.
 *
 * This function takes an `order` argument (`'asc'` or `'desc'`) and returns a comparator function suitable for array sorting methods like `Array.sort`.
 * The comparator function accepts two string arguments (`a` and `b`), representing date strings in ISO 8601 format, and returns a number indicating their relative order:
 *  - Negative number if `a` should come before `b`
 *  - Zero if `a` and `b` are considered equal
 *  - Positive number if `b` should come before `a`
 *
 * @param {'asc' | 'desc'} order - Specifies the desired sorting order:
 *   - `'asc'`: Ascending order (earliest dates first).
 *   - `'desc'`: Descending order (latest dates first).
 * @returns {(a: string, b: string) => number} A comparator function for sorting objects by date.
 * @throws {Error} If the input strings are not in valid ISO 8601 format (propagated from `parseISOString`).
 */
const sortByDate = (order: 'asc' | 'desc') => (a: string, b: string) => {
	const dateA = parseISOString(a);
	const dateB = parseISOString(b);
	if (order === 'asc') return dateA.getTime() - dateB.getTime();
	else return dateB.getTime() - dateA.getTime();
};


/**
 * Retrieves habits and their corresponding entries for a specific user and date.
 *
 * This function takes the user ID (`userId`) and a date string (`date`) as arguments. It performs the following actions:
 * 1. Filters all habits in the database to those belonging to the specified user (`userId`).
 * 2. Filters the user's habits to only include habits created before or on the specified date (`date`).
 * 3. For each habit, it queries for an existing entry matching the given `date`.
 *     - If no entry is found, a new entry with "N" (Not Marked) value is created for that habit and date.
 * 4. The function then retrieves the updated entry for the habit.
 * 5. Finally, it returns an array of objects, each containing:
 *    - `habitId`: The ID of the habit.
 *    - `habit`: The habit object itself.
 *    - `entry`: The corresponding entry object for the given `date` (may be newly created with "N" value).
 *
 * @param {string} userId - The ID of the user to retrieve habits for.
 * @param {string} date - The date string in ISO 8601 format (YYYY-MM-DD).
 * @returns {Promise<Array<{ habitId: string, habit: any, entry: any }>>} A promise that resolves to an array of objects containing habit, entry, and habit ID information.
 * @throws {Error} Can potentially throw errors from underlying database operations (e.g., `ctx.db.query`).
 */
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

/**
 * Creates a new habit for a user and adds an initial entry for the current date.
 *
 * This function takes the habit name (`name`) and the user ID (`userId`) as arguments. It performs the following actions:
 * 1. Inserts a new habit document into the database with the provided `name` and `userId`.
 * 2. Retrieves the generated ID of the newly created habit.
 * 3. Extracts the current date in YYYY-MM-DD format and creates a new entry document.
 * 4. The entry document includes:
 *    - `habitId`: The ID of the newly created habit.
 *    - `date`: The current date string.
 *    - `value`: "N" (Not Marked), indicating the initial state for the habit on that day.
 * 5. The function returns the newly created entry document.
 *
 * @param {string} name - The name of the new habit.
 * @param {string} userId - The ID of the user who is creating the habit.
 * @returns {Promise<any>} A promise that resolves to the newly created entry document for the habit. The exact structure of the entry document may depend on the database schema.
 * @throws {Error} Can potentially throw errors from underlying database operations (e.g., `ctx.db.insert`).
 */
export const createHabit = mutation({
	args: { name: v.string(), userId: v.id('users') },
	handler: async (ctx, args) => {
		const habitId = await ctx.db.insert('habits', {
			name: args.name,
			userId: args.userId,
		});
		const date = new Date().toISOString().split('T')[0];
		return await ctx.db.insert('entries', {
			habitId,
			date,
			value: 'N',
		});
	},
});

/**
 * Retrieves a specific habit and its associated entries, sorted by date in ascending order.
 *
 * This function takes the habit ID (`habitId`) as an argument. It performs the following actions:
 * 1. Fetches the habit document from the database using the provided `habitId`.
 * 2. Throws an error if no habit is found with the given ID.
 * 3. Queries for all entry documents where the `habitId` matches the requested habit.
 * 4. Sorts the retrieved entries in ascending chronological order (oldest date first) using the `sortByDate` function.
 * 5. Iterates through the entries, calculating progress based on the following logic:
 *    - "P" (Completed): Increments `daysShowedUp`.
 *    - "A" (Missed): Increments `daysMissed`.
 *    - Progress is calculated using an exponential formula based on the difference between `daysShowedUp` and `daysMissed`.
 * 6. Enhances each entry object with a calculated `progress` property.
 * 7. Calculates the average progress across all entries (if any).
 * 8. Returns an object containing:
 *    - `habit`: The retrieved habit document.
 *    - `entries`: An array of entry documents for the habit, sorted by date and including a calculated `progress` property.
 *    - `averageProgress`: The average progress score across all entries (optional, may be null if no entries exist).
 *
 * @param {string} habitId - The ID of the habit to retrieve.
 * @returns {Promise<{ habit: any, entries: Array<any>, averageProgress: number | null }>} A promise that resolves to an object containing habit, entries, and optionally average progress information. The exact structure of habit and entry documents may depend on the database schema.
 * @throws {Error} If the requested habit is not found. Can potentially throw errors from underlying database operations (e.g., `ctx.db.get`, `ctx.db.query`).
 */
export const getHabitAndEntries = mutation({
	args: { habitId: v.id('habits') },
	handler: async (ctx, args) => {
		const habit = await ctx.db.get(args.habitId);
		if (!habit) {
			throw new Error('Habit not found');
		}
		const allEntries = await ctx.db
			.query('entries')
			.filter((q) => q.eq(q.field('habitId'), args.habitId))
			.collect();
		allEntries.sort((a, b) => sortByDate('asc')(a.date, b.date));
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
/**
 * Retrieves overall habit statistics for a user, including individual habit entries with progress data.
 *
 * This function takes the user ID (`userId`) as an argument. It performs the following actions:
 * 1. Fetches all the user's habits from the database, ordered by creation date (most recent first).
 * 2. For each habit, it retrieves all associated entries.
 * 3. Sorts the entries for each habit chronologically (oldest date first) using the `sortByDate` function.
 * 4. Calculates progress for each entry based on the following logic:
 *    - "P" (Completed): Increments `daysShowedUp`.
 *    - "A" (Missed): Increments `daysMissed`.
 *    - Progress is calculated using an exponential formula based on the difference between `daysShowedUp` and `daysMissed`.
 * 
 * 5. Creates a new object for each entry, combining:
 *    - Original entry data.
 *    - Calculated `progress` property.
 *    - `habitName` property extracted from the corresponding habit.
 * 6. Returns an object containing:
 *    - `habits`: An array of the user's habit documents.
 *    - `onePercentProgressHabits`: An array of enriched entry objects with progress and habit name information.
 *
 * @param {string} userId - The ID of the user for whom to retrieve habit statistics.
 * @returns {Promise<{ habits: Array<any>, onePercentProgressHabits: Array<OnePercentProgressHabitData> }>} A promise that resolves to an object containing habit documents and enriched entry data with progress information. The exact structure of habit and entry documents may depend on the database schema.
  * @typedef {DataModel['entries']['document'] & { habitName: string; [key: string]: number | string; }} {OnePercentProgressHabitData} Enhanced entry data object with progress and habit name properties.
 * @throws {Error} Can potentially throw errors from underlying database operations (e.g., `ctx.db.query`).
 */
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
					.filter((q) => q.eq(q.field('habitId'), habit._id))
					.collect();
				entries.sort((a, b) => sortByDate('asc')(a.date, b.date));
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

/**
 * Updates the name of a specific habit.
 *
 * This function takes the habit ID (`habitId`) and the new name (`name`) as arguments. It performs the following action:
 *  - Updates the `name` property of the habit document in the database using a patch operation.
 *
 * @param {string} habitId - The ID of the habit to update.
 * @param {string} name - The new name for the habit.
 * @returns {Promise<void>} A promise that resolves after the habit name is updated. No value is returned upon successful update.
 * @throws {Error} Can potentially throw errors from underlying database operations (e.g., `ctx.db.patch`).
 */
export const updateHabitName = mutation({
	args: { habitId: v.id('habits'), name: v.string() },
	handler: async (ctx, args) => {
		return await ctx.db.patch(args.habitId, { name: args.name });
	},
});

/**
 * Deletes a specific habit along with all its associated entries and messages.
 *
 * This function takes the habit ID (`habitId`) as an argument. It performs the following actions:
 * 1. Queries for all entry documents where the `habitId` matches the provided `habitId`.
 * 2. Deletes each retrieved entry document using individual delete operations.
 * 3. Optionally (implementation-dependent): Queries for all message documents where the `habitId` matches the provided `habitId`.
 * 4. Optionally (implementation-dependent): Deletes each retrieved message document using individual delete operations.
 * 5. Deletes the habit document itself using the provided `habitId`.
 *
 * @param {string} habitId - The ID of the habit to delete.
 * @returns {Promise<void>} A promise that resolves after the habit and all its associated entries (and optionally messages) are deleted. No value is returned upon successful deletion.
 * @throws {Error} Can potentially throw errors from underlying database operations (e.g., `ctx.db.delete`, `ctx.db.query`).
 */
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
		const messages = await ctx.db
			.query('messages')
			.filter((q) => q.eq(q.field('habitId'), args.habitId))
			.collect();
		await Promise.all(
			messages.map(async (message) => {
				await ctx.db.delete(message._id);
			})
		);
		return await ctx.db.delete(args.habitId);
	},
});
