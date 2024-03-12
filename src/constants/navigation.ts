// Navigation Links

type NavigationType = Readonly<{
	name: string;
	url: string;
	target: HTMLAnchorElement['target'];
}>;

const COMMON_NAVIGATION: NavigationType[] = [
	{
		name: 'Home',
		url: '/',
		target: '_self',
	},
	{
		name: 'Features',
		url: '/#features',
		target: '_self',
	},
];

export const NAVBAR_NAVIGATION: NavigationType[] = [...COMMON_NAVIGATION];

export const FOOTER_NAVIGATION: NavigationType[] = [
	...COMMON_NAVIGATION,
	// {
	//     name: 'Privacy Policy',
	//     url: '/privacy',
	//     target: '_self',
	// },
	// {
	//     name: 'Terms of Service',
	//     url: '/terms',
	//     target: '_self',
	// },
];
