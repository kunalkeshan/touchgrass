/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

// Static Pages
import Static from './pages/static/App';
const Landing = lazy(() => import('./pages/static/Landing'));
const Guides = lazy(() => import('./pages/static/Guides'));
const IndividualGuide = lazy(() => import('./pages/static/IndividualGuide'));

// App Pages
import App from './pages/app/App';
const AllHabits = lazy(() => import('./pages/app/AllHabits'));
const NewHabit = lazy(() => import('./pages/app/NewHabit'));
const IndividualProgress = lazy(() => import('./pages/app/IndividualProgress'));
const OverallProgress = lazy(() => import('./pages/app/OverallProgress'));
const Profile = lazy(() => import('./pages/app/Profile'));
const GrassToucher = lazy(() => import('./pages/app/GrassToucher'));

// Others
import ErrorPage from './components/layouts/ErrorPage';

// Loaders
import {
	rootLoader,
	guidesLoader,
	individualGuideLoader,
	newHabitLoader,
} from './services/loaders';

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
				loader: newHabitLoader,
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
			{
				path: 'grass-toucher',
				element: <GrassToucher />,
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
