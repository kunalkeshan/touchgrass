import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function OnePercentStats() {
	return (
		<Card className='mb-4'>
			<CardHeader>
				<CardTitle>1% Daily Graph</CardTitle>
				<CardDescription>
					See how much you have progressed this year with the 1%
					Theory
				</CardDescription>
			</CardHeader>
		</Card>
	);
}
