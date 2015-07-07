drinkapp.directive('odUser', function (service_user, service_url) {
    var directive = {};

    //attribute
    directive.restrict = "A";

    //scope two way binking
    directive.scope = {
        //controller data binding
        odUser: '=',
        //text binding
        type: '@'
    }

    //link function 
    directive.link = function ($scope, element, attributes) {
        //watch odUsername 
        $scope.$watch('odUser', function (val) {
            if (val) {
                service_user.getUserData(val).then(getUserSuccess, getUserError);
            }
        });

        function getUserSuccess(data) {
            if ($scope.type === 'avatar') {
                if (!data.avatar_thumb) {
                    element.css({
                        'background-image': 'url(img/drink-icon-72.png)'
                    });
                } else {
                    element.css({
                        'background-image': 'url(' + service_url.server_url + '/' + data.avatar_thumb + ')'
                    });
                }
            } else {
                element.text(data.nickname);
            }

        }

        function getUserError(data) {
            console.log(error)
        }
    };

    return directive;
}).directive('backImg', function (service_url) {

    var directive = {};

    //attribute
    directive.restrict = "A";

    directive.link = function (scope, element, attrs) {
        attrs.$observe('backImg', function (value) {
            if (!value || value === 'undefined') {
                return;
            }
            var backurl;
            if (attrs.local === "true") {
                backurl = 'url(' + value + ')';
            } else {
                backurl = 'url(' + service_url.server_url + '/' + value + ')';
            }
            element.css({
                'background-image': backurl,
                'background-size': 'cover'
            });
        });
    };

    return directive;
});