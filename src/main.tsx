import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<TooltipProvider>
			<RouterProvider router={router} />
			<Toaster />
		</TooltipProvider>
	</React.StrictMode>
);
