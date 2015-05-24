drinkapp.controller('login',function($scope){
    
    $scope.signup = function(){
        mainNavigator.pushPage('templates/login/signup.html');
    };
    
    $scope.login = function (){
        mainNavigator.pushPage('templates/near/near.html');
    };
    
});