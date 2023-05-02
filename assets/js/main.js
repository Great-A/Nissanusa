jQuery(document).ready(function ($) {

    Fancybox.bind(".hero-play", {
        Video: {
            close: {
                type: "button",
                label: "CLOSE",
                class: "fancybox__button--close",
                html: '<svg width="42" height="42" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4.13599" y="-0.485291" width="21" height="3" rx="1.5" transform="rotate(45 4.13599 -0.485291)" fill="#FFFAEF" /><rect x="18.9707" y="1.63605" width="21" height="3" rx="1.5" transform="rotate(135 18.9707 1.63605)" fill="#FFFAEF" /></svg>',
                tabindex: 1,
                click: function (event) {
                    event.stopPropagation();
                    event.preventDefault();

                    this.fancybox.close();
                }
            }
        }
    });

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

    // console.log($(".pin-wrap").width());

    var scrollLeft = 0;
    var allWidth = 0;
    pp.children('div').each(function (index, el) {
        if (index === 0) return;
        allWidth += $(window).outerWidth();
    });

    console.log(allWidth);
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
    var lastId = $sections.last().attr("id");

    $(window).scroll(function () {
        var currentPosition = $(this).scrollTop();

        $sections.each(function () {
            var sectionTop = $(this).offset().top - 144;
            var sectionBottom = sectionTop + $(this).outerHeight();

            if (currentPosition >= sectionTop && currentPosition <= sectionBottom) {
                var currentId = $(this).attr("id");

                $menu.find("a").removeClass("active");

                $menu.find("a[href='#" + currentId + "']").addClass("active");

                //   if (currentId == lastId) {
                //     $menu.find("a").removeClass("active");
                //   }
            }
        });
    });


    $('.overlay-video-image').click(function () {
        $(this).removeClass('overlay-video-image');
        $('#slider-video').attr('src', 'https://www.youtube.com/embed/OQ7Jr1oFAeg?&autoplay=1&loop=1&mute=1');
    });

    $('.video-hero').click(function () {
        $('.hero-content').remove();
        $('#video-hero-bg').attr('src', 'https://www.youtube.com/embed/OQ7Jr1oFAeg?&autoplay=1&mute=1');
    });
});
