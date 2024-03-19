import { lazy } from 'react';
import { api } from '../../../convex/_generated/api';
import { useConvexAuth, useMutation } from 'convex/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Id } from 'convex/_generated/dataModel';
const Loader = lazy(() => import('@/components/layouts/Loader'));
const ContributionsGraph = lazy(
	() => import('@/components/app/habits/ContributionsGraph')
);
const OnePercentStats = lazy(
	() => import('@/components/app/habits/OnePercentStats')
);

const IndividualProgress = () => {
	const navigate = useNavigate();
	const params = useParams();

	if (!params.habitId) {
		navigate('/app');
	}

	const { isAuthenticated, isLoading } = useConvexAuth();
	const getHabitAndEntries = useMutation(api.habit.getHabitAndEntries);

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
			if (!params.habitId) {
				navigate('/app');
				return;
			}
			const habits = await getHabitAndEntries({
				habitId: params.habitId as Id<'habits'>,
			});
			return habits;
		},
	});
	return (
		<div>
			{loading ? <Loader /> : null}
			{isError ? <p>Something went wrong...</p> : null}
			{data ? (
				<div>
					<section className='flex justify-between'>
						<div className=''>
							<h1 className='text-xl lg:text-3xl font-semibold'>
								Progress on {data.name}
							</h1>
							<p className='text-slate-300'>
								Here's an overview of your progress on this
								habit.
							</p>
						</div>
						<Link to={'/app'} className='underline'>
							Go back
						</Link>
					</section>
					{data ? (
						<ContributionsGraph
							data={data}
							key={`contributing-graph-individual-${data._id}`}
						/>
					) : null}
					{data ? (
						<OnePercentStats
							data={data}
							key={`one-percent-stats-individual-${data._id}`}
						/>
					) : null}
				</div>
			) : null}
		</div>
	);
};

export default IndividualProgress;
