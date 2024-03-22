import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { NAVBAR_NAVIGATION } from '@/constants/navigation';
import SheetNav from './SheetNav';

const Navbar = () => {
	const location = useLocation();
	return (
		<nav className='w-full p-4 md:px-16'>
			<div className='w-full max-w-5xl 2xl:max-w-7xl mx-auto flex items-center justify-between'>
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
				<ul className='hidden lg:flex items-center gap-4'>
					{NAVBAR_NAVIGATION.map((nav) => (
						<li
							key={`navbar-link-${nav.url}`}
							className='inline-block'
						>
							<Link
								to={nav.url}
								className={`${
									location.pathname === nav.url
										? 'underline'
										: ''
								} hover:underline transition-all duration-300 hover:text-green-500`}
							>
								{nav.name}
							</Link>
						</li>
					))}
				</ul>
				<div className='flex items-center gap-2'>
					<Button variant={'outline'} className='text-black' asChild>
						<Link to='/info'>Info.</Link>
					</Button>
					<SheetNav />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
