import { api } from '../../../convex/_generated/api';
import { useConvexAuth, useMutation } from 'convex/react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import HabitCard from '@/components/app/habits/HabitCard';
import { useEffect, useReducer, useState } from 'react';
import { DataModel } from '../../../convex/_generated/dataModel';
import Loader from '@/components/layouts/Loader';
import { DatePicker } from '@/components/app/DatePicker';

type CombinedHabits = {
	habit: DataModel['habits']['document'];
	entry: DataModel['entries']['document'];
	habitId: DataModel['habits']['document']['_id'];
}[];

const AllHabits = () => {
	const navigate = useNavigate();
	const { isAuthenticated, isLoading } = useConvexAuth();
	const getHabits = useMutation(api.habit.getHabits);
	const storeUser = useMutation(api.user.storeUser);

	const [userSelectedDate, setUserSelectedDate] = useState(new Date());

	const {
		data,
		isLoading: loading,
		isError,
		refetch,
	} = useQuery({
		queryKey: [
			'all-habits',
			`user-selected-date-all-habit-${userSelectedDate}`,
		],
		queryFn: async () => {
			if (isLoading) return;
			if (!isAuthenticated) {
				navigate('/');
				return;
			}
			const date = [
				userSelectedDate.getFullYear(),
				userSelectedDate.getMonth() < 9
					? `0${userSelectedDate.getMonth() + 1}`
					: userSelectedDate.getMonth() + 1,
				userSelectedDate.getDate() < 10
					? `0${userSelectedDate.getDate()}`
					: userSelectedDate.getDate(),
			].join('-') as string;
			const userId = await storeUser();
			const habits = await getHabits({ userId, date });
			return habits;
		},
	});

	const [habits, setHabits] = useReducer<
		(
			state: CombinedHabits,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			action: { type: string; payload: any }
		) => CombinedHabits
	>((state, action) => {
		switch (action.type) {
			case 'ADD_HABITS': {
				return action.payload;
			}
			case 'UPDATE_HABIT_ENTRY': {
				const updatedHabits = state.map((habit) => {
					if (habit.habitId === action.payload.habitId) {
						return {
							...habit,
							entry: {
								...habit.entry,
								value: action.payload.entryValue,
							},
						};
					}
					return habit;
				});
				refetch();
				return updatedHabits;
			}
			case 'UPDATE_HABIT_NAME': {
				const updatedHabits = state.map((habit) => {
					if (habit.habitId === action.payload.habitId) {
						return {
							...habit,
							name: action.payload.name,
						};
					}
					return habit;
				});
				refetch();
				return updatedHabits;
			}
			case 'DELETE_HABIT': {
				const updatedHabits = state.filter(
					(habit) => habit.habitId !== action.payload.habitId
				);
				refetch();
				return updatedHabits;
			}
			default:
				return state;
		}
	}, []);

	useEffect(() => {
		if (data) {
			setHabits({ type: 'ADD_HABITS', payload: data });
		}
	}, [data]);

	return (
		<div>
			<section className='flex flex-wrap justify-between'>
				<div>
					<h1 className='text-xl lg:text-3xl font-semibold'>
						All Habits
					</h1>
					<p className='text-slate-300'>
						Here's an overview of all your habits. You can see your
						progress here.
					</p>
				</div>
				<div className='flex flex-col'>
					<span className='text-slate-300 text-sm lg:text-base'>
						Today is
					</span>
					<span className='text-lg lg:text-2xl font-medium'>
						{new Date().toDateString()}
					</span>
					<DatePicker
						date={userSelectedDate}
						setDate={setUserSelectedDate}
					/>
				</div>
			</section>
			{loading ? <Loader /> : null}
			{isError ? <p>Something went wrong...</p> : null}
			{data ? (
				<div className='mt-8 flex flex-col gap-8'>
					<section>
						<h2 className='text-base lg:text-2xl font-medium'>
							Show up!
						</h2>
						<div className='mt-4 flex flex-col gap-4'>
							{habits
								.filter((h) => h.entry?.value === 'N')
								.map((habit) => (
									<HabitCard
										key={habit.habit._id}
										habit={habit.habit}
										entry={habit.entry!}
										editHabit={setHabits}
									/>
								))}
						</div>
					</section>
					<section>
						<h2 className='text-base lg:text-2xl font-medium'>
							Success
						</h2>
						<div className='mt-4 flex flex-col gap-4'>
							{habits
								.filter((h) => h.entry?.value === 'P')
								.map((habit) => (
									<HabitCard
										key={habit.habit._id}
										habit={habit.habit}
										entry={habit.entry!}
										editHabit={setHabits}
									/>
								))}
						</div>
					</section>
					<section>
						<h2 className='text-base lg:text-2xl font-medium'>
							Failed
						</h2>
						<div className='mt-4 flex flex-col gap-4'>
							{habits
								.filter((h) => h.entry?.value === 'A')
								.map((habit) => (
									<HabitCard
										key={habit.habit._id}
										habit={habit.habit}
										entry={habit.entry!}
										editHabit={setHabits}
									/>
								))}
						</div>
					</section>
				</div>
			) : null}
		</div>
	);
};

export default AllHabits;
