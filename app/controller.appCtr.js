/**
 * Created by binyamin.greenberg on 8/23/17.
 */
function appCtr($http) {
    var url = 'https://94fba154fa7d00f3cda66819e29b54aa.europe-west1.gcp.cloud.es.io:9243/word/';
    var self = this;

    self.simulateQuery = false;
    self.isDisabled    = false;
    self.time;
    // list of `state` value/display objects
    self.querySearch   = querySearch;
    self.addCount = addCount;
    // ******************************
    // Internal methods
    // ******************************

    /**
     * remote dataservice call.
     */
    function querySearch (query) {
        var postData = {"_source":false,"suggest":{"suggest":{"prefix":query,"completion":{"field":"word"}}}};
        return $http.post(url+'_search',postData)
            .then(function(res) {
                self.time = res.data.took;
                // Map the response object to the data object
                return res.data.suggest.suggest[0].options;
            });
    }

    function addCount(id){
        if (self.searchText.length === 0){
            alert('please choose a word first');
            return;
        }
        var postData = {"script" : "ctx._source.word.weight+=1"};
        $http.post(url + 'website/' + id + '/_update',postData);
    }

}

angular.module('app').controller('appCtr', ['$http',appCtr]);
