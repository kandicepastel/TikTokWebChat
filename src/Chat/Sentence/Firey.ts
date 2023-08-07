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
		['WVc1MWN3PT0=', 'WVhOeg=='],
		['WW1sMFkyZz0=', 'WW14dmR3PT0=', 'WW05bVpnPT0=', 'WW5KbFlYTjA=', 'WW5WMGRBPT0='],
		['WTI5amF3PT0=', 'WTJ4cGRBPT0=', 'WTNWdA==', 'WTNWdWRBPT0='],
		['WkdGdGJnPT0=', 'WkdsamF3PT0=', 'Wkdsc1pHOD0=', 'WkhsclpRPT0='],
		['Wlc1bGJXRT0='],
		['Wm1Gbg==', 'Wm1GeWRBPT0=', 'Wm5WamF3PT0='],
		['WjJGNQ=='],
		[''],
		['YVc1cWRXND0='],
		['YW1GamEyOW1aZz09', 'YW1WeWF3PT0=', 'YW1sNmVnPT0='],
		['YTI1bFpRPT0=', 'YTI1dllnPT0='],
		[''],
		[''],
		['Ym1sbloyVnk='],
		['YjNKbllYTnQ=', 'YjNKbmVRPT0='],
		['Y0dWbA==', 'Y0dWdWRYTT0=', 'Y0hWemMzaz0='],
		['Y1hWbFpYST0=', 'Y1hWbFpXWT0='],
		['Y21WMFlYSms=', 'Y21WamRIVnQ='],
		['YzJ0aGJtcz0=', 'YzJocGRBPT0=', 'YzJ4MWRBPT0=', 'YzNWamF3PT0='],
		['ZEdsMA==', 'ZEhWeVpBPT0='],
		[''],
		['ZG1GbmFXNWg=', 'ZG5Wc2RtRT0='],
		['ZDJGdw==', 'ZDJWMFltRmphdz09', 'ZDJodmNtVT0='],
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
