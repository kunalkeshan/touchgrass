export type Guide = Readonly<{
	title: string;
	description: string;
	tags: ('General' | 'Growth' | 'Mindset' | 'Habits')[];
	url: string;
	image: string;
	published: Date; // yyyy-mm-dd
	author: {
		name: string;
		social: string;
	};
	body?: string | undefined;
}>;

export const GUIDES: Guide[] = [
	{
		title: 'Continuous Improvement: How It Works and How to Master It',
		description:
			'Continuous improvement is a dedication to making small changes and improvements every day, with the expectation that those small improvements will add up to something significant.',
		tags: ['Habits', 'Growth', 'Mindset'],
		url: 'continuous-growth',
		image: '/images/guides/continuous-growth.svg',
		published: new Date('2024-03-13'),
		author: {
			name: 'James Clear',
			social: 'https://jamesclear.com',
		},
	},
	{
		title: "The 1% Progress Graph - How it's calculated & Why it matters?",
		description:
			'The 1% Progress Graph feature, designed to give you deeper insights into your growth journey.',
		tags: ['Habits', 'Growth', 'Mindset'],
		url: 'one-percent-progress',
		image: '/images/guides/one-percent-progress.svg',
		published: new Date('2024-03-13'),
		author: {
			name: 'Kunal Keshan',
			social: 'https://x.com/_kunalkeshan_',
		},
	},
	{
		title: "Daily Activity - How it's calculated & Why it matters?",
		description:
			'A unique feature to help you track your daily activity and stay accountable to your goals.',
		tags: ['Habits', 'Growth', 'Mindset'],
		url: 'daily-activity',
		image: '/images/guides/daily-activity.svg',
		published: new Date('2024-03-13'),
		author: {
			name: 'Kunal Keshan',
			social: 'https://x.com/_kunalkeshan_',
		},
	},
	{
		title: 'Welcome to Touch Grass: Your Path to Personal Growth',
		description:
			'We believe in the power of small steps towards personal growth and self-improvement. Our platform is designed to empower individuals to cultivate positive habits, track their progress, and celebrate their achievements along the way.',
		tags: ['General'],
		url: 'welcome',
		image: '/images/guides/welcome.svg',
		published: new Date('2024-03-13'),
		author: {
			name: 'Kunal Keshan',
			social: 'https://x.com/_kunalkeshan_',
		},
	},
];
