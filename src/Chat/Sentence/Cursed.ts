import Util from '../../Util';
import Sentence from '../Sentence';
import Curse from './Word/Curse';

let util: Util = new Util();

export default class CursedSentence extends Sentence {
	html: string = "<span style='color: red;'>*</span>";

	listOfCurses: string[][] = [
		['YW51cw==', 'YXNz'],
		['Yml0Y2g=', 'Ymxvdw==', 'Ym9mZg==', 'YnJlYXN0', 'YnV0dA=='],
		['Y29jaw==', 'Y2xpdA==', 'Y3Vt', 'Y3VudA=='],
		['ZGFtbg==', 'ZGljaw==', 'ZGlsZG8=', 'ZHlrZQ=='],
		['ZW5lbWE='],
		['ZmFn', 'ZmFydA==', 'ZnVjaw=='],
		['Z2F5'],
		[''],
		['aW5qdW4='],
		['amFja29mZg==', 'amVyaw==', 'aml6eg=='],
		['a25lZQ==', 'a25vYg=='],
		[''],
		[''],
		['bmlnZ2Vy'],
		['b3JnYXNt', 'b3JneQ=='],
		['cGVl', 'cGVudXM=', 'cHVzc3k='],
		['cXVlZXI=', 'cXVlZWY='],
		['cmV0YXJk', 'cmVjdHVt'],
		['c2thbms=', 'c2hpdA==', 'c2x1dA==', 'c3Vjaw=='],
		['dGl0', 'dHVyZA=='],
		['dmFnaW5h', 'dnVsdmE='],
		['d2Fw', 'd2V0YmFjaw==', 'd2hvcmU='],
		[''],
		[''],
		[''],
	];

	words: Curse[] = [];

	constructor(sentence: string) {
		super(sentence);

		this.checkForCurses();
	}

	checkForCurses = (): void => {
		this.words.forEach((word) => {
			if (word.firstLetter.index === -1) {
				return;
			}

			// Create: List: Possible Curses (`possibleCurses`)
			let possibleCurses: string[] | undefined =
				this.listOfCurses[word.firstLetter.index];
			if (possibleCurses === undefined) {
				return;
			}

			// Scan: For: Possible Curses
			if (possibleCurses.length > 0) {
				possibleCurses.forEach((possibleCurse) => {
					possibleCurse = util.base64ToWord(possibleCurse) ?? '';
					if (word.word.includes(possibleCurse)) {
						word.decorate(possibleCurse, this.html);
					}
				});
			}
		});
	};
}
