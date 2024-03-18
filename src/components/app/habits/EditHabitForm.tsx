import React, { useState, useRef } from 'react';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RotateCw } from 'lucide-react';
import { DataModel } from '../../../../convex/_generated/dataModel';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Button } from '@/components/ui/button';

type Props = React.ComponentProps<'form'> & {
	habit: DataModel['habits']['document'];
	editHabit: React.Dispatch<{
		type: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		payload: any;
	}>;
	close: () => void;
};

const formSchema = z.object({
	name: z
		.string()
		.min(2, 'Name cannot be less than 2 characters.')
		.max(100, 'Name cannot be more than 100 characters.'),
});

const EditHabitForm: React.FC<Props> = ({ habit, editHabit, close }) => {
	const [submitting, setSubmitting] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	const updateHabitName = useMutation(api.habit.updateHabitName);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: habit?.name || '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setSubmitting(true);
		try {
			editHabit({
				type: 'UPDATE_HABIT_NAME',
				payload: { habitId: habit._id, name: values.name },
			});
			toast.promise(
				updateHabitName({ habitId: habit._id, name: values.name }),
				{
					success: 'Habit updated!',
					error: 'Failed to update habit',
				}
			);
			close();
		} catch (error) {
			toast.error('Something went wrong! Please try again.');
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'
				ref={formRef}
			>
				<FormField
					control={form.control}
					name='name'
					disabled={submitting}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder='Read for 30 minutes'
									className='text-black'
									{...field}
									onKeyDown={(
										e: React.KeyboardEvent<HTMLInputElement>
									) => {
										if (
											e.code === 'Space' ||
											e.key === ' '
										) {
											e.stopPropagation();
										} else if (
											e.code === 'Enter' ||
											e.key === 'Enter'
										) {
											if (formRef.current) {
												formRef.current.dispatchEvent(
													new Event('submit', {
														bubbles: true,
													})
												);
											}
										}
									}}
								/>
							</FormControl>
							<FormDescription>
								The name of the habit you want to track. For
								example, "Read for 30 minutes" or "Exercise for
								30 minutes"
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					variant='secondary'
					className={`${submitting ? 'animate-pulse' : ''} w-full`}
					disabled={submitting}
					onClick={() => {
						if (formRef.current) {
							formRef.current.dispatchEvent(
								new Event('submit', { bubbles: true })
							);
						}
					}}
				>
					{submitting ? (
						<RotateCw
							className='animate-spin mr-2'
							size={16}
							strokeWidth={2.5}
						/>
					) : null}
					{submitting ? 'Saving...' : 'Edit'}
				</Button>
			</form>
		</Form>
	);
};

export default EditHabitForm;
