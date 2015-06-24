drinkapp.controller('editprofile', function ($scope, $http, service_url, $rootScope,service_user) {
    console.log('setting controller start');
    $scope.name = localStorage.nickname;

    $scope.changeName = function () {
        $http.post(service_url.profile, {
            nickname: $scope.name
        }).success(function () {
            localStorage.nickname = $scope.name;
            $scope.message = '修改成功';
            $rootScope.$broadcast('change_name');
        }).error(function () {
            $scope.name = localStorage.name;
            $scope.message = '網路有問題,修改失敗';
        })
    };

    $scope.uploadFile = function (files) {
        var fd = new FormData();
        //Take the first selected file
        fd.append("files", files[0]);

        $http.post(service_url.uploadAvatar, fd, {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        }).success(function (data) {
            console.log('success');
            service_user.getUserData($scope.user_id,true);
        }).error(function () {
            console.log('error');
        });

    };

});