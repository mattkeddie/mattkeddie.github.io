/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  if (window.innerWidth < 800) {
    return;
  }
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("myTopnav").style.top = "0";
  } else {
    document.getElementById("myTopnav").style.top = "-80px";
  }
  prevScrollpos = currentScrollPos;
}

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
    document.getElementById("myname").style.display = "none";
    document.getElementById("intro").style.marginTop = "0px";
  } else {
    x.className = "topnav";
    document.getElementById("myname").style.display = "block";
    document.getElementById("intro").style.marginTop = "50px";
  }
}