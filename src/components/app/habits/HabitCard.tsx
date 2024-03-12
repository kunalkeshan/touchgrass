import React from 'react';
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { DataModel } from '../../../../convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import {
	Check,
	CircleX,
	EllipsisVertical,
	ExternalLink,
	RotateCcw,
} from 'lucide-react';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

type Props = React.ComponentProps<typeof Card> & {
	habit: DataModel['habits']['document'];
	entry: DataModel['entries']['document'];
	editHabit: React.Dispatch<{
		type: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		payload: any;
	}>;
};

const HabitCard: React.FC<Props> = ({ habit, entry, editHabit }) => {
	const updateHabitEntry = useMutation(api.entry.updateEntry);

	const handleUpdateHabitEntry =
		(value: DataModel['entries']['document']['value']) => async () => {
			try {
				editHabit({
					type: 'UPDATE_HABIT_ENTRY',
					payload: { habitId: habit._id, entryValue: value },
				});
				updateHabitEntry({ entryId: entry._id, value });
			} catch (error) {
				toast.error('Failed to update habit entry');
			}
		};

	return (
		<Card className='flex items-center justify-between'>
			<CardHeader
				className={`${entry.value !== 'N' ? 'line-through' : ''}`}
			>
				<CardTitle>{habit.name}</CardTitle>
				<CardDescription>
					Started on {new Date(habit._creationTime).toDateString()}
				</CardDescription>
			</CardHeader>
			<CardFooter className='flex items-center gap-2 pb-0'>
				{entry.value !== 'P' ? (
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant='secondary'
								className='text-green-500'
								size={'icon'}
								onClick={handleUpdateHabitEntry('P')}
							>
								<Check className='w-6 h-6' />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Mark as done</TooltipContent>
					</Tooltip>
				) : null}
				{entry.value !== 'A' ? (
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant='secondary'
								className='text-red-500'
								size={'icon'}
								onClick={handleUpdateHabitEntry('A')}
							>
								<CircleX className='w-6 h-6' />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Mark as not done</TooltipContent>
					</Tooltip>
				) : null}
				{entry.value !== 'N' ? (
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant='secondary'
								size={'icon'}
								onClick={handleUpdateHabitEntry('N')}
							>
								<RotateCcw className='w-6 h-6' />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							Reset habit entry as yet to-do
						</TooltipContent>
					</Tooltip>
				) : null}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' size={'icon'}>
							<EllipsisVertical />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>More Options</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem className='p-0'>
							<Button size={'sm'} asChild>
								<Link
									to={`${habit._id}/progress`}
									className='w-full'
								>
									<span>Learn more</span>
									<ExternalLink
										className='shrink-0 ml-2'
										size={16}
										strokeWidth={1.5}
									/>
								</Link>
							</Button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</CardFooter>
		</Card>
	);
};

export default HabitCard;
