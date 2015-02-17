/**
 * Created by haha on 2015/2/16.
 */
var sudokuApp = angular.module("sudokuApp", []);

sudokuApp.factory('mySudokuService', ['$http', function($http){
    var oData = {
        "rows":[
            {
                "rid":0,
                "cols":[
                    {
                        "cid":0,
                        "vl":""
                    },
                    {
                        "cid":1,
                        "vl":""
                    },
                    {
                        "cid":2,
                        "vl":""
                    },
                    {
                        "cid":3,
                        "vl":""
                    },
                    {
                        "cid":4,
                        "vl":""
                    },
                    {
                        "cid":5,
                        "vl":""
                    },
                    {
                        "cid":6,
                        "vl":""
                    },
                    {
                        "cid":7,
                        "vl":""
                    },
                    {
                        "cid":8,
                        "vl":""
                    }
                ]
            },
            {
                "rid":1,
                "cols":[
                    {
                        "cid":0,
                        "vl":""
                    },
                    {
                        "cid":1,
                        "vl":""
                    },
                    {
                        "cid":2,
                        "vl":""
                    },
                    {
                        "cid":3,
                        "vl":""
                    },
                    {
                        "cid":4,
                        "vl":""
                    },
                    {
                        "cid":5,
                        "vl":""
                    },
                    {
                        "cid":6,
                        "vl":""
                    },
                    {
                        "cid":7,
                        "vl":""
                    },
                    {
                        "cid":8,
                        "vl":""
                    }
                ]
            },
            {
                "rid":2,
                "cols":[
                    {
                        "cid":0,
                        "vl":""
                    },
                    {
                        "cid":1,
                        "vl":""
                    },
                    {
                        "cid":2,
                        "vl":""
                    },
                    {
                        "cid":3,
                        "vl":""
                    },
                    {
                        "cid":4,
                        "vl":""
                    },
                    {
                        "cid":5,
                        "vl":""
                    },
                    {
                        "cid":6,
                        "vl":""
                    },
                    {
                        "cid":7,
                        "vl":""
                    },
                    {
                        "cid":8,
                        "vl":""
                    }
                ]
            },
            {
                "rid":3,
                "cols":[
                    {
                        "cid":0,
                        "vl":""
                    },
                    {
                        "cid":1,
                        "vl":""
                    },
                    {
                        "cid":2,
                        "vl":""
                    },
                    {
                        "cid":3,
                        "vl":""
                    },
                    {
                        "cid":4,
                        "vl":""
                    },
                    {
                        "cid":5,
                        "vl":""
                    },
                    {
                        "cid":6,
                        "vl":""
                    },
                    {
                        "cid":7,
                        "vl":""
                    },
                    {
                        "cid":8,
                        "vl":""
                    }
                ]
            },
            {
                "rid":4,
                "cols":[
                    {
                        "cid":0,
                        "vl":""
                    },
                    {
                        "cid":1,
                        "vl":""
                    },
                    {
                        "cid":2,
                        "vl":""
                    },
                    {
                        "cid":3,
                        "vl":""
                    },
                    {
                        "cid":4,
                        "vl":""
                    },
                    {
                        "cid":5,
                        "vl":""
                    },
                    {
                        "cid":6,
                        "vl":""
                    },
                    {
                        "cid":7,
                        "vl":""
                    },
                    {
                        "cid":8,
                        "vl":""
                    }
                ]
            },
            {
                "rid":5,
                "cols":[
                    {
                        "cid":0,
                        "vl":""
                    },
                    {
                        "cid":1,
                        "vl":""
                    },
                    {
                        "cid":2,
                        "vl":""
                    },
                    {
                        "cid":3,
                        "vl":""
                    },
                    {
                        "cid":4,
                        "vl":""
                    },
                    {
                        "cid":5,
                        "vl":""
                    },
                    {
                        "cid":6,
                        "vl":""
                    },
                    {
                        "cid":7,
                        "vl":""
                    },
                    {
                        "cid":8,
                        "vl":""
                    }
                ]
            },
            {
                "rid":6,
                "cols":[
                    {
                        "cid":0,
                        "vl":""
                    },
                    {
                        "cid":1,
                        "vl":""
                    },
                    {
                        "cid":2,
                        "vl":""
                    },
                    {
                        "cid":3,
                        "vl":""
                    },
                    {
                        "cid":4,
                        "vl":""
                    },
                    {
                        "cid":5,
                        "vl":""
                    },
                    {
                        "cid":6,
                        "vl":""
                    },
                    {
                        "cid":7,
                        "vl":""
                    },
                    {
                        "cid":8,
                        "vl":""
                    }
                ]
            },
            {
                "rid":7,
                "cols":[
                    {
                        "cid":0,
                        "vl":""
                    },
                    {
                        "cid":1,
                        "vl":""
                    },
                    {
                        "cid":2,
                        "vl":""
                    },
                    {
                        "cid":3,
                        "vl":""
                    },
                    {
                        "cid":4,
                        "vl":""
                    },
                    {
                        "cid":5,
                        "vl":""
                    },
                    {
                        "cid":6,
                        "vl":""
                    },
                    {
                        "cid":7,
                        "vl":""
                    },
                    {
                        "cid":8,
                        "vl":""
                    }
                ]
            },
            {
                "rid":8,
                "cols":[
                    {
                        "cid":0,
                        "vl":""
                    },
                    {
                        "cid":1,
                        "vl":""
                    },
                    {
                        "cid":2,
                        "vl":""
                    },
                    {
                        "cid":3,
                        "vl":""
                    },
                    {
                        "cid":4,
                        "vl":""
                    },
                    {
                        "cid":5,
                        "vl":""
                    },
                    {
                        "cid":6,
                        "vl":""
                    },
                    {
                        "cid":7,
                        "vl":""
                    },
                    {
                        "cid":8,
                        "vl":""
                    }
                ]
            }
        ]
    };
    var solution = oData;
    var req = {
        method: 'POST',
        url: '/solver/problem',
        headers:{
            'Content-Type': 'application/json'
        },
        data: oData
    };
    var puzzleData = {
        oData: oData,
        solution: solution,
        showres: false,
        solvable: true,
        pristine: 81,
        invalid: 0,
        mirror: {}
    };
    var mirror = function(rid, cid){
        return puzzleData.mirror[rid + ' ' + cid];
    };
    var solve = function(){
        $http(req).success(function(data){
            puzzleData.solvable = data.solvable;
            if(puzzleData.solvable) puzzleData.solution = data.puzzle;
            else puzzleData.solution = puzzleData.oData;
            puzzleData.showres = true;
        }).error(function(){
            alert('error');
        })
    };
    return {
        puzzleData: puzzleData,
        solve: solve,
        mirror: mirror
    };
}]);

