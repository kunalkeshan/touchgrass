import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUp } from 'lucide-react';
import { ChatContext } from '@/context/ChatContext';
import { useContext } from 'react';
import { toast } from 'sonner';

const ChatInput = () => {
	const { selectedHabit, chatLoading, setChatLoading, addMessage } =
		useContext(ChatContext);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setChatLoading(true);
		try {
			const formData = new FormData(e.currentTarget);
			const message = formData.get('message') as string;
			if (message === '') {
				return;
			}
			addMessage(message);
			e.currentTarget.reset();
			try {
				const messageBox = document.getElementById(
					message.replace(/\s+/g, '-').toLowerCase()
				);
				messageBox?.scrollIntoView({ behavior: 'smooth' });
			} catch (_) {
				return;
			}
		} catch (error) {
			toast.error('Unable to send message. Try again later.');
		}
	};

	return (
		<section>
			<form
				className='flex items-center gap-4 mt-auto'
				onSubmit={onSubmit}
			>
				<Input
					className='text-black'
					placeholder='Chat with the Grass Toucher'
					disabled={selectedHabit === null ? true : chatLoading}
					name='message'
				/>
				<Button
					variant={'secondary'}
					size={'icon'}
					type='submit'
					className='text-white bg-green-500 hover:bg-green-500/80'
					disabled={selectedHabit === null ? true : chatLoading}
				>
					<ArrowUp />
				</Button>
			</form>
			<p className='text-xs lg:text-sm text-slate-300 text-center'>
				Grass Toucher can be too *wisdomous* sometimes and make mistakes. Consider checking important
				information.
			</p>
		</section>
	);
};

export default ChatInput;
