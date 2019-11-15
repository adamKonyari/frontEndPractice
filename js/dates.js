class Dates {
    constructor() {
        this.init()
    }

    /**
     * @private
     */
    init() {
        this.initDates();
    }

    /**
    * @private
    */
    initDates() {
        this.initArrivalDeparture();
    }

    initArrivalDeparture() {
        this.initHunLocale();

        const arrival = $('.datepicker.arrival').datepicker({
            dateFormat: 'yy-mm-dd',
            minDate: new Date(),
            showAnim: 'slideDown',
            showOn: "button",
            buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif",
            buttonText: 'Open calendar',
            onSelect: () => {
                if (departure.val() <= arrival.val() && departure.val() !== '') {
                    const date = arrival.datepicker('getDate').getDate() + 1,
                        month = arrival.datepicker('getDate').getMonth() + 1,
                        year = arrival.datepicker('getDate').getFullYear()
                    departure.val(`${year}-${month}-${date}`);
                }
            },
        });

        const departure = $('.datepicker.departure').datepicker({
            dateFormat: 'yy-mm-dd',
            minDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            showAnim: 'slideDown',
            showOn: "button",
            buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif",
            buttonText: 'Open calendar',
            onSelect: () => {
                if (arrival.val() >= departure.val()) {
                    const date = departure.datepicker('getDate').getDate() - 1,
                        month = departure.datepicker('getDate').getMonth() + 1,
                        year = departure.datepicker('getDate').getFullYear()
                    arrival.val(`${year}-${month}-${date}`);
                }
            }
        });
    }

    initHunLocale() {
        /* Hungarian initialisation for the jQuery UI date picker plugin. */
        (function (factory) {
            if (typeof define === "function" && define.amd) {

                // AMD. Register as an anonymous module.
                define(["../widgets/datepicker"], factory);
            } else {

                // Browser globals
                factory(jQuery.datepicker);
            }
        }(function (datepicker) {
            datepicker.regional.hu = {
                closeText: "bezár",
                prevText: "vissza",
                nextText: "előre",
                currentText: "ma",
                monthNames: ["Január", "Február", "Március", "Április", "Május", "Június",
                    "Július", "Augusztus", "Szeptember", "Október", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún",
                    "Júl", "Aug", "Szep", "Okt", "Nov", "Dec"],
                dayNames: ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"],
                dayNamesShort: ["Vas", "Hét", "Ked", "Sze", "Csü", "Pén", "Szo"],
                dayNamesMin: ["V", "H", "K", "Sze", "Cs", "P", "Szo"],
                weekHeader: "Hét",
                dateFormat: "yy.mm.dd.",
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: true,
                yearSuffix: ""
            };
            datepicker.setDefaults(datepicker.regional.hu);
            return datepicker.regional.hu;
        }));
    }
}