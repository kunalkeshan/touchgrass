import { cn } from '@/lib/utils';
import React from 'react';

type Props = React.ComponentProps<'div'>;

const Loader: React.FC<Props> = ({ className, ...props }) => {
	return (
		<div
			className={cn(
				'w-full h-full flex flex-col items-center justify-center',
				className
			)}
			{...props}
		>
			<div className='w-40 aspect-square'>
				<img
					src='/images/loading.gif'
					alt='Loading...'
					className='w-full h-auto object-contain'
				/>
			</div>
			<p className='animate-pulse text-lg lg:text-2xl font-semibold'>
				Loading...
			</p>
		</div>
	);
};

export default Loader;
