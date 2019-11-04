class CustomMap {

    constructor(search) {
        this.search = search;
        this.markers = [];
    }

    /**
     * @public
     */
    init() {
        let mapOptions = {
            zoom: 13,
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
            map: map,
        });
        // map.setCenter(marker.getPosition());
        this.markers.push(marker);
    }

    /**
     * @public
     * @param city
     */
    addAllMarkers(hotels) {
        this.deleteMarkers();
        for (let i = 0; i < hotels.length; i++) {
            const hotel = hotels[i];
            if (hotel.coordinates) {
                this.addMarker(hotel.coordinates)
            }
        }
        map.setCenter(this.calcCenter(hotels));
    }

    /**
     * @private
     */
    deleteMarkers() {
        for(let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
        this.markers = [];
    }

    /**
     *
     * @param hotels
     * @private
     */
    calcCenter(hotels) {
        let sumLat = 0;
        let sumLng = 0;
        for (let i = 0; i < hotels.length; i++) {
            const hotel = hotels[i];
            sumLat += hotel.coordinates.lat;
            sumLng += hotel.coordinates.lng;
        }
        return {
            lat: sumLat / hotels.length,
            lng: sumLng / hotels.length
        }
    }
}
