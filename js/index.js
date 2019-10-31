class Index {
    constructor() {
        const self = this;
        $(function () {
            self.init();
        })
    }

    init() {
        this.initIndex();
    }

     initIndex() {
        $('#navbar-main').on('activate.bs.scrollspy', function (e) {
            console.log(e.target.innerText);
        });
        const search = new Search();
        const hotels = new Hotels(search);
        search.init();
        hotels.init();
        // $.override
    }
}

new Index();