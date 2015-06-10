drinkapp.service('service_url', function () {
    this.server_url = "http://orderdrink.ddns.net:14789"
    this.login = this.server_url + '/login/';
    this.signup = this.server_url + '/signup/';
    this.nearshop = this.server_url + '/api/location/';
    
    this.errorHandler = function(status){
        if(status === '401'){
            localStorage.clear();
            alert('please regist');
            location.reload();
        }
    }
});