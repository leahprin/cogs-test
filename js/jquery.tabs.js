(function($) {
  "use strict";
  $.fn.tabs = function(method) {
    var methods;
    methods = {
      init: function(options) {
        this.tabs.settings = $.extend(this.tabs.defaults, options);
        return this.each(function() {
          var $contents, $links, settings;
          settings = $.fn.tabs.settings;
          $links = $(this).find("." + settings.navigation);
          $contents = $(this).find("." + settings.content);
          $contents.hide();
          $contents.first().show();
          $links.first().addClass(settings.selectClass);
          return $links.on("click", function(e) {
            e.preventDefault();
            $links.removeClass(settings.selectClass);
            $(this).addClass(settings.selectClass);
            $("." + settings.content).hide();
            return $("#" + ($(this).data("target"))).show();
          });
        });
      }
    };
    return methods.init.apply(this, arguments);
  };
  $.fn.tabs.defaults = {
    navigation: "tabs__navigation-link",
    content: "tabs__content",
    selectClass: "tabs__navigation-link--selected"
  };
  return $.fn.tabs.settings = {};
})(jQuery);
