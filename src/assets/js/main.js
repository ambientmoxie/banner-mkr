import "../scss/style.scss";
import createDoctype from "./doctype";
import Packery from "packery";
import Draggabilly from "draggabilly";

// document.querySelector("button").addEventListener("click", () => {
//   // Create a basic HTML node structure, links to the GSAP library, and gsap timeline.
//   let htmlContent = createDoctype();

//   // Update the node structure depending on user choices.
//   const additionalContent = "<p> hello </p>";
//   htmlContent = htmlContent.replace("</body>", `${additionalContent} </body>`);

//   const blob = new Blob([htmlContent], { type: "text/html" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "document.html";
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// });

// Packery is initialized.
// We are using DOM element as gutter value and column width.
// The use of percentage is enable.
const grid = document.querySelector("#timeline-area__blocks");
let deleteMode = false;

const pckry = new Packery(grid, {
  itemSelector: ".timeline-area__block",
  gutter: ".gutter-sizer",
  columnWidth: ".timeline-area__block",
  percentPosition: true,
});

// Function to make items draggable and removable
function makeItemInteractive(itemElem) {
  var draggie = new Draggabilly(itemElem);
  // bind Draggabilly events to Packery
  pckry.bindDraggabillyEvents(draggie);

  // Add click event listener to remove the item
  itemElem.addEventListener("click", function () {
    if (deleteMode) {
      if (pckry.items.length > 1) {
        // Remove the item from Packery
        pckry.remove(itemElem);
        // Remove the item from the DOM
        itemElem.parentNode.removeChild(itemElem);
        // Re-layout Packery
        pckry.layout();
        // Update the order attributes
        updateOrderAttributes();
      } else {
        alert("you cannot delete the last item");
      }
    }
  });
}

// Because the elements can be moved but the node structure remains the same,
// I need to keep track of the block positions to generate a usable GSAP timeline.
// This function adds a data-order attribute to each item to do this.
function updateOrderAttributes() {
  pckry.getItemElements().forEach((item, index) => {
    item.setAttribute("data-order", index + 1);
  });
}

// Apply order on first load
updateOrderAttributes();

// Make all existing items interactive
grid.querySelectorAll(".timeline-area__block").forEach(makeItemInteractive);

// Apply order after an element has been moved
pckry.on("dragItemPositioned", updateOrderAttributes);

const addButton = document.querySelector("#timeline-area__add-btn");

// Reveal the selector allowing to add frames
const selectorContainer = document.querySelector("aside");
const selectors = selectorContainer.querySelectorAll("button");

addButton.addEventListener("click", (e) => {
  
  // Edit style depending on if selector is visible or not
  selectorContainer.classList.toggle("isVisible");
  const isSelectorVisible = selectorContainer.classList.contains("isVisible");
  e.target.classList.toggle("isActive");
  // e.target.innerText = isSelectorVisible
  //   ? "Hide frame selector"
  //   : "Show frame selector";
});

// We are using the select type to generate the corresponding block
function createBlockType(type) {
  const block = document.createElement("div");
  block.className = "timeline-area__block";
  block.setAttribute("data-type", `${type}`);
  block.innerHTML = `<img src="/icons/${type}-ico.svg" alt="${type} icon"><span>${type}</span>`;
  return block;
}

// This part add block depending on it's type
Array.from(selectors).forEach((selector) => {
  selector.addEventListener("click", () => {
    // Get the type of item to create
    const type = selector.getAttribute("data-type");
    // Create the item
    const newBlock = createBlockType(type);
    // Append item to grid
    grid.appendChild(newBlock);
    // Tell Packery about the new item
    pckry.appended(newBlock);
    // Make the new item draggable
    makeItemInteractive(newBlock);
    // Update the order attributes
    updateOrderAttributes();
  });
});


// Enable delete mode
const deleteButton = document.querySelector("#timeline-area__delete-btn");

deleteButton.addEventListener("click", (e) => {
  deleteMode = !deleteMode;

  // Edit style depending on if delete mode is true are false
  e.target.classList.toggle("isActive");
  e.target.innerText = deleteMode
    ? "Disable delete mode"
    : "Enable delete mode";
});
