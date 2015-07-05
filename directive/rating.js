//Text Binding (Prefix: @)
//One-way Binding (Prefix: &)
//Two-way Binding (Prefix: =)


drinkapp.directive('ratingStar', function () {
    return {
        //attribute
        restrict: 'AE',
        //覆蓋
        replace: 'true',
        scope: {
            rating: '='
        },
        //功能
        link: function ($scope, $ele, $attrs) {
            $scope.stars = [];
            var star = {};
            var count = parseInt($attrs.count);
            for (var i = count; i > 0; i--) {
                var star = {};
                star.value = i;
                $scope.stars.push(star);
            }
        },
        //顯示
        template: '<div class="rating">' +
            '<div class="wrapper">' +
            '<input ng-repeat-start="star in stars track by $index" class="star-radio" id="rating-{{star.value}}" name="rating" type="radio" value="{{star.value}}" ng-model="rating" />' +
            '<label for="rating-{{star.value}}" data-value="{{star.value}}" ng-repeat-end>' +
            '<span class="rating-star">' +
            ' <i class="fa fa-star-o"></i>' +
            '<i class="fa fa-star"></i>' +
            '</span>' +
            '</label>' +
            '</div>' +
            '</div>'
    };
});
