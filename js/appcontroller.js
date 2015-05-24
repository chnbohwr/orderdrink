drinkapp.controller('AppController',function($scope,drink_service){
    
    console.log('scope start up');
    
    ons.ready(onstart);
    
    function onstart(){
        mainNavigator.pushPage('templates/login/login.html');
    }
    
});