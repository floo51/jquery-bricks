(function($) {

    $.bricks = function(element, options) {

        var defaults = {
            maxRowHeight: 310,
            itemSelector: 'img'
        };

        var plugin = this;
        plugin.settings = {};
        var $element = $(element),
            element = element;

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            plugin.layout();
        }

        plugin.layout = function() {
            var images = $(plugin.settings.itemSelector, $element);
            var containerWidth = element.getBoundingClientRect().width;
            var buffer = new Array();
            var currentOffset = -17;
            // initializes items' dimension to fit maxRowHeight
            $element.find(plugin.settings.itemSelector).each(function () {
                var ratio = $(this).width() / $(this).height();
                var height = plugin.settings.maxRowHeight - ($(this).outerHeight(true) - $(this).height());
                var width = ratio * height;
                $(this).height(height);
                $(this).width(width);
            });
            // removes previously added br
            $element.children('br').remove();
            // loop over items
            for (var i = 0; i < images.length; i++) {
                var image = $(images[i]);
                // where is it ?
                var thisOffset = image.offset().left + image.outerWidth();
                if (thisOffset <= currentOffset) {
                    // if on a new line, add to buffer
                    buffer.push(image);
                    // and compute dimensions to fit line
                    var totalWidth = 0;
                    var invariantW = 0;
                    for (var j = 0; j < buffer.length; j++) {
                        var el = $(buffer[j]);
                        totalWidth += el.innerWidth();
                        invariantW += el.outerWidth(true) - el.innerWidth();
                    }
                    for (var j = 0; j < buffer.length; j++) {
                        var el = $(buffer[j]);
                        var ratio = el.width() / el.height();
                        var invariantH = el.outerHeight(true) - el.innerHeight();
                        var height = (containerWidth - invariantW) / (totalWidth / (plugin.settings.maxRowHeight - invariantH));
                        var width = ratio * height;
                        el.height(height);
                        el.width(width);
                    }
                    // add a br (just in case, does it have any use ?)
                    $(buffer[buffer.length - 1]).after('<br/>');
                    // reset buffer and offset pos
                    buffer = new Array();
                    currentOffset = -17;
                } else {
                    // if not on a new line, build buffer
                    currentOffset = thisOffset;
                    buffer.push(image);
                }
            }
        }

        plugin.init();
    }

    $.fn.bricks = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('bricks')) {
                var plugin = new $.bricks(this, options);
                $(this).data('bricks', plugin);
            }
        });
    }

})(jQuery);
