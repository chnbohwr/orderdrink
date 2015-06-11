drinkapp.service('service_comment', function ($q, $http, service_url) {
    var service_comment = this;

    this.initial = function (shop_id) {
        var defer = $q.defer();
        this.comments = [];
        this.shop_id = shop_id;
        $http.get(service_url.getcomment(service_comment.shop_id)).success(function (data) {
            service_comment.comments = data;
            defer.resolve(data);
        }).error(function () {
            defer.reject();
        });
        return defer.promise;
    };


    //取得更多的 comment , shop_id : shop_id , offset : new comment count
    this.getMoreComment = function () {
        var defer = $q.defer();

        $http.get(service_url.getcomment(service_comment.shop_id), {
            params: {
                offset: service_comment.comments.length
            }
        }).success(function (data) {
            //put all data into comments array
            while (data.length) {
                service_comment.comments.push(data.shift());
            }
            defer.resolve(data);
        }).error(function () {
            defer.reject();
        });

        return defer.promise;
    };

    //發表新的評論
    this.createComment = function (data) {
        var defer = $q.defer();

        $http.post(service_url.getcomment(service_comment.shop_id), data).success(function (data) {
            service_comment.comments.unshift(data);
            defer.resolve();
        }).error(function () {
            defer.reject();
        });

        return defer.promise;
    }

    window.service_comment = this;
});