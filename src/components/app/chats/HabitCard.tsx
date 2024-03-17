import React from 'react';
import { Button } from '@/components/ui/button';
import { DataModel } from '../../../../convex/_generated/dataModel';

type HabitCardProps = React.ComponentProps<typeof Button> & {
	habit: DataModel['habits']['document'];
};

const HabitCard: React.FC<HabitCardProps> = ({ habit, ...props }) => {
	return (
		<Button
			variant={'ghost'}
			className='text-white p-2 rounded-lg transition-all duration-300 text-left justify-start bg-zinc-950 hover:bg-white hover:text-zinc-950'
			{...props}
		>
			<p className='w-fit'>{habit ? habit.name : 'Not found'}</p>
		</Button>
	);
};

export default HabitCard;
