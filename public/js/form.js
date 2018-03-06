$(function () {
  $('#login-form-link').click(function (e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $('#register-btn-select').removeClass('active');
    $('#login-btn-select').addClass('active');
    e.preventDefault();
  });

  $('#register-form-link').click(function (e) {
    $("#register-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $('#login-btn-select').removeClass('active');
    $('#register-btn-select').addClass('active');
    $(this).addClass('active');
    e.preventDefault();
  });

});
