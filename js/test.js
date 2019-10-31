(function ($) {
    const tooltip = $.fn.tooltip
    $.fn.customTooltip = function () {
        const newTooltip = tooltip.apply(this);
        console.log('tooltip function invoked');
        return newTooltip;
    }
})(jQuery);
