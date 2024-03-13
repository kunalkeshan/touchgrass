import { createBrowserRouter } from 'react-router-dom';

// Static Pages
import Static from './pages/static/App';
import Landing from './pages/static/Landing';
import Guides from './pages/static/Guides';
import IndividualGuide from './pages/static/IndividualGuide';

// App Pages
import App from './pages/app/App';
import AllHabits from './pages/app/AllHabits';
import NewHabit from './pages/app/NewHabit';
import IndividualProgress from './pages/app/IndividualProgress';
import OverallProgress from './pages/app/OverallProgress';
import Profile from './pages/app/Profile';

// Others
import ErrorPage from './components/layouts/ErrorPage';

// Loaders
import { loader as rootLoader } from './pages/static/Landing';
import { loader as guidesLoader } from './pages/static/Guides';
import { loader as individualGuideLoader } from './pages/static/IndividualGuide';

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
	{
		path: '/',
		element: <Static />,
		children: [
			{
				index: true,
				element: <Landing />,
				loader: rootLoader,
			},
			{
				path: 'guides',
				element: <Guides />,
				loader: guidesLoader,
			},
			{
				path: 'guides/:guideURL',
				element: <IndividualGuide />,
				loader: individualGuideLoader,
			},
		],
		errorElement: <ErrorPage />,
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
			{
				path: 'me',
				element: <Profile />,
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
