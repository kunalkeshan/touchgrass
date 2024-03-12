import { Link, NavLink } from 'react-router-dom';
import { FOOTER_NAVIGATION } from '@/constants/navigation';

const Footer = () => {
	return (
		<footer className='p-4 md:px-16'>
			<div className='w-full max-w-5xl 2xl:max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2'>
				<Link
					to='/'
					className='hover:scale-105 transition-all duration-300 flex items-center gap-1'
				>
					<img
						src='/images/logo.png'
						alt='Touchgrass'
						className='w-12 h-auto object-cover'
					/>
					<p className='text-lg self-end font-bold'>Touchgrass</p>
				</Link>
				<ul className='flex items-center gap-4'>
					{FOOTER_NAVIGATION.map((nav) => (
						<li
							key={`navbar-link-${nav.url}`}
							className='inline-block'
						>
							<NavLink
								to={nav.url}
								className={({ isActive, isPending }) =>
									`${
										isActive
											? 'underline'
											: isPending
											? ''
											: ''
									} hover:underline transition-all duration-300 hover:text-green-500`
								}
							>
								{nav.name}
							</NavLink>
						</li>
					))}
				</ul>
			</div>
			<hr className='my-4 border-b border-b-slate-700' />
			<div className='w-full max-w-5xl 2xl:max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2'>
				<p className='text-sm'>
					&copy; 2024 Touchgrass. All rights reserved.
				</p>
				<p className='text-sm'>
					Open Source on{' '}
					<Link
						to='https://github.com/kunalkeshan/touchgrass'
						target='_blank'
						className='transition-all duration-300 underline hover:text-opacity-80'
					>
						GitHub
					</Link>
					. Powered by{' '}
					<Link
						to='https://react.dev/'
						target='_blank'
						className='transition-all duration-300 underline hover:text-[#149eca]'
					>
						React
					</Link>{' '}
					+{' '}
					<Link
						to='https://vitejs.dev/guide/'
						target='_blank'
						className='transition-all duration-300 underline hover:text-[#b63cfe]'
					>
						Vite
					</Link>{' '}
					+{' '}
					<Link
						to='https://convex.dev/'
						target='_blank'
						className='transition-all duration-300 underline hover:text-orange-500'
					>
						Convex
					</Link>{' '}
					+{' '}
					<Link
						to='https://tailwindcss.com'
						target='_blank'
						className='transition-all duration-300 underline hover:text-blue-500'
					>
						Tailwind CSS
					</Link>{' '}
					+{' '}
					<Link
						to='https://ui.shadcn.com/'
						target='_blank'
						className='transition-all duration-300 underline hover:text-opacity-80'
					>
						Shadcn UI
					</Link>
					.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
