// Navigation Links

import {
	AreaChart,
	Home,
	LucideIcon,
	PlusCircle,
	UserCircle,
	Leaf,
} from 'lucide-react';

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
	{
		name: 'Guides',
		url: '/guides',
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

export const APP_NAVIGATION: (NavigationType & { Icon: LucideIcon })[] = [
	{
		name: 'Overall Progress',
		url: '/app/overall-progress',
		target: '_self',
		Icon: AreaChart,
	},
	{
		name: 'Home',
		url: '/app',
		target: '/self',
		Icon: Home,
	},
	{
		name: 'New Habit',
		url: '/app/new-habit',
		target: '_self',
		Icon: PlusCircle,
	},
	{
		name: 'Grass Toucher',
		url: '/app/grass-toucher',
		target: '_self',
		Icon: Leaf,
	},
	{
		name: 'Profile',
		url: '/app/me',
		target: '_self',
		Icon: UserCircle,
	},
];
