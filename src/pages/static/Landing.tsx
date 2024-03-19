import { lazy } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Guide } from '@/constants/guides';
const Hero = lazy(() => import('../../components/landing/Hero'));
const Features = lazy(() => import('../../components/landing/Features'));
const Guides = lazy(() => import('@/components/landing/Guides'));
const Demo = lazy(() => import('@/components/landing/Demo'));

const Landing = () => {
	const { guides } = useLoaderData() as { guides: Guide[] };
	return (
		<div>
			<Hero />
			<Demo />
			<Features />
			<Guides guides={guides} />
		</div>
	);
};

export default Landing;
