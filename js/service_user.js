drinkapp.service('service_user', function ($http, service_url, $q) {
    //initial user
    this.user = {};
    var self = this;
    //get user from server 
    this.getUserData = function (id) {
        var defer = $q.defer();
        
        //if client has user data and update_time less than 20 min , resolve data and return
        if (self.user[id]) {
            var nowtime = new Date();
            if ((nowtime - self.user[id].update_time) > 1000 * 60 * 20) {
                defer.resolve(self.user[id]);
                return defer.promise;
            }
        }

        //else get data from server
        $http.get(service_url.getuserdata(id)).success(function (data) {
            data.update_time = new Date();
            self.user[id] = data;
            defer.resolve(data);
        }).error(function (e) {
            defer.reject(e);
        });
        return defer.promise;
    }

});