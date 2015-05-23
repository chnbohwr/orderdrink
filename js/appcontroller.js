drinkapp.controller('AppController',function($scope){
    
    console.log('scope start up');
    
    ons.ready(onstart);
    
    function onstart(){
        mainNavigator.pushPage('templates/login/login.html');
    }
    
});