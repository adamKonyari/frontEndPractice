class Subscribe {
    constructor() {
    }

    init() {
        this.initSubscribe();
    }

    initSubscribe() {
        this.initCustomModal();
        this.initSubscribeForm();
    }

    /**
     * extend syantax:
     * $.fn.myPlugin = $.extend(true, $.fn.originalPlugin, myplugin)
     */

    initCustomModal() {
        (function ($) {
            const modal = $.fn.modal;
            $.fn.customModal = function (options) {
                modal.apply(this);
                const settings = $.extend({
                    color: 'black'
                }, options)
                return this.css('color', settings.color);
            };
        }(jQuery));

        // (function ($) {
        //     const custommodal = function() {
        //         console.log('custom called');
        //         this.css('color', 'green');
        //     }
        //     $.fn.customModal = $.extend(true, $.fn.modal, custommodal);
        //
        // }(jQuery));

        $('#subscribe-modal-link').on('click', () => {
            $('#modal-subscribe-div').customModal({
                color: 'green'
            });
        });
    }

    initSubscribeForm() {
        //add validation to the subscribe form
        $("#subscribe-form")
            .validate({
                rules: {
                    first_name: {
                        required: true,
                        minlength: 3
                    },
                    last_name: {
                        required: true,
                        minlength: 3
                    },
                    email: {
                        required: true
                    }
                },

                submitHandler: (form) => {
                    $.ajax({
                        url: 'http://localhost:3001/subscribers',
                        type: 'POST',
                        data: $('#subscribe-form').serialize(),
                        dataType: 'json',
                        success: () => {
                            console.log('subscriber saved');
                            $('#modal-subscribe-div').modal('toggle');
                        },
                        error: () => {
                            console.log('error');
                        }
                    });
                }
            });
    }
}