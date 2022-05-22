
/**
 * Importing the given list of items from the 'items.json' file in an array of objects 'sourceItems'
 * Each element in this array is an object which contains the fields :
 * 1) previewImage, 2) title
 */

import sourceItems from "./items.json" assert { type: "json" };

// Selecting the item list array from the HTML page, which is there to contain the items
const list = document.querySelector(".items-list");

const maxTitleLen = 27; // Max length allowed of the list item title

let globalIndex = 0; // A pointer/iterator to point to the current selected item

sourceItems.forEach(createItems);                    // For each loop on the sourceItems array to build the items list

function createItems(item, idx) {

    const li = document.createElement("li");          // Creating a "li" element.
    const listImage = document.createElement("img");  // Creating an "img" element.
    const listTitle = document.createElement("span"); // Creating a "span" element.

    const currURL = item.previewImage;                // the url of the image
    const currTitle = item.title;                     // the title of the image/item

    const shortenedTitle = shortenTitle(currTitle);

    // Adding the appropriate classes to li, listImage and listTile elements
    li.classList.add("list-item");
    listImage.classList.add("list-img");
    listTitle.classList.add("list-title");

    listImage.setAttribute("src", currURL);           // Setting the url of the current image

    listTitle.innerText = shortenedTitle;                  // Setting the content of the current title

    li.appendChild(listImage);                        // Appending the listImage element to the li element
    li.appendChild(listTitle);                        // Appending the listTitle element to the li element
    list.appendChild(li);                             // Appending the entire li item to the list

    li.setAttribute("id", idx);

}


// -------------------------

// Module for click event

// An array which has all the list items
const allItems = document.querySelectorAll(".list-item");

// An array which has all the list titles
const allTitles = document.querySelectorAll(".list-title");

// The Main Image
const mainImg = document.querySelector(".main-image");

// The Main Title
const mainTitle = document.querySelector(".main-title");

updateImageTitle();
updateActiveClass();



for (let item of allItems) {
    item.addEventListener("click", handleClick);
}


function handleClick() {
    const currItem = this;
    const itemIdx = Number(currItem.getAttribute("id"));
    globalIndex = itemIdx;
    updateImageTitle();
    updateActiveClass();
}


function updateImageTitle() {
    const currURL = sourceItems[globalIndex].previewImage;
    const currTitle = sourceItems[globalIndex].title;
    mainImg.setAttribute("src", currURL);
    // mainTitle.value = currTitle;
}

// Click


// Function to change the current highlighted class

function updateActiveClass() {
    for (let item of allItems) {
        item.classList.remove("active");
    }
    allItems[globalIndex].classList.add("active");
}

// ---------------------------

// KeyDown Event

document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
    const key = event.key;
    if (key === "ArrowUp") {
        globalIndex--;
    } else if (key === "ArrowDown") {
        globalIndex++;
    } 
    globalIndex = (globalIndex + sourceItems.length) % sourceItems.length;

    updateImageTitle();
    updateActiveClass();
}

// ----------------------------


// Function to shorten the title so that it fits inside the list container

function shortenTitle(str) { // sperate module
    if (str.length <= maxTitleLen) {
        return str;
    }

    const subLength = (maxTitleLen - 3) / 2;
    const s1 = str.substr(0, subLength);
    const s2 = str.substr(str.length - subLength);
    return s1 + "..." + s2;

}

