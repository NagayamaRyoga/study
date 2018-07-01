;(function() {
	'use strict';

	async function fetchMarkdown(src, into) {
		const response = await fetch(src);
		const markdown = (await response.text())
			.replace(/。/g, '. ')
			.replace(/、/g, ', ')
			.replace(/_/g, '\\_')
			.replace(/\\\|/g, '\\mid')
			.replace(/\\{/g, '\\lbrace')
			.replace(/\\}/g, '\\rbrace')
			.replace(/\\lcm/g, '\\rm{lcm}')
			.replace(/\\mod/g, '\\bmod')
			.replace(/\\Z/g, '\\mathbb{Z}')
			.replace(/\\N/g, '\\mathbb{N}');

		into.innerHTML = marked(markdown);

		MathJax.Hub.Queue(['Typeset', MathJax.Hub, into]);

		console.log(`markdown loaded '${src}'`);
	}

	function createIndex(from, into) {
		const titles = from.querySelectorAll('h1,h2,h3');
		const list = document.createElement('ol');

		[...titles].forEach(title => {
			const item = document.createElement('li');
			const anchor = document.createElement('a');

			anchor.textContent = title.textContent;
			anchor.href = `#${title.id}`;

			item.classList.add(`item-${title.tagName}`);
			item.appendChild(anchor);

			list.appendChild(item);
		});

		into.appendChild(list);
	}

	const sections = document.querySelectorAll('section[data-src]');
	const index = document.querySelector('#index');
	const body = document.querySelector('#body');

	Promise.all([...sections].map(section => fetchMarkdown(section.dataset.src, section)))
		.then(() => createIndex(body, index))
		.catch(err => console.error(err));
}());
