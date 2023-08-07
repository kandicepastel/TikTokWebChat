import Util from '../../Util';
import Sentence from '../Sentence';
import Fire from './Word/Fire';

let util: Util = new Util();

export default class FireySentence extends Sentence {
	turser: string = '*';
	html: string =
		"<span class='firey-word' style='color: red;'>" + this.turser + '</span>';
	blurAmount: number = 2;

	list: string[][] = [
		['WVhOeg=='],
		['WW1sMFkyZz0='],
		['WTI5amF3PT0=', 'WTNWdWRBPT0='],
		['WkdGdGJnPT0=', 'WkdsamF3PT0=', 'WkdsbA==', 'WkhsclpRPT0='],
		[''],
		['Wm1Gbg==', 'Wm5WamF3PT0='],
		['WjJGNQ=='],
		[''],
		['YVc1cWRXND0='],
		['YW1WeWF3PT0='],
		[''],
		[''],
		[''],
		['Ym1sbloyVnk='],
		[''],
		['Y0hWemMzaz0='],
		['Y1hWbFpYST0='],
		['Y21WMFlYSms='],
		['YzJ0aGJtcz0=', 'YzJocGRBPT0=', 'YzJ4MWRBPT0='],
		['ZEdsMA==', 'ZEhWeVpBPT0='],
		[''],
		['ZG1GbmFXNWg=', 'ZG5Wc2RtRT0='],
		['ZDJWMFltRmphdz09', 'ZDJodmNtVT0='],
		[''],
		[''],
		[''],
	];

	words: Fire[] = [];

	constructor(sentence: string) {
		super(sentence);

		this.checkForFires();
	}

	checkForFires = (): void => {
		this.words.forEach((word) => {
			if (word.firstLetter.index === -1) {
				return;
			}

			// Create: List: Possible Fires (`possibleFires`)
			let possibleFires: string[] | undefined = this.list[word.firstLetter.index];
			if (possibleFires === undefined) {
				return;
			}

			// Scan: For: Possible Fires
			if (possibleFires.length > 0) {
				possibleFires.forEach((possibleFire) => {
					possibleFire = util.base64ToWord(possibleFire) ?? '';
					if (word.word.includes(possibleFire)) {
						word.decorate(possibleFire, this.html, this.turser);
					}
				});
			}
		});
	};
}
