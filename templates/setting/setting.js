drinkapp.controller('setting', function ($scope,$http,service_url) {
    console.log('setting controller start');
    $scope.nickname = localStorage.nickname;
    $scope.email = localStorage.email;
    $scope.avatar_thumb = localStorage.avatar_thumb;

    $scope.gotoEditProfile = function () {
        mainNavigator.pushPage('templates/setting/editprofile.html');
    };
   

    $scope.changeName = function () {
        console.log(event);
        event.target.textContent = event.target.textContent.replace(/\n/g,' ').substring(0,10);
        
        var name = event.target.textContent;
        if(name.length === 0){
            event.target.textContent = localStorage.nickname;
        }
        if (name !== $scope.nickname) {
            $http.post(service_url.profile, {
                nickname:name
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
        var fd = new FormData();
        //Take the first selected file
        fd.append("files", files[0]);

        $http.post(service_url.uploadAvatar, fd, {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        }).success(function (data) {
            console.log(data);
            localStorage.avatar_thumb = data.avatar_thumb;
            localStorage.avatar = data.avatar;
            $scope.avatar_thumb = data.avatar_thumb;
        }).error(function () {
            console.log('error');
        });
    };
    
    window.scope_setting = $scope;

});