import { Link, useRouteError } from 'react-router-dom';
import { Button } from '../ui/button';

export default function ErrorPage() {
	const error = useRouteError() as unknown as {
		statusText: string;
		message: string;
	};

	const team = [
		{
			name: 'Kunal',
			image: '/images/team/cartoon/kunal.png',
			url: 'https://github.com/kunalkeshan',
		},
		{
			name: 'Arnav',
			image: '/images/team/cartoon/arnav.png',
			url: 'https://github.com/thelordzeus',
		},
		{
			name: 'Kevin',
			image: '/images/team/cartoon/kevin.png',
			url: 'https://github.com/kevinpauljacob',
		},
		{
			name: 'Ishaan',
			image: '/images/team/cartoon/ishaan.png',
			url: 'https://github.com/ik04',
		},
		{
			name: 'Advith',
			image: '/images/team/cartoon/advith.png',
			url: 'https://github.com/Diacod-I',
		},
	];

	return (
		<div
			id='error-page'
			className='w-full min-h-screen p-4 md:p-16 bg-[url(/images/bg-lines.png)]'
		>
			<div className='w-full max-w-5xl 2xl:max-w-7xl mx-auto text-center'>
				<h1 className='text-xl lg:text-3xl font-semibold'>Oops!</h1>
				<p className='text-slate-300'>
					Sorry, an unexpected error has occurred.
				</p>
				<p className='text-slate-300'>
					<i>{error?.statusText || error?.message}</i>
				</p>
				<h2 className='mt-8 text-lg lg:text-2xl'>
					One of our Development Team must be punished for this
					unacceptable failure!
				</h2>
				<p className='mt-8 font-bold uppercase'>Pick who to fire!!!</p>
				<ul className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 mt-8'>
					{team.map((member) => (
						<li
							key={member.name}
							className='items-center gap-4 inline-flex flex-col group'
						>
							<img
								src={member.image}
								alt={member.name}
								className='w-full h-auto rounded-full group-hover:scale-105 transition-all duration-300'
							/>
							<Button asChild variant={'secondary'}>
								<Link to={member.url} target='_blank'>
									{member.name}
								</Link>
							</Button>
						</li>
					))}
				</ul>
				<p className='mt-8 text-lg lg:text-2xl'>
					In a forgiving mood? Let them all keep their jobs.
				</p>
				<p className='mt-4 text-lg lg:text-2xl'>
					Return to the{' '}
					<Link
						to={'/'}
						className='underline text-green-500 hover:text-opacity-80 transition-all duration-300'
					>
						homepage
					</Link>
					.
				</p>
			</div>
		</div>
	);
}
