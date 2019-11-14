class Photos extends PhotoSwipe {

    constructor(pswpElement, PhotoSwipeUI_Default, items, options) {
        super(pswpElement, PhotoSwipeUI_Default, items, options);
    }

    /**
     * function that initializes thumbnails for photoswipe
     * TODO: still needs to implemented
     */
    initThumbnails() {

    }

}


/**
 * testing the extended functionality with dummy
 */
$(function () {

    $('.gallery-container').append('<div class="photoSwipe_innerthumbs"></div>');

    const pswpElement = document.querySelectorAll('.pswp')[0];
    // build items array
    const items = [
        {
            src: 'https://placekitten.com/600/400',
            w: 600,
            h: 400
        },
        {
            src: 'https://placekitten.com/1200/900',
            w: 1200,
            h: 900
        }
    ];

    // define options (if needed)
    const options = {
        // optionName: 'option value'
        // for example:
        index: 0 // start at first slide
    };

    // Initializes and opens PhotoSwipe
    const gallery = new Photos(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();

    gallery.listen('close', function () {
        $('.photoSwipe_innerthumbs').remove();
    });

    //Clone and append the thumbnail images
    $('div#thumbnails img').clone().appendTo("div.photoSwipe_innerthumbs");

    //Get current active index and add class to thumb just to fade a bit
    $("div.photoSwipe_innerthumbs img").eq(gallery.getCurrentIndex()).addClass('svifaded');

    //Handle the swaping of images
    $('body').on('click', 'div.photoSwipe_innerthumbs img', function (e) {
        $('div.photoSwipe_innerthumbs img').removeClass("svifaded");
        $(this).addClass('svifaded');
        gallery.goTo($("div.photoSwipe_innerthumbs img").index($(this)));
    });
});