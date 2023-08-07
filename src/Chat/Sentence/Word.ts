import Letter from './Word/Letter';

export default class Word {
	word: string;

	letters: Letter[] = [];
	firstLetter: Letter | undefined;

	constructor(word: string) {
		this.word = word;

		this.firstLetter = this.getFirstLetter();
	}

	getLetters = (): Letter[] => {
		this.letters = [];

		[...this.word].forEach((letter) => {
			this.letters.push(new Letter(letter));
		});

		return this.letters;
	};

	getFirstLetter = (): Letter | undefined => {
		if (this.letters.length <= 0) {
			this.getLetters();
		}

		return this.letters[0] ?? undefined;
	};
}
