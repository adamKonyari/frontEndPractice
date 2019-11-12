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
        const arrivalInput = $('.datepicker.arrival').datepicker({
            dateFormat: 'yy-mm-dd',
            minDate: new Date(),
            showAnim: 'slideDown'
        });
        const departureInput = $('.datepicker.departure').datepicker({
            dateFormat: 'yy-mm-dd',
            beforeShow: restrictDepartureDate,
            showAnim: 'slideDown'
        });

        function restrictDepartureDate() {
            var arrivalDate = $('.arrival.datepicker').datepicker('getDate');
            var arrivalDateYear = $.datepicker.formatDate('yy', arrivalDate);
            var arrivalDateMonth = $.datepicker.formatDate('m', arrivalDate);
            var arrivalDateDay = parseFloat($.datepicker.formatDate('d', arrivalDate));
            $('input.datepicker.departure').datepicker('option', 'minDate', new Date(arrivalDateYear, arrivalDateMonth - 1, arrivalDateDay + 1));
        }
    }
}