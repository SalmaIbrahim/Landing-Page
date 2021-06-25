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

//unused function
/*
function capitalizeFirstLetter(str) {
    let firstLetterCapital = str.charAt(0).toUpperCase();
    let returnedValue = firstLetterCapital + str.slice(1);
    let index;

    for(let i = 0; i < str.length; i++) {
        let check = isNaN(str[i]);
        if(!check) {
            index = i;
            returnedValue = `${returnedValue.slice(0, i)} ${returnedValue.slice(i)}`; 
            break;
        }
        
    }

    return returnedValue;
}
*/


// creating nav list items
for(const section of sections) {
    listItem = document.createElement('li'); 
    anchorItem = document.createElement('a');
    // anchorItem.innerText = capitalizeFirstLetter(section.id);
    anchorItem.innerText = section.getAttribute('data-nav');
    anchorItem.setAttribute('href', `#${section.id}`); 
    listItem.setAttribute('id', `#${section.id}`); 
    anchorItem.setAttribute('class', `navLink`); 
    anchorItem.setAttribute('style', 'text-decoration: none; margin: 10px; color: rgb(136,203,171);');
    listItem.setAttribute('style', 'padding: 10px 5px; margin: 20px');
    // anchorItem.setAttribute('class', 'navItem');
    listItem.setAttribute('class', 'navItem');
    listItem.appendChild(anchorItem);
    docFragment.appendChild(listItem);
}

list.setAttribute('style', 'list-style-type: none; background: rgba(0,13,60,1);');
list.appendChild(docFragment);

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
let navItems = document.querySelectorAll('.navItem');
let navLinks = document.querySelectorAll('.navLinks');

// navItem class in items
let linksHref = [];
navItems.forEach( navItem => {
    let aItems = navItem.getElementsByTagName('a'); //list is returned
    linksHref.push(aItems[0].getAttribute('href').slice(1)); 
});


//Using a scroll event listener 
function toggleActiceState() {
    // intersection observer
    let options = {
        root: null,
        rootMargin: '-300px',
        threshold: 0.0
    };

    let callback = (entries, observer) => { // callback function which will be invoked
        let sectionId;
        entries.forEach(entry => {      // each entry desctibes an intersection change for one observed target element
        
            if(!entry.isIntersecting) { // if false (not true)
                entry.target.classList.remove('your-active-class'); 
                return;            
            }
            entry.target.classList.add('your-active-class'); 
            // console.log(entry.target.id);
            sectionId = entry.target.id; // id of the activated section
    
            for(let i = 0; i < linksHref.length; i++) {
                if(linksHref[i] !== sectionId) {  // if item id != section id
                    navItems[i].classList.remove('item-active-class'); // remoce list item class 'item-active-class'
                    continue;
                }
                navItems[i].classList.add('item-active-class');    
            }        
        });
    }

    let observer = new IntersectionObserver (callback, options);
    
    // targeting the elements to be observed
    sections.forEach(section => {
        observer.observe(section);
    });
}

window.addEventListener('scroll', toggleActiceState);


// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

function scrollToSection(event) {
    event.preventDefault();
    // console.log(event.target.nodeName);
    let selectedSection;
    if(event.target.nodeName === 'A') {
        let selectedAnchorHref = event.target.getAttribute('href');
        selectedSection = document.querySelector(selectedAnchorHref);
        // console.log(selectedSection);
    } else if(event.target.nodeName === 'LI') {
        let selectedItem = event.target.getAttribute('id');
        selectedSection = document.querySelector(selectedItem);
        // console.log(selectedSection);
    }
    selectedSection.scrollIntoView({behavior: "smooth", block: "center"}); //, block: "center"
}

navItems.forEach(navItem     => {
    navItem.addEventListener('click', scrollToSection);
});

// Build menu 

// Scroll to section on link click

// Set sections as active

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
window.addEventListener('resize', reportWindowSize);

// function navULDisplay () {
//     if(navUL.style.display === 'none') {
//         navUL.style.display = 'flex';
//     } else {
//         navUL.style.display = 'none';
//     }
// }

toggleBtn.addEventListener('click', ()=> {
    navUL.style.display = "inline-block";
    
    navUL.addEventListener('click', ()=> {
        navUL.style.display = 'none';    
    });
});





// collapsible
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


//Hide fixed navigation bar while not scrolling

let isScrolling;

window.addEventListener('scroll', event => {
    
    window.clearTimeout(isScrolling);
    navbar.style.display = 'none';


    isScrolling = setTimeout( () => {
        navbar.style.display = 'block';
    }, 66);
}, false);










/* 1st try */

// let sectionCounts = document.querySelectorAll('section').length;
// let navBar = document.querySelector('nav');
// // navBar.setAttribute('style', 'border: 2px dashed orange;')
// let unorderedList = document.querySelector('#navbar__list');

// unorderedList.setAttribute('style', 'list-style-type: none; background-color: rgba(0,13,60,1); padding: 30px;');


// let liOfUl, anchorInLi;

// for(let i = 0; i < sectionCounts; i++){
//     // creating list items
//     liOfUl = document.createElement('li');
//     // creating anchors
//     anchorInLi = document.createElement('a');
//     anchorInLi.setAttribute('href', `#section${i+1}`);
//     // styling of list items
//     anchorInLi.setAttribute('style', 'padding: 20px; margin: 50px; text-decoration: none; color: rgb(136,203,171);');
    
//     // text of anchors
//     anchorInLi.innerText = `Section ${i+1}`;
//     //appending anchor in list items
//     liOfUl.appendChild(anchorInLi);    
//     // appending list items in unordered list
//     unorderedList.appendChild(liOfUl);
// }
let endTime = performance.now();
let time = endTime - startTime;
console.log(time);
