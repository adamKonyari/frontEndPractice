class Search {
    constructor() {
        this.options = {
            cities: []
        }
    }

    /**
     * @public
     */
    init() {
        this.initSearch();
    }

    /**
     * @private
     */
    initSearch() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/cities',
            dataType: 'json',
            success: (data) => {
                this.options.cities = data;
                const cityNames = [];
                for (let i = 0; i < data.length; i++) {
                    if (typeof data[i] !== "undefined" && typeof data[i].name !== "undefined") {
                        cityNames.push(data[i].name);
                    }
                }
                this.initTypeahead(cityNames);
            }
        }
        );
    }

    /**
     * @private
     * @param cityNames
     */
    initTypeahead(cityNames) {
        let city_suggestions = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: cityNames
        });
        $('#my_search')
            .typeahead({
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
     * @param city
     * @returns {Array}
     * @public
     */
    getHotels(city) {
        const cities = this.options.cities;
        let hotels = [];
        cities.forEach((item, index) => {
            if (item.name === city) {
                hotels = item.hotels;
                return;
            }
        });
        return hotels;
    }

    /**
     * @public
     */
    getCoordinates(hotels, name) {
        let coordinates = {};
        for (let i = 0; i < hotels.length; i++) {
            const hotel = hotels[i];
            if (hotel.name === name) {
                let coordinates = hotel.coordinates;
                break;
            }
        }
        return coordinates;
    }
}