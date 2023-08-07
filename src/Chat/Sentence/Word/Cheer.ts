import Word from '../Word';

export default class Cheer extends Word {
	isCheer: boolean = false;

	decorate = (curse: string, html: string, substitution: string = '*'): string => {
		this.isCheer = true;

		const regex: RegExp = new RegExp(curse, 'gi');
		this.word = this.word.replace(regex, (match) => substitution.repeat(match.length));

		if (html !== undefined) {
			this.word = html.replace(substitution, this.word);
		}

		return this.word;
	};

	containsCheer = (): boolean => this.isCheer;
}
