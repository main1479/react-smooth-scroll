import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import useOnScreen from '../hooks/useOnScreen';

export default function Image({ index, image }) {
	const ref = useRef(null);
	const onScreen = useOnScreen(ref);
	useEffect(() => {
		if (onScreen) {
			const tl = gsap.timeline();
			tl.to('.img-container', 0, {
				css: { visibility: 'visible' },
			});
			tl.to('.reveal.is-reveal', 1.4, { width: '0%', ease: 'Power2.easeInOut' }).to(
				'.img-container.is-reveal img',
				1.4,
				{
					scale: 1,
					ease: 'Power2.easeInOut',
					delay: -1,
				}
			);
		}
	}, [onScreen]);
	return (
		<div key={index} className={onScreen ? 'img-container is-reveal' : 'img-container'} ref={ref}>
			<div className={onScreen ? 'reveal is-reveal' : 'reveal'}>&nbsp;</div>
			<img src={image} alt={`people ${index}`} />
		</div>
	);
}
