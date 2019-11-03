class CustomMap {

    constructor() {
    }

    /**
     * @public
     */
    init() {
        let mapOptions = {
            zoom: 8,
            center: { lat: 47.49801, lng: 19.03991 }
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
}