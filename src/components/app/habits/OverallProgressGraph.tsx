import React from 'react';
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
				<ResponsiveContainer
					width='100%'
					height={300}
					className={'mt-8'}
				>
					<AreaChart height={300} data={onePercentProgressHabits}>
						{onePercentProgressHabits.map((entry, index) => {
							return (
								<Area
									type='monotone'
									dataKey={entry.habitName}
									key={`overprogress-${entry._id}-area-${index}`}
									stroke={randomColor()}
									fillOpacity={0.2}
								/>
							);
						})}
						<XAxis dataKey='date' allowDuplicatedCategory={false} />
						<YAxis />
						<Tooltip />
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
