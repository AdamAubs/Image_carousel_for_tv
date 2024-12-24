let slideIndex = 0;
let images = [];
let autoSlideInterval; // To store the interval ID

// Fetch images asynchronously
async function fetchImages() {
  try {
    const response = await fetch("./images.json"); // Make sure the images.json file is in the correct location
    if (!response.ok) throw new Error("Failed to load images");
    const data = await response.json();
    images = data; // Store images in the images array
    renderSlides(); // Call the function to render the images once they are fetched
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

// Render images into the carousel
function renderSlides() {
  const slideshowContainer = document.querySelector(".slideshow-container");

  // Clear any existing slides
  slideshowContainer.innerHTML = "";

  // Loop through the images and create image elements for each
  images.forEach((img, index) => {
    const slide = document.createElement("div");
    slide.classList.add("mySlides", "fade");
    slide.innerHTML = `<img src="${img.src}" alt="${img.alt}" style="width:100%">`;
    slideshowContainer.appendChild(slide);
  });

  // Show the first slide after rendering
  showSlides(slideIndex);
}

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Show slides
function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides");
  if (n >= slides.length) {
    slideIndex = 0;
  }
  if (n < 0) {
    slideIndex = slides.length - 1;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; // Hide all slides
  }

  slides[slideIndex].style.display = "block"; // Show the current slide
}

// Start automatic slideshow
function startAutoSlideshow() {
  // Check if the slideshow is already running
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval); // Stop the current slideshow if it's already running
  }

  // Start a new interval that changes the slide every 3 seconds (3000ms)
  autoSlideInterval = setInterval(() => {
    plusSlides(1); // Move to the next slide
  }, 2000); // Change the slide every 3 seconds
}

// Stop automatic slideshow
function stopAutoSlideshow() {
  clearInterval(autoSlideInterval); // Stop the interval
  autoSlideInterval = null; // Reset the interval ID
}

// Event listener for the auto slideshow button
document.getElementById("auto-slideshow").addEventListener("click", () => {
  if (autoSlideInterval) {
    stopAutoSlideshow(); // If slideshow is running, stop it
  } else {
    startAutoSlideshow(); // If slideshow is not running, start it
  }
});

// Initialize by fetching the images
fetchImages();
