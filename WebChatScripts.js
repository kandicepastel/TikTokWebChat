/*
  Uses: Run Javascript Browser Extension
*/
class Util {
	wordToBase64(word) {
		// const buffer = new Buffer.from(word, "utf-8");
		// return buffer.toString("base64");
		const encoder = new TextEncoder();
		const data = encoder.encode(word);
		return btoa(String.fromCharCode.apply(null, data));
	}

	base64ToWord(base64) {
		// const buffer = new Buffer.from(base64, "base64");
		// return buffer.toString("utf-8");
		const decoder = new TextDecoder();
		const data = atob(base64);
		const uint8Array = new Uint8Array(data.length);
		for (let i = 0; i < data.length; i++) {
			uint8Array[i] = data.charCodeAt(i);
		}
		return decoder.decode(uint8Array);
	}
}

const util = new Util();

class Sentence {
	constructor(sentence) {
		this.words = [];
		this.sentence = sentence;
		this.getWords();
	}

	getWords(seperator = " ") {
		const words = this.sentence
			.split(seperator)
			.filter((word) => word.trim() !== "");
		words.forEach((word) => {
			this.words.push(new Word(word));
		});
		return this.words;
	}
}

class Word {
	constructor(word) {
		this.letters = [];
		this.isCurse = false;
		this.curse = "";
		this.word = word;
		this.firstLetter = this.getFirstLetter();
	}

	getLetters() {
		Array.from(this.word).forEach((letter) => {
			this.letters.push(new Letter(letter));
		});
		return this.letters;
	}

	getFirstLetter() {
		if (this.letters.length <= 0) {
			this.getLetters();
		}
		return this.letters[0];
	}

	containsCurse() {
		return false;
	}

	clean(curse, html = null, substitution = "*") {
		this.curse = curse;
		this.isCurse = true;
		const regex = new RegExp(curse, "gi");
		this.word = this.word.replace(regex, (match) => {
			return substitution.repeat(match.length);
		});
		if (html != null) {
			this.word = html.replace(substitution, this.word);
		}
		return this.word;
	}
}

class Letter {
	constructor(letter) {
		this.letter = letter;
		this.index = this.alphabeticalIndex();
	}

	alphabeticalIndex() {
		const letter = this.letter.toLocaleLowerCase();
		let index = -1;
		if (letter == "a") index = 0;
		if (letter == "b") index = 1;
		if (letter == "c") index = 2;
		if (letter == "d") index = 3;
		if (letter == "e") index = 4;
		if (letter == "f") index = 5;
		if (letter == "g") index = 6;
		if (letter == "h") index = 7;
		if (letter == "i") index = 8;
		if (letter == "j") index = 9;
		if (letter == "k") index = 10;
		if (letter == "l") index = 11;
		if (letter == "m") index = 12;
		if (letter == "n") index = 13;
		if (letter == "o") index = 14;
		if (letter == "p") index = 15;
		if (letter == "q") index = 16;
		if (letter == "r") index = 17;
		if (letter == "s") index = 18;
		if (letter == "t") index = 19;
		if (letter == "u") index = 20;
		if (letter == "v") index = 21;
		if (letter == "w") index = 22;
		if (letter == "x") index = 23;
		if (letter == "y") index = 24;
		if (letter == "z") index = 25;
		return index;
	}
}

class CursedSentence extends Sentence {
	constructor(sentence) {
		super(sentence);
		this.curses = [
			["YW51cw==", "YXNz"],
			["Yml0Y2g=", "Ymxvdw==", "Ym9mZg==", "YnJlYXN0", "YnV0dA=="],
			["Y29jaw==", "Y2xpdA==", "Y3Vt", "Y3VudA=="],
			["ZGFtbg==", "ZGljaw==", "ZGlsZG8=", "ZHlrZQ=="],
			["ZW5lbWE="],
			["ZmFn", "ZmFydA==", "ZnVjaw=="],
			["Z2F5"],
			[],
			["aW5qdW4="],
			["amFja29mZg==", "amVyaw==", "aml6eg=="],
			["a25lZQ==", "a25vYg=="],
			[],
			[],
			["bmlnZ2Vy"],
			["b3JnYXNt", "b3JneQ=="],
			["cGVl", "cGVudXM=", "cHVzc3k="],
			["cXVlZXI=", "cXVlZWY="],
			["cmV0YXJk", "cmVjdHVt"],
			["c2thbms=", "c2hpdA==", "c2x1dA==", "c3Vjaw=="],
			["dGl0", "dHVyZA=="],
			["dmFnaW5h", "dnVsdmE="],
			["d2Fw", "d2V0YmFjaw==", "d2hvcmU="],
			[],
			[],
			[],
		];
		this.characterMappings = {
			a: ["o", "er", "4", "2"],
			aw: ["o"],
			c: ["ck", "k", "x"],
			ck: ["c", "k", "x"],
			e: ["3"],
			ee: ["ei"],
			er: ["a"],
			f: ["ph"],
			h: ["wh", "#"],
			i: ["1", "!"],
			k: ["c", "ck", "x"],
			l: ["1"],
			o: ["a", "aw", "0"],
			s: ["z"],
			se: ["sy"],
			see: ["sy"],
			sy: ["se", "see"],
			t: ["7", "+"],
			u: ["w"],
			w: ["u"],
			wh: ["h"],
			x: ["c", "ck", "k"],
			z: ["s"],
			0: ["o"],
			1: ["i", "l"],
			3: ["e"],
			4: ["a"],
			7: ["t"],
			"!": ["i"],
			"+": ["t"],
		};
		this.getWordVariations();
	}

