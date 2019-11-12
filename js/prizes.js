class Prizes {
    constructor() {
        this.init();
    }

    /**
     * fields of the class are initialized here
     * @private
     */
    init() {
        this.initPrizes();
        this.search = new Search();
        this.customMap = new CustomMap(this.search);
    }
    /**
     * @private
     */
    initPrizes() {
        this.initDataTable();
    }

    /**
     * after a GET request returns the list of cities
     * a DataTable gets initialized
     * then it gets filled with data from the list of cities
     * @private
     */
    initDataTable() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/cities',
            dataType: 'json',
            success: (cities) => {
                this.buildDataTable(cities);
                const table = $('.prize-table').DataTable({
                    'columns': [
                        {
                            "className": 'details-control',
                            "orderable": false,
                            "data": null,
                            "defaultContent": '<h4>+</h4>'
                        },
                        null,
                        null,
                        null,
                        null
                    ],
                    'order': [[4, 'desc']],
                });
                this.initRowDetails(table);
            },
            error: () => {
                console.log('An error occurred while loading the cities!');
            }
        });
    }

    /**
     * prizes are getting extracted from the list of cities (and hotels)
     * then the prize-table is filled with the data (and corresponding cells) accordingly
     * @private 
     */
    buildDataTable(cities) {
        this.hotels = [];
        for (let i = 0; i < cities.length; i++) {
            const city = cities[i];
            for (let j = 0; j < city.hotels.length; j++) {
                const hotel = city.hotels[j];
                this.hotels.push(hotel);
                for (let k = 0; k < hotel.prizes.length; k++) {
                    const prize = hotel.prizes[k];
                    let valueText = '';
                    for (let m = 0; m < prize.value; m++) {
                        valueText += '$';
                    }
                    const row = $('<tr>').data('hotel', hotel),
                        emptyCell = $('<td>').css('cursor', 'pointer'),
                        cityNameCell = $('<td>').html('<h4>' + city.name + '</h4>'),
                        hotelNameCell = $('<td>').html('<h4>' + hotel.name + '</h4>'),
                        personCell = $('<td>').html('<h4>' + prize.person + '</h4>'),
                        valueCell = $('<td>').html('<h4>' + valueText + '</h4>');
                    row.append(emptyCell, cityNameCell, hotelNameCell, personCell, valueCell);
                    $('.prize-table tbody').append(row);
                }
            }
        }
    }

    /**
     * this function returns a button which gets added to the extra info-row in the table
     * when the button gets clicked, the map will with the marker of the corresponding hotel
     * @private 
     */
    format(hotel) {
        const button = $("<button/>", {
            text: hotel.name,
            click: () => { this.customMap.addAllMarkers([hotel]) }
        }).attr({
            'data-toggle': 'modal',
            'data-target': '#modal-map-div'
        })
            .addClass('btn btn-default')
        return button;
    }
    /**
     * this function is responsible for initializing the row with the extra hotel button,
     * when the "+" signed is clicked in a row
     * @private 
     */
    initRowDetails(table) {
        const self = this;
        $('.prize-table').on('click', '.details-control', function () {
            const tr = $(this).closest('tr'),
                row = table.row(tr);
            if (row.child.isShown()) {
                row.child.hide();
                tr.toggleClass('shown');
            }
            else {
                row.child(self.format(tr.data('hotel'))).show();
                tr.toggleClass('shown');
            }
        });
    }
}