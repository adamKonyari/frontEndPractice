class Gallery {
    constructor() {
        this.init();
    }

    /**
     * @private
     */
    init() {
        this.initGallery();
    }

    /**
     * @private
     */
    initGallery() {
        this.fillGallery();
    }

    /**
     * function that builds the gallery on the front page,
     * pictures are downloaded with random resolution between 200 and 500 px,
     * corresponding css classes are added according to the image's position
     * @private
     */
    fillGallery() {
        const galleryDiv = $('.gallery-div');

        for (let i = 0; i < 15; i++) {
            const width = Math.floor((Math.random() * 300) + 200),
                height = Math.floor((Math.random() * 300) + 200),
                src = 'http://placekitten.com/' + width + '/' + height,
                img = $('<img>').attr('src', src),
                div = $('<div>').addClass('col-xs-3 img-container');
            
            div.append(img);
            galleryDiv.append(div);
        }
        galleryDiv.find('div:nth-child(3n+1) img').addClass('boxed-img rotate-left');
        galleryDiv.find('div:nth-child(3n+2) img').addClass('boxed-img zoom');
        galleryDiv.find('div:nth-child(3n+3) img').addClass('boxed-img rotate-right');
    }
}   