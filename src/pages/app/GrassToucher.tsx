import Sidebar from '@/components/app/chats/Sidebar';
import ChatRoom from '@/components/app/chats/ChatRoom';
import { ChatProvider } from '@/context/ChatContext';

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
