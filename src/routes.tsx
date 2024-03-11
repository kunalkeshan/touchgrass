import { createBrowserRouter } from 'react-router-dom';

// Static Pages
import Static from './pages/static/App';
import Landing from './pages/static/Landing';

// App Pages
import App from './pages/app/App';
import AllHabits from './pages/app/AllHabits';
import NewHabit from './pages/app/NewHabit';
import IndividualProgress from './pages/app/IndividualProgress';
import OverallProgress from './pages/app/OverallProgress';

// Others
import ErrorPage from './components/layouts/ErrorPage';

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
	{
		path: '/',
		element: <Static />,
		children: [
			{
				index: true,
				element: <Landing />,
			},
		],
	},
	{
		path: '/app',
		element: <App />,
		children: [
			{
				index: true,
				element: <AllHabits />,
			},
			{
				path: 'new-habit',
				element: <NewHabit />,
			},
			{
				path: ':habitId/progress',
				element: <IndividualProgress />,
			},
			{
				path: 'overall-progress',
				element: <OverallProgress />,
			},
		],
		errorElement: <ErrorPage />,
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
]);

export default router;
