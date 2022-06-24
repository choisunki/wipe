;
(function() {

    $.fn.wipe = function(opts) {

        window.wiperCounts = 0;

        var defaults = {
                debug: false,
                sectClass: '.sect',
                wrap: 'tit_in',
                duration: 1.2,
                delay: 0.2,
                ease: 'cubic-bezier(0.64, 0.12, 0.19, 0.62)',
                direction: "left",

                classToAdd: 'vis',
                classToRemove: 'invisible',
                offset: 100,
                invertBottomOffset: true,
                repeat: false,
                callbackFunction: function(elem, action) {},
                scrollHorizontal: false

            },
            options = $.extend(defaults, opts);

        function getImageSize(imgSrc) {
            var newImg = new Image();
            newImg.src = imgSrc;
            var height = newImg.height;
            var width = newImg.width;
            p = $(newImg).ready(function() {
                return {
                    width: newImg.width,
                    height: newImg.height
                };
            });
            return {
                width: p[0]['width'],
                height: p[0]['height']
            };
        }

        function trans(meta, opts) {
            var defaults = {
                    type: 'px',
                    media: '1380',
                    designSize: 1920
                },
                options = $.extend(defaults, opts);

            var isIe11 = !!navigator.userAgent.match(/Trident.*rv\:11\./);

            var output = {};

            if (options.type == 'px') {

                var ratios = 1;
                if (options.media == '1380') {
                    ratios = 0.71875;
                } else if (options.media == '1920') {
                    ratios = 1;
                }
                output = {
                    width: meta.width * ratios + 'px',
                    height: meta.height * ratios + 'px'

                };
                if (isIe11) {
                    output.width = Math.round(meta.width * ratios) + 'px';
                    output.height = Math.round(meta.height * ratios) + 'px';
                }
            } else if (options.type == 'vw') {
                output = {
                    width: meta.width / (options.designSize * 0.01) + 'vw',
                    height: meta.height / (options.designSize * 0.01) + 'vw'
                };
            }

            return output;
        }

        var isMobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ? true : false;

        if (options.isMobile) {
            isMobile = true;
        }

        return this.each(function() {

            options.debug && console.log('%c모바일 여부 : ' + isMobile, 'background: #000; color: yellow; padding: 5px;');

            var $obj = $(this),
                $parent = $obj.closest(options.sectClass),
                $objwrap,
                $objimg = $obj.find('img'),
                imgMeta = getImageSize($objimg.attr('src')),
                imgMetaVW = isMobile ? trans(imgMeta, {
                    type: 'vw',
                    designSize: 750
                }) : trans(imgMeta, {
                    type: 'vw'
                }),
                imgMeta1380 = trans(imgMeta, {
                    type: 'px',
                    media: '1380'
                }),
                imgMeta1920 = trans(imgMeta, {
                    type: 'px',
                    media: '1920'
                }),
                styles = [];

            $obj.css('opacity', 0);
            var iamReady = function(o) {

                options.debug && console.log('%c로드가 완료된 이미지 : ' + $(o).attr('src'), 'background: #000; color: yellow; padding: 5px 10px;');

                $obj.css('opacity', 1);
                options.debug && console.log('%c- show object ', 'background: #999; color: yellow; padding: 5px 10px;');

                setTimeout(function() {
                    options.debug && console.log('%c- init viewportChecker (' + window.wiperCounts + ') ', 'background: #999; color: yellow; padding: 5px 10px;');
                    window.wiperCounts = window.wiperCounts + 1;
                    $obj.viewportChecker({
                        classToAdd: options.classToAdd,
                        offset: options.offset,
                        repeat: options.repeat,
                        invertBottomOffset: options.invertBottomOffset
                    });
                }, 550);
            };
            $objimg.each(function() {
                var _data_ = new Image();
                _data_.onload = iamReady(this);
                _data_.src = $(this).attr('src');
            });

            $obj.wrapInner('<div class="' + options.wrap + '"></div>');
            $objwrap = $obj.find('.' + options.wrap);

            var myClass = '.' + $parent.attr('class').replace(/ /gi, '.');
            myClass = myClass + ' .' + $obj.attr('class').replace(/ /gi, '.');

            var direction_hook = 'width';
            if (options.direction == 'top' || options.direction == 'bottom') {
                direction_hook = 'height';
            }

            styles.push(myClass + '{\n');
            styles.push('\twidth:' + imgMetaVW.width + ';');
            styles.push('\n\theight:' + imgMetaVW.height + ';');
            styles.push('\n}\n\n');

            styles.push(myClass + ' .tit_in{');

            styles.push('\n\twill-change:' + direction_hook + ';');
            styles.push('\n\tdisplay:block;');
            styles.push('\n\tposition:relative;');
            styles.push('\n\tbox-sizing: border-box;');
            works.debug && styles.push('\n\tbackground-color: rgba(0,0,0,0.2);');
            styles.push('\n\toverflow:hidden;');

            if (options.direction == 'top' || options.direction == 'bottom') {
                styles.push('\n\twidth:' + imgMetaVW.width + ';');
                styles.push('\n\theight:0px;');
            }

            if (options.direction == 'bottom') {
                styles.push('\n\tposition: absolute;');
                styles.push('\n\ttop: auto;');
                styles.push('\n\tbottom: 0;');
            }

            if (options.direction == 'left' || options.direction == 'right') {
                styles.push('\n\t/* @direction ' + options.direction + ' only { */');
                styles.push('\n\twidth:0px;');
                styles.push('\n\theight:' + imgMetaVW.height + ';');
                styles.push('\n\t/* } @direction ' + options.direction + ' only */');
            }

            if (options.direction == 'right') {
                styles.push('\n\tfloat: right;');
            }
            styles.push('\n}\n\n');

            styles.push(myClass + ' .tit_in > img{');

            styles.push('\n\tmax-width: unset !important;');

            if (options.direction == 'left' || options.direction == 'right') {
                styles.push('\n\tposition: absolute;');
            }
            if (options.direction == 'left') {
                styles.push('\n\ttop: 0;');
                styles.push('\n\tleft: 0;');
            }

            if (options.direction == 'right') {
                styles.push('\n\ttop: 0;');
                styles.push('\n\tleft: auto;');
                styles.push('\n\tright: 0;');
            }

            styles.push('\n\twidth: ' + imgMetaVW.width + ';');

            if (options.direction == 'top' || options.direction == 'bottom') {
                styles.push('\n\tposition: absolute;');
                styles.push('\n\tleft: 0;');
                styles.push('\n\theight: ' + imgMetaVW.height + ';');
            }

            if (options.direction == 'top') {
                styles.push('\n\ttop: 0;');
                styles.push('\n\tbottom: auto;');
            }

            if (options.direction == 'bottom') {
                styles.push('\n\ttop: auto;');
                styles.push('\n\tbottom: 0;');
            }

            styles.push('\n\t-webkit-transition: ' + direction_hook + ' ' + options.duration + 's ' + options.delay + 's ' + options.ease + ';');
            styles.push('\n\t-khtml-transition: ' + direction_hook + ' ' + options.duration + 's ' + options.delay + 's ' + options.ease + ';');
            styles.push('\n\t-moz-transition: ' + direction_hook + ' ' + options.duration + 's ' + options.delay + 's ' + options.ease + ';');
            styles.push('\n\t-op-transition: ' + direction_hook + ' ' + options.duration + 's ' + options.delay + 's ' + options.ease + ';');
            styles.push('\n\ttransition: ' + direction_hook + ' ' + options.duration + 's ' + options.delay + 's ' + options.ease + ';');

            styles.push('\n}\n\n');

            styles.push('\n/* 활성 정의 */');
            styles.push('\n' + myClass + '.' + options.classToAdd + ' .tit_in{\n');
            styles.push('\t\width:' + imgMetaVW.width + ';');
            if (options.direction == 'top' || options.direction == 'bottom') {
                styles.push('\n\t\height:' + imgMetaVW.height + ';');
            }
            styles.push('\n\t-webkit-transition: ' + direction_hook + ' ' + options.duration + 's ' + options.delay + 's ' + options.ease + ';');
            styles.push('\n\t-khtml-transition: ' + direction_hook + ' ' + options.duration + 's ' + options.delay + 's ' + options.ease + ';');
            styles.push('\n\t-moz-transition: ' + direction_hook + ' ' + options.duration + 's ' + options.delay + 's ' + options.ease + ';');
            styles.push('\n\t-op-transition: ' + direction_hook + ' ' + options.duration + 's ' + options.delay + 's ' + options.ease + ';');
            styles.push('\n\ttransition: ' + direction_hook + ' ' + options.duration + 's ' + options.delay + 's ' + options.ease + ';');
            styles.push('\n}\n\n');

            if (!isMobile) {
                styles.push('@media all and (max-width: 1380px) {\n');

                styles.push('\n\t' + myClass + '{');
                styles.push('\n\t\twidth:' + imgMeta1380.width + ';');
                styles.push('\n\t\theight:' + imgMeta1380.height + ';');
                styles.push('\n\t}\n');

                styles.push('\n\t' + myClass + ' .tit_in{');
                if (options.direction == 'left' || options.direction == 'right') {
                    styles.push('\n\theight:' + imgMeta1380.height + ';');
                }
                if (options.direction == 'top' || options.direction == 'bottom') {
                    styles.push('\n\t\twidth:' + imgMeta1380.width + ';');
                }
                if (options.direction == 'top') {
                    styles.push('\n\t\theight:0px;');
                }
                styles.push('\n\t}\n\n');

                styles.push('\t' + myClass + ' .tit_in > img{');
                styles.push('\n\t\twidth: ' + imgMeta1380.width + ';');
                if (options.direction == 'top' || options.direction == 'bottom') {
                    styles.push('\n\t\theight: ' + imgMeta1380.height + ';');
                }
                styles.push('\n\t}\n\n');

                styles.push('\t/* 활성 정의 */\n');
                styles.push('\t' + myClass + '.' + options.classToAdd + ' .tit_in{');

                if (options.direction == 'left' || options.direction == 'right') {
                    styles.push('\n\t\t/* @direction ' + options.direction + ' only { */');
                    styles.push('\n\t\twidth:' + imgMeta1380.width + ';');
                    styles.push('\n\t\t/* } @direction ' + options.direction + ' only */');
                }

                if (options.direction == 'top' || options.direction == 'bottom') {
                    styles.push('\n\t\t/* ' + options.direction + ' only { */');
                    styles.push('\n\t\twidth:' + imgMeta1380.width + ';');
                    styles.push('\n\t\theight:' + imgMeta1380.height + ';');
                    styles.push('\n\t\t/* } ' + options.direction + ' only */');
                }

                styles.push('\n\t}\n\n');

                styles.push('}\n\n');

                styles.push('@media all and (min-width: 1920px) {\n');

                styles.push('\n\t' + myClass + '{');
                styles.push('\n\t\twidth:' + imgMeta1920.width + ';');
                styles.push('\n\t\theight:' + imgMeta1920.height + ';');
                styles.push('\n\t}\n');

                styles.push('\n\t' + myClass + ' .tit_in{\n');

                if (options.direction == 'left' || options.direction == 'right') {
                    styles.push('\t\t/* @direction ' + options.direction + ' only { */\n');
                    styles.push('\n\t\theight:' + imgMeta1920.height + ';');
                    styles.push('\n\t\t/* } @direction ' + options.direction + ' only */\n');
                }

                if (options.direction == 'top' || options.direction == 'bottom') {
                    styles.push('\t\t/* ' + options.direction + ' only */\n');
                    styles.push('\t\twidth:' + imgMeta1920.width + ';');
                }

                if (options.direction == 'top') {
                    styles.push('\n\t\theight:0px;');
                }

                styles.push('\n\t}\n');

                styles.push('\n\t' + myClass + ' .tit_in > img{');
                styles.push('\n\t\twidth: ' + imgMeta1920.width + ';');
                if (options.direction == 'top' || options.direction == 'bottom') {
                    styles.push('\n\t\theight: ' + imgMeta1920.height + ';');
                }
                styles.push('\n\t}\n');

                styles.push('\n\t/* 활성 정의 */');
                styles.push('\n\t' + myClass + '.' + options.classToAdd + ' .tit_in{');

                if (options.direction == 'left' || options.direction == 'right') {
                    styles.push('\n\t\t/* @direction ' + options.direction + ' only { */');
                    styles.push('\n\t\twidth:' + imgMeta1920.width + ';');
                    styles.push('\n\t\t/* } @direction ' + options.direction + ' only */');
                }

                if (options.direction == 'top' || options.direction == 'bottom') {
                    styles.push('\n\t\t/* ' + options.direction + ' only */');
                    styles.push('\n\t\twidth:' + imgMeta1920.width + ';');
                    styles.push('\n\t\theight:' + imgMeta1920.height + ';');
                }

                styles.push('\n\t}\n\n');

                styles.push('}\n');
            }

            options.debug && console.log('%c<style>', 'background: #000; color: yellow; padding: 5px;');
            options.debug && console.log(styles.join(''));
            options.debug && console.log('%c<style>', 'background: #000; color: yellow; padding: 5px;');

            $('head').append('<style>' + styles.join('') + '</style>');
        });
    };
})(jQuery);