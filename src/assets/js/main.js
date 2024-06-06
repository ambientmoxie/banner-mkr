// TODO: refactore

import "../scss/style.scss";
import { isMobile } from "mobile-device-detect";
import {
  createDoctype,
  generateLogoCode,
  generateImageCode,
  generateTextCode,
  generateCarouselCode,
  generateCtaCode,
} from "./doctype";
import Packery from "packery";
import Draggabilly from "draggabilly";

// Import logos

const downloadBtn = document.getElementById("bmkr-footer__download-button");

downloadBtn.addEventListener("click", () => {
  // Create a basic HTML node structure, links to the GSAP library, and gsap timeline.
  let htmlContent = createDoctype();

  // Update the node structure depending on user choices.
  htmlContent = updateNodeStructure(htmlContent);

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

function parseTimeline() {
  // Select the timeline area
  const timeline = document.getElementById("timeline-area__blocks");
  // Get all the blocks
  const unorderedBlocks = Array.from(
    timeline.querySelectorAll(".timeline-area__block")
  );
  // Init an empty array that will contains all the block in the correct order
  const orderedBlocks = [];
  // Loop through all the block in the unordered array
  // and sort them inside a new array of ordered blocks
  unorderedBlocks.forEach((block) => {
    const blockIndex = parseInt(block.getAttribute("data-order"));
    const blockType = block.getAttribute("data-type");
    orderedBlocks[blockIndex] = blockType;
  });
  return orderedBlocks;
}

function updateNodeStructure(htmlContent) {
  const frames = parseTimeline();
  let additionalJavacript;
  let additionalHtml;

  frames.forEach((frame, index) => {
    switch (frame) {
      case "logo":
        additionalJavacript = generateLogoCode(index).js;
        additionalHtml = generateLogoCode(index).html;
        break;
      case "image":
        additionalJavacript = generateImageCode(index).js;
        additionalHtml = generateImageCode(index).html;
        break;
      case "text":
        additionalJavacript = generateTextCode(index).js;
        additionalHtml = generateTextCode(index).html;
        break;
      case "carousel":
        additionalJavacript = generateCarouselCode(index).js;
        additionalHtml = generateCarouselCode(index).html;
        break;
      case "cta":
        additionalJavacript = generateCtaCode(index).js;
        additionalHtml = generateCtaCode(index).html;
        break;

      default:
        console.log(`${frame} doesn't seems to be a valid frame :)`);
        break;
    }

    // Insert javascript and html
    htmlContent = htmlContent.replace(
      "// Add js here",
      `${additionalJavacript} // Add js here`
    );
    htmlContent = htmlContent.replace(
      "<!-- Add HTML here -->",
      `${additionalHtml} <!-- Add HTML here -->`
    );
  });

  return htmlContent;
}

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
    item.setAttribute("data-order", index);
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
  // const isSelectorVisible = selectorContainer.classList.contains("isVisible");
  e.target.classList.toggle("isActive");
  // e.target.innerText = isSelectorVisible
  //   ? "Hide frame selector"
  //   : "Show frame selector";
});


// function getImageUrl(type) {
//   return new URL(`./icons/${type}-ico.svg`, import.meta.url).href
// }

// We are using the select type to generate the corresponding block
function createBlockType(type) {

  console.log('Type:', type); // Debug: Check the type value

  const block = document.createElement("div");
  block.className = "timeline-area__block";
  block.setAttribute("data-type", `${type}`);

  // Hard-coded URL...import.meta.url returns undefined
  block.innerHTML = `<img src="/projects/banner-mkr/icons/${type}-ico.svg" alt="${type} icon"><span>${type}</span>`;
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

// Display Terms

const openTermsButton = document.getElementById("terms-btn");
const closeTermsButton = document.getElementById("close-btn");
const termsScreen = document.getElementById("terms-container");

openTermsButton.addEventListener("click", (e) => {
  termsScreen.style.display = "flex";
});

closeTermsButton.addEventListener("click", (e) => {
  termsScreen.style.display = "none";
});

// Is Mobile ?

if (isMobile) {
  document.querySelector("main").remove();
  const div = document.createElement("div");
  const p = document.createElement("p");
  p.textContent = "This website is not visible on mobile device.";
  div.appendChild(p);
  document.body.appendChild(div);
}
