import React, { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DataModel } from '../../../../convex/_generated/dataModel';
import { Edit } from 'lucide-react';
import EditHabitForm from './EditHabitForm';

type Props = React.ComponentProps<typeof DialogTrigger> & {
	habit: DataModel['habits']['document'];
	editHabit: React.Dispatch<{
		type: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		payload: any;
	}>;
};

const EditHabitDialog: React.FC<Props> = ({ habit, editHabit }) => {
	const [open, setOpen] = useState(false);

	const handleToggle = (state: boolean) => {
		setOpen(state);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={handleToggle}>
			<DialogTrigger asChild>
				<Button size={'sm'} className='w-full flex justify-between'>
					<span>Edit</span>
					<Edit
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
							Edit Habit
						</span>
						<span className='text-lg lg:text-2xl'>
							{habit.name}
						</span>
					</DialogTitle>
					<DialogDescription>
						Change the name of the habit and save to update it.
					</DialogDescription>
				</DialogHeader>
				<EditHabitForm
					habit={habit}
					editHabit={editHabit}
					close={handleClose}
					key={`edit-habit-form-${habit._id}`}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default EditHabitDialog;
