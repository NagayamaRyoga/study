;(function() {
	'use strict';

	const slugger = new marked.Slugger();

	marked.use({
		renderer: {
			heading(text, level) {
				const slug = slugger.slug(text);
				return `<h${level} id="${slug}">${text}</h${level}>`;
			}
		}
	})

	async function fetchMarkdown(src, into) {
		const response = await fetch(src);
		if (!response.ok) {
			throw new Error(`${src}: ${response.statusText}`);
		}

		const markdown = (await response.text())
			.replace(/。/g, '. ')
			.replace(/、/g, ', ')
			.replace(/_/g, '\\_')
			.replace(/\\\[/g, '\\\\[').replace(/\\\]/g, '\\\\]')
			.replace(/\\\(/g, '\\\\(').replace(/\\\)/g, '\\\\)')
			.replace(/\\;/g, '\\\\;')
			.replace(/\\\|/g, '\\mid ')
			.replace(/\\{/g, '\\lbrace ')
			.replace(/\\}/g, '\\rbrace ')
			.replace(/\\lcm/g, '\\rm{lcm}')
			.replace(/\\mod/g, '\\bmod')
			.replace(/\\Z/g, '\\mathbb{Z}')
			.replace(/\\N/g, '\\mathbb{N}')
			.replace(/\\\[\[/g, '[\\\\![')
			.replace(/\\\]\]/g, ']\\\\!]');

		into.innerHTML = marked(markdown)
			.replace(/\\_/g, '_');

		MathJax.Hub.Queue(['Typeset', MathJax.Hub, into]);

		for (const code of into.querySelectorAll('pre > code')) {
			hljs.highlightBlock(code);
		}

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
