import React from 'react';
import { Button } from '@/components/ui/button';

type HabitCardProps = React.ComponentProps<typeof Button>;

const HabitCard: React.FC<HabitCardProps> = ({ ...props }) => {
	return (
		<Button
			variant={'ghost'}
			className='text-white p-2 rounded-lg transition-all duration-300 text-left justify-start bg-zinc-950 hover:bg-white hover:text-zinc-950'
			{...props}
		>
			<p className='w-fit'>Read for 5 mins</p>
		</Button>
	);
};

export default HabitCard;
