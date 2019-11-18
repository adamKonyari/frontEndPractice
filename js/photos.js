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
        const pswpElement = document.querySelector('.pswp');
        $('.gallery-container').append(
            `<div class="thumbnail_container">
                <div class='leftArrow'></div>
                <div class='viewContainer'>
                    <div class="photoSwipe_innerthumbs">
                    </div>
                </div>
                <div class='rightArrow'>
                </div>
            </div>`
        ); // div for the inner thumbnails

        const options = {
            index: 0, // start at first slide
            preload: [1, 1], // only 1 image is preloaded in both direction
            modal: false,
            closeOnScroll: false
        };

        const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, this.items, options);
        gallery.init();
        $('.pswp__bg').append(`<div class="pswp__imgTitle"><h1>${gallery.currItem.title}</h1></div>`)

        // Gallery starts closing
        gallery.listen('close', function () {
            $('.photoSwipe_innerthumbs').remove();
            $('.pswp__imgTitle').remove();
        });

        gallery.listen('afterChange', function () {
            if ($('.pswp__imgTitle')) {
                $('.pswp__imgTitle').remove()
            }
            $('.pswp__bg').append(`<div class="pswp__imgTitle"><h1>${gallery.currItem.title}</h1></div>`)
        });

        //Creating thumbnail images
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            $("div.photoSwipe_innerthumbs").append($('<img class="lazy-thumbnail">').attr('data-src', item.src));
        }

        $('.lazy-thumbnail').Lazy({
            scrollDirection: 'vertical',
            visibleOnly: true,
            afterLoad: (element) => {
                console.log('image loaded')
            },
            defaultImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Question_mark_white_icon.svg/240px-Question_mark_white_icon.svg.png'
        });

        //Get current active index and add class to thumb just to fade a bit
        $("div.photoSwipe_innerthumbs img").eq(gallery.getCurrentIndex()).addClass('svifaded');

        //Handle the swaping of images
        $('.gallery-container').on('click', 'div.photoSwipe_innerthumbs img', function (e) {
            $('div.photoSwipe_innerthumbs img').removeClass("svifaded");
            $(this).addClass('svifaded');
            gallery.goTo($("div.photoSwipe_innerthumbs img").index($(this)));
        });

        var view = $(".thumbnail_container");
        var move = "100px";
        var sliderLimit = -750

    }

    /**
     * This function builds an array of items which gets later passed to the new PhotoSwipe instance
     * @private 
     */
    buildItemsArray() {
        const items = [];
        for (let i = 0; i < 25; i++) {
            const width = Math.floor((Math.random() * 720) + 560),
                height = Math.floor((Math.random() * 720) + 560),
                imgSrc = 'http://placekitten.com/' + width + '/' + height;
            items.push({
                src: imgSrc,
                w: width,
                h: height,
                title: 'Cat #' + (i + 1)
            });
        }
        return items;
    }
}