import { api } from '../../../convex/_generated/api';
import { useConvexAuth, useMutation } from 'convex/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Id } from 'convex/_generated/dataModel';

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
			{loading ? <p>Loading...</p> : null}
			{isError ? <p>Something went wrong...</p> : null}
			{data ? <p>{JSON.stringify(data)}</p> : null}
		</div>
	);
};

export default IndividualProgress;
