import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

const About = () => {
	return (
		<Dialog>
			<DialogTrigger className='hover:drop-shadow-[1px_1px_20px_white] transition-all duration-300 focus:drop-shadow-[1px_1px_20px_white]'>
				<Tooltip>
					<TooltipTrigger>
						<img
							src={'/images/chats/waving.gif'}
							alt='about'
							className='w-8 h-8'
						/>
					</TooltipTrigger>
					<TooltipContent>Hey, I'm Grass Toucher...</TooltipContent>
				</Tooltip>
			</DialogTrigger>
			<DialogContent className='text-black text-justify'>
				<DialogHeader>
					<DialogTitle className='text-center'>
						Introducing Grass Toucher
					</DialogTitle>
					<DialogDescription className='text-center'>
						Your Personal Habit Companion
					</DialogDescription>
				</DialogHeader>
				<div className='max-w-[4rem] mx-auto'>
					<img
						src={'/images/chats/grasstoucher.png'}
						alt='grass toucher'
						className='w-full h-auto object-cover'
					/>
				</div>
				<p>
					Hey there, I'm Grass Toucher, your trusty companion on the
					journey to personal growth and self-improvement! 🌱
				</p>
				<p>
					I'm not your average chatbot – I'm here to help you
					cultivate positive habits, track your progress, and provide
					guidance along the way. Whether you're looking for
					motivation, advice, or just a friendly chat about your
					habits, I've got you covered.
				</p>
				<p>
					Just start chatting with me, and I'll be here to listen,
					offer insights, and support you on your path to becoming the
					best version of yourself.
				</p>
			</DialogContent>
		</Dialog>
	);
};

export default About;
