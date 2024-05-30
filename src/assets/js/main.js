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

const pckry = new Packery(grid, {
  itemSelector: ".timeline-area__block",
  gutter: ".gutter-sizer",
  columnWidth: ".timeline-area__block",
  percentPosition: true,
});

// Draggabilly is initialized and bound to Packery
// to make all available blocks draggable by the user.
grid.querySelectorAll(".timeline-area__block").forEach(function (itemElem) {
  const draggie = new Draggabilly(itemElem);
  // bind Draggabilly events to Packery
  pckry.bindDraggabillyEvents(draggie);
});

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
// Apply order after an element has been moved
pckry.on("dragItemPositioned", updateOrderAttributes);

const addButton = document.querySelector("#timeline-area__add-btn");

function createBlockType(type) {
  const item = document.createElement("div");
  item.className = "timeline-area__block";

  item.setAttribute("data-type", `${type}`);
  item.innerHTML = `<img src="/icons/${type}-ico.svg" alt="${type} icon">
                    <span>${type}</span>`;

  return item;
}

addButton.addEventListener("click", () => {
  const newItem = createBlockType("image");

  // Append item to grid
  grid.appendChild(newItem);

  // Tell Packery about the new item
  pckry.appended(newItem);

  // Make the new item draggable
  const draggie = new Draggabilly(newItem);
  pckry.bindDraggabillyEvents(draggie);

  // Update the order attributes
  updateOrderAttributes();
});
