/*
 *
 * Utilizes: Browser Extension: `Run Javascript`
 * -> https://chrome.google.com/webstore/detail/run-javascript/lmilalhkkdhfieeienjbiicclobibjao
 *
 */

import CursedSentence from './Chat/Sentence/Cursed';

// $(function () {
const widthOfSide: number = 350;
const heightOfSide: number = 250;
let isScrolling: boolean = false;

// Initialize
function init() {
	parseChat();
}

let chatMessageList: JQuery<HTMLElement> = $('div[class*="ChatMessageList"]');
chatMessageList.on('scroll', function () {
	if (!isScrolling) {
		parseChat();
		setTimeout(function () {
			isScrolling = false;
			parseChat();
		}, 250);
		isScrolling = true;
		scrollToTop();
	}
});

function parseChat() {
	let selectors: JQuery<HTMLElement> = $('div[data-e2e="chat-message"]:not(.processed)');
	if (selectors.length > 0) {
		console.log(selectors);
	}

	// Chat Messages
	selectors.each(function () {
		let item: JQuery<HTMLElement> = $(this);
		let child: JQuery<HTMLElement> = $(item.find('[class*="Comment"]'));
		child
			// .filter(function () {
			// 	return this.nodeType === 3;
			// })
			.each(function () {
				let textContent: string = this.textContent;
				let cursedSentence: CursedSentence = new CursedSentence(textContent);
				cursedSentence.sentence = cursedSentence.get();
				if (cursedSentence.sentence.length <= 0) {
					return;
				}

				// Use a regular expression to find words starting with "@"
				let replacedText: string = cursedSentence.sentence
					.replace(/(\@\w+)/g, '<span style="color: #51acff;">$1</span>')
					.replace(
						/(.)*(you got this)(.)*/gi,
						'$1<span style="color: purple;font-weight: bolder; font-size: 30px;display:inline-block;padding:10px;"> $2 </span>$3'
					);

				if (replacedText !== textContent) {
					// Replace the original text content with the modified one containing the <span> elements
					$(this).html(replacedText);
				}

				textContent = replacedText;
			});
		let y: number = $(this).position().top;
		if (y > heightOfSide) {
			child.css('width', '100%');
		} else {
			child.css('width', 'calc(100% - ' + widthOfSide + 'px)');
		}
		$(this).addClass('processed');
	});

	// Social Messages (shared/followed)
	selectors = $('div[data-e2e="social-message"]:not(.processed)');
	selectors.each(function () {
		const item: JQuery<HTMLElement> = $(this);
		let child: JQuery<HTMLElement> = $(item.find('div[data-e2e="social-message-text"]'));
		let y: number = $(this).position().top;
		if (y > heightOfSide) {
			child.css('width', '100%');
		} else {
			child.css('width', 'calc(100% - ' + widthOfSide + 'px - 90px)');
		}
		$(this).addClass('processed');
	});

	// Room Messages (ie: 'Welcome In' Messages from TikTok/Streamer/Creator)
	selectors = $('div[class*="RoomMessage"]:not(.processed)');
	selectors.each(function () {
		const item: JQuery<HTMLElement> = $(this);
		let child: JQuery<HTMLElement> = $(item.find('div[class*="Content"]'));
		let y: number = $(this).position().top;
		if (y > heightOfSide) {
			child.attr('style', '');
		} else {
			child.css('width', 'calc(100% - ' + widthOfSide + 'px - 90px)');
		}
		$(this).addClass('processed');
	});

	// Gifts
	selectors = $('.tiktok-15hhtcj:not(.processed)');
	selectors.each(function () {
		const item: JQuery<HTMLElement> = $(this);
		let child: JQuery<HTMLElement> = $(item.find('div[class*="Comment"]'));
		let y: number = $(this).position().top;
		if (y > heightOfSide) {
			child.css('width', '100%');
		} else {
			child.css('width', 'calc(100% - ' + widthOfSide + 'px)');
		}
		$(this).addClass('processed');
	});
}

function scrollToTop() {
	let chatRoomBody: JQuery<HTMLElement> = $('div[class*="ChatRoomBody"]');
	chatRoomBody.scrollTop(chatRoomBody.height());
}

init();
// });
