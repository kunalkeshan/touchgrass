import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react';
import { SignInButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Link, NavLink } from 'react-router-dom';
import { NAVBAR_NAVIGATION } from '@/constants/navigation';
import SheetNav from './SheetNav';

const Navbar = () => {
	return (
		<nav className='w-full p-4 md:px-16'>
			<div className='w-full max-w-7xl mx-auto flex items-center justify-between'>
				<Link
					to='/'
					className='aspect-square w-12 hover:scale-105 transition-all duration-300'
				>
					<img
						src='/images/logo.png'
						alt='Touchgrass'
						className='w-full h-auto object-cover'
					/>
				</Link>
				<ul className='hidden lg:flex items-center gap-4'>
					{NAVBAR_NAVIGATION.map((nav) => (
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
				<div className='flex items-center gap-2'>
					<Authenticated>
						<Button
							variant={'outline'}
							className='text-black'
							asChild
						>
							<Link to='/app'>App</Link>
						</Button>
					</Authenticated>
					<Unauthenticated>
						<Button variant={'secondary'} asChild>
							<SignInButton>Get Started</SignInButton>
						</Button>
					</Unauthenticated>
					<AuthLoading>
						<Button variant={'secondary'} asChild>
							<SignInButton>Get Started</SignInButton>
						</Button>
					</AuthLoading>
					<SheetNav />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
