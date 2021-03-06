function header() {
  const header = document.querySelector('.page-header');
  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

export default header;
