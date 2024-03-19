import { lazy } from 'react';
import { ChatProvider } from '@/context/ChatContext';
const Sidebar = lazy(() => import('@/components/app/chats/Sidebar'));
const ChatRoom = lazy(() => import('@/components/app/chats/ChatRoom'));

const GrassToucher = () => {
	return (
		<ChatProvider>
			<div className='w-full flex flex-col md:flex-row gap-8'>
				<Sidebar />
				<ChatRoom />
			</div>
		</ChatProvider>
	);
};

export default GrassToucher;
