import { api } from '../../../convex/_generated/api';
import { useConvexAuth, useMutation } from 'convex/react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

const AllHabits = () => {
	const navigate = useNavigate();
	const { isAuthenticated, isLoading } = useConvexAuth();
	const getHabits = useMutation(api.habit.getHabits);
	const storeUser = useMutation(api.user.storeUser);

	const {
		data,
		isLoading: loading,
		isError,
	} = useQuery({
		queryKey: ['all-habits'],
		queryFn: async () => {
			if (isLoading) return;
			if (!isAuthenticated) {
				navigate('/');
				return;
			}
			const userId = await storeUser();
			const habits = await getHabits({ userId });
			return habits;
		},
	});

	return (
		<div>
			<h1 className='text-xl lg:text-3xl font-semibold'>All Habits</h1>
			<p className='text-slate-300'>
				Here's an overview of all your habits. You can see your progress
				here.
			</p>
			{loading ? <p>Loading...</p> : null}
			{isError ? <p>Something went wrong...</p> : null}
			{data ? <p>{JSON.stringify(data)}</p> : null}
		</div>
	);
};

export default AllHabits;
