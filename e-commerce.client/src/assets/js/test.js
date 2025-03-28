$(document).ready(function () {
  // تأكد من أن هذه هي الحاوية التي تحتوي على الشرائح
  $('.slider-content-activation-one').slick({
    infinite: true,
    autoplay: true,
    arrows: true,
    dots: true,
    speed: 1000,
    autoplaySpeed: 3000,
  });
});
