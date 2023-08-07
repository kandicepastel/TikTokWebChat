import Word from '../Word';

export default class Spice extends Word {
	isSpice: boolean = false;

	decorate = (word: string, html: string, substitution: string = '*'): string => {
		this.isSpice = true;

		const regex: RegExp = new RegExp(word, 'gi');
		this.word = this.word.replace(regex, (match) => substitution.repeat(match.length));

		if (html !== undefined) {
			this.word = html.replace(substitution, this.word);
		}

		return this.word;
	};

	containsSpice = (): boolean => this.isSpice;
}
