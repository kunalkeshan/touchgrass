import Demo from '@/components/landing/Demo';
import { Link } from 'react-router-dom';

const Info = () => {
	const TOUCHGRASS_SOCIALS = [
		{
			title: 'instagram',
			link: 'https://instagram.com/tchgrsscom',
		},
		{
			title: 'twitter',
			link: 'https://twitter.com/tchgrsscom',
		},
		{
			title: 'linkedin',
			link: 'https://linkedin.com/company/tchgrsscom',
		},
		{
			title: 'youtube',
			link: 'https://youtube.com/@tchgrsscom',
		},
	];

	return (
		<div className='p-4 md:p-16 bg-[url(/images/bg-lines.png)] min-h-[60vh]'>
			<div className='w-full max-w-3xl 2xl:max-w-5xl mx-auto'>
				<h1 className='text-2xl lg:text-4xl text-center font-bold'>
					Important Update: touchgrass Migration
				</h1>
				<p className='text-slate-300 mt-8'>
					Dear touchgrass community,
				</p>
				<div className='mt-8 [&>h2]:text-lg [&>h2]:lg:text-2xl [&>h2]:font-semibold [&>p]:mt-2 [&>h2]:mt-4 [&>p]:text-base [&>p]:lg:text-lg'>
					<h2>Temporary Shutdown Notice</h2>
					<p>
						We wanted to give you a heads-up that touchgrass will be
						temporarily unavailable as we gear up for an exciting
						transition to a full-fledged product. During this time,
						the app won't be accessible for an indefinite period as
						we work on migrating to bring you a better experience.
						Stay tuned for updates on our project timeline!
					</p>
					<h2>Data Migration Details</h2>
					<p>
						We understand that this change may affect users who have
						accounts and data stored in the app. Unfortunately, your
						data from the current app won't carry over to the new
						version. We're truly sorry for any inconvenience this
						may cause, but we promise the new app will offer a
						much-improved experience!
					</p>
					<h2>Why the Migration?</h2>
					<p>
						The reason behind this move is to ensure a smoother user
						experience. The current tech setup we're using for data
						storage and authentication isn't very flexible or
						customizable. This makes it tricky to access and manage
						your data effectively within the app. We're making this
						change to make things easier and more user-friendly for
						you!
					</p>
					<h2>What's Coming Next?</h2>
					<p>
						As part of the migration, we're planning to launch a web
						app, an Android app, and an iOS application. This means
						you'll be able to access touchgrass seamlessly across
						multiple devices with just one account. One account,
						multiple devices - how cool is that?
					</p>
					<h2>Apology & Data Security</h2>
					<p>
						We want to sincerely apologize to all our active users
						for any inconvenience caused by this transition. Rest
						assured, we've scrubbed and deleted all data completely
						to protect your privacy and security. Your trust means
						everything to us!
					</p>
					<h2>Stay Connected</h2>
					<p>
						If you loved what touchgrass offered and want to keep up
						with our progress, feel free to reach out! We'd love to{' '}
						stay connected with us on our{' '}
						{TOUCHGRASS_SOCIALS.map((social) => (
							<Link
								to={social.link}
								key={social.title + '-touchgrass'}
								target='_blank'
								className='underline text-green-500 hover:text-opacity-80 trasnition-all duration-300'
							>
								{social.title},
							</Link>
						))}{' '}
						and keep you in the loop as we work on bringing you an
						even better touchgrass experience.
					</p>
					<p>
						Thank you for being part of our community and for your
						understanding during this exciting time of change.
					</p>
					<p>Warm regards, Team @ touchgrass</p>
				</div>
				<Demo videoId='7QmytB9sTEo' />
			</div>
		</div>
	);
};

export default Info;
