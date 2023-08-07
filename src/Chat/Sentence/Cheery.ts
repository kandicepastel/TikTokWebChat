import Util from '../../Util';
import Sentence from '../Sentence';
import Cheer from './Word/Cheer';

let util: Util = new Util();

export default class CheerySentence extends Sentence {
	html: string =
		"$1<span style='color: purple;font-weight: bolder; font-size: 30px;display:inline-block;padding:10px;'> &#x1F389; $2 &#x1F389;</span>$3";
	blurAmount = 1;
	list: string[][] = [
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		[''],
		['eW91IGdvdCB0aGlz'],
		[''],
	];

	words: Cheer[] = [];

	constructor(sentence: string) {
		super(sentence);

		this.checkForCheers();
	}

	checkForCheers = (): void => {
		this.words.forEach((word) => {
			if (word.firstLetter === undefined) {
				return;
			}
			if (word.firstLetter.index === -1) {
				return;
			}

			// Create: List: Possible Cheers (`possibleCheers`)
			let possibleCheers: string[] | undefined = this.list[word.firstLetter.index];
			if (possibleCheers === undefined) {
				return;
			}

			// Scan: For: Possible Cheers
			if (possibleCheers.length > 0) {
				possibleCheers.forEach((possibleCheer) => {
					possibleCheer = util.base64ToWord(possibleCheer) ?? '';
					if (word.word.includes(possibleCheer)) {
						word.decorate(possibleCheer, this.html);
					}
				});
			}
		});
	};
}
