(function($) {
  "use strict";
  $.fn.slider = function(method) {
    var methods;
    methods = {
      init: function(options) {
        this.slider.settings = $.extend(this.slider.defaults, options);
        return this.each(function() {
          return $(this).on("click", function(e) {
            var $container, $link, settings;
            e.preventDefault();
            settings = $.extend($.fn.slider.settings, options);
            $link = $(this);
            $container = settings.container;
            if ($link.hasClass(settings.expandClass)) {
              return $container.slideUp(100, function() {
                return $link.removeClass(settings.expandClass);
              });
            } else {
              return $container.slideDown(100, function() {
                return $link.addClass(settings.expandClass);
              });
            }
          });
        });
      }
    };
    return methods.init.apply(this, arguments);
  };
  $.fn.slider.defaults = {
    container: $(".contents"),
    expandClass: "expand"
  };
  return $.fn.slider.settings = {};
})(jQuery);
