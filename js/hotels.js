class Hotels {
    constructor(search, customMap) {
        this.init(search, customMap);
    }

    /**
     * @private
     * @param search
     * @param customMap
     */
    init(search, customMap) {
        this.search = search;
        this.customMap = customMap;
        this.initHotels();
    }

    /**
     * the function builds hotels table if the city's name is correct
     * custom tooltip and map markers on modal popup are also set here
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
                $('#modal-map-div').on('show.bs.modal', city => {
                    this.customMap.addAllMarkers(hotels);
                });
            }
        })
    }

    /**
     * function that initializes the extended tooltip plugin
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
     * this function sets the active classes on a row (and on the ones after) on click,
     * previously set classes are deleted on every row before adding the new ones
     * @private
     */
    setActiveRow() {
        const row = $(".hotels-table tr");
        row.on('click', function (e) {
            row.removeClass();
            $(this).addClass('active-row').nextAll().addClass('rows-after');
        });
        $('.hotels-table-container').on('focusout', function () {
            row.removeClass();
        });
    }

    /**
     * function builds hotels table and adds corresponding classes to the elements
     * already-existing hotels table gets removed before the new table is built
     * @private
     */
    createHotelsTable(hotels, city) {
        const hotelsTable = $('.hotels-table');
        if (hotelsTable.length > 0) {
            hotelsTable.remove();
        }
        const table = $('<table>').addClass('hotels-table table-stripped'),
            tableBody = $('<tbody>');
        hotels.forEach((item, index) => {
            const row = $('<tr data-toggle="tooltip" data-placement="right" title="' + city + '">').customTooltip(),
                hotelName = $('<h4 data-toggle="modal" data-target="#modal-map-div">').text(item.name)
                    .on('click', () => {
                        this.customMap.addAllMarkers([item]);
                    }),
                nameCell = $('<td>').html(hotelName),
                imgCell = $('<td>').html('<img src="' + item.imageUrl + '">');
            row.append(nameCell, imgCell);
            tableBody.append(row);
        });
        table.append(tableBody);
        $('.hotels-table-container').append(table);
        this.setActiveRow();
    }
}