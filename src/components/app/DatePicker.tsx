import * as React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn, dateFormatterAfterISOParse } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useUser } from '@clerk/clerk-react';

type DatePickerProps = React.ComponentProps<'div'> & {
	date: Date;
	setDate: React.Dispatch<React.SetStateAction<Date>>;
};

export function DatePicker({ date, setDate }: DatePickerProps) {
	const { user } = useUser();

	const tomorrow = new Date(); // initially set to today
	tomorrow.setDate(tomorrow.getDate() + 1); // set to tomorrow

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-full bg-transparent justify-start text-left font-normal mt-2',
						!date && 'text-slate-300 w-full'
					)}
				>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{date ? (
						dateFormatterAfterISOParse(date)
					) : (
						<span>Pick a date</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					selected={date}
					onSelect={(day) => setDate(day as Date)}
					initialFocus
					fromDate={new Date(user?.createdAt ?? new Date())}
					toDate={tomorrow}
				/>
			</PopoverContent>
		</Popover>
	);
}
