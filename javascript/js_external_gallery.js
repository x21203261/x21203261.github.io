/* Gallery Page Functionality
 * 
 * This JavaScript file contains a number of functions:
 * Functions 1 and 2 are called from clicks in the gallery html page
 * Function 3 is then called from within functions 1 and 2
 * i.e Function 1 and 2 are 2 separate ways of triggering function 3
 *
 * 1. changeSlide() - used show an image (via function 3) in slideshow from the arrow controls on the page
 * 2. thumbSlide() - used to show an image (via function 3) in slideshow by selecting the related thumbnail
 * 3. openSlide() - primary function used to open the image in the slideshow
 * 
 * */

// Index to set that the first image be opened in slideshow by default when openSlide is called
let slideIndex = 1;
openSlide (slideIndex);

// Called when forward/backward arrows clicked on the gallery page
// Adds 1 (forwards) or adds -1 (backwards) to the index, then displays the slide with that index
function changeSlide(n) {
  openSlide(slideIndex += n);
}

// Called when a thumbnail is clicked on the gallery page
// Index set equal to the index for the thumbnail (in the hallery html), then displays the slide with that index
function thumbSlide(n) {
  openSlide(slideIndex = n);
}

// Function to display an image at set index in the slideshow container
// Displays relevant element based on thumbnail or navigation arrow selection, and hides non-relevant elements
function openSlide(n) {
  let i;
  let slides = document.getElementsByClassName("slideImage");
  if (n > slides.length) {slideIndex = 1;}
  if (n < 1) {slideIndex = slides.length;}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

