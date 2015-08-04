drinkapp.service('service_user', function ($http, service_url, $q,$timeout) {
    //initial user
    this.user = {};
    var self = this;
    //get user from server 

    this.getUserData = function (id, obligatory) {
        var defer = $q.defer();
        
        //如果沒有人物，就創一個空的人物正在讀取中
        if (!self.user[id]) {
            self.user[id] = {
                loading: true
            };

            //else get data from server
            $http.get(service_url.getuserdata(id)).success(function (data) {
                data.update_time = new Date();
                self.user[id] = data;
                defer.resolve(data);
            }).error(function (e) {
                //下載失敗就把正在下載中的標記移除掉
                if(self.user[id].loading){
                    delete self.user[id].loading;
                }
                defer.reject(e);
            });
        //如果有人物資料就檢查是不是正在讀取中
        } else {
            //如果沒有讀取中就回傳
            if (!self.user[id].loading) {
                defer.resolve(self.user[id]);
            }else{
                //如果正在讀取中延遲一下子看看讀取玩了沒
                checkUser();
            }
        }
        
        function checkUser(){
            if(self.user[id].loading){
                $timeout(checkUser,100);
            }else{
                defer.resolve(self.user[id]);
            }
        }

        return defer.promise;
    }

    window.service_user = this;
});