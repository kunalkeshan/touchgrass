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

/**
 * Fetches and returns an array of guide objects, optionally sorted and limited.
 *
 * This function retrieves guide data, potentially applying sorting and limiting based on provided options. It performs the following actions:
 * 1. Merges default options with provided options to create a complete options object.
 * 2. Sorts the internal `GUIDES` array based on the `sort` property within the options:
 *    - If `sort?.by` is set to "date":
 *        - Sorts guides by their `published` date in ascending or descending order based on `sort?.order`.
 *    - Otherwise, no sorting is applied.
 * 3. Iterates through the (potentially sorted) `GUIDES` array and fetches guide content:
 *    - Checks if the guide content is already cached in session storage for the given guide URL.
 *      - If cached, parses the JSON data and returns the cached guide object.
 *      - If not cached, fetches the guide content from an external Markdown file using the provided `SOURCE_URL` and guide URL.
 *        - Parses the fetched Markdown text.
 *        - Combines the guide object with the fetched body text into a new guide object.
 *        - Caches the newly constructed guide object in session storage for future use.
 *    - Returns a promise that resolves to the constructed guide object (either from cache or fetched).
 * 4. Uses `Promise.all` to wait for all guide content to be fetched and return an array of resolved guide objects.
 *
 * @param {FetchAllGuidesOptions} _options An object containing optional sorting and limiting criteria.
 * @returns {Promise<Guide[]>} A promise that resolves to an array of `Guide` objects, potentially sorted and limited.
 */

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

/**
 * Fetches and returns a single guide object based on the provided URL.
 *
 * This function retrieves guide data for a specific URL, utilizing cached data or fetching from an external source. It performs the following actions:
 * 1. Attempts to find a guide object within the internal `GUIDES` array that matches the provided URL.
 * 2. Throws an error if no matching guide is found for the given URL.
 * 3. Checks if the guide content is already cached in session storage for the provided URL:
 *    - If cached, parses the JSON data and returns the cached guide object.
 *    - If not cached, fetches the guide content from an external Markdown file using the provided `SOURCE_URL` and guide URL.
 *        - Parses the fetched Markdown text.
 *        - Combines the guide object with the fetched body text into a new guide object.
 *        - Caches the newly constructed guide object in session storage for future use.
 * 4. Returns the constructed guide object (either from cache or fetched).
 *
 * @param {string} url The URL of the guide to fetch.
 * @returns {Promise<Guide>} A promise that resolves to a single `Guide` object for the provided URL.
 * @throws {Error} If no matching guide is found for the provided URL.
 */

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

/**
 * Calculates the estimated reading time for a given block of text in minutes.
 *
 * This function approximates the time required to read a text based on the average human reading speed. It performs the following actions:
 * 1. Trims any leading/trailing whitespace from the provided text.
 * 2. Splits the text into individual words using a regular expression that considers multiple spaces.
 * 3. Counts the total number of words in the text using the `length` property of the resulting array.
 * 4. Divides the total word count by an average reading speed of 200 words per minute (configurable).
 * 5. Rounding up the result using `Math.ceil` to provide a conservative estimate.
 *
 * @param {string} text The text content for which to calculate the reading time.
 * @returns {number} The estimated reading time in minutes.
 */
export const calculateReadingTime = (text: string) => {
	const textLength = text.trim().split(/s+/gi).length;
	const AVERAGE_HUMAN_READING_TIME = 200; // words per minute;
	const totalReadingTime = Math.ceil(textLength / AVERAGE_HUMAN_READING_TIME);
	return totalReadingTime;
};
