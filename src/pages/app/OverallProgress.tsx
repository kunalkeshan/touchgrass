import Loader from '@/components/layouts/Loader';
import { api } from '../../../convex/_generated/api';
import { useConvexAuth, useMutation } from 'convex/react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import OverallProgressGraph, {
	OverallProgressGraphProps,
} from '@/components/app/habits/OverallProgressGraph';

const OverallProgress = () => {
	const navigate = useNavigate();

	const { isAuthenticated, isLoading } = useConvexAuth();
	const getOverallHabitStats = useMutation(api.habit.getOverallHabitStats);
	const storeUser = useMutation(api.user.storeUser);

	const {
		data,
		isLoading: loading,
		isError,
	} = useQuery({
		queryKey: ['individual-progress'],
		queryFn: async () => {
			if (isLoading) return;
			if (!isAuthenticated) {
				navigate('/');
				return;
			}
			const userId = await storeUser();
			const habits = await getOverallHabitStats({
				userId,
			});
			return habits;
		},
	});

	return (
		<div>
			<h1 className='text-xl lg:text-3xl font-semibold'>
				Overall Progress
			</h1>
			<p className='text-slate-300'>
				Here's an overview of your progress across all habits.
			</p>
			{loading ? <Loader /> : null}
			{isError ? <p>Something went wrong...</p> : null}
			{data ? (
				data.habits && data.habits.length > 0 ? (
					<div>
						<OverallProgressGraph
							onePercentProgressHabits={
								data.onePercentProgressHabits as OverallProgressGraphProps['onePercentProgressHabits']
							}
							habits={
								data.habits as OverallProgressGraphProps['habits']
							}
						/>
					</div>
				) : (
					<div className='mt-8'>
						<p className='text-lg lg:text-2xl font-medium'>
							No habits found.{' '}
							<Link
								to='/app/new-habit'
								className='underline text-green-500 hover:text-green-500/80 transition-all duration-300'
							>
								Create a habit
							</Link>{' '}
							to get started.
						</p>
					</div>
				)
			) : null}
		</div>
	);
};

export default OverallProgress;
