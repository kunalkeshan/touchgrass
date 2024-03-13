export type Guide = Readonly<{
	title: string;
	description: string;
	tags: 'General'[];
	url: string;
	image: string;
	published: Date;
	author: {
		name: string;
		social: string;
	};
	body?: string | undefined;
}>;

export const GUIDES: Guide[] = [
	{
		title: 'Welcome to Touch Grass: Your Path to Personal Growth',
		description:
			'We believe in the power of small steps towards personal growth and self-improvement. Our platform is designed to empower individuals to cultivate positive habits, track their progress, and celebrate their achievements along the way.',
		tags: ['General'],
		url: 'welcome',
		image: '/images/guides/welcome.svg',
		published: new Date('2024-03-13'), // yyyy-mm-dd
		author: {
			name: 'Kunal Keshan',
			social: 'https://x.com/_kunalkeshan_',
		},
	},
];
