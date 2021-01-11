const navigation = () => {

  const sections = document.querySelectorAll('[data-section]'),
    navigationBox = document.querySelector('.main-nav'),
    navigationLinks = navigationBox.querySelectorAll('a');

  addHighlight(navigationLinks[0]);

  navigationBox.addEventListener('click', function (evt) {
    const target = evt.target;

    if (evt.target && evt.target.closest('a') || evt.target && evt.target.matches('a')) {
      evt.preventDefault();

      navigationLinks.forEach((link) => {
        if (target == link) {
          removeHighlight(navigationLinks);
          addHighlight(target);
        }
      });
    }
  });


  function addHighlight(item) {
    item.classList.add('active');
  }

  function removeHighlight(navigationLinks) {
    navigationLinks.forEach((link) => {
      link.classList.remove('active');
    });
  }

  window.addEventListener('scroll', highlightByScroll);

  function highlightByScroll() {
    sections.forEach((item) => {
      let pageY = document.documentElement.scrollTop,
        topOffset = document.querySelector('.page-header__wrap').offsetHeight,
        elTop = item.offsetTop - topOffset - 2,
        elBottom = elTop + item.offsetHeight,
        id = item.id;

      if (pageY > elTop && pageY < elBottom) {
        const active = document.querySelector(`[href='#${id}']`);

        if (active.classList.contains('active')) {
          return;
        } else {
          removeHighlight(navigationLinks);
          active.classList.add('active');
        }
      }
    });
  }
};

export default navigation;
