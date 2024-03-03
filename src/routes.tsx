import { createBrowserRouter } from 'react-router-dom';
import Static from './pages/static/App';
import Landing from './pages/static/Landing';
import ErrorPage from './components/layouts/ErrorPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Static />,
		children: [
			{
				index: true,
				element: <Landing />,
			},
		],
		errorElement: <ErrorPage />,
	},
]);

export default router;
