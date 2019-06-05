'use strict';

angular.module('ukwClientApp')
.constant("baseURL", "http://localhost:3000/")
.factory('$localStorage', ['$window', function ($window) {
    return {
        store: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        remove: function (key) {
            $window.localStorage.removeItem(key);
        },
        storeObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key, defaultValue) {
            return JSON.parse($window.localStorage[key] || defaultValue);
        }
    };
}])
.factory('AuthFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog', function($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog){
    
    var authFac = {};
    var TOKEN_KEY = 'Token';
    var isAuthenticated = false;
    var username = '';
    var authToken = undefined;
    var usertype ='';
    var classNo =0;
    

  function loadUserCredentials() {
    var credentials = $localStorage.getObject(TOKEN_KEY,'{}');
    if (credentials.username != undefined) {
      useCredentials(credentials);
    }
  }
 
  function storeUserCredentials(credentials) {
      alert('inside store user credentials');
    $localStorage.storeObject(TOKEN_KEY, credentials);
      alert('the user type is ' + credentials.usertype)
    useCredentials(credentials);
  }
 
  function useCredentials(credentials) {
      alert('inside usecredentials');
    isAuthenticated = true;
    username = credentials.username;
    authToken = credentials.token;
    usertype = credentials.usertype;
 
    // Set the token as header for your requests!
    $http.defaults.headers.common['x-access-token'] = authToken;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    usertype = '';
    isAuthenticated = false;
    $http.defaults.headers.common['x-access-token'] = authToken;
    $localStorage.remove(TOKEN_KEY);
  }
     
    authFac.login = function(loginData) {
        
        alert('The username and password' + loginData.username + loginData.password);
        $resource(baseURL + "users/login")
        .save(loginData,
           function(response) {
              storeUserCredentials({username:loginData.username, usertype:response.userType,token: response.token});
              $rootScope.$broadcast('login:Successful');
            alert('inside response' + response.usertype);
           },
           function(response){
              isAuthenticated = false;
            
              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Login Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message + '</p><p>' +
                    response.data.err.name + '</p></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                </div>';
            
                ngDialog.openConfirm({ template: message, plain: 'true'});
           }
        
        );

    };
    
    authFac.logout = function() {
        /*$resource(baseURL + "users/logout").get(function(response){
        });*/
        destroyUserCredentials();
    };
    
    
    
    authFac.isAuthenticated = function() {
        return isAuthenticated;
    };
    
    authFac.getUsername = function() {
        return username;  
    };
    
     authFac.getUsertype = function() {
        return usertype;  
    };

    loadUserCredentials();
    
    return authFac;
    
}])
.factory('teacherFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    
    return $resource(baseURL + "classroom/:teacherId", null, {
            'update': {
                method: 'PUT'
            },
             'query':  {method:'GET'}
        });

}])
.factory('studFac', ['$resource', 'baseURL', function ($resource, baseURL) {

    
    return $resource(baseURL + "student/:classNo", null, {
            
             'query':  {method:'GET'}
        });

}])
.factory('studDetailFac', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "student/studdetail/:studentNumber", null, {
            'update': {
                method: 'PUT', params:{studentNumber:'@studentNumber'}
            },
            'query':{method:'GET'}
        });

    /*
    return $resource(baseURL + "student/studdetail/:studentNumber", null, {
            
             'query':  {method:'GET'}
        });*/

}])
.factory('parentFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "student/parent/:parentUsrName", null, {
           
             'query':  {method:'GET'}
        });

}])
.factory('classFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "classroom/class/:classNo", null, {
           
             'query':  {method:'GET'},
            'update':  {method:'PUT', url:baseURL+'classroom/hw/:classNo'}
        });

}])

.factory('noteFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    
    
    return $resource(baseURL + "note/student/:studentId/:classRoomNumber", null, {
           
             'query':  {method:'GET'},
             'save':{method:'POST',url:baseURL+'note/save'}
            
        });
}])



;