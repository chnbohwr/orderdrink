drinkapp.service('service_url', function () {
    //    this.server_url = "http://127.0.0.1:14789"
    this.server_url = "http://orderdrink-chnbohwr.rhcloud.com"
    this.login = this.server_url + '/login/';
    this.facebooklogin = this.server_url + '/login/facebook/';
    this.signup = this.server_url + '/signup/';
    this.nearshop = this.server_url + '/api/location/';
    this.getuserdata = function (user_id) {
        return this.server_url + '/api/user/' + user_id + '/';
    }
    this.getshopdata = function (shop_id) {
        return this.server_url + '/api/shop/' + shop_id + '/';
    };

    this.getcomment = function (shop_id) {
        return this.server_url + '/api/shop/' + shop_id + '/comment/';
    }

    this.getmenu = function (shop_id) {
        return this.server_url + '/api/shop/' + shop_id + '/menu/';
    }

    this.report = this.server_url + '/api/report/';

    this.profile = this.server_url + '/api/profile';
    this.companies = this.server_url + '/api/comapnies/';
    this.uploadAvatar = this.server_url + '/api/uploadAvatar/';
    this.uploadBackground = this.server_url + '/api/uploadBackground/';
    this.uploadFavorite = this.server_url + '/api/uploadFavorite/';
    
    this.errorHandler = function (status) {
        // TODO  這邊要改成引導到登入頁面
        if (parseInt(status) === 401) {
            localStorage.clear();
            alert('測試的伺服器重新開機了，所以請您重新註冊');
            location.reload();
        }
    }
});