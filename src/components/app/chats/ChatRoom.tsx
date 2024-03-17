import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUp } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAction } from 'convex/react';
import Message from './Message';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { useContext } from 'react';
import { ChatContext } from '@/context/ChatContext';

const ChatRoom = () => {
	const { selectedHabit } = useContext(ChatContext);
	const chats: Array<{
		prompt: string;
		response: string;
		_creationTime: number;
	}> = [
		{
			prompt: 'hi',
			response: 'how are you?',
			_creationTime: 1710677843952,
		},
		{
			prompt: 'i am fine',
			response: "that's great!",
			_creationTime: 1710677843952,
		},
		{
			prompt: 'what about you?',
			response: 'i am doing good too?',
			_creationTime: 1710677843952,
		},
	];

	const sendPropmpt = useAction(api.ai.chat);

	const handleSendPrompt = async () => {
		try {
			const response = await sendPropmpt({
				habitId: 'j97avzpw71kdd7g8fdn56z8ta16ncgyv' as Id<'habits'>,
				message: 'How to stay consistent?',
			});
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

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
				</section>
			) : (
				<section className='flex-1'>
					<h1 className='text-xl lg:text-3xl font-semibold'>
						Read for 5 mins
					</h1>
					<ScrollArea className='mt-4 pb-4 h-[56vh] md:h-[62vh]'>
						<div className='flex flex-col gap-4'>
							{chats.concat(chats).map((chat, i) => (
								<Message key={`chat-room-${i}`} chat={chat} />
							))}
						</div>
					</ScrollArea>
				</section>
			)}
			<section>
				<div className='flex items-center gap-4 mt-auto'>
					<Input
						className='text-black'
						placeholder='chat with grasstoucher'
					/>
					<Button
						variant={'secondary'}
						size={'icon'}
						className='text-white bg-green-500 hover:bg-green-500/80'
						onClick={handleSendPrompt}
					>
						<ArrowUp />
					</Button>
				</div>
			</section>
		</div>
	);
};

export default ChatRoom;
