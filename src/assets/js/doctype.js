export default function createDoctype() {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Example banner</title>
        <link
        rel="stylesheet"
        href="https://unpkg.com/flickity@2/dist/flickity.min.css"
      />
      <style>
        :root {
          --color-dark: #282828;
          --color-light: #fff;
          --color-background: #f2f2f2;
          --header-height: 55px;
        }
  
        html {
          box-sizing: border-box;
        }
  
        *,
        *::after,
        *::before {
          box-sizing: inherit;
          margin: 0;
          padding: 0;
        }
  
        button,
        input[type="submit"],
        input[type="reset"] {
          background: none;
          color: inherit;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
          outline: inherit;
        }
  
        body {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 14px;
          letter-spacing: -0.28px;
        }
  
        #container {
          position: relative;
          width: 300px;
          height: 250px;
          border: 1px solid black;
          overflow: hidden;
        }
  
        #container div {
          position: absolute;
        }
  
        #frame-logo {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
  
        #frame-logo__header {
          position: absolute;
          width: 100%;
          height: var(--header-height);
          display: flex;
          align-items: center;
          padding: 0 15px;
          gap: 10px;
          background-color: var(--color-light);
          border-bottom: 1px solid var(--color-dark);
          z-index: 10;
        }
  
        img#logo-frame {
          width: 40%;
          height: auto;
        }
  
        #frame-image {
          background-color: aquamarine;
        }
  
        #frame-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
  
        #frame-text {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: maroon;
          padding: 15px;
        }
  
        #frame-cta {
          background-color: pink;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 15px;
          background-color: var(--color-light);
        }
  
        #frame-cta p {
          max-width: 70%;
          text-align: center;
        }
  
        #frame-cta button {
          padding: 10px 20px;
          background-color: var(--color-dark);
          color: var(--color-light);
          text-transform: uppercase;
          font-size: 10px;
        }
  
        #frame-logo,
        #frame-image,
        #frame-text,
        #frame-carousel,
        #frame-cta {
          z-index: 1;
        }
  
        #frame-image,
        #frame-text,
        #frame-carousel,
        #frame-cta {
          width: 100%;
          height: calc(100% - var(--header-height));
          bottom: 0;
        }
  
        .flickity-viewport {
          width: 100%;
          height: 100%;
        }
  
        .carousel-cell {
          width: 100%;
          height: 100%;
          background-color: red;
        }
  
        .carousel-cell img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      </style>

    </head>
      
    <body>
      <div id="container">
        //HTML Here
      </div>

    <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>

    <script>
      document.addEventListener("DOMContentLoaded", (event) => {
        // Init carousel
        const header = document
          .querySelector("#frame-logo__header")
          .getBoundingClientRect();

        var elem = document.querySelector("#frame-carousel");
        var flkty = new Flickity(elem, {
          // options
          cellAlign: "left",
          contain: true,
        });

        // Delay between frames
        const DELAY = 1;
        const DURATION = 1;
        const EASE = "power1.out";

        // Pause the timeline on mouseover and resume on mouseout.
        const banner = document.getElementById("container");
        console.log("banner");
        if (banner) {
          banner.addEventListener("mouseover", () => tl.pause());
          banner.addEventListener("mouseout", () => tl.resume());
        } else {
          console.error("Element with id 'container' not found.");
        }

        let tl = gsap.timeline({ delay: 2 });

        // GSAP Timeline
        // We are using "fromTo" method in order to have all values in one place.
       
        //JS Here

        // Add markers to mark a precise moment inside the timeline.
        // .add("pauseMarker")
        // .add("startMarker")
        // ...

        // Seek to the specific time and pause
        // tl.seek("pauseMarker").pause();
        // Seek to the specific time and play
        // tl.seek("startMarker").play();

        // .call(() => tl.pause())
      });
    </script>
        
    </body>
    </html>`;
}
