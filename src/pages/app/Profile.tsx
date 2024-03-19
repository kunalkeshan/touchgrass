import { lazy } from 'react';
import { useUser, UserButton, SignOutButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
const ExportDataBtn = lazy(
	() => import('@/components/app/profile/ExportDataBtn')
);

const Profile = () => {
	const { user } = useUser();
	return (
		<div>
			<div className='flex items-center justify-between gap-2'>
				<div>
					<h1 className='text-xl lg:text-3xl font-semibold'>
						Profile
					</h1>
					<p className='text-slate-300'>
						View and edit your profile here.
					</p>
				</div>
				<Button asChild variant={'destructive'} size={'sm'}>
					<SignOutButton>Sign Out</SignOutButton>
				</Button>
			</div>
			<div className='w-full mt-8'>
				<section className='flex items-center justify-between'>
					<div>
						<h2 className='font-medium text-base lg:text-2xl'>
							{user?.fullName}
						</h2>
						<p>{user?.primaryEmailAddress?.emailAddress}</p>
					</div>
					<UserButton
						afterSignOutUrl='/'
						afterMultiSessionSingleSignOutUrl='/'
						afterSwitchSessionUrl='/app'
					/>
				</section>
			</div>
			<div className='w-full mt-8'>
				<h2 className='font-medium text-base lg:text-2xl'>
					Account Settings
				</h2>
				<p>Change your account settings here.</p>
				<section className='mt-4'>
					<h3 className='w-full border-b border-b-white text-base lg:text-2xl font-medium'>
						Miscellaneous
					</h3>
					<div className='mt-4 grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-8'>
						<p>
							Download your data associated with this account.
							(Note: Export format is JSON.)
						</p>
						<ExportDataBtn />
					</div>
				</section>
				<section className='mt-4'>
					<h3 className='text-red-500 w-full border-b border-b-red-500 text-base lg:text-2xl font-medium'>
						Danger Zone
					</h3>
					<div className='mt-4 grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-8'>
						<p>
							Delete all habits and associated data. This action
							is irreversible. Coming soon.
						</p>
						<Button
							variant={'destructive'}
							className='w-fit'
							disabled
						>
							Delete All Habits
						</Button>
						<p>
							Delete your account and all associated data. This
							action is irreversible. Coming soon.
						</p>
						<Button
							variant={'destructive'}
							className='w-fit'
							disabled
						>
							Delete Account
						</Button>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Profile;
