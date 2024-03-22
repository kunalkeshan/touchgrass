/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

// Static Pages
import Static from './pages/static/App';
const Landing = lazy(() => import('./pages/static/Landing'));
const Guides = lazy(() => import('./pages/static/Guides'));
const IndividualGuide = lazy(() => import('./pages/static/IndividualGuide'));

// Others
import ErrorPage from './components/layouts/ErrorPage';

// Loaders
import {
	rootLoader,
	guidesLoader,
	individualGuideLoader,
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
		path: '*',
		element: <ErrorPage />,
	},
]);

export default router;
