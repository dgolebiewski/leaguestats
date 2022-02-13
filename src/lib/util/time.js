export const formatTime = (value) => {
	let sec_num = parseInt(value, 10); // don't forget the second param
	let hours = Math.floor(sec_num / 3600);
	let minutes = Math.floor((sec_num - hours * 3600) / 60);
	let seconds = sec_num - hours * 3600 - minutes * 60;

	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	if (seconds < 10) {
		seconds = '0' + seconds;
	}

	if (hours === 0) {
		return minutes + ':' + seconds;
	}

	if (hours < 10) {
		hours = '0' + hours;
	}

	return hours + ':' + minutes + ':' + seconds;
};

export const formatDate = (value) => {
	const date = new Date(value);

	return date.toLocaleString();
};
