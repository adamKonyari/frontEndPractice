class Index {
    constructor() {
        const self = this;
        $(function () {
            self.init();
        });
    }

    /**
     * @private
     */
    init() {
        this.gallery = new Gallery();
        this.search = new Search();
        this.customMap = new CustomMap(this.search);
        this.hotels = new Hotels(this.search, this.customMap);
        this.subscribe = new Subscribe();
        this.prizes = new Prizes();
        this.dates = new Dates();
        this.photos = new Photos();
        this.initIndex();
    }

    /**
     * google maps is loaded here
     * @private
     */
    initIndex() {
        $(window).bind('gMapsLoaded', this.customMap.init);
        this.customMap.loadGoogleMaps();
    }
}

new Index();


