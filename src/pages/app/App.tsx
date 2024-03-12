import Loader from '@/components/layouts/Loader';
import useStoreUserEffect from '@/hooks/useStoreUserEffect';
import { Navigate, Outlet, useNavigation } from 'react-router-dom';
import { useConvexAuth } from 'convex/react';

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
			<div>
				{navigation.state === 'loading' ? <Loader /> : <Outlet />}
			</div>
		);
	}
};

export default App;
