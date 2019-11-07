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
        this.initIndex();
    }

    /**
     * scrollspy event monitoring and google maps is loaded here
     * @private
     */
    initIndex() {
        $('#navbar-main').on('activate.bs.scrollspy', function (e) {
            console.log(e.target.innerText);
        });
        $(window).bind('gMapsLoaded', this.customMap.init);
        this.customMap.loadGoogleMaps();
    }
}

new Index();


