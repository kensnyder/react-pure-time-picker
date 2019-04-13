import React, { useState } from 'react';
import { TimePicker } from './components/TimePicker.js';
import { WhatIsThis } from './components/WhatIsThis.js';

export function App() {
	const [time, setTime] = useState('08:30:42');
	return (
		<section>
			<WhatIsThis />
			<TimePicker time={time} onUpdate={setTime} step={5} />
			<p>Chosen time in 24hr: {time}</p>
		</section>
	);
}
