import React, { useContext } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { DataModel } from '../../../../convex/_generated/dataModel';
import { ChatContext } from '@/context/ChatContext';

type MessageProps = {
	chat: DataModel['messages']['document'];
};

const Message: React.FC<MessageProps> = ({ chat }) => {
	return (
		<div className='flex flex-col gap-2'>
			<Box boxFor={'prompt'} chat={chat} />
			<Box boxFor={'response'} chat={chat} />
		</div>
	);
};

export default Message;

type BoxProps = {
	boxFor: keyof Pick<MessageProps['chat'], 'response' | 'prompt'>;
	chat: MessageProps['chat'];
};

const Box: React.FC<BoxProps> = ({ chat, boxFor }) => {
	const { user } = useUser();
	const { chatLoading } = useContext(ChatContext);

	const handleCopyGrassToucherText = (text: string) => async () => {
		if (navigator.clipboard) {
			try {
				await navigator.clipboard.writeText(text);
				toast.success('Text copied!');
			} catch (error) {
				toast.error('Unable to copy text. Try again later.');
			}
		} else {
			toast.error('Your device cannot copy this. Try manually!');
		}
	};

	const formatResponseWithNewLines = (response: string): string[] => {
		return response.split(/\n+/g);
	};

	return (
		<div
			className='flex gap-2'
			id={chat.prompt.replace(/\s+/g, '-').toLowerCase()}
		>
			<div className='w-6 h-6 rounded-full overflow-hidden bg-white'>
				<img
					src={
						boxFor === 'prompt'
							? user?.hasImage
								? user?.imageUrl
								: '/images/logo.png'
							: '/images/chats/grasstoucher.png'
					}
					alt={boxFor === 'prompt' ? 'You' : 'Grass Toucher'}
					className='w-full h-auto object-cover'
				/>
			</div>
			<div className='flex-1'>
				<p className='font-semibold flex items-center gap-2 w-full'>
					<span>{boxFor === 'prompt' ? 'You' : 'Grass Toucher'}</span>
					<span className='text-xs text-slate-300 font-normal'>
						({new Date(chat._creationTime).toLocaleDateString()})
					</span>
				</p>
				{boxFor === 'prompt' ? (
					<p>{chat.prompt}</p>
				) : chat.response === null && chatLoading ? (
					<p className='animate-pulse text-sm'>Loading...</p>
				) : (
					<div>
						{chat.response === null
							? 'No response yet.'
							: formatResponseWithNewLines(chat.response).map(
									(line, index) => (
										/**or line starts with a number 1. 2. and so on */
										<p
											key={index}
											className={`${
												line.startsWith('-') ||
												/^\d+\.\s+/.test(line)
													? 'ml-4 mt-2'
													: ''
											}`}
										>
											{line}
										</p>
									)
									// eslint-disable-next-line no-mixed-spaces-and-tabs
							  )}
					</div>
				)}
				{boxFor === 'response' ? (
					<div className='flex items-center gap-2 mt-2'>
						<button
							className='hover:text-green-500 transition-all duration-300'
							onClick={handleCopyGrassToucherText(
								chat[
									boxFor as keyof MessageProps['chat']
								] as string
							)}
						>
							<Copy size={12} />
						</button>
					</div>
				) : null}
			</div>
		</div>
	);
};
