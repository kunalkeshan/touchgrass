import { Guide } from '@/constants/guides';
import { fetchSingleResource } from '@/lib/guides';
import {
	Link,
	LoaderFunctionArgs,
	redirect,
	useLoaderData,
} from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import footnotes from 'remark-footnotes';
import ReactMarkdown from 'react-markdown';
import Header from '@/components/guides/Header';

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }: LoaderFunctionArgs) {
	try {
		const guide = await fetchSingleResource(params.guideURL ?? '');
		return { guide };
	} catch (error) {
		return redirect('/guides');
	}
}

const IndividualGuide = () => {
	const { guide } = useLoaderData() as { guide: Guide };
	return (
		<article>
			<section className='p-4 md:p-16 bg-[url(/images/bg-lines.png)] min-h-[60vh] w-full'>
				<div className='w-full max-w-5xl mx-auto'>
					<p className='font-heading font-medium text-xl tracking-wide'>
						/
						<Link
							to='/resources'
							className='hover:underline underline-offset-4'
						>
							resources
						</Link>
						/
						<Link
							to='/resources'
							className='hover:underline underline-offset-4'
						>
							{guide.url}
						</Link>
					</p>
					<ReactMarkdown
						children={guide?.body ?? ''}
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						remarkPlugins={[remarkGfm, footnotes]}
						rehypePlugins={[rehypeRaw]}
						className='[&>*]:mt-4 text-lg'
						components={{
							h1: (props) => <Header {...props} data={guide} />,
							h2: ({ children, ...props }) => (
								<h2
									className='text-2xl md:text-3xl font-heading font-bold'
									{...props}
								>
									{children}
								</h2>
							),
							h3: ({ children, ...props }) => (
								<h3
									className='text-xl md:text-2xl font-heading font-bold'
									{...props}
								>
									{children}
								</h3>
							),
							h4: ({ children, ...props }) => (
								<h4
									className='text-lg md:text-xl font-heading font-bold'
									{...props}
								>
									{children}
								</h4>
							),
							img: ({ children, ...props }) => (
								<div className='rounded-xl w-full lg:w-[80%] 2xl:w-[60%] overflow-hidden mx-auto'>
									<img
										className='w-full h-auto object-contain'
										loading='lazy'
										{...props}
									>
										{children}
									</img>
								</div>
							),
							ol: ({ children, ...props }) => (
								<ol
									className='mt-4 [&>*]:mt-4 list-decimal'
									{...props}
								>
									{children}
								</ol>
							),
							ul: ({ children, ...props }) => (
								<ul
									className='mt-4 [&>*]:mt-4 list-disc'
									{...props}
								>
									{children}
								</ul>
							),
							li: ({ children, ...props }) => (
								<li className='ml-4' {...props}>
									{children}
								</li>
							),
							pre: ({ children, ...props }) => (
								<pre
									className='font-mono bg-[#1b1b1b] [&>code]:max-w-[100%] [&>code]:min-w-[100%] text-white rounded-xl px-8 py-4 overflow-x-scroll [&>code]:whitespace-pre [&>code]:box-decoration-clone [&>code]:break-words'
									{...props}
								>
									{children}
								</pre>
							),
							a: ({ children, ...props }) => (
								<a
									className='text-textSecondary underline underline-offset-4 hover:underline-offset-2 text-opacity-80 hover:text-opacity-100 transition-all duration-300'
									{...props}
								>
									{children}
								</a>
							),
						}}
					/>
				</div>
			</section>
		</article>
	);
};

export default IndividualGuide;
