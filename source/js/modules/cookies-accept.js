const cookiesAccept = () => {
  const cookiesContainer = document.querySelector('.cookies'),
    cookiesAcceptBtn = cookiesContainer.querySelector('[data-accept-cookies]');

  if (!getCookie('accept_cookies_shockolada')) {
    cookiesContainer.classList.add('active');
  }

  cookiesAcceptBtn.addEventListener('click', () => {
    setCookie('accept_cookies_shockolada', true, 7);
    cookiesContainer.classList.remove('active');
  });

  function setCookie(cname, cvalue, days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + date.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  function getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
};

export default cookiesAccept;
