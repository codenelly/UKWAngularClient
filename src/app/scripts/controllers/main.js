'use strict';

/**
 * @ngdoc function
 * @name ukwClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ukwClientApp
 */
angular.module('ukwClientApp')
    

.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', function ($scope, $state, $rootScope, ngDialog, AuthFactory) {

    $scope.loggedIn = false;
    $scope.username = '';
    $scope.usertype = '';
    
    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
        $scope.usertype = AuthFactory.getUsertype();
    }
        
    $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
    };
    
    $scope.logOut = function() {
       AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
        $scope.usertype='';
        $state.go('app');
    };
    
    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
        $scope.usertype = AuthFactory.getUsertype();
    });
    
}])

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
   // $scope.loginData = $localStorage.getObject('userinfo','{}');
    
    $scope.doLogin = function() {
        if($scope.rememberMe)
           $localStorage.storeObject('userinfo',$scope.loginData);

        AuthFactory.login($scope.loginData);
        

        //ngDialog.close();

    };
            
    /*$scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    };*/
    
}])

.controller('TeacherController',['$scope', '$state' , '$rootScope' , 'AuthFactory' ,'teacherFactory','classFactory',function($scope,$state,$rootScope,AuthFactory,teacherFactory,classFactory)
{
    var baseURL ="http://localhost:3000/";
    $scope.username = AuthFactory.getUsername();
   
    $scope.uploadavtar = function(files) {
        //var fd = new FormData();
        //Take the first selected file
        //fd.append("file", files[0]);
        
        var imagefile = document.querySelector('#file');
                if (imagefile.files && imagefile.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $('#imgSrc1')
                            .attr('src', e.target.result);
                        console.log("the src is :"+ e.target.result);
                        $scope.Classroom.imgSrc1 =e.target.result;
                    };
                    reader.readAsDataURL(imagefile.files[0]);
                    this.imagefile = imagefile.files[0];
                }else{
                    console.log("Image not selected");
                }
        
        
      };
    
    
    var classroom = teacherFactory.query({
            teacherId: $scope.username
        })
        .$promise.then(
            function (response) {
                var classrm = response.Classroom[0];
                $scope.Classroom = classrm;
                $scope.classNo =classrm.classNo;
                
                  $scope.Classroom.imgSrc1 = baseURL +  $scope.Classroom.imgSrc1;
                  $scope.Classroom.imgSrc2 = baseURL +  $scope.Classroom.imgSrc2;
                  $scope.Classroom.imgSrc3 = baseURL +  $scope.Classroom.imgSrc3;
                  $scope.Classroom.imgSrc4 = baseURL +  $scope.Classroom.imgSrc4;
                  $scope.Classroom.imgSrc5 = baseURL +  $scope.Classroom.imgSrc5;
                  $scope.Classroom.imgSrc6 = baseURL +  $scope.Classroom.imgSrc6;
                  
               // $scope.Classroom = classrm;
                /*var images; var path = baseURL; var img ="imgSrc";
                for(int i=1;i<=10;i++)
                    {
                        img = img+i;
                        path = path +"/images/"+img
                        
                    }
                image.path1 =baseURL+"/images/imgSrc7";
                image.path2 =baseURL+"/images/imgSrc8";
                image.path3 =baseURL+"/images/imgSrc9";
                image.path4 = baseURL+"/images/imgSrc10";
                image.path5 =baseURL+"/images/imgSrc11";
                image.path6 =baseURL+"/images/imgSrc12";
                image.path7 =baseURL+"/images/imgSrc13";
                image.path8 =baseURL+""*/
                
                //console.log("the imgsrc1 is"+ Classroom.imgSrc1);
               // alert("the imgsrc1 isand others"+ $scope.Classroom.imgSrc1);
                
                            },
            function (response) {
                 alert("no response");
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
    
    
    $scope.doSendHw = function(hwStr)
    {
        var sendHw = classFactory.update({
            classNo: $scope.classNo},{"homework":hwStr})
        .$promise.then(function(response){
            $scope.studHw ="";
            $scope.message="Homework Updated!";
        },function(response){
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
    }

    
    
    /*$scope.editPhoto = function(imgStr)
    {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {
        items: function () {
          return $ctrl.items;
        }
      }
    });
        //alert("inside edit photo" + imgStr.toString());
    }*/
}])

.controller('StudentController',['$scope','$state','$rootScope','$localStorage','$stateParams','studFac','AuthFactory',function($scope,$state,$rootScope,$localStorage,$stateParams,studFac,AuthFactory){
    
   /* var classroom = teacherFactory.query({
            teacherId: $scope.username
        })
        .$promise.then(
            function (response) {
                var classrm = response.Classroom[0];
                $scope.classNo = classrm.classNo;
                alert("inside teacher class classno:"+$scope.classNo);
            },
            function(response){
                 $scope.message = "Error: " + response.status + " " + response.statusText;
        });*/
                
    var students = studFac.query({
        classNo : $stateParams.classNo
        
    })
    .$promise.then(
    function(response){
        $scope.students = response.Students;
        // alert("inside teacher class student:"+$scope.students);
        
    },
    function(response){
        $scope.message = "Error: " + response.status + " " + response.statusText;
    });
    
    
}])

.controller('MainController', ['$scope', '$state', '$rootScope', '$localStorage','AuthFactory', function ($scope, $state, $rootScope, $localStorage,AuthFactory) {
   }])

.controller('ParentController', ['$scope', '$state', '$rootScope', '$localStorage','AuthFactory', 'parentFactory','classFactory' ,function ($scope, $state, $rootScope, $localStorage,AuthFactory,parentFactory,classFactory) {
    $scope.username = AuthFactory.getUsername();
    var student = parentFactory.query({
            parentUsrName: $scope.username
        })
        .$promise.then(
            function (response) {
                var stud = response.Students[0];
                $scope.Student = stud;
                $scope.classNo =stud.classRoomNumber;
                
                
                            },
            function (response) {
                 alert("no response");
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    
    
    
}])


.controller('ClassRoomController', ['$scope', '$state', '$rootScope', '$localStorage','AuthFactory', 'classFactory' ,'$stateParams',function ($scope, $state, $rootScope, $localStorage,AuthFactory,classFactory,$stateParams) {
    //$scope.username = AuthFactory.getUsername();
     var baseURL ="http://localhost:3000/";
    $scope.studName = $stateParams.studName;
    var student = classFactory.query({
            classNo: $stateParams.classNo
        })
        .$promise.then(
            function (response) {
               var classrm = response.Classroom[0];
                $scope.Classroom = classrm;
                $scope.classNo =classrm.classNo;
                
                  $scope.Classroom.imgSrc1 = baseURL +  $scope.Classroom.imgSrc1;
                  $scope.Classroom.imgSrc2 = baseURL +  $scope.Classroom.imgSrc2;
                  $scope.Classroom.imgSrc3 = baseURL +  $scope.Classroom.imgSrc3;
                  $scope.Classroom.imgSrc4 = baseURL +  $scope.Classroom.imgSrc4;
                  $scope.Classroom.imgSrc5 = baseURL +  $scope.Classroom.imgSrc5;
                  $scope.Classroom.imgSrc6 = baseURL +  $scope.Classroom.imgSrc6;
                
                
                
                            },
            function (response) {
                 alert("no response");
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
    }])

.controller('StudDetailController',['$scope','$state','$rootScope','$localStorage','$stateParams','studDetailFac','AuthFactory','noteFactory','classFactory','$filter',function($scope,$state,$rootScope,$localStorage,$stateParams,studDetailFac,AuthFactory,noteFactory,classFactory,$filter){
    
    
    $scope.username = AuthFactory.getUsername();
    
    var studDetail = studDetailFac.query({
        studentNumber : $stateParams.studentNumber
        
    })
    .$promise.then(
    function(response){
        $scope.studDetail = response.Student[0];
        fetchNotes($scope.studDetail);
        alert("inside  student:"+$scope.studDetail.scoreMath1);
        
    },
    function(response){
        $scope.message = "Error: " + response.status + " " + response.statusText;
    });
   
    
    function  fetchNotes(studentDetail)
    {
        $scope.notesHistory ="";
    var allNotes = noteFactory.query({
        studentId:studentDetail.studentNumber,
        classRoomNumber:studentDetail.classRoomNumber
    }).$promise.then(
    function(response){
        var notesArr = response.Notes;
        notesArr.forEach(function(noteObj){
           $scope.notesHistory = $scope.notesHistory +"[" + noteObj.fromId +"]" + $filter('date')(noteObj.date, 'MM/dd/yy')+ " :" + noteObj.detail +"\n";
        })
        
        
    },
    function(response){
        $scope.message = "Error" + response.status +  "" + response.statusText;
    });
    }
    
    
    
     
    $scope.updateStudDetail  =function(){
         
         studDetailFac.update({
        studentNumber : $stateParams.studentNumber
                    },$scope.studDetail)
    .$promise.then(
    function(response){
        alert("inside  studentafter update in response:"+$scope.studDetail.scoreMath1);
       // $scope.studDetail = response.Student[0];
        
        
    },
    function(response){
        $scope.message = "Error: " + response.status + " " + response.statusText;
    });
     } ;
   
    
    
    
    $scope.doSendNote = function(studDetail,studNote,flag){
         alert("inside send note flag value:"+flag);
        
        var classDetail = classFactory.query({
            classNo : studDetail.classRoomNumber
            }).$promise.then(function(response){
            
            var toAddr="";
            if(flag=='P')
            {
                toAddr = studDetail.parentUsrName1;
               alert("inside send note:"+toAddr.value+"str"+toAddr);
            }
            else if(flag=='T') { response.Classroom[0].teacherId; }
            else if(flag =='AllP') 
            {
                toAddr = "AllP";
               alert("inside send note:"+toAddr.value+"str"+toAddr);
            }
            
          
                
            $scope.note = {
                fromId:$scope.username ,
                toId:toAddr,
                detail: studNote, 
                classRoomNumber: studDetail.classRoomNumber,
                studentId:studDetail.studentNumber,
                date:Date.now()
            };
           noteFactory.save( $scope.note,function(response){
               $scope.studNote ="";
               fetchNotes(studDetail);
               alert("saved!");
           },
                           function(response){
               $scope.message = "Error: " + response.status + " " + response.statusText;
           });
          
        },
                            function(response){
             $scope.message = "Error: " + response.status + " " + response.statusText;
            
        });
    };
    
    
     
     
     
}])
                                 

  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
