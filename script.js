//  Manual JS for Launch Page - AgyaAujla

document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    // Show loader and hide launch pages
    document.querySelector(".loader-container").style.visibility = "visible";
    document.querySelector(".calm_launch-page-container").style.visibility =
      "hidden";
    document.querySelector(".calm_launch-page-container_m").style.visibility =
      "hidden";
  } else {
    // Hide loader and show launch pages
    document.querySelector(".loader-container").style.display = "none";
    document.querySelector(".calm_launch-page-container").style.visibility =
      "visible";
    document.querySelector(".calm_launch-page-container_m").style.visibility =
      "visible";
  }
};

// DESKTOP       ===================================================================================================================================================

var tl_product_title_calm = gsap.timeline();
var tl_product_image = gsap.timeline();
var tl_product_ingredient = gsap.timeline();
gsap.registerPlugin(ScrollTrigger);

const canvas = document.querySelector("#frame");
const context = canvas.getContext("2d");

const frames = {
  currentIndex: 0,
  maxIndex: 65,
};

let imagesLoaded = 0;

const images = [];

function preloadImages() {
  for (var i = 0; i < frames.maxIndex; i++) {
    // const imageUrl = `https://cdn.shopify.com/s/files/1/0589/0192/1956/files/BodyButter${i
    //   .toString()
    //   .padStart(3, "0")}.png?v=1735800447`;

    //   https://cdn.shopify.com/s/files/1/0589/0192/1956/files/CM00.png?v=1736934344

      const imageUrl = `https://cdn.shopify.com/s/files/1/0589/0192/1956/files/Calming_Sunscreen_${i
        .toString()
        .padStart(3, "0")}.png?v=1737009142`;

        // https://cdn.shopify.com/s/files/1/0589/0192/1956/files/Calming_Sunscreen_054.png?v=1737009142

    const img = new Image();
    // console.log(imageUrl);
    img.src = imageUrl;
    img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === frames.maxIndex) {
        loadImage(frames.currentIndex);
        startAnimation();
      }
    };
    images.push(img);
  }
}

function loadImage(index) {
  // if (index >= 0 && index < frames.maxIndex) {
  //   const img = images[index];
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  //   const scaleX = canvas.width / img.width;
  //   const scaleY = canvas.height / img.height;
  //   const scale = 0.9;
  //   const newWidth = img.width * scale;
  //   const newHeight = img.height * scale;
  //   const offsetX = (canvas.width - newWidth) /2;
  //   const offsetY = (canvas.height - newHeight)/2 ;
  //   context.clearRect(0, 0, canvas.width, canvas.height);
  //   context.imageSmoothingEnabled = true;
  //   context.imageSmoothingQuality = "high";
  //   context.drawImage(img, offsetX, offsetY, newHeight, newHeight);
  //   frames.currentIndex = index;
  // }

  if(index >= 0 && index < frames.maxIndex) {
    const img = images[index];
    // canvas.width = window.innerWidth;
    canvas.width = 300 ;
    canvas.height = 600;
    // console.log(canvas.width);
    // console.log(img.width);
    // canvas.height = window.innerHeight;
    // console.log(canvas.height);
    // console.log(img.height);
    
    const scaleX = canvas.width / img.width;
    // console.log(scaleX);
    const scaleY = canvas.height / img.height;
    // console.log(scaleY);

    const scale = Math.max(scaleX, scaleY);
    // const scale = 0.9;

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
    frames.currentIndex = index;

  
  }
}

