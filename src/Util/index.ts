export default class Util {
	isNode: boolean;

	constructor(isNode: boolean = false) {
		this.isNode = isNode;
	}

	wordToBase64 = (word: string): string => {
		if (this.isNode) {
			const buffer: Buffer = Buffer.from(word, 'utf-8');
			return buffer.toString('base64');
		}

		const encoder: TextEncoder = new TextEncoder();
		const data: Uint8Array = encoder.encode(word);

		return btoa(String.fromCharCode.apply(null, data));
	};

	base64ToWord = (base64: string): string | undefined => {
		if (this.isNode) {
			const buffer = Buffer.from(base64, 'base64');
			return buffer.toString('utf-8');
		}

		const decoder: TextDecoder = new TextDecoder();
		const data: string = atob(base64);
		if (data.length <= 0) {
			return undefined;
		}

		const uint8Array: Uint8Array = new Uint8Array(data.length);
		var i: number = 0;
		for (i; i < data.length; i++) {
			uint8Array[i] = data.charCodeAt(i);
		}

		return decoder.decode(uint8Array);
	};
}
