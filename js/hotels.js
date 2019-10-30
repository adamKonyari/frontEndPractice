class Hotels {
    constructor(search) {
        this.search = search;
        this.cityToFind;
    }

    init() {
        this.initHotels();
    }

    // @private
    setActiveRow() {
        $(".hotels-table tr").on('click', function (e) {
                $(".hotels-table tr").removeClass();
                $(this).addClass('active-row').nextAll().addClass('rows-after');
            }
        );
        $('.hotels-table-container').on('focusout', function () {
            $(".hotels-table tr").removeClass();
        })
    }

    // @private
    createHotelsTable(hotels, city) {
        if ($('.hotels-table')) {
            $('.hotels-table').remove();
        }
        const tbl = $('<table>').addClass('hotels-table');
        const tblBody = $('<tbody>');
        hotels.forEach(
            (item, index) => {
                const row = $('<tr data-toggle="tooltip" data-placement="right" title="' + city + '">')
                        .tooltip(),
                    nameCell = $('<td>').html('<h4>' + item.name + '</h4>'),
                    imgCell = $('<td>').html('<img src="' + item.imageUrl + '">');
                row.append(nameCell, imgCell);
                tblBody.append(row);
            }
        );
        tbl.append(tblBody);
        $('.hotels-table-container').append(tbl);
        this.setActiveRow();
    }

    //@private
    initHotels() {
        const search = this.search;
        $('.city-input-form').on('submit', (event) => {
            event.preventDefault();
            const city = $('#my_search').val(),
                hotels = search.getHotels(city);
            if (hotels.length !== 0) {
                this.createHotelsTable(hotels, city);
            }
        })
    }
}