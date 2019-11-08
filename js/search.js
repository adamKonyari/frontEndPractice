class Search {
    constructor() {
        this.init();
    }

    /**
     * @private
     */
    init() {
        this.cities = [];
        this.initSearch();
    }

    /**
     * cities are loaded from an external json resource with jQuery ajax
     * @private
     */
    initSearch() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/cities',
            dataType: 'json',
            success: (data) => {
                this.cities = data;
                const cityNames = [];
                for (let i = 0; i < data.length; i++) {
                    if (typeof data[i] !== "undefined" && typeof data[i].name !== "undefined") {
                        cityNames.push(data[i].name);
                    }
                }
                this.initTypeahead(cityNames);
            },
            error: () => {
                console.log('An error occurred while loading the cities!');
            }
        }
        );
    }

    /**
     * typeahead gets initialized on every row in the hotels table
     * typeahead content is the city's name where the hotel is found
     * @private
     * @param cityNames
     */
    initTypeahead(cityNames) {
        const city_suggestions = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: cityNames
        });
        $('#my_search').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
            {
                name: 'cities',
                source: city_suggestions
            })
            .on('typeahead:selected', function () {
                $('.city-input-form').submit();
            });
    }

    /**
     * function returns an array of hotels based on the city
     * @param cityName
     * @returns {Array}
     * @public
     */
    getHotels(cityName) {
        let hotels = [];
        this.cities.forEach((city, index) => {
            if (city.name === cityName) {
                hotels = city.hotels;
                return;
            }
        });
        return hotels;
    }

    /**
     * function returns the coordinates of a single hotel based on the name
     * @public
     */
    getCoordinates(hotels, hotelName) {
        for (let i = 0; i < hotels.length; i++) {
            const hotel = hotels[i];
            if (hotel.name === hotelName) {
                return hotel.coordinates;
            }
        }
    }

    getCities() {
        return this.cities;
    }
}