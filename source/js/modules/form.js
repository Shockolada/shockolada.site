var ESC_KEYCODE = 27;

var form = document.querySelector('.contact__form');
var formAlert = document.querySelector('#form-alert').content.querySelector('.modal').cloneNode(true);
var formAlertClose = formAlert.querySelector('.modal-close');

var onModalEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeFormAlert();
  }
};

var showFormAlert = function (evt) {
  document.body.appendChild(formAlert);
  document.addEventListener('keydown', onModalEscPress);
};

var closeFormAlert = function () {
  formAlert.remove();
  document.removeEventListener('keydown', onModalEscPress);
};

formAlert.addEventListener('click', function (evt) {
  if (evt.target === formAlert) {
    closeFormAlert();
  }
});

formAlertClose.addEventListener('click', function () {
  closeFormAlert();
});


jQuery(document).ready(function() {
  $(".contact__form").submit(function(evt) {
    evt.preventDefault();
    $.ajax({
      url: 'send.php',
      type: "POST",
      data: $(this).serialize(),
      success: function () {
        showFormAlert();
        form.reset();
      },
      error: function() {
        alert('Возникла ошибка');
      }
    });
  });
});
