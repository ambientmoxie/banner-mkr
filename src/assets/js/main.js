import "../scss/style.scss";
import createDoctype from "./doctype";

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
