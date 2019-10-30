class Search {
    constructor() {
        this.options = {
            cities: [
                {
                    "id": 1,
                    "name": "Budapest",
                    "description": "Capital of Hungary",
                    "hotels": [
                        {
                            "id": 1,
                            "name": "Four Seasons",
                            "imageUrl": "https://static.travelweekly.com/i/sized/780/437/www.cfmedia.vfmleonardo.com/imageRepo/4/0/60/174/148/exterior_BUD_311_S.jpg"
                        },
                        {
                            "id": 2,
                            "name": "New York",
                            "imageUrl": "https://q-cf.bstatic.com/images/hotel/max1024x768/137/137678325.jpg"
                        },
                        {
                            "id": 3,
                            "name": "Grand Budapest Hotel",
                            "imageUrl": "https://s3-eu-west-2.amazonaws.com/folio-website-images/content/uploads/2018/07/25093042/James-Gilleard-Grand-Budapest.jpg"
                        },
                        {
                            "id": 4,
                            "name": "Mariott Budapest",
                            "imageUrl": "https://budapest-marriott-hotel.hotel-ds.com/data/Photos/940x500/7857/785791/785791038.JPEG"
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "Debrecen",
                    "description": "2nd largest city in Hungary",
                    "hotels": [
                        {
                            "id": 1,
                            "name": "Hilltop",
                            "imageUrl": "https://i.szalas.hu/hotels/458598/original/28101994.jpg"
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "Miskolc",
                    "description": "3rd largest city in Hungary",
                    "hotels": [
                        {
                            "id": 1,
                            "name": "City Hotel",
                            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSnuBpnDvI_bjnzaHoWx0y5xvGk9wVFXaNMgs76kHcDdrRf7tfj"
                        }
                    ]
                },
                {
                    "id": 4,
                    "name": "Sopron",
                    "description": "bar",
                    "hotels": [
                        {
                            "id": 1,
                            "name": "Hotel Sopron",
                            "imageUrl": "https://hotelsopron.hu/application/files/5915/0519/9884/hotel-sopron-galeria-hotel-kulso-medence-palya.jpg"
                        }
                    ]
                }
            ]
        }
    }

    /**
     *
     * @param city
     * @returns {Array}
     */
    getHotels(city) {
        const cities = this.options.cities;
        let hotels = [];
        cities.forEach((item, index) => {
            if(item.name === city) {
                hotels = item.hotels;
                return;
            }
        });
        return hotels;
    }

    init() {
        this.initSearch();
    }

    initSearch() {

        let cityNames = [];

        $.each(this.options.cities, function (index, city) {
            cityNames.push(city.name);
        })

        let city_suggestions = new Bloodhound({
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
            });
    }
}










