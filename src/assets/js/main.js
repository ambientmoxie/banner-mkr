import "../scss/style.scss";
import createDoctype from "./doctype";
import Packery from "packery";
import Draggabilly from "draggabilly";

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

  frames.forEach((frame) => {
    switch (frame) {
      case "logo":
        console.log("check");
        additionalJavacript = `
        tl.fromTo("#logo-frame", { x: 0, opacity: 1 }, { x: 0, opacity: 0 }),
        tl.fromTo("#frame-logo__header", { top: -header.height }, { top: 0 }),`;
        additionalHtml = `
        <div id="frame-logo__header">
          <img id="logo-header" src="https://maximebenoit.work/projects/banner-mkr/banner-assets/logo-secondary.svg" alt="logo" />
        </div>
        <div id="frame-logo">
          <img id="logo-frame" src="https://maximebenoit.work/projects/banner-mkr/banner-assets/logo.svg" alt="logo" />
        </div>  
        `;
        break;
      case "image":
        additionalJavacript = `
        tl.fromTo("#frame-${frame}",
        { x: 300, ease: EASE, duration: DURATION, delay: DELAY },
        { x: 0, ease: EASE, duration: DURATION, delay: DELAY }
        ),`;
        additionalHtml = `
        <div id="frame-image">
          <img src="https://maximebenoit.work/projects/banner-mkr/banner-assets/image.jpg" alt="single image" />
        </div>    
        `;
        break;
      case "text":
        additionalJavacript = `
        tl.fromTo("#frame-${frame}",
        { x: 300, ease: EASE, duration: DURATION, delay: DELAY },
        { x: 0, ease: EASE, duration: DURATION, delay: DELAY }
        ),`;
        additionalHtml = `
        <div id="frame-text">
          <p>
            Donec ipsum nibh, tempus at leo non, pulvinar gravida ipsum.
            Pellentesque elit lectus, semper ut dignissim. <br /><br />
            <strong>
              Pellentesque ac eros tristique, suscipit risus a, sodales nisi.
              Praesent tempor magna at bibendum congue.
            </strong>
          </p>
          <p><strong> Money for nothing.</strong></p>
        </div>`;
        break;
      case "carousel":
        additionalJavacript = `
          tl.fromTo("#frame-${frame}",
          { x: 300, ease: EASE, duration: DURATION, delay: DELAY },
          { x: 0, ease: EASE, duration: DURATION, delay: DELAY }
          ),`;
        additionalHtml = `
        <div id="frame-carousel">
          <div class="carousel-cell">
            <img src="https://maximebenoit.work/projects/banner-mkr/banner-assets/image-carousel-1.jpg" alt="image-carousel"/>
          </div>
          <div class="carousel-cell">
            <img src="https://maximebenoit.work/projects/banner-mkr/banner-assets/image-carousel-2.jpg" alt="image-carousel"/>
          </div>
          <div class="carousel-cell">
            <img src="https://maximebenoit.work/projects/banner-mkr/banner-assets/image-carousel-3.jpg" alt="image-carousel"/>
          </div>
        </div>`;
        break;
      case "cta":
        additionalJavacript = `
          tl.fromTo("#frame-${frame}",
          { x: 300, ease: EASE, duration: DURATION, delay: DELAY },
          { x: 0, ease: EASE, duration: DURATION, delay: DELAY }
          ),
          tl.fromTo("#frame-cta button", {y: 20, opacity: 0 }, { y: 0, opacity: 1 })`;
        additionalHtml = `
        <div id="frame-cta">
          <p>Pellentesque ac eros tristique, suscipit risus a, sodales nisi. <strong>Praesent tempor magna.</strong></p>
          <button aria-label="call to action">click on this button</button>
        </div>`;
        break;

      default:
        console.log(`${frame} doesn't seems to be a valid frame :)`);
        break;
    }

    // Insert javascript and html
    htmlContent = htmlContent.replace(
      "//JS Here",
      `${additionalJavacript} //JS Here`
    );
    htmlContent = htmlContent.replace(
      "//HTML Here",
      `${additionalHtml} //HTML Here`
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
