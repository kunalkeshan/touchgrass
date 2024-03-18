import Hero from '../../components/landing/Hero';
import Features from '../../components/landing/Features';
import Guides from '@/components/landing/Guides';
import { useLoaderData } from 'react-router-dom';
import { Guide } from '@/constants/guides';

const Landing = () => {
	const { guides } = useLoaderData() as { guides: Guide[] };
	return (
		<div>
			<Hero />
			<Features />
			<Guides guides={guides} />
		</div>
	);
};

export default Landing;
