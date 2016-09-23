$(document).ready(function() {
  var cardHolder;
  $('.header__heading-link--responsive').bigSlide({
    menu: '.side-navigation',
    menuWidth: $(window).width() < 480 ? '260px' : '400px',
    easyClose: true,
    side: 'left',
    activeBtn: 'close',
    beforeOpen: function() {
      return $(this.menu).css('visibility', 'visible');
    },
    afterClose: function() {
      return $(this.menu).css('visibility', 'hidden');
    }
  });
  $('#search').on('click', function(e) {
    var $container;
    $container = void 0;
    e.preventDefault();
    $container = $(this).parents('.header__heading').find('.header__search').fadeIn(100);
    $container.fadeIn();
    return $container.find('.header__search-text').focus();
  });
  $('.header__search-close').on('click', function(e) {
    e.preventDefault();
    return $(this).parents('.header__search').hide();
  });
  $('#login').on('click', function(e) {
    e.preventDefault();
    return $('.login-form').simplemodal({
      overlayClose: true,
      opacity: 80,
      fixed: false,
      zIndex: 11010
    });
  });
  $('#profile').on('click', function(e) {
    e.preventDefault();
    return $('#header__menu').simplemodal({
      modal: true,
      overlayClose: true,
      opacity: 0.9,
      fixed: false,
      zIndex: 11010,
      closeHTML: '',
      autoPosition: false,
      onShow: function(object) {
        var header;
        header = void 0;
        header = $('header').height();
        return $(object.container).css('top', header + 'px');
      }
    });
  });
  $('.tabs').tabs();
  $('#map').lazyLoadGoogleMaps({
    callback: function(container, map) {
      var $center, $container, $map;
      $center = void 0;
      $container = void 0;
      $map = void 0;
      $container = $(container);
      $map = map;
      $center = new google.maps.LatLng($container.attr('data-lat'), $container.attr('data-lng'));
      $map.setOptions({
        zoom: 15,
        center: $center
      });
      return new google.maps.Marker({
        position: $center,
        map: $map
      });
    }
  });
  $('.calendar-list-day').on('click', function(e) {
    var $events, $item;
    $events = void 0;
    $item = void 0;
    e.preventDefault();
    $item = $(this).parent('.calendar-list-item');
    $events = $(this).siblings('.calendar-list-event');
    if ($item.hasClass('calendar-list-item--expand')) {
      return $events.slideUp(100, function() {
        return $item.removeClass('calendar-list-item--expand');
      });
    } else {
      return $events.slideDown(100, function() {
        return $item.addClass('calendar-list-item--expand');
      });
    }
  });
  $('.calendar__event').on('click', function(e) {
    e.preventDefault();
    return $('.calendar-details').modal({
      appendTo: '.calendar-details--modal',
      overlayClose: true,
      containerId: 'calendar-details--container',
      overlayId: 'calendar-details--overlay',
      closeClass: 'calendar-details__close',
      fixed: false,
      opacity: 60,
      zIndex: 11000
    });
  });
  $('.slides').slick({
    prevArrow: '<a href="#" class="slick-prev">Prev</a>',
    nextArrow: '<a href="#" class="slick-next">Next</a>',
    speed: 400,
    autoplay: false,
    autoplaySpeed: 3000,
    draggable: false,
    slidesToShow: 1,
    dots: true,
    customPaging: function(slider, i) {
      var img_src;
      img_src = void 0;
      img_src = $(slider.$slides[i]).data('thumbnail');
      return '<button type=\'button\' data-role=\'none\' style=\'background-image: url(' + img_src + ')\'></button>';
    }
  });
  $('#videoModal').on('hide.bs.modal', function(e) {
    var $if, src;
    $if = $(e.delegateTarget).find('iframe');
    src = $if.attr('src');
    $if.attr('src', '/empty.html');
    $if.attr('src', src);
  });
  $('#AjaxModal').on('show.bs.modal', function(e) {
    var link;
    link = $(e.relatedTarget);
    $(this).find('.modal-body').load(link.attr('href'));
  });
  $('#AjaxUserProfileModal').on('show.bs.modal', function(e) {
    var link;
    link = $(e.relatedTarget);
    $(this).find('.modal-body').load(link.attr('href'));
  });
  $('#AjaxMyPlatformModal').on('show.bs.modal', function(e) {
    var link;
    link = $(e.relatedTarget);
    $(this).find('.modal-body').load(link.attr('href'));
  });
  cardHolder = '';
  return $(window).load(function() {
    clearTimeout(cardHolder);
    cardHolder = setTimeout((function() {
      $('.card p, .card h1').dotdotdot({
        watch: true
      });
    }), 750);
  });
});
