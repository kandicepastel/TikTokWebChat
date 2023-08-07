import FireySentence from './Chat/Sentence/Firey';
import CheerySentence from './Chat/Sentence/Cheery';
import Util from './Util';

let util: Util = new Util();

let sentence = new FireySentence('exampleSentence');

let blur = (): string[][] => {
	let blurred = sentence.list;
	const blurAmount: number = sentence.blurAmount;

	sentence.list.forEach((words, rowIndex) => {
		if (words.length > 0) {
			words.forEach((word, indexWord) => {
				let text: string = word;
				for (var a = 0; a < blurAmount; a++) {
					text = util.wordToBase64(text) ?? '';
					blurred[rowIndex][indexWord] = text;
				}
			});
		}
	});

	return blurred;
};

let deblur = () => {
	let deblurred = sentence.list;
	const blurAmount: number = sentence.blurAmount;

	sentence.list.forEach((words, rowIndex: number) => {
		if (words) {
			words.forEach((word, indexWord: number) => {
				let text: string = word;
				for (var a = 0; a < blurAmount; a++) {
					text = util.base64ToWord(text) ?? '';
					deblurred[rowIndex][indexWord] = text;
				}
			});
		}
	});

	return deblurred;
};

// console.log(blur());
console.log(deblur());

/*


characterMappings: { [key: string]: string[] } = {
	a: ["o", "er", "4", "2"],
	aw: ["o"],
	c: ["ck", "k", "x"],
	ck: ["c", "k", "x"],
	e: ["3"],
	ee: ["ei"],
	er: ["a"],
	f: ["ph"],
	h: ["wh", "#"],
	i: ["1", "!"],
	k: ["c", "ck", "x"],
	l: ["1"],
	o: ["a", "aw", "0"],
	s: ["z"],
	se: ["sy"],
	see: ["sy"],
	sy: ["se", "see"],
	t: ["7", "+"],
	u: ["w"],
	w: ["u"],
	wh: ["h"],
	x: ["c", "ck", "k"],
	z: ["s"],
	"0": ["o"],
	"1": ["i", "l"],
	"3": ["e"],
	"4": ["a"],
	"7": ["t"],
	"!": ["i"],
	"+": ["t"],
};




*/
