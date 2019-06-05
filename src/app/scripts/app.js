'use strict';

/**
 * @ngdoc overview
 * @name ukwClientApp
 * @description
 * # ukwClientApp
 *
 * Main module of the application.
 */
angular
  .module('ukwClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ngDialog'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/main.html',
                        controller  : 'MainController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }
            })
            .state('app.parenthome', {
                url:'parenthome',
                views: {
                    'content@': {
                        templateUrl : 'views/parenthome.html',
                        controller  : 'ParentController'                  
                    }
                }
            })
            .state('app.teacherhome', {
                url:'teacherhome',
                views: {
                    'content@': {
                        templateUrl : 'views/teacherhome.html',
                        controller  : 'TeacherController'                  
                    }
                }
            })
            .state('app.teacherHW', {
                url:'teacherhome/hw',
                views: {
                    'content@': {
                        templateUrl : 'views/editHW.html',
                        controller  : 'TeacherController'                  
                    }
                }
            })
            .state('app.teacherGal', {
                url:'teacherhome/gal',
                views: {
                    'content@': {
                        templateUrl : 'views/editGallery.html',
                        controller  : 'TeacherController'                  
                    }
                }
            })
        .state('app.parentGal', {
                url:'parenthome/gal/:classNo/:studName',
                views: {
                    'content@': {
                        templateUrl : 'views/viewGallery.html',
                        controller  : 'ClassRoomController'                  
                    }
                }
            })
    
        .state('app.parentStudReport', {
                url:'parenthome/studentReport/:studentNumber',
                views: {
                    'content@': {
                        templateUrl : 'views/viewStudReport.html',
                        controller  : 'StudDetailController'                  
                    }
                }
            })
    
    
            .state('app.teacherClass', {
                url:'teacherhome/:classNo',
                views: {
                    'content@': {
                        templateUrl : 'views/editClass.html',
                        controller  : 'StudentController'                  
                    }
                }
            })
            .state('app.studReport', {
                url:'teacherhome/:studentNumber',
                views: {
                    'content@': {
                        templateUrl : 'views/editStudReport.html',
                        controller  : 'StudDetailController'                  
                    }
                }
            })
            
            // route for the aboutus page
            .state('app.aboutus', {
                url:'aboutus',
                views: {
                    'content@': {
                        templateUrl : 'views/about.html',
                        controller  : 'AboutController'                  
                    }
                }
            });
        
            
        $urlRouterProvider.otherwise('/');
    })
;