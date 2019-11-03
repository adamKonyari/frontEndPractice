class Hotels {
    constructor(search) {
        this.search = search;
        // this.cityToFind;
    }

    init() {
        this.initHotels();
    }

    /**
     * @private
     */
    initHotels() {
        const search = this.search;
        $('.city-input-form').on('submit', (event) => {
            event.preventDefault();
            const city = $('#my_search').val(),
                hotels = search.getHotels(city);
            if (hotels.length !== 0) {
                this.initCustomTooltip();
                this.createHotelsTable(hotels, city);
            }
        })
    }

    /**
     * @private
     * function that initializes the extended tooltip function
     */
    initCustomTooltip() {
        (function ($) {
            const tooltip = $.fn.tooltip
            $.fn.customTooltip = function () {
                const newTooltip = tooltip.apply(this);
                console.log('tooltip function invoked');
                return newTooltip;
            }
        })(jQuery);
    }

    /**
     * @private
     */
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

    /**
     * @private
     */
    createHotelsTable(hotels, city) {
        if ($('.hotels-table')) {
            $('.hotels-table').remove();
        }
        const tbl = $('<table>').addClass('hotels-table');
        const tblBody = $('<tbody>');
        hotels.forEach(
            (item, index) => {
                const row = $('<tr data-toggle="tooltip" data-placement="right" title="' + city + '">')
                    .customTooltip(),
                    hotelName = $('<h4>').text(item.name).on('click', () => { alert('ok') }),
                    nameCell = $('<td>').html(hotelName),
                    imgCell = $('<td>').html('<img src="' + item.imageUrl + '">');
                row.append(nameCell, imgCell);
                tblBody.append(row);
            }
        );
        tbl.append(tblBody);
        $('.hotels-table-container').append(tbl);
        this.setActiveRow();
    }
}