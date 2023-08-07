import Word from '../Word';

export default class Curse extends Word {
	isCurse: boolean = false;

	decorate = (curse: string, html: string, substitution: string = '*'): string => {
		this.isCurse = true;

		const regex: RegExp = new RegExp(curse, 'gi');
		this.word = this.word.replace(regex, (match) => substitution.repeat(match.length));

		if (html !== undefined) {
			this.word = html.replace(substitution, this.word);
		}

		return this.word;
	};

	containsCurse = (): boolean => this.isCurse;
}
