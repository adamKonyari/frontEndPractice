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
        const modal = $.fn.modal,
            defaults = $.extend({}, $.fn.modal.defaults);
        $.fn.customModal = function (options) {
            options = $.extend(defaults, options);
            console.log('custom modal called');
            return modal.call(this, options);
        };
        $('#subscribe-modal-link').on('click', () => {
            $('#modal-subscribe-div').customModal();
        });
    }

    initSubscribeForm() {
        //add validation to the subscribe form
        $("#subscribe-form")
            .validate({
                rules: {
                    "first-name": {
                        required: true,
                        minlength: 3
                    },
                    "last-name": {
                        required: true,
                        minlength: 3
                    },
                    email: {
                        required: true
                    }
                }
            });

        $("#subscribe-form").on('submit', (e) => {
            e.preventDefault();
            console.log('form ok');
        });
    }
}