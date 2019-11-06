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
    addMarker(hotel) {
        const baseUrl = 'https://maps.google.com/mapfiles/kml/paddle/';
        const firstLetter = hotel.name.charAt(0);
        const marker = new google.maps.Marker({
            position: hotel.coordinates,
            map: map,
            icon: baseUrl + firstLetter + '.png'
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
                this.addMarker(hotel);
            }
        }
        this.fitMarkers();
        // map.setCenter(this.calcCenter(hotels));
    }

    /**
     * @private
     */
    deleteMarkers() {
        for (let i = 0; i < this.markers.length; i++) {
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
        let sumLat = 0,
            sumLng = 0;
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

    fitMarkers() {
        const bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < this.markers.length; i++) {
            bounds.extend(this.markers[i].getPosition());
        }
        google.maps.event.addListenerOnce(map, 'idle', function() {
            map.fitBounds(bounds);
        });
    }
}
