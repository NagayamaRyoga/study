;(function() {
	'use strict';

	function delay(wait_ms) {
		return new Promise(function(resolve) {
			setTimeout(function() {
				resolve();
			}, wait_ms);
		});
	}

	function fetchMarkdown(src, into) {
		return fetch(src).then(function(response) {
			return response.text();
		}).then(function(body) {
			return body
				.replace(/。/g, '. ')
				.replace(/、/g, ', ');
		}).then(function(body) {
			into.innerHTML = marked(body);
		}).then(function() {
			console.log('loaded markdown: ' + src);
		});
	}

	function createIndex(from, into) {
		var titles = from.querySelectorAll('h1,h2,h3');
		var list = document.createElement('ol');

		Array.from(titles).map(function(title) {
			var item = document.createElement('li');
			var anchor = document.createElement('a');

			anchor.textContent = title.textContent;
			anchor.href = '#' + title.id;

			item.classList.add('item-' + title.tagName);
			item.appendChild(anchor);

			return item;
		}).reduce(function(list, item) {
			list.appendChild(item);

			return list;
		}, list);

		into.appendChild(list);
	}

	var sections = document.querySelectorAll('section[data-src]');

	Promise.all(
		Array.from(sections).map(function(section) {
			var src = section.dataset.src;
			return fetchMarkdown(src, section);
		})
	).then(function() {
		var index = document.querySelector('#index');
		var body = document.querySelector('#body');

		createIndex(body, index);
	}).then(function() {
		return delay(1000);
	}).then(function() {
		console.log('apply MathJax');

		MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
	});
}());
