
/**
 * Importing the given list of items from the 'items.json' file in an array of objects 'sourceItems'
 * Each element in this array is an object which contains the fields :
 * 1) previewImage, 2) title
 */

import sourceItems from "./items.json" assert { type: "json" };

// Selecting the item list from the HTML page, which is there to contain the items

const list = document.querySelector(".items-list");

sourceItems.forEach(createItems);                    // For each loop on the sourceItems array to build the items list

function createItems(item) {

    const li = document.createElement("li");          // Creating a "li" element.
    const listImage = document.createElement("img");  // Creating an "img" element.
    const listTitle = document.createElement("span"); // Creating a "span" element.

    const currURL = item.previewImage;                // the url of the image
    const currTitle = item.title;                     // the title of the image/item


    // Adding the appropriate classes to li, listImage and listTile elements
    li.classList.add("list-item");                    
    listImage.classList.add("list-img");
    listTitle.classList.add("list-title");

    listImage.setAttribute("src", currURL);           // Setting the url of the current image
    
    listTitle.innerText = currTitle;                  // Setting the content of the current title


    li.appendChild(listImage);                        // Appending the listImage element to the li element
    li.appendChild(listTitle);                        // Appending the listTitle element to the li element
    list.appendChild(li);                             // Appending the entire li item to the list
}