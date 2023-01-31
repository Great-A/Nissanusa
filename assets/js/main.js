jQuery(document).ready(function($) {
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


});