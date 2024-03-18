import { ScrollArea } from '@/components/ui/scroll-area';
import Message from './Message';
import { useContext } from 'react';
import { ChatContext } from '@/context/ChatContext';
import ChatInput from './ChatInput';
import About from './About';

const ChatRoom = () => {
	const { selectedHabit, messages, habits } = useContext(ChatContext);

	const currentHabit = habits?.find((habit) => habit._id === selectedHabit);

	return (
		<div className='flex-1 w-full min-h-[70vh] md:min-h-[76vh] flex flex-col mx-auto max-w-3xl'>
			{selectedHabit === null ? (
				<section className='w-full h-full flex-1 flex items-center justify-center flex-col gap-4'>
					<div>
						<img
							src='/images/logo.png'
							alt='Touchgrass'
							className='w-12 h-auto object-cover'
						/>
					</div>
					<h1 className='text-xl lg:text-3xl font-semibold max-w-sm text-center'>
						Have you touched grass today? or you maybe want to seek
						the wisdom of the Grass Toucher?
					</h1>
					<About />
				</section>
			) : (
				<section className='flex-1'>
					<div className='w-full flex items-center justify-between'>
						<h1 className='text-xl lg:text-3xl font-semibold'>
							{currentHabit ? currentHabit.name : null}
						</h1>
						<About />
					</div>
					<ScrollArea className='mt-4 pb-4 h-[56vh] md:h-[62vh]'>
						<div className='flex flex-col gap-4'>
							{messages.length > 0 ? (
								messages.map((chat, i) => (
									<Message
										key={`chat-room-${i}`}
										chat={chat}
									/>
								))
							) : (
								<p className='text-slate-300'>
									Start a conversation with the Grass Toucher
									by typing in the chat box below.
								</p>
							)}
						</div>
					</ScrollArea>
				</section>
			)}
			<ChatInput />
		</div>
	);
};

export default ChatRoom;
