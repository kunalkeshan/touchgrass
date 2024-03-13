import Hero from '../../components/landing/Hero';
import Features from '../../components/landing/Features';
import Guides from '@/components/landing/Guides';
import { fetchAllGuides } from '@/lib/guides';
import { useLoaderData } from 'react-router-dom';
import { Guide } from '@/constants/guides';

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
	const guides = await fetchAllGuides({
		sort: { by: 'date', order: 'desc' },
		limit: 4,
	});
	return { guides };
}

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
