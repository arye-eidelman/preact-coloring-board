import { render } from 'preact';

import './style.css';
import ColoringBoard from './ColoringBoard';
import { useState } from 'preact/hooks';

export function App() {
	const [drawing, setDrawing] = useState<Drawing>({
		title: "Drawing 1",
		points: [],
	});

	return (
		<div>
			<ColoringBoard drawing={drawing} setDrawing={setDrawing} />
		</div>
	);
}

render(<App />, document.getElementById('app'));
