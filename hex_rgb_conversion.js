// Question 3: 
// Write a function that converts HEX to RGB. 
// Then Make that function auto-dect the formats so that if you enter HEX color format it returns RGB 
// and if you enter RGB color format it returns HEX.


const convertColorFormat = ((...color) => {

	let remainders = [];
	let converted = [];

	const hexSymbols = ['a', 'b', 'c', 'd', 'e', 'f'];

	// I iterate over color array which might look like this ['f', 'f', '4', '5', '8', 'c'], 
	// and check if any element equals to one of the hex characters in hexSymbols
	// If yes I add 0 to trackers array which is declared in hex conversion block, 
	// if not I add a 1 to trackers
	// Resulting in this: ['f', 'f', '4', '5', '8', 'c'] --> [0, 0, 1, 1, 1, 0]
	// It helps me determine at which index position in color array is an alphabet string ('f') or number as string ('2')
	// that can be converted to integer 
	// If there is for instance 'f', I iterate over hexSymbols array, 'f' is at index 5 so I add 10 and get decimal value of 15

	// Then to do the final calculations I iterate over trackers array where the converter() function is called
	// During this iteration over trackers I check the index counter to separate each RGB pair
	// So if tracker index < 2 I calcualte the first pair, then tracker index > 1 && < 4 and then the last pair
	// If theres a 0 I know it's an alphabet char and I do the calculation to convert it to decimal value (and vice versa)
	// I convert each pair from input array ['f', 'f', '4', '5', '8', 'c'] meaning ff, 45, 8c to create 3 rgb values

	// converter() gets called in the HEX to decimal conversion block
	const converter = ((trackerNum, trackerIndex) => {
		if (trackerNum === 0) {
			hexSymbols.forEach((sym, in2) => {
				if (color[trackerIndex] === sym) {
					// to determine which exponent (16 to exp) to use
					// if trackerIndex is even number then exp is 0 (and I know that 16**0 = 1)
					if (trackerIndex % 2 === 0) {
						let decNum = (in2 + 10) * (16 ** 1);
						converted.push(decNum);
					} else {
						let decNum = (in2 + 10) * (16 ** 0);
						converted.push(decNum);
					}
				}
			})
		} else {
			if (trackerIndex % 2 === 0) {
				let toNum = parseInt(color[trackerIndex]);
				let num = toNum * (16 ** 1);
				converted.push(num);
			} else {
				let toNum = parseInt(color[trackerIndex]);
				let num = toNum * (16 ** 0);
				converted.push(num);
			}
		}
	})

	//******************* Conversion from deciaml to HEX *******************

	if (typeof color[0] === "number") {


		// 1) num % 16 = remainder ---> quotient = (num - remainder)/16
		// 2) quotient % 16 = remainder ---> quotient = (quotient - remainder)/16
		// 3) quotient % 16 = remainder
		// at this point I have my remainders

		// if decimal num is 255:
		// 1) 255%16 = 15 //////  quotient: (255-15)/16 = 15   
		// 2) 15 % 16 = 15 /////// quotient: (15-15)/16 = 0     
		// 3) 0 % 16 = 0 /////////
		// remainders in reverse  0,15,15
		// resulting hex num is FF


		color.forEach(num => {


			let figures = String(num).length


			let remainder = 0;
			let quotient = 0;

			// step 1
			remainder = num % 16;
			remainders.push(remainder);
			quotient = (num - remainder) / 16;

			// step 2
			remainder = quotient % 16;
			remainders.push(remainder);
			quotient = (quotient - remainder) / 16;

			//step 3
			remainder = quotient % 16;
			remainders.push(remainder);

			remainders.reverse();

			// convert remainders to HEX
			remainders.forEach(rem => {
				if (rem < 10 && rem !== 0) {
					converted.push(String(rem));
				} else if (rem > 9) {
					// remainder - 10 gives an index position of the hex number in hexSymbols array and therefore the value itself
					// hexSymbols[15-10] = hexSymbols[5] which is 'f' in ['a', 'b', 'c', 'd', 'e', 'f']
					converted.push(hexSymbols[rem - 10]);
				}
			})
			remainders = [];
		})
		return converted.join('');

		//******************* Conversion from HEX to decimal *******************
		// example // 7CF = (7 × 16 exp 2) + (12 × 16 exp 1) + (15 × 16 exp 0)

	} else if (typeof color[0] === "string") {

		color = color[0].split(""); // example result: ['f', 'f', '4', '5', '8', 'c']

		let trackers = [];

		// now I check at what index position in color array ['f', 'f', '4', '5', '8', 'c'] are found alphabet chars and number chars
		// I assign them binary state, 0 for alphabet, 1 for num
		color.forEach((col, i) => {
			hexSymbols.forEach((sym, i2) => {
				if (col === sym) {
					trackers.push(0);
				}
			})
			if (trackers.length !== i + 1) {
				trackers.push(1);
			}
		})

		// now I know at what position in color array is what
		// if tracker[i] = 0
		// color[i] = some alphabet value from 'a' to 'f', now I need to find out which one 
		// I use hexSymbols array ['a', 'b', 'c', 'd', 'e', 'f']

		trackers.forEach((tracker, in1) => {
			// to convert just 1 pair of hex digits, the another pair etc.
			if (in1 < 2) {
				converter(tracker, in1);
			} else if (in1 > 1 && in1 < 4) {
				converter(tracker, in1);
			} else if (in1 > 3) {
				converter(tracker, in1);
			}
		})
		let rgbValues = [converted[0] + converted[1], converted[2] + converted[3], converted[4] + converted[5]];
		return rgbValues;
	}
})

result = convertColorFormat("ff327b");
console.log(result);















