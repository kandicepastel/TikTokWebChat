import Util from '../../Util';
import Sentence from '../Sentence';
import Spice from './Word/Spice';

let util: Util = new Util();

export default class SpicySentence extends Sentence {
	turser: string = '*';
	html: string =
		"<span class='firey-word' style='color: red;'>" + this.turser + '</span>';
	blurAmount: number = 2;

	list: string[][] = [
		['WVc1MWN3PT0='],
		['WW14dmR3PT0=', 'WW05bVpnPT0=', 'WW5KbFlYTjA=', 'WW5WMGRBPT0='],
		['WTJ4cGRBPT0=', 'WTNWdA=='],
		['WkdWaGRHZz0=', 'Wkdsc1pHOD0='],
		['Wlc1bGJXRT0='],
		['Wm1GeWRBPT0='],
		[''],
		[''],
		[''],
		['YW1GamEyOW1aZz09', 'YW1sNmVnPT0='],
		['YTI1bFpRPT0=', 'YTI1cFptVT0=', 'YTI1cGRtVno=', 'YTI1dllnPT0='],
		[''],
		[''],
		[''],
		['YjNKbllYTnQ=', 'YjNKbmVRPT0='],
		['Y0dWbA==', 'Y0dWdWRYTT0='],
		['Y1hWbFpXWT0='],
		['Y21WamRIVnQ='],
		['YzNSeVlYQT0=', 'YzNWamF3PT0='],
		['ZEdsMA==', 'ZEhWeVpBPT0='],
		[''],
		[''],
		['ZDJGdw=='],
		[''],
		[''],
		[''],
	];

	words: Spice[] = [];

	constructor(sentence: string) {
		super(sentence);

		this.checkForSpices();
	}

	checkForSpices = (): void => {
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
