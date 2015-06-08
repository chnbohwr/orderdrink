drinkapp.service('service_url', function () {
    this.server_url = "http://127.0.0.1:8080"
    this.login = this.server_url + '/login/';
    this.signup = this.server_url + '/signup/';
    this.nearshop = this.server_url + '/api/location/';
});