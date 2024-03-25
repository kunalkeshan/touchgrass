import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Rocket } from 'lucide-react';

const Hero = () => {
	const people = [
		{
			text: 'I want to read more books',
			image: '/images/person/1.svg',
		},
		{
			text: 'I want to exercise more',
			image: '/images/person/2.svg',
		},
		{
			text: 'I want to eat healthier',
			image: '/images/person/3.svg',
		},
		{
			text: 'I want to meditate more',
			image: '/images/person/4.svg',
		},
		{
			text: 'I want to learn a new language',
			image: '/images/person/5.svg',
		},
	];

	return (
		<section className='p-4 md:p-16 bg-[url(/images/bg-lines.png)] min-h-[60vh] w-full'>
			<div className='w-full max-w-5xl 2xl:max-w-7xl mx-auto'>
				<Alert className='bg-transparent text-white max-w-3xl mx-auto bg-zinc-900 lowercase shadow-white shadow-sm hover:shadow-md hover:shadow-white transition-all duration-300 hover:-translate-y-1'>
					<Rocket
						className='h-4 w-4 !text-white shrink-0'
						size={40}
						strokeWidth={2}
					/>
					<AlertTitle className='text-lg lg:text-xl'>
						<span className='text-green-500'>touchgrass </span>
						update : Temporary{' '}
						<span className='text-red-500'>
							Unavailability
						</span>{' '}
						during Migration
					</AlertTitle>
					<AlertDescription className='font-normal'>
						Dear <u>touchgrass Users</u>, we are excited to announce
						that our project is transitioning into a{' '}
						<u>full-fledged product!</u> As we <u>migrate</u> the
						app to enhance your experience, Touch Grass will be{' '}
						<u>temporarily unavailable</u>. Stay tuned for updates
						on our <u>product timeline</u>. We{' '}
						<u>apologize for any inconvenience</u> and appreciate
						your understanding as we work towards bringing you an
						even better platform for your personal growth journey.{' '}
						<u>Thank you for your patience!</u>{' '}
						<Link
							to='/info'
							className='underline text-green-500 hover:text-opacity-80 transition-all duration-300'
						>
							Learn more here...
						</Link>
					</AlertDescription>
				</Alert>
				<h1 className='text-2xl lg:text-4xl text-center font-bold mt-8'>
					Welcome to Touchgrass. Your habit tracking app.
				</h1>
				<div>
					<div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 mt-8 place-items-center'>
						{people.map((person, index) => (
							<div
								key={`person-${index}`}
								className='max-w-32 text-center'
							>
								<img
									src={person.image}
									alt={person.text}
									className='w-full h-auto object-cover'
								/>
								<p className='mt-2'>{person.text}</p>
							</div>
						))}
					</div>
				</div>
				<div className='mt-8 flex gap-4 justify-center'>
					<Button variant={'outline'} className='text-black' asChild>
						<Link to='/info'>Info.</Link>
					</Button>
					<Button asChild className='bg-black hover:bg-black/80'>
						<Link to={'/#features'}>View features</Link>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Hero;
