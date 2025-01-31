$(document).ready(function () {

  $('#menu').click(function () {
      $(this).toggleClass('fa-times');
      $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('scroll load', function () {
      $('#menu').removeClass('fa-times');
      $('.navbar').removeClass('nav-toggle');

      if (window.scrollY > 60) {
          document.querySelector('#scroll-top').classList.add('active');
      } else {
          document.querySelector('#scroll-top').classList.remove('active');
      }

      // scroll spy
      $('section').each(function () {
          let height = $(this).height();
          let offset = $(this).offset().top - 200;
          let top = $(window).scrollTop();
          let id = $(this).attr('id');

          if (top > offset && top < offset + height) {
              $('.navbar ul li a').removeClass('active');
              $('.navbar').find(`[href="#${id}"]`).addClass('active');
          }
      });
  });
  
    // Smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top,
            },
            500,
            'linear'
        );
    });
});

// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["frontend development", "backend development", "web designing", "python", "web development", "blender", "studies"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->

// Birthdate details
const birthDate = new Date("2011-09-24T18:10:00+05:30");

// Function to calculate age
function calculateAge() {
    const now = new Date();
    let age = now.getFullYear() - birthDate.getFullYear();

    // Check if birthday has occurred this year
    const hasBirthdayPassed = 
        now.getMonth() > birthDate.getMonth() || 
        (now.getMonth() === birthDate.getMonth() && now.getDate() >= birthDate.getDate());

    // Adjust age if birthday hasn't occurred yet this year
    if (!hasBirthdayPassed) {
        age -= 1;
    }

    return age;
}

// Display the calculated age
document.getElementById("age").textContent = calculateAge();

//Set year in footer
document.getElementById("year").textContent = new Date().getFullYear();


// Hover effect on skills
const skillBars = document.querySelectorAll('.skills .container .bar');
// Add event listeners for hover effect
skillBars.forEach(bar => {
  bar.addEventListener('mouseenter', () => {
    if (!isScrollRevealActive) {  // Only apply hover effect if ScrollReveal is not active
      // Scale up the hovered bar and scale down the others
      skillBars.forEach(otherBar => {
        if (otherBar === bar) {
          otherBar.style.transform = 'scale(1.2)';
        } else {
          otherBar.style.transform = 'scale(0.9)';
        }
      });
    }
  });

  bar.addEventListener('mouseleave', () => {
    if (!isScrollRevealActive) {  // Only reset hover effect if ScrollReveal is not active
      // Reset the scale of all bars when hover ends
      skillBars.forEach(otherBar => {
        otherBar.style.transform = 'scale(1)';
      });
    }
  });
});

//hover effect on social icons
document.addEventListener("DOMContentLoaded", function () {
  const socialIcons = document.querySelectorAll(".social-icons a");

  socialIcons.forEach(icon => {
    icon.addEventListener("mouseover", () => {
      icon.style.transform = "scale(1.1)";
      icon.style.transition = "transform 0.2s ease";
    });

    icon.addEventListener("mouseout", () => {
      icon.style.transform = "scale(1)";
    });
  });
});

// disable developer mode
document.onkeydown = function(e) {
    if(e.keyCode == 123) {
       return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
       return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
       return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
       return false;
    }
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
       return false;
    }
  }


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});
// Flag to check if ScrollReveal is active
let isScrollRevealActive = false;

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .chessdotcom', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .lichess', { interval: 1000 });
srtop.reveal('.home .wikipedia', { interval: 700 });
srtop.reveal('.home .stackoverflow', { interval: 600 });
srtop.reveal('.home .youtube', { interval: 600 });
srtop.reveal('.home .orcid', { interval: 600 });
srtop.reveal('.home .discord', { interval: 700 });
srtop.reveal('.home .snapchat', { interval: 750 });
srtop.reveal('.home .quora', { interval: 850 });
srtop.reveal('.home .reddit', { interval: 900 });
srtop.reveal('.home .facebook', { interval: 950 });
srtop.reveal('.home .instagram', { interval: 1000 });
srtop.reveal('.home .threads', { interval: 1050 });
srtop.reveal('.home .x', { interval: 1100 });
srtop.reveal('.home .pinterest', { interval: 1150 });
srtop.reveal('.home .skype', { interval: 1200 });
srtop.reveal('.home .zoom', { interval: 1250 });
srtop.reveal('.home .twitch', { interval: 1300 });
srtop.reveal('.home .tiktok', { interval: 1350 });
srtop.reveal('.home .linkedin', { interval: 1400 });
srtop.reveal('.home .steam', { interval: 1450 });
srtop.reveal('.home .epic-games', { interval: 1500 });
srtop.reveal('.home .spotify', { interval: 1550 });
srtop.reveal('.home .plarium', { interval: 1600 });


/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
// Reveal skill bars using ScrollReveal
srtop.reveal('.skills .container .bar', { 
  delay: 400,
  beforeReveal: () => {
      isScrollRevealActive = true;  // Set flag to true when ScrollReveal is about to reveal
  },
  afterReveal: () => {
      isScrollRevealActive = false;  // Set flag to false after ScrollReveal completes
  }
});


/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });