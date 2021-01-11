const anchorSmoothScroll = (triggerSelector, offsetTop = 0) => {
  const triggers = document.querySelectorAll(triggerSelector);

  triggers.forEach(link => {
    link.addEventListener('click', function (evt) {
      if (evt.target) {
        evt.preventDefault();
      }

      scroll(link);
    });
  });

  function scroll(el) {
    const href = el.getAttribute('href').substring(1),
      elementToScroll = document.getElementById(href),
      elementPosition = elementToScroll.getBoundingClientRect().top,
      offsetPosition = elementPosition - offsetTop;

    window.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export default anchorSmoothScroll;
