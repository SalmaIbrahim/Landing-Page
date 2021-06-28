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

/**
 * Define Global Variables
 * 
*/
let startTime = performance.now();

let navbar = document.querySelector('nav');
let list = document.querySelector('#navbar__list');
let sections = document.querySelectorAll('section');
let docFragment = document.createDocumentFragment();
let sectionsCount = sections.length;
let listItem, anchorItem;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// build the nav
// creating nav list items for navbar
for(const section of sections) {
    listItem = document.createElement('li'); 
    anchorItem = document.createElement('a');
    anchorItem.innerText = section.getAttribute('data-nav');
    anchorItem.setAttribute('href', `#${section.id}`); 
    listItem.setAttribute('id', `#${section.id}`); 
    anchorItem.setAttribute('class', `navLink`); 
    anchorItem.setAttribute('style', 'text-decoration: none; margin: 10px; color: rgb(136,203,171);');
    listItem.setAttribute('style', 'padding: 10px 5px; margin: 20px');
    listItem.setAttribute('class', 'navItem');
    listItem.appendChild(anchorItem);
    docFragment.appendChild(listItem);
}

//appending list items to the unordered list 
list.setAttribute('style', 'list-style-type: none; background: rgba(0,13,60,1);');
list.appendChild(docFragment);

//selecting list items and their links
let navItems = document.querySelectorAll('.navItem');
let navLinks = document.querySelectorAll('.navLinks');

//to get links from href of anchor in each item list
// navItem class in items
let linksHref = [];
navItems.forEach( navItem => {
    let aItems = navItem.getElementsByTagName('a'); //list is returned
    linksHref.push(aItems[0].getAttribute('href').slice(1)); 
});

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Set sections as active
// Add class 'active' to section when near top of viewport
//Using a scroll event listener 
function toggleActiceState() {
    // intersection observer
    let options = {
        root: null,
        rootMargin: '-200px',
        threshold: 0.0
    };

    let callback = (entries, observer) => { // callback function which will be invoked
        let sectionId;
        entries.forEach(entry => {      // each entry desctibes an intersection change for one observed target element

            if(!entry.isIntersecting) { // if false (not true)
                entry.target.classList.remove('your-active-class'); 
                return;            
            }
            else {
                entry.target.classList.add('your-active-class'); //add
                sectionId = entry.target.id; // id of the activated section
            }
    
            for(let i = 0; i < linksHref.length; i++) {
                if(linksHref[i] !== sectionId) {  // if item id != section id
                    navItems[i].classList.remove('item-active-class'); // remove list item class 'item-active-class'
                    continue;
                }
                navItems[i].classList.add('item-active-class');    
            }        
        });
    }
    // using IntersectionObserver to specify selected section
    let observer = new IntersectionObserver (callback, options);
    
    // targeting the elements to be observed **section
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Scroll to section on link click
function scrollToSection(event) {
    event.preventDefault();
    let selectedSection;
    if(event.target.nodeName === 'A') {
        let selectedAnchorHref = event.target.getAttribute('href');
        selectedSection = document.querySelector(selectedAnchorHref);
    } else if(event.target.nodeName === 'LI') {
        let selectedItem = event.target.getAttribute('id');
        selectedSection = document.querySelector(selectedItem);
    }
    selectedSection.scrollIntoView({behavior: "smooth", block: "center"}); //, block: "center"
}

// Build menu 
// resoinsive window
let toggleBtn = document.querySelector('.toggle-btn');
let navUL= document.querySelector('#navbar__list'); 

function reportWindowSize (event) {
    let windowWidth = window.innerWidth;

    if(windowWidth <= '600') {
        navItems.forEach(navItem => {
            navItem.setAttribute('class', 'humburgerItems');
        });
        navLinks.forEach(navLink => {
            navLink.setAttribute('class', 'styleOfHamburger');
        });
    } else {
        if(navUL.style.display === 'none') {
            navUL.style.display = 'block';    
        }
        navItems.forEach(navItem => {
            navItem.classList.remove('humburgerItems');
        });
        navLinks.forEach(navLink => {
            navItem.classList.remove('styleOfHamburger');
        });
    } 
}

// visibility of navbar 
function navULDisplay () {
    if(navUL.style.display === 'none') {
        navUL.style.display = 'flex';
    } else {
        navUL.style.display = 'none';
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// checking winow scrolling to set choosen section as active
window.addEventListener('scroll', toggleActiceState);

// Scroll to anchor ID using scrollTO event
navItems.forEach(navItem => {
    navItem.addEventListener('click', scrollToSection);
});

// checking window resize to apply resonsitive site
window.addEventListener('resize', reportWindowSize);

//for a responsive window
// humburger button event listener
toggleBtn.addEventListener('click', ()=> {
    navULDisplay();
    
    //hiding navbar after choosing wanted section after 1 second
    navUL.addEventListener('click', () => {
        setTimeout( ()=> {
            navUL.style.display = 'none';    
        }, 1000);
    });
});

// collapsible sections
let collapsibles = document.querySelectorAll('.collapsible');

collapsibles.forEach(collapsible => {
    collapsible.addEventListener('click', ()=> {
        let content = collapsible.nextElementSibling;
        if(content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    })
});


//Hide fixed navigation bar while scrolling
let isScrolling;

window.addEventListener('scroll', event => {
    
    window.clearTimeout(isScrolling);
    navbar.style.display = 'none';


    isScrolling = setTimeout( () => {
        navbar.style.display = 'block';
    }, 66);
}, false);

/*
* Begin Events
* 
*/

// check the performance
let endTime = performance.now();
let time = endTime - startTime;
console.log(time);
