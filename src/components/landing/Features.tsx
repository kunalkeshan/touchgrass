import {
	ArrowUp10,
	BadgePlus,
	BookHeart,
	Brain,
	Grid3X3,
	Link,
	ListPlus,
	LucideIcon,
	Rocket,
	Share,
	User,
	Users,
	TrafficCone,
	CircleCheck,
} from 'lucide-react';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

type FeatureInformation = ReadonlyArray<{
	title: string;
	description: string;
	ready: boolean;
	Icon: LucideIcon;
}>;

const Features = () => {
	const features: FeatureInformation = [
		{
			title: 'Create New Habits',
			description:
				'Start your growth journey by setting new habits aligned with your goals.',
			ready: true,
			Icon: BadgePlus,
		},
		{
			title: 'Track on a Daily Basis',
			description:
				'Easily monitor and celebrate your progress with daily habit tracking.',
			ready: true,
			Icon: ListPlus,
		},
		{
			title: '1% Model Calculation',
			description:
				'Track your progress with our unique 1% model, focusing on gradual improvement.',
			ready: true,
			Icon: ArrowUp10,
		},
		{
			title: 'Contributions Graph',
			description:
				'Visualize your progress with detailed habit contribution graphs.',
			ready: true,
			Icon: Grid3X3,
		},
		{
			title: 'Personalized Recommendations',
			description:
				'Receive tailored book recommendations based on your habits and interests.',
			ready: false,
			Icon: BookHeart,
		},
		{
			title: 'Mental Health Tools',
			description:
				'Access mental health tools seamlessly integrated into Touch Grass.',
			ready: false,
			Icon: Brain,
		},
		{
			title: 'Public/Private Profile',
			description:
				'Customize your profile for personal or community sharing.',
			ready: false,
			Icon: User,
		},
		{
			title: 'Follow Feature',
			description:
				'Connect with others on Touch Grass to support and inspire each other.',
			ready: false,
			Icon: Users,
		},
		{
			title: 'Public Share Links',
			description:
				'Share your progress with the world through public links.',
			ready: false,
			Icon: Link,
		},
		{
			title: 'Automatic Milestone Tweets',
			description:
				'Share your achievements on Twitter effortlessly with automatic milestone tweets.',
			ready: false,
			Icon: Share,
		},
		{
			title: 'Future Features Preview',
			description:
				'Stay tuned for upcoming features like chat, posts, and challenges.',
			ready: false,
			Icon: Rocket,
		},
	];

	return (
		<section className='p-4 md:p-16' id='features'>
			<div className='w-full max-w-7xl mx-auto'>
				<h2 className='text-xl lg:text-3xl text-center font-semibold'>
					Why Touchgrass?
				</h2>
			</div>
			<ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
				{features.map((feature, idx) => (
					<li
						key={`feature-${idx}`}
						className='inline-flex p-2 border rounded-lg relative gap-2 hover:-translate-y-1 select-none hover:shadow-sm transition-all duration-300 hover:shadow-white'
					>
						<feature.Icon className='shrink-0 mt-1' />
						<div>
							<h3 className='text-base lg:text-lg font-medium'>
								{feature.title}
							</h3>
							<p className='text-sm text-slate-300'>
								{feature.description}
							</p>
						</div>
						<Tooltip>
							<TooltipTrigger
								className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2'
								asChild
							>
								{feature.ready ? (
									<CircleCheck
										className='text-green-500'
										fill='white'
									/>
								) : (
									<TrafficCone className='text-orange-500' />
								)}
							</TooltipTrigger>
							<TooltipContent>
								{feature.ready
									? 'This feature is ready to use.'
									: 'This feature is coming soon!'}
							</TooltipContent>
						</Tooltip>
					</li>
				))}
			</ul>
		</section>
	);
};

export default Features;