sudokuApp.directive('mySudokuInput', ['mySudokuService', function(mySudokuService){
    return {
        restrict: 'AE',
        scope: {
            myModel: '=',
            rawid: '@'
        },
        template:'<input class="d" autocomplete="off" data-ng-model="myModel">',
        replace: true,
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl){
            scope.$watch('myModel', function(newValue,oldValue) {
                var arr = String(newValue).split("");
                if(arr.length > 1){
                    scope.myModel = oldValue;
                }else{
                    var arrOld = String(oldValue).split("");
                    var empOld = arrOld.length === 0;
                    var validNumOld = !empOld && arrOld[0] > '0' && arrOld[0] <= '9';

                    if(validNumOld){
                        delete mySudokuService.puzzleData.mirror[scope.rawid];
                    }

                    if(arr.length === 0){
                        elem.removeClass('my-invalid');
                        elem.addClass('my-valid');
                        mySudokuService.puzzleData.showres = false;
                        if(!validNumOld && !empOld) mySudokuService.puzzleData.invalid -= 1;
                    }else{
                        var num = arr[0] - '0';
                        if(num > 0 && num < 10){
                            elem.removeClass('my-invalid');
                            elem.addClass('my-valid');
                            if(empOld) {
                                mySudokuService.puzzleData.pristine -= 1;
                            }
                            else if(!validNumOld) mySudokuService.puzzleData.invalid -= 1;
                            mySudokuService.puzzleData.mirror[scope.rawid] = true;
                        } else {
                            elem.removeClass('my-valid');
                            elem.addClass('my-invalid');
                            if(empOld) {
                                mySudokuService.puzzleData.pristine -= 1;
                                mySudokuService.puzzleData.invalid += 1;
                            } else if(validNumOld) mySudokuService.puzzleData.invalid += 1;
                        }
                    }
                    mySudokuService.puzzleData.showres = false;
                }
            });
        }
    };
}]);

sudokuApp.controller('solverController', ['$scope', 'mySudokuService', function($scope, mySudokuService){
    $scope.solveit = mySudokuService.solve;
    $scope.sudokuData = mySudokuService.puzzleData;
    $scope.mirror = mySudokuService.mirror;
}]);