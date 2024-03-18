import { Link, useLocation } from 'react-router-dom';
import { APP_NAVIGATION } from '@/constants/navigation';

const Navbar = () => {
	const location = useLocation();
	return (
		<nav className='w-full fixed bottom-0 p-4 md:px-16 bg-white/30 backdrop-blur'>
			<div className='w-full max-w-5xl 2xl:max-w-7xl mx-auto grid grid-cols-5 gap-5'>
				{APP_NAVIGATION.map((nav) => {
					return (
						<Link
							key={`navbar-app-link-${nav.url}`}
							to={nav.url}
							className={`${
								location.pathname === nav.url
									? 'bg-green-500'
									: 'hover:bg-green-500/30'
							} flex flex-col md:flex-row max-w-[10ch] md:max-w-none items-center justify-center text-center gap-2 p-2 rounded-lg`}
						>
							<nav.Icon className='shrink-0' />
							<span className='text-sm md:text-base lg:text-lg hidden md:block'>
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
