import { useContext, useState } from 'react';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SquareMenu } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import HabitCard from './HabitCard';
import { Link } from 'react-router-dom';
import { ChatContext } from '@/context/ChatContext';
import { Id } from '../../../../convex/_generated/dataModel';

const Sidebar = () => {
	const [open, setOpen] = useState(true);
	const { habits, setSelectedHabit } = useContext(ChatContext);

	const handleToggle = (state: boolean) => {
		setOpen(state);
	};

	const handleSelectHabit = (habitId: Id<'habits'>) => {
		setSelectedHabit(habitId);
		setOpen(false);
	};

	return (
		<Sheet defaultOpen open={open} onOpenChange={handleToggle}>
			<SheetTrigger asChild>
				<Button variant={'secondary'} size={'icon'}>
					<SquareMenu />
				</Button>
			</SheetTrigger>
			<SheetContent side='left' className='bg-zinc-900 border-r-0'>
				<SheetHeader>
					<div>
						<img
							src='/images/logo.png'
							alt='Touchgrass'
							className='w-12 h-auto object-cover'
						/>
					</div>
					<SheetTitle className='text-white'>Touchgrass</SheetTitle>
					<SheetDescription>
						Seek wisdom from the Grass Toucher about...
					</SheetDescription>
				</SheetHeader>
				<ScrollArea className='h-[60vh] mt-8'>
					<div className='flex flex-col gap-2'>
						{habits.length > 0 ? (
							habits.map((habit) => (
								<HabitCard
									key={`habit-card-sidebar-${habit._id}`}
									onClick={() => handleSelectHabit(habit._id)}
								/>
							))
						) : (
							<div>
								<p>
									....nothing?
									<br />
									<br />
									Grass Toucher is disappointed 😕 and hopes
									that you touched grass today... 🌿🌱🍃{' '}
									<br />
									<br />
									<Link
										to='/app/new-habit'
										className='underline text-green-500 hover:text-green-500/80 transition-all duration-300'
									>
										Create a habit
									</Link>{' '}
									to become as wise as the Grass Toucher.
								</p>
							</div>
						)}
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
};

export default Sidebar;
