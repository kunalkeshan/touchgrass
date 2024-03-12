import { useUser, UserButton, SignOutButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';

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
		</div>
	);
};

export default Profile;
