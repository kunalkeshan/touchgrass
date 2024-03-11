import { Authenticated, Unauthenticated } from 'convex/react';
import { SignInButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className=''>
			<Authenticated>
				<Button variant={'outline'} className='text-black' asChild>
					<Link to='/app'>Home</Link>
				</Button>
			</Authenticated>
			<Unauthenticated>
				<Button variant={'secondary'} asChild>
					<SignInButton />
				</Button>
			</Unauthenticated>
		</nav>
	);
};

export default Navbar;
