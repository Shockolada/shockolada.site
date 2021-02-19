const scrollToTop = () => {
  const scrollTopBtn = document.querySelector('[data-trigger="scroll-top"]');

  window.addEventListener("scroll", () => {
    let pageY = document.documentElement.scrollTop,
      pageOffsetTop = window.innerHeight;

    if (pageY > pageOffsetTop) {
      showScrollBtn();
    } else {
      hideScrollBtn();
    }
  });

  scrollTopBtn.addEventListener('click', (evt) => {
    if (evt.target) {
      evt.preventDefault();
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  function showScrollBtn() {
    scrollTopBtn.classList.remove('hidden');
  }

  function hideScrollBtn() {
    scrollTopBtn.classList.add('hidden');
  }

  // scrollTopBtn.click(function (evt) {
  //   evt.preventDefault();
  //   $('html, body').animate({
  //     scrollTop: 0
  //   }, '300');
  // });
};

export default scrollToTop;
