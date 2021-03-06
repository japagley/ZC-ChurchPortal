/**
 * Created by Josh Pagley on 3/4/14.
 */

angular.module('zcApp').factory('zcSettings',['$resource', '$q', function($resource, $q) {

    var churchResource = $resource('/api/zionconnect/v1/church');
    var passwordResetResource = $resource('/api/zionconnect/v1/church/reset');
    var servicesResource = $resource('/api/zionconnect/v1/church/services')

    return {
        // churchResource.save(...) makes a POST request back to the server.
        // the post body is specified by the object past to updateChurchSettings.
        updateChurch: function(churchObj){
            var promise = $q.defer();
            churchResource.save(churchObj, function(result){
                promise.resolve(result);
            }, function(error){
                promise.reject(error);
            });

            return promise.promise;
        },
        updateChurchServices: function(email, servicesObj){
            var promise = $q.defer();
            servicesResource.save({'email': email, 'services': servicesObj}, function(result){
                promise.resolve(result);
            }, function(error){
                promise.reject(error);
            });

            return promise.promise;
        },
        deleteChurch: function(churchObj){
           churchResource.delete(churchObj);
        },
        resetPassword: function(resetObj){
            var promise = $q.defer();
            passwordResetResource.save(resetObj, function(result){
                promise.resolve(result);
            },
            function(error){
                promise.reject(error);
            });

            return promise.promise;
        }
    }


}]);