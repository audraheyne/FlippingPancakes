/*
 * This function shuffles an array into a random order.
 */
function shuffle(a) {
	for (let i = a.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[a[i - 1], a[j]] = [a[j], a[i - 1]];
	}
}

/*
 * This function generates an array of shuffled odd integers of length n,
 * with values from 1 to n.
 */
function generateRandomArray(n) {
	a = [...Array(n + 1).keys()].slice(1, n + 1);
	for (let i = 0; i < a.length; i++) {
		a[i] = a[i] * 2 + 1;
	}
	shuffle(a);
	return a;
}

/*
 * Performs a flip operation, with the element at the provided index as the bottom
 * of the flipped pile. The flip operation is performed in place (the original 
 * array is modified), but the array is returned to the user for convenience.
 */
function flip(arr, flipIndex) {
	for (let i = flipIndex; i > Math.floor(flipIndex / 2); i--) {
		let temp = arr[i];
		arr[i] = arr[flipIndex - i];
		arr[flipIndex - i] = temp;
	}
	return arr;
}

/*
 * Flips groups of pancakes such that, when the function returns, every pancake
 * is smaller than the pancake below it. Assume the top pancake has index 0.
 * The arrange operation is performed in place (the original array is modified), 
 * but the array is returned to the user for convenience.
 */
function arrangePancakes(arr) {
	let numSorted = 0;
	while (numSorted < arr.length) {
		let queue = arr.slice(0, arr.length - numSorted);
		let biggest = 0;
		let i;
		let bigIndex = 0;
		for (i = 0; i < queue.length; i++) {
			if (queue[i] > biggest) {
				biggest = queue[i];
				bigIndex = i;
			}
		}
		flip(arr, bigIndex);
		flip(arr, arr.length - numSorted - 1);
		++numSorted;
	}
	return arr;
}
