function createDoctype() {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Banner starter</title>
      <link
        rel="stylesheet"
        href="https://unpkg.com/flickity@2/dist/flickity.min.css"
      />
      <style>
        :root {
          /* Sizes */
          --banner-width: 300px;
          --banner-height: 250px;
  
          /* Colors */
          --color-blk: #282828; /* Medium black */
          --color-wht: #fff; /* Full white */
          --color-bgd: #f2f2f2; /* Full white */
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
  
        /* Reset button styles */
  
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
          font-size: 14px;
          align-items: center;
          letter-spacing: -0.28px;
          justify-content: center;
          font-family: Arial, Helvetica, sans-serif;
        }
  
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
  
        #container {
          position: relative;
          width: var(--banner-width);
          height: var(--banner-height);
          border: 1px solid black;
          overflow: hidden;
        }
  
        #container > div {
          position: absolute;
          width: var(--banner-width);
          height: var(--banner-height);
          inset: 0;
        }
  
        #frame-image,
        #frame-text,
        #frame-carousel,
        #frame-cta {
          z-index: 1; /* All frames need to remain under the logo frame */
        }
  
        #frame-logo {
          width: var(--banner-width);
          height: var(--banner-height);
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none; /* Allow interaction with the carousel */
          z-index: 2;
        }
  
        #frame-logo img {
          width: 100%;
          height: auto;
        }
  
        #frame-text {
          display: flex;
          justify-content: center;
          background-color: var(--color-wht);
          align-items: center;
          text-align: center;
          padding: 15px;
        }
  
        #frame-cta {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: var(--color-wht);
          cursor: pointer;
          gap: 15px;
        }
  
        #frame-cta p {
          max-width: 70%;
          text-align: center;
        }
  
        #frame-cta button {
          padding: 10px 20px;
          background-color: var(--color-blk);
          color: var(--color-wht);
          text-transform: uppercase;
          font-size: 10px;
        }
  
        /* Carousel */
  
        .flickity-viewport {
          width: 100%;
          height: 250px;
        }
  
        .carousel-cell {
          width: 100%;
          height: 100%;
        }
      </style>
    </head>
  
    <body>
      <div id="container">
  
      <!-- Add HTML here -->
  
      <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  
      <script>
        document.addEventListener("DOMContentLoaded", (event) => {
  
          // Init carousel
          var elem = document.querySelector("#frame-carousel");
          const carouselOptions = {
            cellAlign: "left",
            contain: true,
          };
          var flkty = new Flickity(elem, carouselOptions);
  
          // Delay between frames
          const DELAY = 1;
          const DURATION = 1;
          const EASE = "power1.out";
  
          // Pause the timeline on mouseover and resume on mouseout.
          // Needed if carousel is present in the timeline
          const banner = document.getElementById("container");
          if (banner) {
            banner.addEventListener("mouseover", () => tl.pause());
            banner.addEventListener("mouseout", () => tl.resume());
          } else {
            console.error("Element with id 'container' not found.");
          }
  
          // Init GSAP timeline
          let tl = gsap.timeline({ delay: 1 });
  
          // Add js here
  
          // ----------------------
          // ↓↓↓ GSAP utilities ↓↓↓
          // ----------------------
  
          // Add markers to mark a precise moment inside the timeline.
          // .add("pauseMarker")
          // .add("startMarker")
  
          // Seek to the specific time and pause
          // tl.seek("pauseMarker").pause();
  
          // Seek to the specific time and play
          // tl.seek("startMarker").play();
  
        });
      </script>
    </body>
  </html>
  `;
}

function generateLogoCode() {
  const logoFrameCode = {
    html: `
    <div id="frame-logo">
      <img id="logo" src="https://maximebenoit.work/projects/banner-mkr/banner-assets/logo.svg" alt="logo"/>
    </div> 
    `,
    js: `
    tl.fromTo(
      "#frame-logo img",
      { scale: 0.5 },
      { scale: 0.22, y: -105, x: -105 }
    );`,
  };
  return logoFrameCode;
}

function generateImageCode() {
  const imageFrameCode = {
    html: `
    <div id="frame-image">
      <img src="https://maximebenoit.work/projects/banner-mkr/banner-assets/image.jpg" alt="single image" />
    </div>
    `,
    js: `
    tl.fromTo(
      "#frame-image",
      { x: 300, ease: EASE, duration: DURATION },
      { x: 0, ease: EASE, duration: DURATION, delay: DELAY }
    );`,
  };
  return imageFrameCode;
}

function generateTextCode() {
  const textFrameCode = {
    html: `
    <div id="frame-text">
      <p>
        Donec ipsum nibh, tempus at leo non, pulvinar gravida ipsum. Pellentesque elit lectus, semper ut dignissim.
        <br/><br/>
        <strong>
          Pellentesque ac eros tristique, suscipit risus a, sodales nisi.
          Praesent tempor magna at bibendum congue.
        </strong>
      </p>
    </div>
    `,
    js: `
    tl.fromTo(
      "#frame-text",
      { x: 300, ease: EASE, duration: DURATION },
      { x: 0, ease: EASE, duration: DURATION, delay: DELAY }
    );`,
  };
  return textFrameCode;
}

function generateCarouselCode() {
  const carouselFrameCode = {
    html: `
    <div id="frame-carousel">
      <div class="carousel-cell">
        <img src="https://maximebenoit.work/projects/banner-mkr/banner-assets/image-carousel-1.jpg" alt="image-carousel" />
      </div>
      <div class="carousel-cell">
        <img src="https://maximebenoit.work/projects/banner-mkr/banner-assets/image-carousel-2.jpg" alt="image-carousel" />
      </div>
      <div class="carousel-cell">
        <img src="https://maximebenoit.work/projects/banner-mkr/banner-assets/image-carousel-3.jpg" alt="image-carousel" />
      </div>
    </div>
    `,
    js: `
    tl.fromTo(
      "#frame-carousel",
      { x: 300, ease: EASE, duration: DURATION },
      { x: 0, ease: EASE, duration: DURATION, delay: DELAY }
    );`,
  };
  return carouselFrameCode;
}

function generateCtaCode() {
  const ctaFrameCode = {
    html: `
    <div id="frame-cta">
      <p>
        Pellentesque ac eros tristique, suscipit risus a, sodales nisi.
        <strong>Praesent tempor magna.</strong>
      </p>
      <button aria-label="call to action">click on this button</button>
    </div>
    `,
    js: `
    tl.fromTo(
      "#frame-cta",
      { x: 300, ease: EASE, duration: DURATION },
      { x: 0, ease: EASE, duration: DURATION, delay: DELAY }
    );
    tl.fromTo(
      "#frame-cta button",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1 }
    );`,
  };
  return ctaFrameCode;
}

export {
  createDoctype,
  generateLogoCode,
  generateImageCode,
  generateTextCode,
  generateCarouselCode,
  generateCtaCode,
};
