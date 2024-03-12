import { Button } from '@/components/ui/button';
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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useConvexAuth, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

const formSchema = z.object({
	name: z
		.string()
		.min(2, 'Name cannot be less than 2 characters.')
		.max(100, 'Name cannot be more than 100 characters.'),
});

const NewHabit = () => {
	const navigate = useNavigate();
	const { isAuthenticated, isLoading } = useConvexAuth();
	const createHabit = useMutation(api.habit.createHabit);
	const storeUser = useMutation(api.user.storeUser);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			if (isLoading) return;
			if (!isAuthenticated) {
				navigate('/');
				return;
			}
			const userId = await storeUser();
			await createHabit({ ...values, userId });
			toast.success('Habit created!');
			form.reset();
			navigate('/app');
		} catch (error) {
			toast.error('Something went wrong! Please try again.');
		}
	}
	return (
		<div>
			<h1 className='text-xl lg:text-3xl font-semibold'>
				Create a new habit
			</h1>
			<p className='text-slate-300'>
				To create a new habit, please enter the name of the habit you
				want to track.
			</p>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 mt-8'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										placeholder='Read for 30 minutes'
										className='text-black'
										{...field}
									/>
								</FormControl>
								<FormDescription>
									The name of the habit you want to track. For
									example, "Read for 30 minutes" or "Exercise
									for 30 minutes"
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						variant={'secondary'}
						className='w-full'
					>
						Create
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default NewHabit;
