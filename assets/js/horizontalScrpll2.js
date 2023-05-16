$(".pin-wrap").mouseenter(function () {
    window.addEventListener("wheel", scrollevent);
});
$(".pin-wrap").mouseleave(function () {
    window.removeEventListener("wheel", scrollevent);
});

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

        if (window.adobeFlag === false) {
            _satellite.track('trackInteraction', { contentType: 'scroll', contentValue: 'product banner', contentLocation: 'product', contentAction: 'horizontal' });
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

var elem = $('.pin-wrap');

elem.on('mouseenter', function () {
    disableScroll();
});

elem.on('mouseleave', function () {
    enableScroll();
});

function disableScroll() {
    // Get the current page scroll position
    scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft,

        // if any scroll is attempted,
        // set this to the previous value
        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

function enableScroll() {
    window.onscroll = function () { };
}