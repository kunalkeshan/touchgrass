import { Link, useLocation } from 'react-router-dom';
import { APP_NAVIGATION } from '@/constants/navigation';

const Navbar = () => {
	const location = useLocation();
	return (
		<nav className='w-full fixed bottom-0 bg-slate-700 p-4 md:px-16'>
			<div className='w-full max-w-7xl mx-auto grid grid-cols-4 gap-4'>
				{APP_NAVIGATION.map((nav) => {
					return (
						<Link
							key={`navbar-app-link-${nav.url}`}
							to={nav.url}
							className={`${
								location.pathname === nav.url
									? 'bg-green-500'
									: ''
							} flex flex-col md:flex-row max-w-[10ch] md:max-w-none items-center justify-center text-center gap-2 p-2 rounded-lg`}
						>
							<nav.Icon className='shrink-0' />
							<span className='text-sm md:text-base lg:text-lg'>
								{nav.name}
							</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
};

export default Navbar;
