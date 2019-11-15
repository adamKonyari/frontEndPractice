class Photos {
    constructor() {
        this.init();
    }

    init() {
        this.initPhotos();
    }

    initPhotos() {
        const pswpElement = document.querySelectorAll('.pswp')[0];

        const items = this.buildItemsArray();

        const options = {
            index: 0, // start at first slide
            preload: [1, 1], // only 1 image is preloaded in both direction
            modal: false,
            bgOpacity: 0.5
        };

        const gallery = new CustomPhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    }


    /**
     * @private 
     */
    buildItemsArray() {
        const items = [];
        for (let i = 0; i < 50; i++) {
            const width = Math.floor((Math.random() * 800) + 400),
                height = Math.floor((Math.random() * 800) + 400);
            items.push({
                src: 'http://placekitten.com/' + width + '/' + height,
                w: width,
                h: height
            });
        }
        return items;
    }
}

class CustomPhotoSwipe extends PhotoSwipe {

    constructor(pswpElement, PhotoSwipeUI_Default, items, options) {
        super(pswpElement, PhotoSwipeUI_Default, items, options);
        this.initThumbnails();
    }

    /**
     * Thumbnails for PhotoSwipe will be implemented here.
     */
    initThumbnails() {
        console.log('thumbnails initializing');
    }
}