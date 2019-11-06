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
        let counter = 1;
        for (let i = 0; i < 15; i++) {
            const width = Math.floor((Math.random() * 300) + 200),
                height = Math.floor((Math.random() * 300) + 200),
                src = 'http://placekitten.com/' + width + '/' + height,
                img = $('<img>').attr('src', src),
                div = $('<div>').addClass('col-xs-3 img-container');
            if (counter === 1) {
                img.addClass('boxed-img rotate-left');
                counter++;
            } else if (counter === 2) {
                img.addClass('boxed-img zoom');
                counter++;
            } else if (counter === 3) {
                img.addClass('boxed-img rotate-right');
                counter = 1;
            }
            div.append(img);
            galleryDiv.append(div);
        }
    }
}