/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

// Global Variables

const navMenu = document.querySelector('.navbar__menu');
const mainElement = document.querySelector('main');
let sections;

// Functions

/**
 * Updates the sections array to include any new sections
 */
function updateSections() {
	sections = Array.from(mainElement.children).filter(
		(element) => element.nodeName == 'SECTION'
	);
}

function isSectionAdded() {
	const currentSections = Array.from(mainElement.children).filter(
		(element) => element.nodeName == 'SECTION'
	);

	return sections.length !== currentSections.length;
}

/**
 * Function that fetches all the sections in the website and
 * builds a nav item refering to each one
 */
function buildNavMenu() {
	const navFragment = document.createDocumentFragment();

	let navMenuItem;
	for (let section of sections) {
		navMenuItem = document.createElement('ul');
		navMenuItem.innerHTML = `<a href='#${section.id}' class='menu__link'>${section.id}</a>`;
		navFragment.appendChild(navMenuItem);
	}
	navMenu.appendChild(navFragment);
}

/**
 * Updates the nav menu on adding new sections
 */
function updateNavMenu() {
	const addedSections = sections.slice(navMenu.children.length);

	navMenu.style.display = 'none';

	let navMenuItem;
	for (let section of addedSections) {
		navMenuItem = document.createElement('ul');
		navMenuItem.innerHTML = `<a href='#${section.id}' class='menu__link'>${section.id}</a>`;
		navMenu.appendChild(navMenuItem);
	}
	navMenu.style.display = 'block';
}

/**
 * Function that checks all the sections locations
 * and determines the top most section as the active one
 * Section location is detected by it's header and last paragraph locations
 */
function setActiveSection() {
	sections?.forEach((section) => {
		const sectionDiv = section.firstElementChild;
		const startPosition = sectionDiv.firstElementChild.getBoundingClientRect();
		const endPosition = sectionDiv.lastElementChild.getBoundingClientRect();

		startPosition.top <= window.innerHeight / 4 && endPosition.bottom >= 0
			? section.classList.add('active__section')
			: section.classList?.remove('active__section');
	});
}

/**
 * Initializes the webpage on load
 */
function init() {
	updateSections();
	buildNavMenu();
}

// Code Main Body

init();

// Events and Listeners

/**
 * Updates the current active section
 * Updates the nav menu on adding new sections
 */
window.addEventListener(
	'scroll',
	() =>
		setTimeout(() => {
			setActiveSection();

			if (isSectionAdded()) {
				updateSections();
				updateNavMenu();
			}
		}, 0),
	{
		passive: true,
	}
);

/**
 * Changes the default behaviour of jumping to the section
 * when pressing the navigation menu item
 * to scrolling to it smoothly until it is in view
 *
 * Default values of the scrollIntoView were used
 */
navMenu.addEventListener('click', (event) => {
	event.preventDefault();
	const section = document.querySelector(`#${event.target.innerHTML}`);
	section.scrollIntoView({ behavior: 'smooth' });
});
