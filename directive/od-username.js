drinkapp.directive('odUsername', function (service_user) {
    var directive = {};
    
    //attribute
    directive.restrict = "A";
    
    //scope two way binking
    directive.scope = {
        //controller data binding
        odUsername: '=',
        //text binding
        type:'@'
    }
    
    //link function 
    directive.link = function($scope, element, attributes){
        //watch odUsername 
        $scope.$watch('odUsername',function(val){
            if(val){
                service_user.getUserData(val).then(getUserSuccess,getUserError);
            }
        });
        
        function getUserSuccess(data){
            if($scope.type === 'avatar'){
                //todo put avatar in src
            }else{
                element.text(data.nickname);
            }
        
        }
        function getUserError(data){
            console.log(error)
        }
    };
    
    return directive;
})