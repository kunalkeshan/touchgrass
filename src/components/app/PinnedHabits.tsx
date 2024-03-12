import { Pin } from 'lucide-react';
import ContributionsGraph from './ContributionsGraph';

export default function PinnedHabits() {
	return (
		<div>
			<div className='flex justify-between items-center mb-2'>
				<h2 className='font-semibold'>Pinned Habits</h2>
				<p className='flex items-center'>
					2 <Pin />
				</p>
			</div>
			<ContributionsGraph />
			<ContributionsGraph />
		</div>
	);
}
