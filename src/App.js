import React, { useEffect, useRef } from 'react';
import AnimatedCursor from 'react-animated-cursor';
import useWindowSize from './hooks/useWindowSize';
import './App.scss';

import images from './images/images';
import Image from './components/Image';

function App() {
	const size = useWindowSize();
	const appContainer = useRef();
	const scrollContainer = useRef();

	useEffect(() => {
		document.body.style.height = scrollContainer.current.getBoundingClientRect().height + 'px';
	}, [size.height]);

	useEffect(() => {
		requestAnimationFrame(() => smoothScrolling());

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const scrollConfigs = {
		ease: 0.1,
		current: 0,
		previous: 0,
		rounded: 0,
	};

	const smoothScrolling = () => {
		scrollConfigs.current = window.scrollY;
		scrollConfigs.previous += (scrollConfigs.current - scrollConfigs.previous) * scrollConfigs.ease;
		scrollConfigs.rounded = Math.round(scrollConfigs.previous * 100) / 100;

		// Variables
		const difference = scrollConfigs.current - scrollConfigs.rounded;
		const acceleration = difference / size.width;
		const velocity = +acceleration;
		const skew = velocity * 7.5;

		scrollContainer.current.style.transform = `translate3d(0, -${scrollConfigs.rounded}px, 0)  skewY(${skew}deg)`;

		requestAnimationFrame(() => smoothScrolling());
	};

	return (
		<div className="App" ref={appContainer}>
			<AnimatedCursor
				innerSize={8}
				outerSize={30}
				color="0,0,0"
				outerAlpha={0.2}
				innerScale={0.7}
				outerScale={3}
			/>

			<div className="scroll" ref={scrollContainer}>
				{images.map((image, index) => (
					<React.Fragment key={image + index}>
						<h2>
							Skew <span className="outline">Scrolling</span>
						</h2>
						<Image index={index} image={image} />
					</React.Fragment>
				))}
			</div>
		</div>
	);
}

export default App;
