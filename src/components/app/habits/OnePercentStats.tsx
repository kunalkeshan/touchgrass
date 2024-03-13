import React, { useMemo } from 'react';
import { DataModel } from '../../../../convex/_generated/dataModel';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	ReferenceLine,
} from 'recharts';
import { Link } from 'react-router-dom';

type Props = {
	data: DataModel['habits']['document'] & {
		entries: DataModel['entries']['document'][];
	};
};

const OnePercentStats: React.FC<Props> = ({ data }) => {
	const chartData = useMemo(() => {
		let [daysShowedUp, daysMissed] = [0, 0];
		return data.entries?.map((entry) => {
			if (entry.value === 'A') daysMissed++;
			else if (entry.value === 'P') daysShowedUp++;
			return {
				date: entry.date,
				progress: 1.01 ** (daysShowedUp - daysMissed),
			};
		});
	}, [data]);

	const avergeProgress =
		chartData?.reduce((acc, curr) => acc + curr.progress, 0) /
		chartData?.length;

	return (
		<section className='border border-white rounded-xl p-6 mt-8'>
			<h2 className='text-lg lg:text-2xl font-semibold'>
				{data.name} - 1% Progress
			</h2>
			<p className='text-slate-300'>
				Here's an overview of your 1% progress on this habit ever since
				you started on {data.entries ? data.entries[0].date : null}.
			</p>
			<ResponsiveContainer width='100%' height={300} className={'mt-8'}>
				<AreaChart height={300} data={chartData}>
					<Area
						type='monotone'
						dataKey='progress'
						stroke={avergeProgress >= 1 ? '#00ff00' : '#ff0000'}
						fill={avergeProgress >= 1 ? '#00ff0040' : '#ff000040'}
					/>
					<XAxis dataKey='date' />
					<YAxis />
					<Tooltip />
					<ReferenceLine y={1} stroke='green' label='No progress' />
				</AreaChart>
			</ResponsiveContainer>
			<p className='text-slate-300 text-sm'>
				Understanding this 1% progress graph:
			</p>
			<Link to='/guides/continuous-growth' className='text-sm underline'>
				Continuous Improvement: How It Works and How to Master It.
			</Link>
		</section>
	);
};

export default OnePercentStats;
