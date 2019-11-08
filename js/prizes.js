class Prizes {
    constructor() {
        this.init();
    }

    init() {
        this.initPrizes()
    }

    initPrizes() {
        this.initDataTable();
    }

    /**
     * todo: initialize table events
     */
    initDataTable() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/cities',
            dataType: 'json',
            success: (cities) => {
                this.buildDataTable(cities);
                const table = $('.prize-table');
                table.dataTable({
                    'order': [[3, 'desc']],
                });
                table.on('order.dt', () => {
                    console.log('table redrawn');
                });
                
            },
            error: () => {
                console.log('An error occurred while loading the cities!');
            }
        });
    }

    buildDataTable(cities) {
        let counter = 0;
        for (let i = 0; i < cities.length; i++) {
            const city = cities[i];
            for (let j = 0; j < city.hotels.length; j++) {
                const hotel = city.hotels[j];
                for (let k = 0; k < hotel.prizes.length; k++) {
                    const prize = hotel.prizes[k];
                    let valueText = '';
                    for (let m = 0; m < prize.value; m++) {
                        valueText += '$';
                    }
                    const row = $('<tr>'),
                        cityNameCell = $('<td>').html('<h4>' + city.name + '</h4>'),
                        hotelNameCell = $('<td>').html('<h4>' + hotel.name + '</h4>'),
                        personCell = $('<td>').html('<h4>' + prize.person + '</h4>'),
                        valueCell = $('<td>').html('<h4>' + valueText + '</h4>');
                    row.append(cityNameCell, hotelNameCell, personCell, valueCell);
                    $('.prize-table tbody').append(row);
                }
            }
        }
    }
}