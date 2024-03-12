import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { NAVBAR_NAVIGATION } from '@/constants/navigation';
import { Link, useLocation } from 'react-router-dom';

const SheetNav = () => {
	const location = useLocation();
	return (
		<Sheet>
			<SheetTrigger asChild className='flex lg:hidden'>
				<Button
					variant={'outline'}
					size={'icon'}
					className='text-black dark:text-white'
				>
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent className='text-black'>
				<SheetHeader>
					<div>
						<img
							src='/images/logo.png'
							alt='Touchgrass'
							className='w-12 h-auto object-cover'
						/>
					</div>
					<SheetTitle>Touchgrass</SheetTitle>
					<SheetDescription>
						Welcome to Touchgrass. Your habit tracking app.
					</SheetDescription>
				</SheetHeader>
				<ul className='flex flex-col gap-2 mt-4'>
					{NAVBAR_NAVIGATION.map((nav) => (
						<li
							key={`navbar-sheet-link-${nav.url}`}
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
			</SheetContent>
		</Sheet>
	);
};

export default SheetNav;
