import Navbar from '../../components/layouts/Navbar';
import Footer from '../../components/layouts/Footer';
import Loader from '../../components/layouts/Loader';
import { Suspense } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import ScrollToHashElement from '../../components/reusable/ScrollToHashElement';
import ScrollToTop from '@/components/reusable/ScrollToTop';

const App = () => {
	const navigation = useNavigation();
	return (
		<div>
			<Navbar />
			{navigation.state === 'loading' ? (
				<Loader />
			) : (
				<Suspense fallback={<Loader />}>
					<Outlet />
				</Suspense>
			)}
			<Footer />
			<ScrollToHashElement />
			<ScrollToTop />
		</div>
	);
};

export default App;
