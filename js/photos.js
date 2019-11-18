class Photos {
    constructor() {
        this.init();
    }

    /**
     * @private
     */
    init() {
        this.items = this.buildItemsArray();
        this.initPhotos();
    }

    /**
     * @private
     */
    initPhotos() {
        $('#gallery-button').on('click', () => {
            this.openPhotoSwipe();
        })
    }

    /**
     * @private
     */
    openPhotoSwipe() {
        const pswpElement = document.querySelectorAll('.pswp')[0];
        $('.gallery-container').append('<div class="photoSwipe_innerthumbs"></div>', ); // div for the inner thumbnails

        const options = {
            index: 0, // start at first slide
            preload: [1, 1], // only 1 image is preloaded in both direction
            modal: false
        };

        const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, this.items, options);
        gallery.init();
        $('.pswp__bg').append(`<div class="pswp__imgTitle"><h1>${gallery.currItem.title}</h1></div>`)
        
        // Gallery starts closing
        gallery.listen('close', function () {
            $('.photoSwipe_innerthumbs').remove();
            $('.photoSwipe_imgTitle').remove();
        });

        gallery.listen('afterChange', function () {
            if ($('.pswp__imgTitle')) {
                $('.pswp__imgTitle').remove()
            }
            $('.pswp__bg').append(`<div class="pswp__imgTitle"><h1>${gallery.currItem.title}</h1></div>`)
        });

        //Create thumbnail images
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            $("div.photoSwipe_innerthumbs").append($('<img>').attr('src', item.src));
        }

        //Get current active index and add class to thumb just to fade a bit
        $("div.photoSwipe_innerthumbs img").eq(gallery.getCurrentIndex()).addClass('svifaded');

        //Handle the swaping of images
        $('.gallery-container').on('click', 'div.photoSwipe_innerthumbs img', function (e) {
            $('div.photoSwipe_innerthumbs img').removeClass("svifaded");
            $(this).addClass('svifaded');
            gallery.goTo($("div.photoSwipe_innerthumbs img").index($(this)));
        });
    }

    /**
     * @private 
     */
    buildItemsArray() {
        const items = [];
        for (let i = 0; i < 20; i++) {
            const width = Math.floor((Math.random() * 720) + 560),
                height = Math.floor((Math.random() * 720) + 560),
                imgSrc = 'http://placekitten.com/' + width + '/' + height;
            items.push({
                html: `<h2>Cat # + ${i}</h2>`,
                src: imgSrc,
                w: width,
                h: height,
                title: 'Cat #' + (i+1)
            });
        }
        return items;
    }
}