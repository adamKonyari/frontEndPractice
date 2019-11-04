class CustomMap {

    constructor(search) {
        this.search = search;
    }

    /**
     * @public
     */
    init() {
        let mapOptions = {
            zoom: 10,
            center: {lat: 47.49801, lng: 19.03991}
        };
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
    }


    /**
     * @public
     */
    loadGoogleMaps() {
        window.gMapsCallback = function () {
            $(window).trigger('gMapsLoaded');
        }
        window.map = null;
        const script_tag = document.createElement('script');
        script_tag.setAttribute("type", "text/javascript");
        script_tag.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyCgrqknZaEazBqklkTFuigqSYsaoIUFoV8&callback=gMapsCallback");
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    }

    /**
     * @private
     * @param coordinates
     */
    addMarker(coordinates) {
        const marker = new google.maps.Marker({
            position: coordinates,
            map: map
        });
    }

    /**
     * @public
     * @param city
     */
    addAllMarkers(hotels) {
        console.log();
        for (let i = 0; i < hotels.length; i++) {
            const hotel = hotels[i];
            if (hotel.coordinates) {
                this.addMarker(hotel.coordinates)
            }
        }
    }
}
