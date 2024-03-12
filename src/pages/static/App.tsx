import Navbar from '../../components/layouts/Navbar';
import Footer from '../../components/layouts/Footer';
import Loader from '../../components/layouts/Loader';
import { Outlet, useNavigation } from 'react-router-dom';
import useStoreUserEffect from '@/hooks/useStoreUserEffect';

const App = () => {
	const navigation = useNavigation();
	useStoreUserEffect();
	return (
		<div>
			<Navbar />
			{navigation.state === 'loading' ? <Loader /> : <Outlet />}
			<Footer />
		</div>
	);
};

export default App;
