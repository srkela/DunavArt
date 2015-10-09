//console.log('\'Allo \'Allo!');

//RESIZE BANER TO WINDOWS SIZE

 $(document).ready(function(){
  'use strict';
   var h = $(window).height();
  // var w = $(window).width() + 30;
  //
   $('#header').height(h);
  // $('#header').width(w);
//
// //   $(window).bind('resize',function(){
// //   window.location.href = window.location.href;
// //
// //
// // });
//   $(window).on('resize',function(){location.reload();});

  $('body').backstretch('../images/3edbeed1.zitni-trg.jpg', {centeredX: false});

  $('#header').css('z-index', 1);

  $('.navbar-fixed-top').autoHidingNavbar({
    showOnUpscroll: true,
    hideOffset: 3000,
    showOnBottom: true
  });

//AUTOSCROLL ADJUSTMENTS
  $('#header a').bind('click', function(e) {
      var target = $(this).attr('href'); // Get the target element
      var scrollToPosition = $(target).offset().top - 45; // Position to scroll to
      //console.log(scrollToPosition);
      $('html /* For FF & IE */,body /* For Chrome */').animate({
          'scrollTop': scrollToPosition
      }, 1500, function(target){
          window.location.hash = target;
      });
      e.preventDefault();
  });

  //CONTACT MAIL FORM
      $('input,textarea').jqBootstrapValidation({
          preventSubmit: true,
          submitError: function($form, event, errors) {
              // additional error messages or events
          },
          submitSuccess: function($form, event) {
              event.preventDefault(); // prevent default submit behaviour
              // get values from FORM
              var name = $('input#name').val();
              var email = $('input#email').val();
              var message = $('textarea#message').val();
              var firstName = name; // For Success/Failure Message
              // Check for white space in name for Success/Fail message
              if (firstName.indexOf(' ') >= 0) {
                  firstName = name.split(' ').slice(0, -1).join(' ');
              }
              $.ajax({
                  url: '././mail/contact_me.php',
                  type: 'POST',
                  data: {
                      name: name,
                      email: email,
                      message: message
                  },
                  cache: false,
                  success: function() {
                      // Success message
                      $('#success').html('<div class="alert alert-success">');
                      $('#success > .alert-success').html('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;')
                          .append('</button>');
                      $('#success > .alert-success')
                          .append('<strong>Vaša poruka je poslata. </strong>');
                      $('#success > .alert-success')
                          .append('</div>');

                      //clear all fields
                      $('#contactForm').trigger('reset');
                  },
                  error: function() {
                      // Fail message
                      $('#success').html('<div class="alert alert-danger">');
                      $('#success > .alert-danger').html('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;')
                          .append('</button>');
                      $('#success > .alert-danger').append('<strong>Žao nam je, Ne postoji veza sa serverom. Molimo pokušajte ponovo ili pošaljite poruku it vašeg mail klijenta.');
                      $('#success > .alert-danger').append('</div>');
                      //clear all fields
                      $('#contactForm').trigger('reset');
                  },
              });
          },
          filter: function() {
              return $(this).is(':visible');
          },
      });

      $('a[data-toggle=\"tab\"]').click(function(e) {
          e.preventDefault();
          $(this).tab('show');
      });
  });


  /*When clicking on Full hide fail/success boxes */
  $('#name').focus(function() {
    'use strict';
      $('#success').html('');


 });
