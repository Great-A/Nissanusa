jQuery(document).ready(function ($) {

    // Fancybox.bind(".hero-play", {
    //     Video: {
    //         close: {
    //             type: "button",
    //             label: "CLOSE",
    //             class: "fancybox__button--close",
    //             html: '<svg width="42" height="42" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4.13599" y="-0.485291" width="21" height="3" rx="1.5" transform="rotate(45 4.13599 -0.485291)" fill="#FFFAEF" /><rect x="18.9707" y="1.63605" width="21" height="3" rx="1.5" transform="rotate(135 18.9707 1.63605)" fill="#FFFAEF" /></svg>',
    //             tabindex: 1,
    //             click: function (event) {
    //                 event.stopPropagation();
    //                 event.preventDefault();

    //                 this.fancybox.close();
    //             }
    //         }
    //     }
    // });

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



    var container = document.querySelector(".section-slider-2");
    var startY, startTopScroll;

    container.addEventListener("touchstart", function(event) {
        startX = event.touches[0].clientX;        
    }, false);

    container.addEventListener("touchmove", function(event) {
        var currentX = event.touches[0].clientX;
        var distanceX = currentX - startX;
        var step = distanceX / 8;

        console.log(scrollLeft, allWidth);

        if(startX > currentX + 5) {
            console.log('delta> 0');
            if (scrollLeft*-1 > allWidth) return;

        } else {
            console.log('delta <= 0');
            if(scrollLeft> 0) return;
        } 

        if (scrollLeft + step > allWidth) {
            scrollLeft = scrollLeft + (allWidth - scrollLeft);
        } else {
            scrollLeft = scrollLeft + step;
        }

        if(startX < currentX + 5) {
             if(scrollLeft> 0) return;
        }
        // if ( ((allWidth - scrollLeft) + scrollLeft) >= 0 ) return;
        pp.css('margin-left', 1 * scrollLeft + 'px');

               
        
       
    }, false);    

    window.adobeFlag = false;


    function onWheel(e) {
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

            if(window.adobeFlag === false) {
                _satellite.track('trackInteraction',{contentType:'scroll',contentValue:'product banner',contentLocation:'product',contentAction:'horizontal'} );
                window.adobeFlag = true;

                console.log("yes");
            }

        } else {
            if (scrollLeft <= 0) return;
            scrollLeft = scrollLeft - 40;
            pp.css('margin-left', -1 * scrollLeft + 'px');
        }

        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }

    function onWheelBack(e) {
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


                _satellite.track('trackInteraction', { contentType: 'scroll', contentValue: currentId });// Add the following line to track the scroll event

            }
        });
    });


    $('.video-hero').click(function () {
        $('.hero-content').remove();
        $('#video-hero-bg').attr('src', 'https://www.youtube.com/embed/OQ7Jr1oFAeg?&autoplay=1&loop=1&mute=1&playlist=OQ7Jr1oFAeg');

        _satellite.track('trackInteraction', { contentType: 'video', contentValue: 'building factories', contentLocation: 'pfa', contentAction: 'play' });
    });

    $('.overlay-video-image').click(function () {
        $(this).removeClass('overlay-video-image');
        $('#slider-video').attr('src', 'https://www.youtube.com/embed/hzdAtYIIyWE?&autoplay=1&loop=1&mute=1');

        _satellite.track('trackInteraction', { contentType: 'video', contentValue: 'steel to wheels', contentLocation: 'product', contentAction: 'play' });
    });

    // Adobe Track

    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var locationsTop = $('#location-main-section').offset().top;
        var locationsHeight = $('#location-main-section').outerHeight();

        if (scrollTop >= locationsTop && scrollTop < locationsTop + locationsHeight) {
            // Fire tracking event
            _satellite.track('trackInteraction', { contentType: 'scroll', contentValue: 'locations' });

        }
    });

    $('.link-nissan-purpose').click(function (event) {
        event.preventDefault();
        var url = $(this).attr('href') + '?dcp=mfg.SUS.purpose.promo';

        _satellite.track('trackNavigation',{contentType:'link',contentValue:'nissan foundation and nissanneighbors',contentLocation:'purpose',destination:url} );

        // window.location.href = url;
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

    $('.section-slider-2 .pin-wrap').on('scroll', function () {
        _satellite.track('trackInteraction', {
            contentType: 'scroll',
            contentValue: 'product banner',
            contentLocation: 'product',
            contentAction: 'horizontal'
        });
        console.log("product banner");

    });

    // End Adobe Track
});
