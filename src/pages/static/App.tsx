import Navbar from '../../components/layouts/Navbar';
import Footer from '../../components/layouts/Footer';
import Loader from '../../components/layouts/Loader';
import { Outlet, useNavigation } from 'react-router-dom';

const App = () => {
	const navigation = useNavigation();
	return (
		<div>
			<Navbar />
			{navigation.state === 'loading' ? <Loader /> : <Outlet />}
			<Footer />
		</div>
	);
};

export default App;
