drinkapp.directive("swiperCard", function ($timeout) {
    return {
        restrict: "A",
        scope: {
            open: '='
        },
        link: function (scope, elem, attrs) {
            console.log('123')
            var reveal = $(elem).siblings('.card-reveal');
            var revealHeight = reveal.height();
            var windowHeight = window
            var transtion_time = 300;

            scope.status = true;
            elem.bind('touchstart', function (e) {
                scope.startClientY = e.targetTouches[0].clientY;
            });
            elem.bind('touchmove', function (e) {
                var clientY = e.targetTouches[0].clientY;
                var distance = clientY - scope.startClientY;
                var clientHeight = elem[0].clientHeight;
                var moving = Math.abs(distance) + clientHeight;
                if (distance < 0) {
                    if (moving < revealHeight && moving > 0) {
                        reveal.css({
                            'z-index': 1,
                            '-webkit-transition': '0s all linear',
                            '-webkit-transform': 'translateY(' + -moving + 'px)'
                        });
                    }
                    scope.$apply(function () {
                        if (moving > revealHeight / 3) {
                            scope.open = true;
                        } else {
                            scope.open = false;
                        }
                    });

                }
            });

            elem.bind('touchend', function (e) {
                reveal.css({
                    'z-index': '',
                    '-webkit-transition': '',
                    '-webkit-transform': ''
                });
            })
        }
    };
});
