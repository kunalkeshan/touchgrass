import React, { useState } from 'react';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	ReferenceLine,
} from 'recharts';
import { DataModel } from '../../../../convex/_generated/dataModel';
import { Link } from 'react-router-dom';
import { randomColor } from '@/lib/utils';
import { badgeVariants } from '@/components/ui/badge';

export type OverallProgressGraphProps = React.ComponentProps<'section'> & {
	onePercentProgressHabits: Array<
		DataModel['entries']['document'] & {
			[key: string]: number | string;
			habitName: string;
		}
	>;
	habits: Array<
		DataModel['habits']['document'] & {
			entries: Array<
				DataModel['entries']['document'] & { progress: number }
			>;
		}
	>;
};

const OverallProgressGraph: React.FC<OverallProgressGraphProps> = ({
	habits,
	onePercentProgressHabits,
}) => {
	const [selectedHabit, setSelectedHabit] = useState(habits[0]._id);
	return (
		<section>
			<div className='border border-white rounded-xl p-6 mt-8'>
				<h2 className='text-lg lg:text-2xl font-semibold'>
					Overall 1% Progress
				</h2>
				<p className='text-slate-300'>
					Here's an overview of your 1% progress on this habit ever
					since you started on{' '}
					{new Date(habits[0]._creationTime).toDateString()}.
				</p>
				<div className='mt-4'>
					<p>Show for:</p>
					<div className='flex flex-wrap items-center gap-2 mt-2'>
						{habits.map((habit) => (
							<button
								onClick={() => setSelectedHabit(habit._id)}
								key={`habit-order-setter-${habit._id}`}
								className={badgeVariants({
									variant:
										selectedHabit === habit._id
											? 'secondary'
											: 'outline',
									className:
										selectedHabit === habit._id
											? ''
											: 'text-white',
								})}
							>
								{habit.name}
							</button>
						))}
					</div>
				</div>
				<ResponsiveContainer
					width='100%'
					height={300}
					className={'mt-8'}
				>
					<AreaChart height={300} data={onePercentProgressHabits}>
						{onePercentProgressHabits
							.filter((e) => e.habitId === selectedHabit)
							.map((entry, index) => {
								const color = randomColor();
								return (
									<Area
										type='monotone'
										dataKey={entry.habitName}
										key={`overprogress-${entry._id}-area-${index}`}
										stroke={color + '40'}
										fillOpacity={0.2}
										dot={true}
										name={entry.habitName}
									/>
								);
							})}
						<XAxis dataKey='date' allowDuplicatedCategory={false} />
						<YAxis />
						<Tooltip labelClassName='text-black' />
						<ReferenceLine
							y={1}
							stroke='green'
							label='No progress'
						/>
					</AreaChart>
				</ResponsiveContainer>
				<p className='text-slate-300 text-sm'>
					Understanding this 1% progress graph:
				</p>
				<Link
					to='/guides/continuous-growth'
					className='text-sm underline'
				>
					Continuous Improvement: How It Works and How to Master It.
				</Link>
			</div>
		</section>
	);
};

export default OverallProgressGraph;
