import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useUser } from '@clerk/clerk-react';
import { RotateCw } from 'lucide-react';

const ExportDataBtn = () => {
	const [loading, setLoading] = useState(false);

	const { user } = useUser();
	const storeUser = useMutation(api.user.storeUser);
	const exportUserData = useMutation(api.profile.exportUserData);

	const handleExportUserData = async () => {
		setLoading(true);
		try {
			const userId = await storeUser();
			const data = await exportUserData({ userId });
			const userData = {
				_id: userId,
				name: user?.fullName,
				email: user?.primaryEmailAddress?.emailAddress,
				data,
			};
			const dataStr =
				'data:text/json;charset=utf-8,' +
				encodeURIComponent(JSON.stringify(userData));
			const downloadAnchorNode = document.createElement('a');
			downloadAnchorNode.setAttribute('href', dataStr);
			downloadAnchorNode.setAttribute(
				'download',
				`${user?.firstName?.toLowerCase()}-touchgrass-data` + '.json'
			);
			document.body.appendChild(downloadAnchorNode); // required for firefox
			downloadAnchorNode.click();
			downloadAnchorNode.remove();
			toast.success('Data exported successfully!');
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Button
			variant={'secondary'}
			className='w-fit'
			disabled={loading}
			onClick={handleExportUserData}
		>
			{loading ? (
				<RotateCw
					className='animate-spin mr-2'
					size={20}
					strokeWidth={2}
				/>
			) : null}
			Export Data
		</Button>
	);
};

export default ExportDataBtn;
