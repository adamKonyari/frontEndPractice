class Index {
    constructor() {
        const self = this;
        this.search = new Search();
        this.hotels = new Hotels(this.search);
        this.customMap = new CustomMap();
        $(function () {
            self.init();
        })
    }

    init() {
        this.initIndex();
    }

    initIndex() {
        $(document).ready(() => {
            $('#navbar-main').on('activate.bs.scrollspy', function (e) {
                console.log(e.target.innerText);
            });
            $(window).bind('gMapsLoaded', this.customMap.init);
            this.customMap.loadGoogleMaps();
            this.search.init();
            this.hotels.init();
        })
    }
}

new Index();


