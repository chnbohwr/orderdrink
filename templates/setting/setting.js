drinkapp.controller('setting', function ($scope, $http, service_url,service_user) {

    $scope.nickname = localStorage.nickname || undefined;;
    $scope.email = localStorage.email || undefined;;
    $scope.avatar_thumb = localStorage.avatar_thumb || undefined;
    $scope.background = localStorage.background || undefined;;
    
    
    $scope.changeName = function () {
       
        event.target.textContent = event.target.textContent.replace(/\n/g, ' ').substring(0, 12);

        var name = event.target.textContent;
        if (name.length === 0) {
            event.target.textContent = localStorage.nickname;
        }
        if (name !== $scope.nickname) {
            $http.post(service_url.profile, {
                nickname: name
            }).success(function () {
                localStorage.nickname = name;
                $scope.message = '修改成功';
            }).error(function () {
                $scope.nickname = localStorage.nickname;
                event.target.textContent = localStorage.nickname;
                $scope.message = '網路有問題,修改失敗';
            })
        }
    };

    $scope.uploadFile = function (files) {
        $('.eprofile-image').addClass('loading');
        var fd = new FormData();
        //Take the first selected file
        fd.append("files", files[0]);

        $http.post(service_url.uploadAvatar, fd, {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        }).success(function (data) {
            localStorage.avatar_thumb = data.avatar_thumb;
            localStorage.avatar = data.avatar;
            $scope.avatar_thumb = data.avatar_thumb;
            $('.eprofile-image').removeClass('loading');

        }).error(function () {
           
            $('.eprofile-image').removeClass('loading');
        });
    };
    
    $scope.uploadBackground = function (files) {
        $('.eprofile-image').addClass('loading');
        var fd = new FormData();
        //Take the first selected file
        fd.append("files", files[0]);

        $http.post(service_url.uploadBackground, fd, {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        }).success(function (data) {

            localStorage.background = data.background
            $scope.background = data.background;
            
            $('.eprofile-image').removeClass('loading');
        }).error(function () {
            
            $('.eprofile-image').removeClass('loading');
        });
    };
    
    $scope.goFavoriteDrink= function(){
        mainNavigator.pushPage('templates/setting/favoritedrink.html');
    };

    window.scope_setting = $scope;

});