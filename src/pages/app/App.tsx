import Loader from '@/components/layouts/Loader';
import useStoreUserEffect from '@/hooks/useStoreUserEffect';
import { Suspense } from 'react';
import { Navigate, Outlet, useNavigation } from 'react-router-dom';
import { useConvexAuth } from 'convex/react';
import Navbar from '@/components/app/Navbar';
import ScrollToTop from '@/components/reusable/ScrollToTop';

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
			<div className='w-full min-h-screen bg-[url(/images/bg-lines.png)]'>
				<div className='max-w-5xl 2xl:max-w-7xl mx-auto w-full p-4 md:p-16 mb-16 md:mb-8'>
					{navigation.state === 'loading' ? (
						<Loader />
					) : (
						<Suspense fallback={<Loader />}>
							<Outlet />
						</Suspense>
					)}
				</div>
				<Navbar />
				<ScrollToTop />
			</div>
		);
	}
};

export default App;
