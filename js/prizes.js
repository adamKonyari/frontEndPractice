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

    format() {
        return `
        <table>
            <tr>
                <button class='btn btn-default'>HOTEL</button>
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
                row.child(self.format()).show();
                tr.addClass('shown');
            }
        });
    }
}