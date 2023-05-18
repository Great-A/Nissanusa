jQuery(document).ready(function ($) {

    $('.slick-slider').slick({
        dots: true,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    dots: false,
                }
            },
            {
                breakpoint: 426,
                settings: {
                    arrow: false,
                    infinite: false,
                }
            }
        ]
    });


    var ps_options = {
        infinite: true,
        dots: false,
        arrow: true,
    };


    var prod_slider = $('.product-slider').slick(ps_options);
    var capacity = $('.capacity-slider').slick(ps_options);

    prod_slider.on('afterChange', function (event, slick, currentSlide) {
        var a = slick.$slider.closest('.le-section-right');
        a.find(".product-list li").eq(currentSlide).addClass('active').siblings('li').removeClass('active');
    });

    var pp = $('.pin-wrap');

    var elem = document.querySelector('.section-slider-2');

    if (elem.addEventListener) {
        if ('onwheel' in document) {
            // IE9+, FF17+
            elem.addEventListener("wheel", onWheel);
        } else if ('onmousewheel' in document) {
            // 
            elem.addEventListener("mousewheel", onWheel);
        } else {
            // Firefox < 17
            elem.addEventListener("MozMousePixelScroll", onWheel);
        }
    } else { // IE8-
        elem.attachEvent("onmousewheel", onWheel);
    }

    var scrollLeft = 0;
    var allWidth = 0;
    pp.children('div').each(function (index, el) {
        if (index === 0) return;
        allWidth += $(window).outerWidth();
    });

    window.adobeFlag = false;


    function onWheel2(e) {
        e = e || window.event;
        var delta = e.deltaY || e.detail || e.wheelDelta;
        var el = pp[0];

        if (delta > 0) {

            if (scrollLeft === allWidth) return;

            if (scrollLeft + 40 > allWidth) {
                scrollLeft = scrollLeft + (allWidth - scrollLeft);
            } else {
                scrollLeft = scrollLeft + 40;
            }

            pp.css('margin-left', -1 * scrollLeft + 'px');

            if (window.adobeFlag === false) {
                _satellite.track('trackInteraction', { contentType: 'scroll', contentValue: 'product banner', contentLocation: 'product', contentAction: 'horizontal' });
                window.adobeFlag = true;

            }

        } else {
            if (scrollLeft <= 0) return;
            scrollLeft = scrollLeft - 40;
            pp.css('margin-left', -1 * scrollLeft + 'px');
        }

        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }

    function onWheel(e) {
        e = e || window.event;
        var delta = e.deltaY || e.detail || e.wheelDelta;
        var el = pp[0];

        if (delta > 0) {
            if (pp.scrollLeft() + el.clientWidth >= el.scrollWidth) {
                return;
            }
            var flag = pp.scrollLeft() + 40;
            pp.scrollLeft(flag);
        } else {
            if (pp.scrollLeft() === 0) {
                return;
            }
            // flag -= step;
            // pp.css('transform', 'translate(-'+flag+'px)');
            var flag = pp.scrollLeft() - 40;
            pp.scrollLeft(flag)
        }

        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }


    $(".block-overlay-hidden").hover(
        function () {
            $this = $(this);
            $this.find(".hover-block-wrapp").fadeToggle(10).animate({ top: "0" });
            $this.find(".block-title .title-h4").fadeToggle();
        },
        function () {
            $this = $(this);
            $this.find(".hover-block-wrapp").animate({ top: "335px" }).fadeToggle(10);
            $this.find(" .block-title .title-h4").fadeToggle();
        }
    );

    $(".location-block").on("click", function (e) {
        $(this).addClass('active').siblings().removeClass('active');

        var pSec = $(this).closest('section');

        var block_target = $(this).attr('data-target');
        pSec.find('.info-block[data-id="' + block_target + '"]').addClass('active').siblings('.info-block').removeClass('active');


        var a1 = pSec.find('.loc-exp-bottom[data-id="' + block_target + '"]');
        a1.addClass('active').siblings('.loc-exp-bottom').removeClass('active');

        var le_section = pSec.find('.le-section-right[data-id="' + block_target + '"]');
        le_section.addClass('active').siblings('.le-section-right').removeClass('active');

        pSec.addClass('active');

        le_section.find('.product-slider').slick('unslick');
        le_section.find('.product-slider').slick(ps_options);
        a1.find('.capacity-slider').slick('unslick');
        a1.find('.capacity-slider').slick(ps_options);
    });



    var $menu = $(".menu-page-bottom");
    var $sections = $("section");

    $(window).scroll(function () {
        var currentPosition = $(this).scrollTop();

        $sections.each(function () {
            var sectionTop = $(this).offset().top - 144;
            var sectionBottom = sectionTop + $(this).outerHeight();

            if (currentPosition >= sectionTop && currentPosition <= sectionBottom) {
                var currentId = $(this).attr("id");

                $menu.find("a").removeClass("active");

                $menu.find("a[href='#" + currentId + "']").addClass("active");

            }
        });
    });


    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


    $('.video-hero').click(function () {
        $('.hero-content, .video-hero video').remove();

        _satellite.track('trackInteraction', { contentType: 'video', contentValue: 'building factories', contentLocation: 'pfa', contentAction: 'play' });


        // Create a new player object
        var player = new YT.Player('video-hero-bg', {
            height: '315',
            width: '560',
            videoId: 'OQ7Jr1oFAeg',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });

        function onPlayerReady(event) {
            event.target.playVideo();
            event.target.mute();
        }

        // This function will be called when the player's state changes
        var done = false;
        function onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.ENDED) {

                _satellite.track('trackInteraction', { contentType: 'video', contentValue: 'building factories', contentLocation: 'pfa', contentAction: 'complete' });
                // event.target.seekTo(0);
                // event.target.playVideo();
                done = true;
            }
        }
    });



    $('.overlay-video-image').click(function () {
        // Remove the "overlay-video-image" class to show the video
        $(this).removeClass('overlay-video-image');
      
        // Create a new player object
        var player = new YT.Player('slider-video', {
          height: '270',
          width: '500',
          videoId: 'hzdAtYIIyWE',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      
        // This function will be called when the player is ready
        function onPlayerReady(event) {
          // Autoplay the video
          event.target.playVideo();
      
          // Mute the video
          event.target.mute();
      
          // Track an interaction using Adobe's Satellite tool
          _satellite.track('trackInteraction', { contentType: 'video', contentValue: 'steel to wheels', contentLocation: 'product', contentAction: 'play' });
        }
      
        // This function will be called when the player's state changes
        function onPlayerStateChange(event) {
          if (event.data == YT.PlayerState.ENDED) {
            // Track a complete event using Adobe's Satellite tool
            _satellite.track('trackInteraction', { contentType: 'video', contentValue: 'steel to wheels', contentLocation: 'product', contentAction: 'complete' });
          }
        }
      });

    // Adobe Track

    var locationFired = false;
    var peopleFired = false;
    var productFired = false;
    var purposeFired = false;

    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var locationsTop = $('#location-main-section').offset().top;
        var locationsHeight = $('#location-main-section').outerHeight();
        var locationsTopPeople = $('#people').offset().top;
        var locationsHeightPeople = $('#people').outerHeight();
        var locationsTopProduct = $('#product').offset().top;
        var locationsHeightProduct = $('#product').outerHeight();
        var locationsTopPurpose = $('#purpose').offset().top;
        var locationsHeightPurpose = $('#purpose').outerHeight();

        if (scrollTop >= locationsTop && scrollTop < locationsTop + locationsHeight && !locationFired) {
            // Fire tracking event
            _satellite.track('trackInteraction', { contentType: 'scroll', contentValue: 'locations' });
            locationFired = true;
        }

        if (scrollTop >= locationsTopPeople && scrollTop < locationsTopPeople + locationsHeightPeople && !peopleFired) {
            _satellite.track('trackInteraction', { contentType: 'scroll', contentValue: 'people' });
            peopleFired = true;
        }

        if (scrollTop >= locationsTopProduct && scrollTop < locationsTopProduct + locationsHeightProduct && !productFired) {
            _satellite.track('trackInteraction', { contentType: 'scroll', contentValue: 'product' });
            productFired = true;
        }

        if (scrollTop >= locationsTopPurpose && scrollTop < locationsTopPurpose + locationsHeightPurpose && !purposeFired) {
            _satellite.track('trackInteraction', { contentType: 'scroll', contentValue: 'purpose' });
            purposeFired = true;
        }
    });

    $('.link-nissan-purpose').click(function (event) {
        event.preventDefault();
        var url = $(this).attr('href') + '?dcp=mfg.SUS.purpose.promo';

        _satellite.track('trackNavigation', { contentType: 'link', contentValue: 'nissan foundation and nissanneighbors', contentLocation: 'purpose', destination: url });

        window.open(url, '_blank');

    });

    $('.link-product').click(function (event) {
        event.preventDefault();
        var contentValue = $(this).text().toLowerCase();
        var model = $('.le-section-right.active .product-list li.active').text().toLowerCase();
        var url = $(this).attr('href') + '?dcp=mfg.' + model + '.BNP.loc.promo';

        _satellite.track('trackNavigation', { contentType: 'link', contentValue: contentValue, contentLocation: 'locations', destination: url });

        window.open(url, '_blank');

    });

    $('.adobe-track').click(function () {
        var contentType = $(this).data('content-type');
        var contentValue = $(this).data('content-value');
        var contentLocation = $(this).data('content-location');
        var contentAction = $(this).data('content-action');

        var data = { contentType: contentType, contentValue: contentValue, contentLocation: contentLocation }

        if (contentAction) {
            data.contentAction = contentAction;
        }

        _satellite.track('trackInteraction ', data);

    });


    $('.adobe-track-loc').click(function () {
        var contentType = $(this).data('content-type');
        var contentValue = $(this).text().toLowerCase();
        var contentLocation = $(this).data('content-location');
        var destination = $(this).attr('href');

        var data = { contentType: contentType, contentValue: contentValue, contentLocation: contentLocation }


        if (destination) {
            data.destination = destination;
        }

    });


    $(document).on('click', '.product-container .slick-prev', function () {
        _satellite.track('trackInteraction', { contentType: 'arrow', contentValue: 'model_carousel', contentLocation: 'locations', contentSelect: 'previous' });
    })

    $(document).on('click', '.product-container .slick-next', function () {
        _satellite.track('trackInteraction', { contentType: 'arrow', contentValue: 'model_carousel', contentLocation: 'locations', contentSelect: 'next' });

    })

    $(document).on('click', '.section-slider .slick-prev', function () {
        _satellite.track('trackInteraction', { contentType: 'arrow', contentValue: 'numbers_carousel', contentLocation: 'locations', contentSelect: 'previous' });
    })

    $(document).on('click', '.section-slider .slick-next', function () {
        _satellite.track('trackInteraction', { contentType: 'arrow', contentValue: 'numbers_carousel', contentLocation: 'locations', contentSelect: 'next' });
    })


    $('.blocks-row .block-container').one('mouseenter', function () {
        var contentValue = $(this).find('.block-title .title-h4').text().toLowerCase();
        _satellite.track('trackInteraction', { contentType: 'hover', contentValue: contentValue, contentLocation: 'people' });
    });

    var bannerFired = false;

    $('.section-slider-2 .pin-wrap').on('scroll', function () {
        if (!bannerFired) {
            _satellite.track('trackInteraction', {
                contentType: 'scroll',
                contentValue: 'product banner',
                contentLocation: 'product',
                contentAction: 'horizontal'
            });
            bannerFired = true;
        }
    });

    // End Adobe Track
});