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
        });

        $('#photoswipe-modal-div').on('shown.bs.modal', () => {
            this.openPhotoSwipeInModal();
        });
    }
    /**
     * @private
     */
    openPhotoSwipeInModal() {
        const pswpElement = document.querySelector('.pswp_modal');
        const options = {
            modal: false,
            closeOnScroll: false,
            preload: [1, 1],
            index: 0
        };

        var photoSwipe = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, this.items, options);
        photoSwipe.listen('updateScrollOffset', function (_offset) {
            const r = pswpElement.getBoundingClientRect();
            _offset.x += r.left;
            _offset.y += r.top;
        });
        photoSwipe.init();
    }

    /**
     * @private
     */
    openPhotoSwipe() {
        const pswpElement = document.querySelector('.pswp');
        const options = {
            index: 0, // start at first slide
            preload: [1, 1], // only 1 image is preloaded in both direction
            modal: false,
            closeOnScroll: false
        };
        const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, this.items, options);
        gallery.init();
        $('.pswp__bg').append(`<div class="pswp__imgTitle"><h1>${gallery.currItem.title}</h1></div>`);
        this.initThumbnails(gallery);
    }

    /**
     * This function builds an array of items which gets later passed to the new PhotoSwipe instance
     * @private 
     */
    buildItemsArray() {
        const items = [];
        for (let i = 0; i < 20; i++) {
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

    /**
     * @private
     */
    initThumbnails(gallery) {
        $('.gallery-container').append(`<div class="photoSwipe_innerthumbs"></div>`); // div for the inner thumbnails

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
        $('.gallery-container').on('click', 'div.photoSwipe_innerthumbs img.lazy-thumbnail', function (e) {
            $('div.photoSwipe_innerthumbs img').removeClass("svifaded");
            $(this).addClass('svifaded');
            gallery.goTo($("div.photoSwipe_innerthumbs img.lazy-thumbnail").index($(this)));
        });

        this.initScrolling();
    }

    /**
     * @private
     */
    initScrolling() {
        const setInvisible = function (elem) {
            elem.css('visibility', 'hidden');
        };
        const setVisible = function (elem) {
            elem.css('visibility', 'visible');
        };

        const elem = $(".photoSwipe_innerthumbs");
        const items = elem.children();

        // Inserting Buttons
        elem.prepend('<div id="right-button" style="visibility: hidden;"><img src="img/left.png"></div>');
        elem.append('  <div id="left-button"><img src="img/right.png"></div>');

        // Inserting Inner
        items.wrapAll('<div id="inner"/>');

        // Inserting Outer
        elem.find('#inner').wrap('<div id="outer"/>');

        const outer = $('#outer');

        const updateUI = function () {
            const maxWidth = outer.outerWidth(true);
            let actualWidth = 0;
            $.each($('#inner >'), function (i, item) {
                actualWidth += $(item).outerWidth(true);
            });
            if (actualWidth <= maxWidth) {
                setVisible($('#left-button'));
            }
        };
        updateUI();

        const thumbs = $("#inner").children();
        let totalWidth = 0;
        for (let i = 0; i < thumbs.length; i++) {
            totalWidth += thumbs[i].offsetWidth;
        }

        $('#right-button').click(function () {
            let leftPos = outer.scrollLeft();
            outer.animate({
                scrollLeft: leftPos - 200
            }, 200, function () {
                if ($('#outer').scrollLeft() <= 0) {
                    setInvisible($('#right-button'));
                }
                if ((totalWidth - $('#inner').width()) > outer.scrollLeft()) {
                    setVisible($('#left-button'));
                }
            });
        });

        $('#left-button').click(() => {
            setVisible($('#right-button'));
            let leftPos = outer.scrollLeft();
            outer.animate({
                scrollLeft: leftPos + 200
            }, 200, () => {
                if (((totalWidth - $('#inner').width()) - outer.scrollLeft()) < 2) {
                    setInvisible($('#left-button'));
                }
            });
        });

        $(window).resize(function () {
            updateUI();
        });
    }
}