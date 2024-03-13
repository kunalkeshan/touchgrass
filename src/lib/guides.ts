import { GUIDES, Guide } from '@/constants/guides';

const SOURCE_URL = '/guides';

interface IFetchAllGuidesOptions {
	limit: number;
	sort: {
		by?: 'date';
		order: 'asc' | 'desc';
	};
}

type FetchAllGuidesOptions = Partial<IFetchAllGuidesOptions>;

const fetchAllGuidesDefaults: FetchAllGuidesOptions = {
	limit: undefined,
};

export const fetchAllGuides = async (_options: FetchAllGuidesOptions) => {
	const options = { ...fetchAllGuidesDefaults, ..._options };
	let sorted: Guide[] = [];
	switch (options?.sort?.by) {
		case 'date': {
			sorted = GUIDES.sort((a, b) =>
				options?.sort?.order === 'asc'
					? a.published.getTime() - b.published.getTime()
					: b.published.getTime() - a.published.getTime()
			);
			break;
		}
		default: {
			sorted = GUIDES;
			break;
		}
	}
	const data = sorted.slice(0, options.limit).map(async (guide) => {
		if (sessionStorage.getItem(guide.url)) {
			const data = JSON.parse(
				sessionStorage.getItem(guide.url) as string
			) as Guide;
			return data;
		} else {
			const response = await fetch(`${SOURCE_URL}/${guide.url}.md`);
			const text = await response.text();
			const data = { ...guide, body: text } as Guide;
			sessionStorage.setItem(guide.url, JSON.stringify(data));
			return data;
		}
	});
	const guides = await Promise.all(data);
	return guides;
};

export const fetchSingleResource = async (url: string) => {
	const guide = GUIDES.find((res) => res.url === url);
	if (!guide) throw new Error('Given URL is invalid.');
	if (sessionStorage.getItem(url)) {
		const data = JSON.parse(sessionStorage.getItem(url) as string) as Guide;
		return data;
	} else {
		const response = await fetch(`${SOURCE_URL}/${url}.md`);
		const text = await response.text();
		const data = { ...guide, body: text } as Guide;
		sessionStorage.setItem(guide.url, JSON.stringify(data));
		return data;
	}
};

export const calculateReadingTime = (text: string) => {
	const textLength = text.trim().split(/s+/gi).length;
	const AVERAGE_HUMAN_READING_TIME = 200; // words per minute;
	const totalReadingTime = Math.ceil(textLength / AVERAGE_HUMAN_READING_TIME);
	return totalReadingTime;
};