	getWordVariations() {
		this.words.forEach((word) => {
			if (word.firstLetter.index == -1) return;
			const possibleCurses = this.curses[word.firstLetter.index];
			if (possibleCurses.length > 0) {
				possibleCurses.forEach((possibleCurse) => {
					possibleCurse = util.base64ToWord(possibleCurse);
					if (word.word.includes(possibleCurse)) {
						word.clean(possibleCurse, "<span style='color: red;'>*</span>");
					}
				});
			}
		});
	}

	getCleaned(seperator = " ") {
		let cleanedSentence = "";
		this.words.forEach((word, index) => {
			cleanedSentence += word.word;
			if (index < this.words.length - 1) {
				cleanedSentence += seperator;
			}
		});
		return cleanedSentence;
	}
}

$(document).ready(function () {
	const widthOfSide = 350;
	const heightOfSide = 250;
	let isScrolling = false;

	$(".tiktok-1c9cfuz-DivChatMessageList").on("scroll", function () {
		if (!isScrolling) {
			runMe();
			setTimeout(function () {
				isScrolling = false;
				runMe();
			}, 250);
			isScrolling = true;
		}
	});

	function runMe() {
		const selectors = $('div[data-e2e="chat-message"]');
		selectors.each(function () {
			const item = $(this);
			const child = item.find(".tiktok-1kue6t3-DivComment");
			child.each(function () {
				const textContent = this.textContent;
				const sentence = new CursedSentence(textContent);
				sentence.sentence = sentence.getCleaned();
				const replacedText = sentence.sentence
					.replace(/(\@\w+)/g, '<span style="color: #51acff;">$1</span>')
					.replace(/(.)*(rawr)(.)*/gi, "$1🦖$3")
					.replace(
						/(.)*(you got this)(.)*/gi,
						'$1<span style="color: purple;font-weight: bolder; font-size: 30px;display:inline-block;padding:10px;"> 🎉 $2 🎉 </span>$3'
					);
				if (replacedText !== textContent) {
					$(this).html(replacedText);
				}
			});
			const y = item.position().top;
			if (y > heightOfSide) {
				child.css("width", "100%");
			} else {
				child.css("width", "calc(100% - " + widthOfSide + "px)");
			}
		});

		// div[data-e2e="social-message"]
		var socialMessageDivs = document.querySelectorAll(
			'div[data-e2e="social-message"]'
		);
		socialMessageDivs.forEach(function (socialMessageDiv) {
			var item = $(socialMessageDiv);
			var child = item.find('[data-e2e="social-message-text"]');
			var y = item.position().top;
			if (y > heightOfSide) {
				child.css("width", "100%");
			} else {
				child.css("width", "calc(100% - " + widthOfSide + "px - 90px)");
			}
		});

		// .tiktok-1ofcoff-DivRoomMessage
		var roomMessageDivs = document.querySelectorAll(
			".tiktok-1ofcoff-DivRoomMessage"
		);
		roomMessageDivs.forEach(function (roomMessageDiv) {
			var item = $(roomMessageDiv);
			var child = item.find(".tiktok-1bvufdu-DivContent");
			var y = item.position().top;
			if (y > heightOfSide) {
				child.attr("style", "");
			} else {
				child.css("width", "calc(100% - " + widthOfSide + "px - 90px)");
			}
		});

		// .tiktok-15hhtcj
		var tiktokDivs = document.querySelectorAll(".tiktok-15hhtcj");
		tiktokDivs.forEach(function (tiktokDiv) {
			var item = $(tiktokDiv);
			var child = item.find(".tiktok-1kue6t3-DivComment");
			var y = item.position().top;
			if (y > heightOfSide) {
				child.css("width", "100%");
			} else {
				child.css("width", "calc(100% - " + widthOfSide + "px)");
			}
		});

		// Scroll to the bottom
		$(".tiktok-rykcaj-DivChatRoomBody").scrollTop(
			$(".tiktok-rykcaj-DivChatRoomBody").height()
		);
	}

	// Run the initial setup
	runMe();
});

