class Prizes {
    constructor() {
        this.init();
    }

    init() {
        this.initPrizes()
    }

    initPrizes() {
        this.fillDataTable();
    }

    fillDataTable() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/cities',
            dataType: 'json',
            success: (cities) => {
                for (let i = 0; i < cities.length; i++) {
                    const city = cities[i];
                    for (let j = 0; j < city.hotels.length; j++) {
                        const hotel = city.hotels[j];
                        for (let k = 0; k < hotel.prizes.length; k++) {
                            const prize = hotel.prizes[k],
                                row = $('<tr>'),
                                cityNameCell = $('<td>').html('<h4>' + city.name + '</h4>'),
                                hotelNameCell = $('<td>').html('<h4>' + hotel.name + '</h4>'),
                                personCell = $('<td>').html('<h4>' + prize.person + '</h4>'),
                                valueCell = $('<td>').html('<h4>' + prize.value + '</h4>');
                            row.append(cityNameCell, hotelNameCell, personCell, valueCell);
                            $('.prize-table tbody').append(row);
                        }
                    }
                }
            },
            error: () => {
                console.log('An error occurred while loading the cities!');
            }
        });
    }
}