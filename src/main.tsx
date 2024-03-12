import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ConvexReactClient } from 'convex/react';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { QueryClient, QueryClientProvider } from 'react-query';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);
export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<ClerkProvider
					publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
				>
					<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
						<RouterProvider router={router} />
						<Toaster />
					</ConvexProviderWithClerk>
				</ClerkProvider>
			</TooltipProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
