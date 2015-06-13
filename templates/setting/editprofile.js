drinkapp.controller('editprofile', function ($scope,$http,service_url) {
    console.log('setting controller start');
    $scope.name = localStorage.nickname;
    
    $scope.changeName = function(){
       //
    };
});