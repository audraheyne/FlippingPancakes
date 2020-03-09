/*
 * Returns a color string in the HSL format. The colors are all shades/values
 * of the hue 30, which is a brownish color. The lightness depends on the 
 * value variable. Values very close to minValue will be dark, while values 
 * very close to maxValue will be light.
 */
function getColor(value, minValue, maxValue) {
	let h = 30;
	let s = 45;
	let l = (value - minValue) / (maxValue - minValue) * (maxValue - minValue) + 15;

	let color = "hsl(" + h + ", " + s + "%, " + l + "%)";
	return color;
}

/*
 * this function displays the array to the screen
 * note that the max element is at most the (length of arr * 2) + 1
 */
function showArray(arr, parentID) {
	if (arr.length == 0) return;
	// find the max element in the array
	let max = arr.reduce(function (a, b) {
		return Math.max(a, b);
	});
	// get the number of cells wide that the display table will be
	let cellsWide = max + 4;
	// create a table to display our pancakes
	let $displayTable = $('<table class="displaySort"></table>');
	// set the width proportional to the size of the array
	$displayTable.width(cellsWide * 7 + 'px');
	// loop through each row in the table
	for (let i = 0; i < arr.length; i++) {
		// create a row in the table
		let $tableRow = $('<tr></tr>')
			// get the color of the row
		let rowColor = getColor(arr[i], 1, cellsWide);
		// generate the table's cells
		for (let j = 0; j < cellsWide; j++) {
			// create the cell
			let $cell = $('<td>&nbsp;</td>')
				// colorize the cell
			if (j > (cellsWide - arr[i]) / 2 && j < cellsWide - (cellsWide - arr[i]) / 2) {
				$cell.css('background', rowColor);
			}
			$tableRow.append($cell);
		}
		// add the row to the table
		$displayTable.append($tableRow);
	}
	// add the decorative blue china plate
	$displayTable.append('<tr><td class="plate" colspan="' + cellsWide + '"> </td></tr>');
	$displayTable.append('<tr>\
							<td colspan="3"> </td>\
							<td class="plate" colspan="' + (cellsWide - 6) + '"> </td>\
							<td colspan="3"> </td>\
						</tr>');
	$displayTable.append('<tr>\
							<td colspan="6"> </td>\
							<td class="plate" colspan="' + (cellsWide - 12) + '"> </td>\
							<td colspan="6"> </td>\
						</tr>');
	// get the parent div
	let $parentDiv = $('#' + parentID);
	// what does this line of code do? left as an exercise.
	$parentDiv.html('');
	// append the table to the parent div
	$parentDiv.append($displayTable);
}

/*
 * This is the "main" method, the method that will set the random array
 * creation and sorting into motion.
 */
$(document).ready(function () {
	// generate and display random stack of pancakes
	let unsorted = generateRandomArray(35);
	showArray(unsorted, 'unsortedArray');

	// arrange the pancakes and display the result
	let sorted = arrangePancakes(unsorted);;
	showArray(sorted, 'sortedArray');
});
