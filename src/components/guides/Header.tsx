import React, { useMemo } from 'react';
import { Copy, Share } from 'lucide-react';
import { calculateReadingTime } from '@/lib/guides';
import { Guide } from '@/constants/guides';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type HeaderProps = React.ComponentProps<'header'> & {
	data: Guide | undefined;
};

const Header: React.FC<HeaderProps> = ({ data, children, ...props }) => {
	const totalReadingTime = calculateReadingTime(data?.body ?? '');

	const shareData = useMemo(() => {
		return {
			url: window.location.href,
			title: data?.title,
			text: data?.description,
		};
	}, [data]);

	const handleSharePost = async () => {
		if (navigator.canShare(shareData)) {
			try {
				await navigator.share(shareData);
			} catch (error) {
				toast.error('Unable to share. Try again later.');
			}
		} else {
			toast.error('Your device cannot share this. Copy the URL!');
		}
	};

	const handleCopyPostLink = async () => {
		if (navigator.clipboard) {
			try {
				await navigator.clipboard.writeText(shareData.url);
				toast.success('Link copied!');
			} catch (error) {
				toast.error('Unable to copy link. Try again later.');
			}
		} else {
			toast.error('Your device cannot copy this. Try manually!');
		}
	};

	return (
		<header className='[&>*]:mt-2 !mb-10' {...props}>
			<h1 className='text-xl lg:text-4xl font-heading font-bold'>
				{children}
			</h1>
			<span className='text-lg font-medium'>
				Written by:{' '}
				<a
					href={data?.author.social}
					title={data?.author.social}
					target='_blank'
					className='text-textSecondary hover:underline underline-offset-4 text-opacity-80 hover:text-opacity-100 transition-all duration-300'
				>
					{data?.author.name}
				</a>{' '}
				•{' '}
			</span>
			<span className='text-lg font-medium'>
				{new Date(data?.published ?? '').toLocaleDateString()} •{' '}
			</span>
			<span className='text-lg font-medium'>
				{totalReadingTime} min read
			</span>
			<div className='w-full border-t gap-2 border-b flex flex-wrap items-center justify-center sm:justify-between py-2 text-sm text-textPrimary transition-all duration-300'>
				<div className='flex items-center gap-2'>
					{data?.tags.map((tag) => (
						<Badge
							title={tag}
							key={`${data.url}-${tag}`}
							variant={'secondary'}
						>
							{tag}
						</Badge>
					))}
				</div>
				<div className='flex items-centerr gap-2'>
					<button
						onClick={handleSharePost}
						className={cn(
							badgeVariants({ variant: 'outline' }),
							'flex items-center gap-2 hover:text-textSecondary transition-all duration-300 text-white border rounded-lg hover:bg-white/20'
						)}
					>
						<Share size={16} strokeWidth={1.25} />
						Share
					</button>
					•
					<button
						onClick={handleCopyPostLink}
						className={cn(
							badgeVariants({ variant: 'outline' }),
							'flex items-center gap-2 hover:text-textSecondary transition-all duration-300 text-white border rounded-lg hover:bg-white/20'
						)}
						title={window.location.href}
					>
						<Copy size={16} strokeWidth={1.25} />
						Copy link
					</button>
				</div>
			</div>
			<div className='max-w-xs mx-auto !mt-8'>
				<img
					src={data?.image}
					alt={data?.title}
					className='w-full h-auto object-cover'
				/>
			</div>
		</header>
	);
};

export default Header;
