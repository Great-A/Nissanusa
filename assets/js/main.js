jQuery(document).ready(function ($) {
    var fancy_settings = {
        groupAll: true,
        Toolbar: {
            display: [
                "close",
            ],
            items: {
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
        },
        Carousel: {
            Navigation: {
                prevTpl:
                    '<svg width="31" height="16" viewBox="0 0 31 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.21501 7.58745C0.824488 7.97797 0.824488 8.61114 1.21501 9.00166L7.57897 15.3656C7.9695 15.7561 8.60266 15.7561 8.99319 15.3656C9.38371 14.9751 9.38371 14.3419 8.99319 13.9514L3.33633 8.29455L8.99319 2.6377C9.38371 2.24718 9.38371 1.61401 8.99319 1.22349C8.60266 0.832962 7.9695 0.832962 7.57897 1.22349L1.21501 7.58745ZM30.9221 7.29456L1.92212 7.29455L1.92212 9.29455L30.9221 9.29456L30.9221 7.29456Z" fill="#2B392C" /></svg>',
                nextTpl:
                    '<svg width="30" height="16" viewBox="0 0 30 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.7081 9.00167C30.0986 8.61114 30.0986 7.97798 29.7081 7.58745L23.3441 1.22349C22.9536 0.832967 22.3204 0.832967 21.9299 1.22349C21.5394 1.61402 21.5394 2.24718 21.9299 2.6377L27.5868 8.29456L21.9299 13.9514C21.5394 14.3419 21.5394 14.9751 21.9299 15.3656C22.3204 15.7562 22.9536 15.7562 23.3441 15.3656L29.7081 9.00167ZM0.000976416 9.29456L29.001 9.29456L29.001 7.29456L0.000976709 7.29456L0.000976416 9.29456Z" fill="#2B392C"></svg>',
            }
        }

    }
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

    Fancybox.bind(".gallery-type-1 a", fancy_settings);
    Fancybox.bind(".gallery-type-2 a", fancy_settings);

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
    pp.children('div').each(function(index, el) {
        if(index === 0) return;
        allWidth += $(window).outerWidth();
    });
    
    console.log(allWidth);
    function onWheel(e) {
        e = e || window.event;
        var delta = e.deltaY || e.detail || e.wheelDelta;
        var el = pp[0];

        if (delta > 0) {

            if(scrollLeft === allWidth) return;
            
            if(scrollLeft + 40 > allWidth) {
                scrollLeft = scrollLeft + (allWidth - scrollLeft);                
            } else {
                scrollLeft = scrollLeft + 40;
            }            
            
            pp.css('margin-left', -1 * scrollLeft + 'px');
            
        } else {
            if(scrollLeft <= 0) return;
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
            $this.find(".block-title .title-h3").fadeToggle();
        },
        function () {
            $this = $(this);
            $this.find(".hover-block-wrapp").animate({ top: "335px" }).fadeToggle(10);
            $this.find(" .block-title .title-h3").fadeToggle();
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
  
    $(window).scroll(function() {
      var currentPosition = $(this).scrollTop();
  
      $sections.each(function() {
        var sectionTop = $(this).offset().top - 144;
        var sectionBottom = sectionTop + $(this).outerHeight();
  
        if (currentPosition >= sectionTop && currentPosition <= sectionBottom) {
          var currentId = $(this).attr("id");
  
          $menu.find("a").removeClass("active");
  
          $menu.find("a[href='#" + currentId + "']").addClass("active");
  
          if (currentId == lastId) {
            $menu.find("a").removeClass("active");
          }
        }
      });
    });
});
