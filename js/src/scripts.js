$(document).ready(function() {
    var disabled = false;

    $("#carsSlider").owlCarousel({
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: false,
        loop: true,
        smartSpeed: 1000,
       /*  animateOut: 'fadeOut',
        animateIn: 'fadeIn', */
        margin: 0,
        navContainer: $('.nav-elements'),
        nav: true,
        dots: false,
        items: 1,
        autoHeight: true,
        mouseDrag: false,
        onInitialized: function(event) {
            setTimeout(function() {
                $('#carsSlider').show();
            }, 200);
        }
    });
    // =============== SCROLL TO PLUGIN ==================
    $("a[rel='m_PageScroll2id']").mPageScroll2id({
        offset: 100,
        //highlightClass: "active-menu"
    });

    //========== CONTACT FORM ============================
    $("#form-contact-us").validate({
        rules: {
            name: "required",
            email: "required",
            phone: "required",
            message: "required"
        },
        submitHandler: function() {
            if (!disabled) {
                var button = $(".btn-submit");
                button.disabled = true;
                button.val("Sending...");
                var data = $(this.currentForm).serialize();  
                $.ajax('http://api.mywaytransportation.platinuminkdesign.com', {
                    dataType: 'json',
                   'type': 'POST', 
                    crossDomain: true,
                    data: data
                }).done(function(success) {
                    $("#contact_name").val("");
                    $("#contact_email").val("");
                    $("#contact_phone").val("");
                    $("#contact_message").val("");
                    toastr.success("Send mail success!")
                }).error(function(error) {
                    toastr.error("An error occured.")
                }).always(function() {
                    disabled = false;
                    button.enabled = false;
                    button.val("Send");
                });
            }
        }
    });

    //========== BOOK FORM ===============================
    $("#book-form").validate({
        rules: {
            from: "required",
            to: "required",
            name: "required",
            phone: "required",
            email: "required",
            date: "required",
            time: "required"
        },
        submitHandler: function() {
            if (!disabled) {
                var button = $(".btn-submit");
                button.disabled = true;
                button.val("Sending...");
                var data = $(this.currentForm).serialize();
                $.ajax('http://api.mywaytransportation.platinuminkdesign.com', {
                    dataType: 'json',
                   'type': 'POST', 
                    crossDomain: true,
                    data: data
                }).success(function(success) {
                    $("#from").val("");
                    $("#to").val("");
                    $("#name").val("");
                    $("#email").val("");
                    $("#phone").val("");
                    $("#datepicker").val("");
                    $("#timepicker").val("");
                    toastr.success("Booking success!")
                }).error(function(error) {
                    toastr.error("An error occured.")
                }).always(function() {
                    disabled = false;
                    button.enabled = false;
                    button.val("Send");
                });
            }
        }
    });
    //*************  MAGIC SCROLLING **********************************

    /*     var controller = new ScrollMagic.Controller();
        var sceneHeader = new ScrollMagic.Scene({
                triggerElement: "#hospice-care",
                triggerHook: '0.5',
                offset: "0"
            })
            //.addIndicators()
            .addTo(controller);
        sceneHeader.setClassToggle("#hospice-care", "scrolled-hospice"); */

    //*************  Flat picker **********************************
    var optional_config = {};
    $("#datepicker").flatpickr({
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
    });
    $("#timepicker").flatpickr({
        enableTime: true,
        noCalendar: true,
        time_24hr: false,
        dateFormat: "H:i",
    });
    // ============= MOBILE DROPDOWN =================
    $('#toggleMobileMEnu').click(function() {
        $(this).toggleClass('is-active');
        $('#overlay').toggleClass('open');
        $('.switcher1').toggleClass('hide-me');
    });

    $('.overlay-menu a').click(function() {
        $('#toggleMobileMEnu').toggleClass('is-active');
        $('#overlay').toggleClass('open');
        $('.switcher1').toggleClass('hide-me');
    });


    // ================TOASTER ==========================

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "30000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    function animateTexts() {
        setTimeout(() => {
            $('.text-place-banner').addClass('make-visible bounceInLeft');
        }, 1000);
    }
    animateTexts();
});