function startAnimation() {
  tl_product_title_calm = gsap.timeline({
    scrollTrigger: {
      trigger: ".product-image ",
      start: "top 55%",
      end: "top 5%",
      scrub: 1,
        // markers: true,
    },
  });

  tl_product_title_calm.to(".calm_right-title", {
    scrollTrigger: {
      trigger: ".product-image",
      start: "top 85%",
      end: "top 60%",
      scrub: 5,
      // markers: true,

      onUpdate: (self) => {
        const progress = self.progress;
        const rightTitle = document.querySelector(".calm_right-title h1");
        if (rightTitle) {
          if (progress > 0.5) {
            rightTitle.innerText = "NO!";
          } else {
            rightTitle.innerText = "NE?";
          }
        }
      },
    },
  });

  tl_product_title_calm.to(".calm_left-title", {
    x: "-50vw",
    duration: 2.5,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".product-image",
      start: "top 30%",
      end: "top 15%",
      scrub: 1,
        // markers: true,
    },
  });

  tl_product_title_calm.to(".calm_right-title", {
    x: "+50vw",
    duration: 2.5,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".product-image",
      start: "top 30%",
      end: "top 15%",
      scrub: 1,
      // markers: true,
    },
  });

  tl_product_title_calm.to(frames, {
    currentIndex: frames.maxIndex,
    onUpdate: function () {
      loadImage(Math.floor(frames.currentIndex));
    },
  });
  tl_product_title_calm.from(".benefits-product li", {
    y: 10,
    duration: 0.5,
    opacity: 0,
    delay: -1,
    stagger: 1,
    scrollTrigger: {
      trigger: ".product-image",
      start: "top 30%",
      end: "top 10%",
      scrub: 1,
      // markers: true
    },
  });
}

preloadImages();

// tl_product_ingredient.from(".ingrdient-card", {
//   y: 10,
//   duration: 0.5,
//   opacity: 0,
//   delay: 1,
//   stagger: 1,
//   scrollTrigger: {
//     trigger: ".ingrdient-card",
//     start: "top 65%",
//     end: "top 50%",
//     scrub: 1,
//   },
// });

gsap.from(".pre-order", {
  opacity: 0,
  zIndex: -1,
  scrollTrigger: {
    trigger: ".product-image ",
    start: "top 80%",
    end: "top 50%",
    scrub: 1,
  },
});

gsap.to(".explore", {
  opacity: 0,
  zIndex: -1,
  scrollTrigger: {
    trigger: ".product-image ",
    start: "top 100%",
    end: "top 99%",
    scrub: 1,
  },
});

