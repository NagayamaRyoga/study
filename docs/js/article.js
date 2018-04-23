;(function() {
	'use strict';

	function delay(wait_ms) {
		return new Promise(resolve => {
			setTimeout(() => resolve(), wait_ms);
		});
	}

	function fetchMarkdown(src, into) {
		const mathJaxDelay_ms = 500;

		return fetch(src)
			.then(response => response.text())
			.then(body => body
				.replace(/。/g, '. ')
				.replace(/、/g, ', '))
			.then(body => into.innerHTML = marked(body))
			.then(() => delay(mathJaxDelay_ms))
			.then(() => MathJax.Hub.Queue(['Typeset', MathJax.Hub, into]))
			.then(() => console.log(`markdown loaded '${src}'`))
	}

	function createIndex(from, into) {
		const titles = from.querySelectorAll('h1,h2,h3');
		const list = document.createElement('ol');

		[...titles].map(title => {
			const item = document.createElement('li');
			const anchor = document.createElement('a');

			anchor.textContent = title.textContent;
			anchor.href = `#${title.id}`;

			item.classList.add('item-' + title.tagName);
			item.appendChild(anchor);

			return item;
		}).forEach(item => {
			list.appendChild(item);
		});

		into.appendChild(list);
	}

	const sections = document.querySelectorAll('section[data-src]');
	const index = document.querySelector('#index');
	const body = document.querySelector('#body');

	Promise.all([...sections].map(section => fetchMarkdown(section.dataset.src, section)))
		.then(() => createIndex(body, index))
		.catch(err => alert(err.stack));
}());
