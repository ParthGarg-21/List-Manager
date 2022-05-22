
/**
 * Importing the given list of items from the 'items.json' file in an array of objects 'sourceItems'.
 * Each element in this array is an object which contains the fields :
 * 1) previewImage, 2) title.
 */
import sourceItems from "./items.json" assert { type: "json" };

import shortenString from "./shorten-string.js";



/**
 * Section to build the item list.
 */

// Select the item list array from the HTML page, which is there to contain the items.
const list = document.querySelector(".items-list");

let globalIndex = 0;                                  // Global pointer/iterator to point to the current selected item.

sourceItems.forEach(createItems);                     // For each loop on the sourceItems array to build the items list.

function createItems(item, idx) {                     // Callback for the 'for each loop on the sourceItems array'.

    const li = document.createElement("li");          // Create a "li" element.
    const listImage = document.createElement("img");  // Create an "img" element.
    const listTitle = document.createElement("span"); // Create a "span" element.

    const currURL = item.previewImage;                // The url of the image.
    const currTitle = item.title;                     // The title of the image/item.

    const shortenedTitle = shortenString(currTitle);

    // Add the appropriate classes to li, listImage and listTile elements.
    li.classList.add("list-item");
    listImage.classList.add("list-img");
    listTitle.classList.add("list-title");

    listImage.setAttribute("src", currURL);           // Set the url of the current image.

    listTitle.innerText = shortenedTitle;             // Set the content of the current title after shortening it.

    li.appendChild(listImage);                        // Append the listImage element to the li element.
    li.appendChild(listTitle);                        // Append the listTitle element to the li element.
    list.appendChild(li);                             // Append the entire li item to the list.

    li.setAttribute("id", idx);                       // Give an ID which is equal to the index of that item.
}



/**
 * Section to get certain DOM objects from the HTML page.
 */

// An array which has all the list items.
const allItems = document.querySelectorAll(".list-item");

// An array which has all the list titles.
const allTitles = document.querySelectorAll(".list-title");

// The Main Image.
const mainImage = document.querySelector(".main-image");

// The Main Title.
const mainTitle = document.querySelector(".main-title");



/**
 * Section to handle various updates in the main image, main title, and the title of each list item.
 */

// Function to update the main image on the basis of the current selected element.
function updateImage() {
    const currURL = sourceItems[globalIndex].previewImage;  // Get the current item's url.
    mainImage.setAttribute("src", currURL);                 // Update the src attribute of the main image.
}

// Function to update the main title on the basis of the current selected element.
function updateTitle() {
    const currTitle = sourceItems[globalIndex].title;       // Get the current item's title.
    mainTitle.value = currTitle;                            // Update the value/content of the main title.
}

// Function to change the current highlighted class.
function updateActiveClass() {
    for (let item of allItems) {
        item.classList.remove("active");                    // Remove the active class from all the items.
    }
    allItems[globalIndex].classList.add("active");          // Add the active class to the current item.
}



/**
 * Section to update and set the default settings.
 */

// Update the image, title and the active class for the first item (default action).
updateImage();
updateTitle();
updateActiveClass();



/**
 * Section to handle clicks on the list items.
 */

// Add an Event listener to all the list items in the item list.
for (let item of allItems) {
    item.addEventListener("click", handleClick);
}

// Callback for click event.
function handleClick() {
    const currItem = this;
    const itemIndex = Number(currItem.getAttribute("id"));    // Extract the index of the clicked item from its id.
    globalIndex = itemIndex;                                  // Set the globalIndex equal to the selected item's index.
    updateImage();
    updateTitle();
    updateActiveClass();
}



/**
 * Section to handle arrow key navigation on the list items
 */

// Adding an event listener to the entire document to detect key presses.
document.addEventListener("keydown", handleKeyPress);

// Callback for key event
function handleKeyPress(event) {
    const key = event.key;
    if (key === "ArrowUp") {                          // If up arrow key is pressed, decrement the iterator.
        globalIndex--;
    } else if (key === "ArrowDown") {                 // If down arrow key is presses, increment the iterator.
        globalIndex++;
    } else {                                          // In case any other key is pressed, simply return.
        return;
    }

    // Set the correct value of the globalIndex (in case it becomes negative, or goes out of bounds).
    globalIndex = (globalIndex + sourceItems.length) % sourceItems.length;

    updateImage();
    updateTitle();
    updateActiveClass();
}



/**
 * Section to handle the changes made in the title of the list item
 */

// Add an event listener to the main title to detect changes made in its content.
mainTitle.addEventListener("input", handleChangeTilte)

// Callback for the input event.
function handleChangeTilte() {
    const newTitle = mainTitle.value;
    sourceItems[globalIndex].title = newTitle;              // Update the title for the item in the sourceItems array. 
    const shortenedTitle = shortenString(newTitle);         // Shorten the title for the list item.
    allTitles[globalIndex].innerText = shortenedTitle;      // Update the title of the list item.
}
