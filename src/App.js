import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedCursor from 'react-animated-cursor';
import useWindowSize from './hooks/useWindowSize';
import './App.scss';

import images from './images/images';
gsap.registerPlugin(ScrollTrigger);

function App() {
	const size = useWindowSize();
	const appContainer = useRef();
	const scrollContainer = useRef();

	useEffect(() => {
		document.body.style.height = scrollContainer.current.getBoundingClientRect().height + 'px';
	}, [size.height]);

	useEffect(() => {
		requestAnimationFrame(() => smoothScrolling());
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.img-container',
				// toggleActions: 'restart none none reset',
			},
		});

		tl.to('.img-container', 0, {
			css: { visibility: 'visible' },
		});
		tl.to('.reveal', 1.4, { width: '0%', ease: 'Power2.easeInOut' });
		tl.from('.img-container img', 1.4, {
			scale: 1.6,
			ease: 'Power2.easeInOut',
			delay: -1.4,
		});
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
		const skew = velocity * 10.5;

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
						<div key={index} className="img-container">
							<div className="reveal">&nbsp;</div>
							<img src={image} alt={`people ${index}`} />
						</div>
					</React.Fragment>
				))}
			</div>
		</div>
	);
}

export default App;
