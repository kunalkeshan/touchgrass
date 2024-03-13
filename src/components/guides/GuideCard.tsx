import React from 'react';
import { Guide } from '@/constants/guides';
import { Link } from 'react-router-dom';

type Props = React.ComponentProps<'a'> & {
	guide: Guide;
};

const GuideCard: React.FC<Props> = ({ guide }) => {
	return (
		<Link
			to={`/guides/${guide.url}`}
			className='inline-flex flex-col justify-between w-full h-full group p-4 backdrop-blur-lg bg-white bg-opacity-[0.01] rounded-lg'
		>
			<div className='mx-auto'>
				<img
					src={guide.image}
					alt={guide.title}
					className='w-full max-w-none lg:max-w-[10rem] h-auto object-cover group-hover:scale-105 transition-all duration-300 ease-in-out'
				/>
			</div>
			<div className='mt-4'>
				<h2 className='text-lg lg:text-2xl font-semibold'>
					{guide.title}
				</h2>
				<p className='text-slate-300 mt-2'>
					{guide.description.slice(0, 72) + '...'}
				</p>
			</div>
			<div className='text-sm flex items-center justify-between'>
				<p className=''>{new Date(guide.published).toDateString()}</p>
				<p className='underline text-green-500'>Read more</p>
			</div>
		</Link>
	);
};

export default GuideCard;
