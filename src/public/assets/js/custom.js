(function ($) {
    "use strict";
    var mainApp = {

        main_fun: function () {
            /*====================================
            METIS MENU 
            ======================================*/
            $('#main-menu').metisMenu();

            /*====================================
              LOAD APPROPRIATE MENU BAR
           ======================================*/
            $(window).bind("load resize", function () {
                if ($(this).width() < 768) {
                    $('div.sidebar-collapse').addClass('collapse')
                } else {
                    $('div.sidebar-collapse').removeClass('collapse')
                }
            });

            /*====================================
            MORRIS BAR CHART
         ======================================*/
            // Morris.Bar({
            //     element: 'morris-bar-chart',
            //     data: [{
            //         y: '2006',
            //         a: 100,
            //         b: 90
            //     }, {
            //         y: '2007',
            //         a: 75,
            //         b: 65
            //     }, {
            //         y: '2008',
            //         a: 50,
            //         b: 40
            //     }, {
            //         y: '2009',
            //         a: 75,
            //         b: 65
            //     }, {
            //         y: '2010',
            //         a: 50,
            //         b: 40
            //     }, {
            //         y: '2011',
            //         a: 75,
            //         b: 65
            //     }, {
            //         y: '2012',
            //         a: 100,
            //         b: 90
            //     }],
            //     xkey: 'y',
            //     ykeys: ['a', 'b'],
            //     labels: ['Series A', 'Series B'],
            //     hideHover: 'auto',
            //     resize: true
            // });

            /*====================================
          MORRIS DONUT CHART
       ======================================*/
            // Morris.Donut({
            //     element: 'morris-donut-chart',
            //     data: [{
            //         label: "Download Sales",
            //         value: 12
            //     }, {
            //         label: "In-Store Sales",
            //         value: 30
            //     }, {
            //         label: "Mail-Order Sales",
            //         value: 20
            //     }],
            //     resize: true
            // });

            /*====================================
         MORRIS AREA CHART
      ======================================*/

            // Morris.Area({
            //     element: 'morris-area-chart',
            //     data: [{
            //         period: '2010 Q1',
            //         iphone: 2666,
            //         ipad: null,
            //         itouch: 2647
            //     }, {
            //         period: '2010 Q2',
            //         iphone: 2778,
            //         ipad: 2294,
            //         itouch: 2441
            //     }, {
            //         period: '2010 Q3',
            //         iphone: 4912,
            //         ipad: 1969,
            //         itouch: 2501
            //     }, {
            //         period: '2010 Q4',
            //         iphone: 3767,
            //         ipad: 3597,
            //         itouch: 5689
            //     }, {
            //         period: '2011 Q1',
            //         iphone: 6810,
            //         ipad: 1914,
            //         itouch: 2293
            //     }, {
            //         period: '2011 Q2',
            //         iphone: 5670,
            //         ipad: 4293,
            //         itouch: 1881
            //     }, {
            //         period: '2011 Q3',
            //         iphone: 4820,
            //         ipad: 3795,
            //         itouch: 1588
            //     }, {
            //         period: '2011 Q4',
            //         iphone: 15073,
            //         ipad: 5967,
            //         itouch: 5175
            //     }, {
            //         period: '2012 Q1',
            //         iphone: 10687,
            //         ipad: 4460,
            //         itouch: 2028
            //     }, {
            //         period: '2012 Q2',
            //         iphone: 8432,
            //         ipad: 5713,
            //         itouch: 1791
            //     }],
            //     xkey: 'period',
            //     ykeys: ['iphone', 'ipad', 'itouch'],
            //     labels: ['iPhone', 'iPad', 'iPod Touch'],
            //     pointSize: 2,
            //     hideHover: 'auto',
            //     resize: true
            // });

            /*====================================
    MORRIS LINE CHART
 ======================================*/
            // Morris.Line({
            //     element: 'morris-line-chart',
            //     data: [{
            //         y: '2006',
            //         a: 100,
            //         b: 90
            //     }, {
            //         y: '2007',
            //         a: 75,
            //         b: 65
            //     }, {
            //         y: '2008',
            //         a: 50,
            //         b: 40
            //     }, {
            //         y: '2009',
            //         a: 75,
            //         b: 65
            //     }, {
            //         y: '2010',
            //         a: 50,
            //         b: 40
            //     }, {
            //         y: '2011',
            //         a: 75,
            //         b: 65
            //     }, {
            //         y: '2012',
            //         a: 100,
            //         b: 90
            //     }],
            //     xkey: 'y',
            //     ykeys: ['a', 'b'],
            //     labels: ['Series A', 'Series B'],
            //     hideHover: 'auto',
            //     resize: true
            // });
           
     
        },

        initialization: function () {
            mainApp.main_fun();

        }

    }
    // Initializing ///
    $(document).ready(function () {
        mainApp.main_fun();

        let appOrigin = window.location.origin;

        // Change avatar
        $(document).on('click', '#display-avatar', function () {
			document.getElementById('user-avatar').click();
		});

        let avatarFile = '';

        $(document).on('change', '#user-avatar', function() {

            let user_id = $("#user_id").val();
            const file = this.files[0];

            if (file){
                let reader = new FileReader();
                reader.onload = function(event){
                $('#display-avatar').attr('src', event.target.result);
                
                if(confirm('Are you sure to upload the image?')){

                    const formData = new FormData();
                    formData.append('avatar', file);
                    formData.append('user_id', user_id);

                    jQuery.ajax({
                        type: 'POST',
                        url: appOrigin + '/settings/upload',
                        data: formData,
                        contentType: false,
                        cache: false,
                        processData:false,
                        success: function (res) {
                            console.log(res)
                        },
                        errorf: function (err) {
                            jQuery('.error-show').html(err);
                        },
                        statusCode: {
                            400: function (e) {
                                jQuery('.error-show').html(e.responseText);
                            },
                        },
                    });
                }
                }
        
                avatarFile = file;
                reader.readAsDataURL(file);
            }
        });

        $(document).on('click', '#update-password', function() {
            
            let currentPassword = $("#current-password").val();
            let newPassword = $("#new-password").val();
            let confirmPassword = $("#confirm-password").val();


            if( currentPassword == '' || newPassword == '' || confirmPassword == '' ) {
                alert('All fields are required!');
                return;
            }

            jQuery.ajax({
                type: 'POST',
                url: appOrigin + '/settings/forgot-password',
                data: {
                    email : 'muhin.cse.diu@gmail.com'
                },
                success: function (res) {
                    console.log(res)
                },
                errorf: function (err) {
                    jQuery('.error-show').html(err);
                },
                statusCode: {
                    400: function (e) {
                        jQuery('.error-show').html(e.responseText);
                    },
                },
            });

            let token = getCookie('resetToken');

            jQuery.ajax({
                type: 'POST',
                url: appOrigin + '/settings/reset-password',
                data: {
                    token : token,
                    password: newPassword,
                },
                success: function (res) {
                    console.log(res)
                },
                errorf: function (err) {
                    jQuery('.error-show').html(err);
                },
                statusCode: {
                    400: function (e) {
                        jQuery('.error-show').html(e.responseText);
                    },
                },
            });

        });

        function getCookie(name){
            var pattern = RegExp(name + "=.[^;]*")
            var matched = document.cookie.match(pattern)
            if(matched){
                var cookie = matched[0].split('=')
                return cookie[1]
            }
            return false
        }

    });

    $.fn.checkCooke = function(name) {
        var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
        return match ? match[1] : null;
    }

    if( $.fn.checkCooke('lastLogin') ) {
        let lastLogin = $.fn.checkCooke('lastLogin');
        var local = new Date(lastLogin).toLocaleDateString('en-GB', {
            day : 'numeric',
            month : 'short',
            year : 'numeric'
        }).split(' ').join('-');
        $("#todoister-last-login").text(local)

        console.log('I got it ==>', local);
    }

}(jQuery));


