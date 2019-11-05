class Gallery {
    constructor() {
    }

    init() {
        this.initGallery();
    }

    initGallery() {
        this.fillGallery();
    }

    fillGallery() {
        const galleryDiv = $('.gallery-div');
        for (let i = 0; i < 15; i++) {
            const width = Math.floor((Math.random() * 300) + 200),
                height = Math.floor((Math.random() * 300) + 200),
                src = 'http://placekitten.com/' + width + '/' + height,
                img = $('<img>').attr('src', src).addClass('boxed-img'),
                div = $('<div>').addClass('col-xs-4 img-container').append(img);
            galleryDiv.append(div);
        }
    }
}