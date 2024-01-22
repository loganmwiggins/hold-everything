// MOBILE NAV
// --------------------------------------------------

    // variables
    const hamburger = document.querySelector(".hamburger");
    const mobileNav = document.querySelector(".mobile-nav");

    // click event to toggle hamburger animation and mobilenav animation
    hamburger.addEventListener("click", () => {
        // hamburger.style.background = "black";
        hamburger.classList.toggle("active");
        mobileNav.classList.toggle("active");
    })

    // when an mobnav item is selected, remove the active state from button and nav
    document.querySelectorAll(".mobnav-item").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileNav.classList.remove("active");
    }))






// HOME CAROUSEL
// --------------------------------------------------

    // variables
    var i = 0;                                          // start point
    var images = [];                                    // image array
    var time = 3000;                                    // in ms (3secs)

    // Image List
    images[0] = "assets/images/carousel/garage-open-min.jpg";
    images[1] = "assets/images/carousel/garage-closed-min.jpg";

    // Change Image func
    function changeImg() {
        if (i < images.length - 1) {                    // if current image isn't last image, inc i
            i++;
        }
        else {                                          // else, set i to first image at [0]
            i = 0;
        }

        document.slide.src = images[i];                 // set element to image at [i] index
        setTimeout("changeImg()", time);                // run changeImg() every 'time' ms
    }

    window.onload = changeImg;                          // run changeImg() when the page loads




// GALLERY SLIDER
// --------------------------------------------------


    // CAROUSEL FUNCTIONALITY
    // -------------------------
    const galCarousel = document.querySelector(".gal-carousel");
    const firstImg = galCarousel.querySelectorAll("img")[0];
    const arrowIcons = document.querySelectorAll(".arrow");

    let isDragStart = false; 
    let isDragging = false;
    let prevPageX, prevScrollLeft, positionDiff;


    // function to slide images according to arrow icon clicks
    arrowIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            let firstImgWidth = firstImg.clientWidth + 8;   //getting first image width and adding 5px margin-left value
            // if clicked icon is "left", reduce width val from the carousel scroll left, else add to it
            galCarousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;   
        })
    })

    // function to auto slide images to center of div
    const autoSlide = () => {
        //if there is no more images to scroll, then return from here
        if(galCarousel.scrollLeft == (galCarousel.scrollWidth - galCarousel.clientWidth)) return;

        positionDiff = Math.abs(positionDiff);              //makes positionDiff value always positive
        let firstImgWidth = firstImg.clientWidth + 8;       //getting first image width and adding 5px margin-left value
        let valDifference = firstImgWidth - positionDiff;   //getting difference value that needs to add/reduce from the carousel left to take middle img to the center
        
        if(galCarousel.scrollLeft > prevScrollLeft) {       //if current scrollLeft is more than previous scrollLeft, then user is scrolling to right
            return galCarousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;  //if user positionDiff is greater than 33% of image width then add difference value to the scrollLeft, else reduce positionDiff from it
        }
        // if user is scrolling to the left
        galCarousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }


    // three functions to click/press and drag to slide images
    const dragStart = (e) => {
        // updating global vars value on mouse down event
        isDragStart = true;
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = galCarousel.scrollLeft;    //scrollLeft gives the number of px of element content that is scrolled horiz
    }
    const dragging = (e) => {
        // scrolling gallery images to left according to mouse pointer
        if(!isDragStart) return;
        e.preventDefault();
        isDragging = true;
        galCarousel.classList.add("dragging");
        positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
        galCarousel.scrollLeft = prevScrollLeft - positionDiff;
    }
    const dragStop = () => {
        isDragStart = false;
        galCarousel.classList.remove("dragging");

        if(!isDragging) return; //isDragging will only be true if user starts dragging, otherwise it is false and autoSlide func won't call
        isDragging = false;
        autoSlide();    //calls autoSlide func
    }

    // if user clicks down (or touches screen), start drag
    galCarousel.addEventListener("mousedown", dragStart);   //desktop
    galCarousel.addEventListener("touchstart", dragStart);  //mobile
    // while mouse (or finger) is moving, drag
    galCarousel.addEventListener("mousemove", dragging);    //desktop
    galCarousel.addEventListener("touchmove", dragging);    //mobile
    // if user releases click/finger or mouse leaves drag area, stop drag
    galCarousel.addEventListener("mouseup", dragStop);      //desktop
    galCarousel.addEventListener("mouseleave", dragStop);   //desktop
    galCarousel.addEventListener("touchend", dragStop);     //mobile




    
