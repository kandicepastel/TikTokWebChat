import Util from '../../Util';
import Sentence from '../Sentence';
import Cheer from './Word/Cheer';

let util: Util = new Util();

export default class CheeredSentence extends Sentence {
	html: string =
		"$1<span style='color: purple;font-weight: bolder; font-size: 30px;display:inline-block;padding:10px;'> &#x1F389; $2 &#x1F389;</span>$3";

	listOfCheers: string[][] = [];

	words: Cheer[] = [];

	constructor(sentence: string) {
		super(sentence);

		this.checkForCurses();
	}

	checkForCurses = (): void => {
		this.words.forEach((word) => {
			if (word.firstLetter === undefined) {
				return;
			}
			if (word.firstLetter.index === -1) {
				return;
			}

			// Create: List: Possible Curses (`possibleCurses`)
			let possibleCurses: string[] | undefined =
				this.listOfCheers[word.firstLetter.index];
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
