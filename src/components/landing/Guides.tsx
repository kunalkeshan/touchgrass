import React from 'react';
import { Guide } from '@/constants/guides';
import GuideCard from '../guides/GuideCard';
import { Link } from 'react-router-dom';

type Props = React.ComponentProps<'section'> & {
	guides: Guide[];
};

const Guides: React.FC<Props> = ({ guides }) => {
	return (
		<section className='p-4 md:p-16'>
			<div className='w-full max-w-5xl 2xl:max-w-7xl mx-auto'>
				<h2 className='text-xl lg:text-3xl text-center font-semibold'>
					Latest Guides.
				</h2>
			</div>
			<div className='mt-8 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8 max-w-5xl 2xl:max-w-7xl mx-auto'>
				{guides.map((guide) => (
					<GuideCard key={`guides-${guide.url}`} guide={guide} />
				))}
			</div>
			<Link
				to='/guides'
				className='block w-fit mx-auto mt-8 text-center text-lg font-semibold underline'
			>
				View all guides
			</Link>
		</section>
	);
};

export default Guides;
