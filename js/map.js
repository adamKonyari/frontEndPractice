class CustomMap {

    constructor(search) {
        this.search = search;
        this.markers = [];
    }

    /**
     * @public
     */
    init() {
        const mapOptions = {
            zoom: 13,
            center: {lat: 47.49801, lng: 19.03991}
        };
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
    }

    /**
     * function sets the map property of the window object null
     * script tag for the google maps api also created and added to the DOM here
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
     * function receives a hotels array and sets all markers on the map
     * fitmarkes() gets invoked in order to adjust the map view accordingly
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
    }

    /**
     * a single marker gets created in this method and added to the markers array
     * custom marker is set based on the first character of the hotel's name
     * @private
     * @param coordinates
     */
    addMarker(hotel) {
        const baseUrl = 'https://maps.google.com/mapfiles/kml/paddle/',
            firstChar = hotel.name.charAt(0),
            marker = new google.maps.Marker({
                position: hotel.coordinates,
                map: map,
                icon: baseUrl + firstChar + '.png'
            });
        // map.setCenter(marker.getPosition());
        this.markers.push(marker);
    }

    /**
     * markers array gets cleared in this method
     * @private
     */
    deleteMarkers() {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
        this.markers = [];
    }

    /**
     * this function extracts the coordinates of hotels and adjust the map accordingly
     * @private
     */
    fitMarkers() {
        const bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < this.markers.length; i++) {
            bounds.extend(this.markers[i].getPosition());
        }
        google.maps.event.addListenerOnce(map, 'idle', function () {
            map.fitBounds(bounds);
        });
    }
}