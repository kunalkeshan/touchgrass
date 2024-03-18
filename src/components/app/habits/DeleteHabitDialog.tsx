import React from 'react';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DataModel } from '../../../../convex/_generated/dataModel';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

type Props = React.ComponentProps<typeof DialogTrigger> & {
	habit: DataModel['habits']['document'];
	editHabit: React.Dispatch<{
		type: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		payload: any;
	}>;
};

const DeleteHabitDialog: React.FC<Props> = ({ habit, editHabit }) => {
	const deleteHabit = useMutation(api.habit.deleteHabitAndEntries);

	const handleDeleteHabit = async () => {
		try {
			editHabit({
				type: 'DELETE_HABIT',
				payload: { habitId: habit._id },
			});
			toast.promise(deleteHabit({ habitId: habit._id }), {
				loading: 'Deleting habit...',
				success: 'Habit deleted',
				error: 'Failed to delete habit',
			});
		} catch (error) {
			toast.error('Failed to delete habit');
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant={'destructive'}
					size={'sm'}
					className='w-full flex justify-between'
				>
					<span>Delete</span>
					<Trash
						className='shrink-0 ml-2'
						size={16}
						strokeWidth={1.5}
					/>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='flex flex-col'>
						<span className='text-sm lg:text-base text-slate-500 font-normal'>
							Delete Habit
						</span>
						<span className='text-lg lg:text-2xl'>
							{habit.name}
						</span>
					</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this habit? This action
						cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className='sm:justify-normal'>
					<DialogClose asChild className='w-full text-black'>
						<Button variant={'outline'}>Cancel</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button
							variant={'destructive'}
							className='w-full'
							onClick={handleDeleteHabit}
						>
							Delete
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteHabitDialog;
