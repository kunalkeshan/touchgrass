import Loader from '@/components/layouts/Loader';
import { Outlet, useNavigation } from 'react-router-dom';

const App = () => {
	const navigation = useNavigation();
	return (
		<div>{navigation.state === 'loading' ? <Loader /> : <Outlet />}</div>
	);
};

export default App;