// INGREDIENTS CARDS SWIPER
new Swiper(".card-wrapper", {
  loop: true,
  spaceBetween: 30,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },

  // Pagination bullets
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // Responsive breakpoints
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// MOBILE       ===================================================================================================================================================

var tl_product_title_m_calm = gsap.timeline();
var tl_product_image_m = gsap.timeline();
var tl_product_ingredient_m = gsap.timeline();
gsap.registerPlugin(ScrollTrigger);

const canvas_m = document.querySelector("#frame_m");
const context_m = canvas_m.getContext("2d");

const frames_m = {
  currentIndex: 0,
  maxIndex: 65,
};

let imagesLoaded_m = 0;

const images_m = [];

function preloadImages_m() {
  for (var i = 0; i < frames_m.maxIndex; i++) {
    const imageUrl_m = `https://cdn.shopify.com/s/files/1/0589/0192/1956/files/Calming_Sunscreen_${i
      .toString()
      .padStart(3, "0")}.png?v=1737009142`;
    const img_m = new Image();
    img_m.src = imageUrl_m;
    img_m.onload = () => {
      imagesLoaded_m++;
      if (imagesLoaded_m === frames_m.maxIndex) {
        loadImage_m(frames_m.currentIndex);
        startAnimation_m();
      }
    };
    images_m.push(img_m);
  }
}

function loadImage_m(index) {
  if (index >= 0 && index < frames_m.maxIndex) {
    // const img_m = images_m[index];
    // canvas_m.width = window.innerWidth;
    // canvas_m.height = window.innerHeight / 1.1;
    // const scaleX_m = canvas_m.width / img_m.width;
    // const scaleY_m = canvas_m.height / img_m.height;
    // const scale_m = 0.5 ;
    // const newWidth_m = img_m.width * scale_m;
    // const newHeight_m = img_m.height * scale_m;
    // const offsetX_m = (canvas_m.width - newWidth_m) / 2;
    // const offsetY_m = (canvas_m.height - newHeight_m) / 2;
    // context_m.clearRect(0, 0, canvas_m.width, canvas_m.height);
    // context_m.imageSmoothingEnabled = true;
    // context_m.imageSmoothingQuality = "high";
    // context_m.drawImage(img_m, offsetX_m, offsetY_m, newHeight_m, newHeight_m);
    // frames_m.currentIndex = index;

    const img_m = images_m[index];
    // canvas_m.width = 300;
    canvas_m.height = 500;


    const scaleX_m = canvas_m.width / img_m.width;
    const scaleY_m = canvas_m.height / img_m.height;

    // const scale_m = 0.5;
    const scale_m = Math.max(scaleX_m, scaleY_m);

    const newWidth_m = img_m.width * scale_m;
    const newHeight_m = img_m.height * scale_m;

    const offsetX_m = (canvas_m.width - newWidth_m) / 2;
    const offsetY_m = (canvas_m.height - newHeight_m) / 2;

    context_m.clearRect(0, 0, canvas_m.width, canvas_m.height);
    context_m.imageSmoothingEnabled = true;
    context_m.imageSmoothingQuality = "high";
    context_m.drawImage(img_m, offsetX_m, offsetY_m, newWidth_m, newHeight_m);
    frames_m.currentIndex = index;
  }
}

function startAnimation_m() {
  tl_product_title_m_calm = gsap.timeline({
    scrollTrigger: {
      trigger: ".product-image_m ",
      start: "top 25%",
      end: "top 0%",
      scrub: 1,
        // markers: true
    },
  });

  tl_product_title_m_calm.to(".calm_right-title_m", {
    scrollTrigger: {
      trigger: ".product-image_m",
      start: "top 85%",
      end: "top 60%",
      scrub: 5,
      // markers: true,

      onUpdate: (self) => {
        const progress = self.progress;
        const rightTitle = document.querySelector(".calm_right-title_m h1");
        if (rightTitle) {
          if (progress > 0.5) {
            rightTitle.innerText = "NO!";
          } else {
            rightTitle.innerText = "NE?";
          }
        }
      },
    },
  });

  tl_product_title_m_calm.to(".calm_left-title_m", {
    x: "-50vw",
    ease: "power1.out",
    fontSize: "28px",
    scrollTrigger: {
      trigger: ".product-image_m",
      start: "top 20%",
      end: "top 0%",
      scrub: 1,
      //   markers: true,
    },
  });

  tl_product_title_m_calm.to(".calm_right-title_m", {
    x: "+50vw",
    ease: "power1.out",
    fontSize: "28px",
    scrollTrigger: {
      trigger: ".product-image_m",
      start: "top 20%",
      end: "top 0%",
      scrub: 1,
      // markers: true,
    },
  });

  tl_product_title_m_calm.to(frames_m, {
    currentIndex: frames_m.maxIndex,
    onUpdate: function () {
      loadImage_m(Math.floor(frames_m.currentIndex));
    },
  });

  tl_product_title_m_calm.from(".benefits-product_m li", {
    y: 10,
    duration: 0.5,
    opacity: 0,
    delay: -1,
    stagger: 1,

    scrollTrigger: {
      trigger: ".benefits-product_m li",
      start: "top 75%",
      end: "top 55%",
      scrub: 1,
      // markers: true,
    },
  });

  // tl_product_title_m_calm.to(".product-image_m", {
  //   y: -300,
  //   scrollTrigger: {
  //     trigger: ".benefits-product_m li",
  //     start: "top 30%",
  //     end: "top 10%",
  //     scrub: 1,
  //     // markers: true
  //   },
  // });
}

preloadImages_m();

// tl_product_ingredient_m.from(".ingrdient-card_m", {
//   y: 10,
//   duration: 0.5,
//   opacity: 0,
//   delay: 1,
//   stagger: 1,
//   scrollTrigger: {
//     trigger: ".ingrdient-card_m",
//     start: "top 60%",
//     end: "top 40%",
//     scrub: 1,
//   },
// });

gsap.from(".pre-order_m", {
  opacity: 0,
  zIndex: -1,
  scrollTrigger: {
    trigger: ".product-image_m ",
    start: "top 80%",
    end: "top 50%",
    scrub: 1,
  },
});

gsap.to(".explore_m", {
  opacity: 0,
  zIndex: -1,
  scrollTrigger: {
    trigger: ".product-image_m ",
    start: "top 100%",
    end: "top 99%",
    scrub: 1,
  },
});
// gsap.to(".pre-order_m", {
//   opacity: 0,
//   zIndex: -1,
//   scrollTrigger: {
//     trigger: ".clean-reels h2",
//     start: "top 40%",
//     end: "top 30%",
//     scrub: 1,
//     // markers: true
//   },
// });
