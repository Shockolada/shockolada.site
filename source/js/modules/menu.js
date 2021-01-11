const menu = () => {
  const menu = document.querySelector('.menu-mobile'),
    menuTrigger = document.querySelector('.menuToggleBtn');

  menuTrigger.addEventListener('click', (evt) => {
    if (evt.target) {
      evt.preventDefault();
    }

    if (menu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  function openMenu() {
    menu.classList.add('active');
    menuTrigger.classList.add('active');
    document.addEventListener('click', onOutClick);
  }

  function closeMenu() {
    menu.classList.remove('active');
    menuTrigger.classList.remove('active');
    document.removeEventListener('click', onOutClick);
  }

  function onOutClick(evt) {
    const target = evt.target;
    if (!(target && target.closest('.menu-mobile') || target && target.matches('.menu-mobile')) && !(target && target.closest('.menuToggleBtn') || target && target.matches('.menuToggleBtn'))) {
      closeMenu();
    }
  }
};

export default menu;
