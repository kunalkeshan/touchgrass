import Loader from '@/components/layouts/Loader';
import useStoreUserEffect from '@/hooks/useStoreUserEffect';
import { Navigate, Outlet, useNavigation } from 'react-router-dom';
import { useConvexAuth } from 'convex/react';
import Navbar from '@/components/app/Navbar';

const App = () => {
	const navigation = useNavigation();
	const { isAuthenticated, isLoading } = useConvexAuth();
	useStoreUserEffect();

	if (isLoading) {
		return <Loader />;
	} else if (!isAuthenticated) {
		return <Navigate to='/' />;
	} else {
		return (
			<div className='w-full min-h-screen'>
				<div className='max-w-7xl mx-auto w-full p-4 md:p-16'>
					{navigation.state === 'loading' ? <Loader /> : <Outlet />}
				</div>
				<Navbar />
			</div>
		);
	}
};

export default App;
