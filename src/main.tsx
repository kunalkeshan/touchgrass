import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { ConvexReactClient } from 'convex/react';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ClerkProvider
			publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
		>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				<RouterProvider router={router} />
			</ConvexProviderWithClerk>
		</ClerkProvider>
	</React.StrictMode>
);
