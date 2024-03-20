const Demo = () => {
	return (
		<section className='p-4 md:p-16'>
			<div className='w-full max-w-5xl 2xl:max-w-7xl mx-auto'>
				<div className='aspect-video max-w-3xl mx-auto'>
					<iframe
						className='w-full h-full'
						src='https://www.youtube.com/watch?v=xcxlq-u_PiM'
						title='YouTube video player'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						allowFullScreen
					></iframe>
				</div>
			</div>
		</section>
	);
};

export default Demo;
