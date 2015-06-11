drinkapp.service('service_url', function () {
//    this.server_url = "http://127.0.0.1:14789"
    this.server_url = "http://orderdrink.ddns.net:14789"
    this.login = this.server_url + '/login/';
    this.signup = this.server_url + '/signup/';
    this.nearshop = this.server_url + '/api/location/';
    this.getshopdata = function (shop_id) {
        return this.server_url + '/api/shop/' + shop_id + '/';
    };
    
    this.getcomment = function(shop_id){
        return this.server_url + '/api/shop/' + shop_id + '/comment/';
    }

    this.errorHandler = function (status) {
        console.log(status);
        if (parseInt(status) === 401) {
            localStorage.clear();
            alert('測試的伺服器重新開機了，所以請您重新註冊');
            location.reload();
        }
    }
});