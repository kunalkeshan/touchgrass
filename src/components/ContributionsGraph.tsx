import { useState } from 'react';

const ContributionsGraph = () => {
	// State to store recorded days
	const [recordedDays] = useState<string[]>([]);

	// Logic to generate the array of day grids
	const generateDayGrids = () => {
		const dayGrids = [];
		for (let i = 0; i < 200; i++) {
			const currentDate = new Date();
			currentDate.setDate(currentDate.getDate() - i);
			const formattedDate = currentDate.toISOString().slice(0, 10);

			// Check if the formatted date is in the recordedDays array
			const isActive = recordedDays.includes(formattedDate);

			// Add div to dayGrids array with appropriate class
			dayGrids.unshift(
				<div
					key={i}
					className={`day ${isActive ? 'day--active' : ''}`}
				></div>
			);
		}
		return dayGrids;
	};

	// Render the component
	return (
		<div className='border border-white rounded-xl p-6 mb-3'>
			<h2 className='text-md font-semibold'>Book Reading</h2>
			<p className='text-sm'>Read 5 pages of Harry Potter daily</p>
			<div className='days mt-3'>{generateDayGrids()}</div>
		</div>
	);
};

export default ContributionsGraph;
