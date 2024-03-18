import { fetchAllGuides, fetchSingleResource } from '@/lib/guides';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
export async function rootLoader() {
	const guides = await fetchAllGuides({
		sort: { by: 'date', order: 'desc' },
		limit: 4,
	});
	return { guides };
}

// eslint-disable-next-line react-refresh/only-export-components
export async function newHabitLoader() {
	const guide = await fetchSingleResource('choosing-habits');
	return { guide };
}

// eslint-disable-next-line react-refresh/only-export-components
export async function guidesLoader() {
	const guides = await fetchAllGuides({
		sort: { by: 'date', order: 'desc' },
	});
	return { guides };
}

// eslint-disable-next-line react-refresh/only-export-components
export async function individualGuideLoader({ params }: LoaderFunctionArgs) {
	try {
		const guide = await fetchSingleResource(params.guideURL ?? '');
		return { guide };
	} catch (error) {
		return redirect('/guides');
	}
}
