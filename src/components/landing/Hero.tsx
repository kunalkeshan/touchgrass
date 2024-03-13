import { SignInButton } from '@clerk/clerk-react';
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

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
				<h1 className='text-2xl lg:text-4xl text-center font-bold'>
					Welcome to Touchgrass. Your habit tracking app.
				</h1>
			</div>
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
				<Authenticated>
					<Button className='' variant={'secondary'} asChild>
						<Link to={'/app'}>App</Link>
					</Button>
				</Authenticated>
				<Unauthenticated>
					<Button className='' variant={'secondary'} asChild>
						<SignInButton
							afterSignInUrl='/app'
							afterSignUpUrl='/app'
						>
							Get Started
						</SignInButton>
					</Button>
				</Unauthenticated>
				<AuthLoading>
					<Button className='' variant={'secondary'} disabled>
						Loading
					</Button>
				</AuthLoading>
				<Button asChild className='bg-black hover:bg-black/80'>
					<Link to={'/#features'}>View features</Link>
				</Button>
			</div>
		</section>
	);
};

export default Hero;
