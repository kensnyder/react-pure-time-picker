import './TimePicker.css';
import React from 'react';
import range from 'lodash.range';
import padStart from 'lodash.padstart';

const zeropad = n => padStart(n, 2, '0');

export function TimePicker({ step, time, onUpdate }) {
	console.log('rendering TimePicker: time=', time);
	let { hour, minute, second, meridian } = parseTime(time);

	return (
		<div className="Component TimePicker">
			<select value={hour} onChange={onHourChange} className="hour">
				{range(1, 13).map(h => (
					<option key={h} value={h}>
						{h}
					</option>
				))}
			</select>
			<span className="colon">:</span>
			<select value={minute} onChange={onMinuteChange} className="minute">
				{range(0, 60, step).map(m => (
					<option key={m} value={m}>
						{zeropad(m)}
					</option>
				))}
			</select>
			<select
				value={meridian}
				onChange={onMeridianChange}
				className="meridian"
			>
				{['am', 'pm'].map(m => (
					<option key={m} value={m}>
						{m}
					</option>
				))}
			</select>
		</div>
	);

	function parseTime(time) {
		let [hour, minute, second] = time.split(':');
		hour = parseFloat(hour);
		minute = parseFloat(minute);
		second = parseFloat(second);
		const meridian = hour >= 12 ? 'pm' : 'am';
		if (hour === 0) {
			hour = 12;
		}
		if (hour > 12) {
			hour -= 12;
		}
		// round down to the nearest step if needed
		const remainder = minute % step;
		if (remainder > 0) {
			minute -= remainder;
		}
		return { hour, minute, second, meridian };
	}

	function emitTime24() {
		let hour24 = parseFloat(hour);
		if (meridian === 'pm' && hour24 < 12) {
			hour24 += 12;
		} else if (meridian === 'am' && hour24 === 12) {
			hour24 = 0;
		}
		const time24 = [hour24, minute, second].map(zeropad).join(':');
		onUpdate(time24);
	}

	function onHourChange(event) {
		hour = parseFloat(event.target.value);
		emitTime24();
	}

	function onMinuteChange(event) {
		minute = parseFloat(event.target.value);
		emitTime24();
	}

	function onMeridianChange(event) {
		meridian = event.target.value;
		emitTime24();
	}
}
