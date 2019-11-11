class Prizes {
    constructor() {
        this.init();
    }

    init() {
        this.initPrizes();
        this.search = new Search();
        this.customMap = new CustomMap(this.search);
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

    format(hotel) {
        $("<button data-toggle='modal' data-target='#modal-map-div' class='btn btn-default dt-map-modal-link'>")
        return `
        <table>
            <tr>
                <button data-toggle="modal" data-target="#modal-map-div" class='btn btn-default dt-map-modal-link'>HOTEL</button>
            </tr>
        </table>
        `
    }

    initRowDetails(table) {
        const self = this;
        $('.prize-table').on('click', '.details-control', function () {
            const tr = $(this).closest('tr'),
                row = table.row(tr);
            if (row.child.isShown()) {
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                row.child(self.format(tr.data('hotel'))).show();
                tr.addClass('shown');   
            }
            $('.dt-map-modal-link').on('click', () => {
                self.customMap.addAllMarkers([tr.data('hotel')]);        
            });
        });
    }
}