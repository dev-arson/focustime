export const minutesToMillis = (minutes) => minutes * 60 * 1000;

export const formatTime = (time) => {
	var seconds = Math.floor(time / 1000);
	var minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);

	minutes %= 60;
	seconds %= 60;
	return `${hours > 0 ? String(hours).padEnd(2,':') : ''}${String(minutes)?.padStart(2, '0')}:${String(seconds)?.padStart(2, '0')}`
}
