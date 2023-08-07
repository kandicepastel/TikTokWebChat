/*
 *
 * Utilizes: Browser Extension: `Run Javascript`
 * -> https://chrome.google.com/webstore/detail/run-javascript/lmilalhkkdhfieeienjbiicclobibjao
 *
 */

import FireySentence from './Chat/Sentence/Firey';
import SpicySentence from './Chat/Sentence/Spicy';
import CheerySentence from './Chat/Sentence/Cheery';
import Sentence from './Chat/Sentence';

$(function () {
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
			scrollToTop();
			isScrolling = true;
		}
	});

	function parseChat() {
		let selectors: JQuery<HTMLElement>;

		// Chat Messages
		selectors = $('div[data-e2e="chat-message"]:not(.processed)');
		selectors.each(function () {
			let item: JQuery<HTMLElement> = $(this);
			let child: JQuery<HTMLElement> = $(item.find('[class*="Comment"]'));
			child
				.filter(function () {
					return this.nodeType === Node.ELEMENT_NODE;
				})
				.each(function () {
					let textContent: string = this.textContent;

					// No need to process if no content exists
					if (textContent.length <= 0) {
						return;
					}

					// Extinguish: Fires
					let sentence: Sentence | FireySentence | SpicySentence | CheerySentence =
						new FireySentence(textContent);
					sentence.update();

					// Sweeten: Spices
					sentence = new SpicySentence(sentence.sentence);
					sentence.update();

					// Megaphone: Cheers
					sentence = new CheerySentence(sentence.sentence);
					sentence.update();

					// Highlight: Creators
					if (sentence.sentence.indexOf('@') >= 0) {
						sentence.sentence = sentence.sentence.replace(
							/(@\w+)/g,
							'<span style="color: #51acff;">$1</span>'
						);
					}

					// Update: HTML
					if (sentence.sentence !== textContent) {
						// Replace the original text content with the modified one containing the <span> elements
						$(this).html(sentence.sentence);
					}

					textContent = sentence.sentence;
				});
			$(this).addClass('processed');
		});

		selectors = $('div[data-e2e="chat-message"]');
		selectors.each(function () {
			let item: JQuery<HTMLElement> = $(this);
			let child: JQuery<HTMLElement> = $(item.find('[class*="Comment"]'));

			let y: number = $(this).position().top;
			if (y > heightOfSide) {
				child.css('width', '100%');
			} else {
				child.css('width', 'calc(100% - ' + widthOfSide + 'px)');
			}
		});

		// Social Messages (shared/followed)
		selectors = $('div[data-e2e="social-message"]');
		selectors.each(function () {
			const item: JQuery<HTMLElement> = $(this);
			let child: JQuery<HTMLElement> = $(
				item.find('div[data-e2e="social-message-text"]')
			);
			let y: number = $(this).position().top;
			if (y > heightOfSide) {
				child.css('width', '100%');
			} else {
				child.css('width', 'calc(100% - ' + widthOfSide + 'px - 90px)');
			}
		});

		// Room Messages (ie: 'Welcome In' Messages from TikTok/Streamer/Creator)
		selectors = $('div[class*="RoomMessage"]');
		selectors.each(function () {
			const item: JQuery<HTMLElement> = $(this);
			let child: JQuery<HTMLElement> = $(item.find('div[class*="Content"]'));
			let y: number = $(this).position().top;
			if (y > heightOfSide) {
				child.attr('style', '');
			} else {
				child.css('width', 'calc(100% - ' + widthOfSide + 'px - 90px)');
			}
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
		});
	}

	function scrollToTop() {
		let chatRoomBody: JQuery<HTMLElement> = $('div[class*="ChatRoomBody"]');
		chatRoomBody.scrollTop(chatRoomBody.height());
	}

	init();
});
