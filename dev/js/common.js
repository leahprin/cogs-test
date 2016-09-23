(function ($) {
    
    $(window).resize(function(){
        if ($('.side-navigation').is(':visible')) {
            var currentWidth = $('.side-navigation').width();
            var windowWidth = $(window).width();
            if (currentWidth > windowWidth && windowWidth > 300) {
                var newWidth = windowWidth - 20;
                $('.side-navigation').css('width', newWidth + 'px');
            }
        }
    });
  
    $('.forceLoginModal').loginModal({
        onLoad: function () {
            $("#loginForm").validateLoginForm();
            $("#signupForm").validateSignupForm();
        }
    });
    

    /************************************************************************************
     *              FOLLOW AND UNFOLLOW ARTICLE PAGE JS
     ************************************************************************************/
    $('.followArticleBtn').followBlog({
        onSuccess: function (data, obj) {
           ($(obj).data('status') === 'follow') ? $(obj).html("Follow +") : $(obj).html("Following -");
            var message = ($(obj).data('status') === 'follow') ? 'Unfollow' : 'Follow';
            $.fn.General_ShowNotification({message: message + " blog successfully."});                 
        },
        beforeSend: function (obj) {
            $(obj).html('please wait...');
        },
        onError: function (obj, errorMessage) {
            $().General_ShowErrorMessage({message: errorMessage});
        }
    });
    
    /************************************************************************************
     *              FOLLOW AND UNFOLLOW USER PROFILE PAGE JS
     ************************************************************************************/
    
    $('.FollowProfileUser').followUser({
        onSuccess: function (data, obj) {
            var status = $(obj).data('status');
            $(obj).get(0).lastChild.nodeValue = " " + status.substr(0,1).toUpperCase()+status.substr(1);
            var message = ($(obj).data('status') === 'follow') ? 'Unfollow' : 'Follow';
            $.fn.General_ShowNotification({message: message + " user successfully."});   
        },
        beforeSend: function (obj) {
            $(obj).find('.fa').addClass('fa-spin fa-spinner');
        },
        onError: function (obj, errorMessage) {
            $().General_ShowErrorMessage({message: errorMessage});
        },
        onComplete: function (obj) {
            $(obj).find('.fa').removeClass('fa-spin fa-spinner');
        }
    });
    
    $('.UnfollowBlog').followBlog({
        onSuccess: function (data, obj) {
            $().General_ShowNotification({message: 'Blog(s) successfully unfollowed'});
            $(obj).parents('li').remove();
            if ($('.followBlogList li').length === 0) {
                $('.followBlogList').addClass('hide');
                $('#FollowingBlogs').find('p.no-data').removeClass('hide');
            }
        },
        onError: function (obj, errorMessage) {
            $().General_ShowErrorMessage({message: errorMessage});
        },
        beforeSend: function (obj) {
            $(obj).find('.fa').addClass('fa-spin fa-spinner');
        },
        onComplete: function (obj) {
            $(obj).find('.fa').removeClass('fa-spin fa-spinner');
        }
    });
        
    $('.UnfollowWriter').followUser({
        onSuccess: function (data, obj) {
            $().General_ShowNotification({message: 'Writer(s) successfully unfollowed'});
            $(obj).parents('li').remove();
            if ($('#FollowingWriters ul.tabular-data-listli').length === 0) {
                $('#FollowingWriters ul.tabular-data-list').addClass('hide');
                $('#FollowingWriters').find('p.no-data').removeClass('hide');
            }
        },
        onError: function (obj, errorMessage) {
            $().General_ShowErrorMessage({message: errorMessage});
        },
        beforeSend: function (obj) {
            $(obj).find('.fa').addClass('fa-spin fa-spinner');
        },
        onComplete: function (obj) {
            $(obj).find('.fa').removeClass('fa-spin fa-spinner');
        }
    });
    
    
    /************************************************************************************
     *                  USER EDIT PROFILE PAGE JS
     ************************************************************************************/
    
    
    // Upload Profile Image 
    $('.uploadFileBtn').cloudinary_upload_widget({
        cloud_name: _appJsConfig.cloudName,
        upload_preset: _appJsConfig.uploadPreset,
        // cropping: 'server',
        show_powered_by: false,
        resource_type: 'image',
        button_class: 'upload-profile',
        button_caption: '<i class="fa fa-plus-circle green"></i>add new image'
    },
    function (error, result) {
        if ( typeof(error) !== "undefined" && error !== null ) {
            return;
        }
        var publicId = result[0].public_id;
        var url = result[0].url;
        var width = result[0].width;
        var height = result[0].height;
        var resizeUrl = $.image({media: {id: publicId, cdnPath: url, cloudName: _appJsConfig.cloudName}, mediaOptions: {width: 120, height: 120, gravity: 'face', radius: 'max', crop: 'thumb'}});
        $('span.uploadedUser').css({"background-image": "url(" + resizeUrl + ")", "background-repeat": "no-repeat"});
        $('span.uploadedUser').find('.fa').hide();

        $('ul.cloudinary-thumbnails').hide();

        $('.userProfileImage').append('<input type="hidden" name="profile[publicId]" value="' + publicId + '" >');
        $('.userProfileImage').append('<input type="hidden" name="profile[cloudName]" value="' + _appJsConfig.cloudName + '" >');
        $('.userProfileImage').append('<input type="hidden" name="profile[cdnPath]" value="' + url + '" >');
        $('.userProfileImage').append('<input type="hidden" name="profile[width]" value="' + width + '" >');
        $('.userProfileImage').append('<input type="hidden" name="profile[height]" value="' + height + '" >');
    });
  
    
    $("#owl-thumbnails").owlCarousel({
        items: 2,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [980, 1],
        itemsTablet: [768, 1],
        itemsMobile: [600, 1],
        pagination: true,
        navigation: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 1000,
        navigationText: [
            "<i class='fa fa-angle-left fa-2x'></i>",
            "<i class='fa fa-angle-right fa-2x'></i>"
        ]
    });     
    
    $('.shareIcons').SocialShare({
        onLoad: function (obj) {
            var title = obj.parents('div.article').find('.card__news-category').text();
            var url = obj.parents('div.article').find('a').attr('href');
            var content = obj.parents('div.article').find('.card__news-description').text();
            $('.rrssb-buttons').rrssb({
                title: title,
                url: url,
                description: content
            });
            setTimeout(function () {
                rrssbInit();
            }, 10);
        }
    });
    
    //Contact form validation
    $('#contactForm').validate({
        rules: {
            name: "required",
            email: "required",
            message: "required"
        },
        errorElement: "span",
        messages: {
            name: "Name cannot be blank.",
            email: "Email cannot be blank.",
            message: "Message cannot be blank."
        }
    });
    
}(jQuery));


    


