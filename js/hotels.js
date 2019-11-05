class Hotels {
    constructor(search, customMap) {
        this.search = search;
        this.customMap = customMap;
    }

    init() {
        this.initHotels();
    }

    /**
     * @private
     */
    initHotels() {
        const search = this.search;
        $('.city-input-form').on('submit', event => {
            event.preventDefault();
            const city = $('#my_search').val(),
                hotels = search.getHotels(city);
            if (hotels.length !== 0) {
                this.initCustomTooltip();
                this.createHotelsTable(hotels, city);
                $('#map-modal-link').on('click', city => {
                    this.customMap.addAllMarkers(hotels);
                });
            }
        })
    }

    /**
     * function that initializes the extended tooltip function
     * @private
     */
    initCustomTooltip() {
        (function ($) {
            const tooltip = $.fn.tooltip;
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
        });
        $('.hotels-table-container').on('focusout', function () {
            $(".hotels-table tr").removeClass();
        });
    }

    /**
     * @private
     */
    createHotelsTable(hotels, city) {
        if ($('.hotels-table')) {
            $('.hotels-table').remove();
        }
        const tbl = $('<table>')
            .addClass('hotels-table');
        const tblBody = $('<tbody>');
        hotels.forEach((item, index) => {
            const row = $('<tr data-toggle="tooltip" data-placement="right" title="' + city + '">')
                    .customTooltip(),
                hotelName = $('<h4 data-toggle="modal" data-target="#modal-map-div">')
                    .text(item.name)
                    .on('click', () => {
                        this.customMap.addAllMarkers([item]);
                    }),
                nameCell = $('<td>').html(hotelName),
                imgCell = $('<td>').html('<img src="' + item.imageUrl + '">');
            row.append(nameCell, imgCell);
            tblBody.append(row);
        });
        tbl.append(tblBody);
        $('.hotels-table-container').append(tbl);
        this.setActiveRow();
    }
}