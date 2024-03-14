import { useState } from 'react';
import { DataModel } from '../../../../convex/_generated/dataModel';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

type Props = {
	data: DataModel['habits']['document'] & {
		entries: DataModel['entries']['document'][];
	};
};

const ContributionsGraph: React.FC<Props> = ({ data }) => {
	// State to store recorded days
	const [recordedDays] = useState<string[]>(
		data.entries?.reverse()?.map((entry) => entry.date)
	);

	// Logic to generate the array of day grids
	const generateDayGrids = () => {
		const dayGrids = [];
		for (let i = 0; i < 365; i++) {
			const currentDate = new Date();
			currentDate.setDate(currentDate.getDate() + i);
			const formattedDate = currentDate.toISOString().split('T')[0];

			// Check if the formatted date is in the recordedDays array
			const isActive = recordedDays?.includes(formattedDate);
			const entry = data.entries?.find(
				(entry) => entry.date === formattedDate
			);

			// Add div to dayGrids array with appropriate class
			dayGrids.push(
				<Tooltip key={`habit-${data._id}-day-${formattedDate}`}>
					<TooltipTrigger className='cursor-default'>
						<div
							className={`day ${
								entry?.value === 'N'
									? 'day--no-data'
									: entry?.value === 'A'
									? 'day--inactive'
									: isActive
									? 'day--active'
									: ''
							} hover:bg-black transition-all duration-300`}
						/>
					</TooltipTrigger>
					<TooltipContent>{formattedDate}</TooltipContent>
				</Tooltip>
			);
		}
		return dayGrids;
	};

	// Render the component
	return (
		<section className='border border-white rounded-xl p-6 mt-8'>
			<h2 className='text-lg lg:text-2xl font-semibold'>
				{data.name} - Daily Activity
			</h2>
			<p className='text-slate-300'>
				Here's an overview of your daily activity on this habit starting
				from {recordedDays ? recordedDays[0] : null} for 365 days.
			</p>
			<div className='days mt-3'>{generateDayGrids()}</div>
			<hr className='my-4' />
			<p className='text-slate-300 text-sm'>
				Understanding this activity graph:
			</p>
			<div className='flex items-center gap-4 flex-wrap text-sm mt-2'>
				<div className='flex gap-2 items-center'>
					<div className='bg-green-500 w-3 h-3 shrink-0' />
					<p>Did it!</p>
				</div>
				<div className='flex gap-2 items-center'>
					<div className='bg-red-500 w-3 h-3 shrink-0' />
					<p>Failed!</p>
				</div>
				<div className='flex gap-2 items-center'>
					<div className='bg-gray-500 w-3 h-3 shrink-0' />
					<p>Missed.</p>
				</div>
			</div>
		</section>
	);
};

export default ContributionsGraph;
