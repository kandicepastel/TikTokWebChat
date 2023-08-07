export default class Letter {
	letter: string;
	index: number;

	constructor(letter: string) {
		this.letter = letter;
		this.index = this.alphabeticalIndex();
	}

	alphabeticalIndex = (): number => {
		const letter = this.letter.toLocaleLowerCase();

		let index: number = -1;
		if (letter === 'a') {
			index = 0;
		}
		if (letter === 'b') {
			index = 1;
		}
		if (letter === 'c') {
			index = 2;
		}
		if (letter === 'd') {
			index = 3;
		}
		if (letter === 'e') {
			index = 4;
		}
		if (letter === 'f') {
			index = 5;
		}
		if (letter === 'g') {
			index = 6;
		}
		if (letter === 'h') {
			index = 7;
		}
		if (letter === 'i') {
			index = 8;
		}
		if (letter === 'j') {
			index = 9;
		}
		if (letter === 'k') {
			index = 10;
		}
		if (letter === 'l') {
			index = 11;
		}
		if (letter === 'm') {
			index = 12;
		}
		if (letter === 'n') {
			index = 13;
		}
		if (letter === 'o') {
			index = 14;
		}
		if (letter === 'p') {
			index = 15;
		}
		if (letter === 'q') {
			index = 16;
		}
		if (letter === 'r') {
			index = 17;
		}
		if (letter === 's') {
			index = 18;
		}
		if (letter === 't') {
			index = 19;
		}
		if (letter === 'u') {
			index = 20;
		}
		if (letter === 'v') {
			index = 21;
		}
		if (letter === 'w') {
			index = 22;
		}
		if (letter === 'x') {
			index = 23;
		}
		if (letter === 'y') {
			index = 24;
		}
		if (letter === 'z') {
			index = 25;
		}

		return index;
	};
}
