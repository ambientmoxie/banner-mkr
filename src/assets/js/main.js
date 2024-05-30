import "../scss/style.scss";
import createDoctype from "./doctype";
import Packery from "packery";
import Draggabilly from "draggabilly";

document.querySelector("button").addEventListener("click", () => {
  // Create a basic HTML node structure, links to the GSAP library, and gsap timeline.
  let htmlContent = createDoctype();

  // Update the node structure depending on user choices.
  const additionalContent = "<p> hello </p>";
  htmlContent = htmlContent.replace("</body>", `${additionalContent} </body>`);

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "document.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

// vanilla JS
var grid = document.querySelector("#timeline-area__blocks");
console.log(grid);
// initialize with element
var pckry = new Packery(grid, {
  itemSelector: ".timeline-area__block",
  gutter: ".gutter-sizer",
  columnWidth: ".timeline-area__block",
  percentPosition: true,
});

// make all items draggable
grid.querySelectorAll(".timeline-area__block").forEach(function (itemElem) {
  var draggie = new Draggabilly(itemElem);
  // bind Draggabilly events to Packery
  pckry.bindDraggabillyEvents(draggie);
});

// Function to update data-order attributes
function updateOrderAttributes() {
  pckry.getItemElements().forEach((item, index) => {
    item.setAttribute("data-order", index + 1);
  });
}

// Initial update of data-order attributes
updateOrderAttributes();

// Listen for the layoutComplete event to update data-order attributes
pckry.on("layoutComplete", () => {
  setTimeout(() => {
    updateOrderAttributes();
  }, 1000);
});
