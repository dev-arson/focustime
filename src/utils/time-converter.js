export const minutesToMilis = (minutes) => minutes * 60 * 1000;

export const formatTime = (time) => {
	const minute = Math.floor(time / 1000 / 60) % 60;
	const seconds = Math.floor(time / 1000) % 60;
	return `${String(minute)?.padStart(1, '0')}:${String(seconds)?.padStart(2, '0')}`
}