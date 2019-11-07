class Subscribe {
    constructor() {
        this.init();
    }

    /**
     * @private
     */
    init() {
        this.initSubscribe();
    }

    /**
     * @private
     */
    initSubscribe() {
        this.initCustomModal();
        this.initSubscribeForm();
    }

    /**
     * this function initializes the extended modal plugin
     * @private
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

        $('#subscribe-modal-link').on('click', () => {
            $('#modal-subscribe-div').customModal({
                color: 'green'
            });
        });
    }

    /**
     * subscription form gets initialized in this function
     * validation, success and error handling are also implemented here
     * @private
     */
    initSubscribeForm() {
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
                            form.reset();
                        },
                        error: () => {
                            console.log('error');
                        }
                    });
                }
            });
    }
}