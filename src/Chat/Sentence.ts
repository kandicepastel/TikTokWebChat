import Word from './Sentence/Word';

/*
	Sentence Types:
	 - cheerey
	 - spicy
	 - firey
*/

export default class Sentence {
	sentence: string;

	words: Word[] = [];
	getWords = (): Word[] => this.words;

	constructor(sentence: string) {
		this.sentence = sentence;

		this.findWords();
	}

	findWords = (seperator: string | RegExp = /\w/gi): Word[] => {
		let words: string[] = this.sentence
			.split(seperator)
			// Filter Out: Empty Strings (ie: multiple spaces between words)
			.filter((word) => word.trim() !== '');

		// Empty: Array: `this.words`
		this.words = [];

		words.forEach((word) => {
			this.words.push(new Word(word));
		});

		return this.words;
	};

	get = (seperator: string = ' '): string => {
		this.update(seperator);

		return this.sentence;
	};

	update = (seperator: string = ' '): void => {
		this.words.forEach((word, index) => {
			if (index === 0) {
				this.sentence = word.word;
			} else {
				this.sentence += word.word;
			}
			if (index < this.words.length - 1) {
				this.sentence += seperator;
			}
		});
	};
}
