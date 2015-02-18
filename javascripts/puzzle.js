/**
 * Created by haha on 2015/2/16.
 */

function crs(R, C) {
    var Res = {};
    for (var a in R)
        for (var b in C)
            Res[R[a] + C[b]] = true;
    return Res;
}

var digits = "123456789";
var ls = ["0","1","2","3","4","5","6","7","8"];
var sqrIdx = crs(ls, ls);
var uList = function(){
    var unitlist = [];
    for(var i in ls){
        unitlist.push(crs(ls, [ls[i]]));
        unitlist.push(crs([ls[i]], ls));
    }
    var lls = [["0", "1", "2"], ["3", "4", "5"], ["6", "7", "8"]];
    for(var rs in lls)
        for(var cs in lls)
            unitlist.push(crs(lls[rs], lls[cs]));
    return unitlist;
}();
var units = function(){
    var us = {};
    for (var s in sqrIdx){
        us[s] = [];
        for (var u in uList)
            if(uList[u][s])
                us[s].push(uList[u]);
    }
    return us;
}();
var peers = function(){
    var ps = {};
    for (var s1 in sqrIdx){
        ps[s1] = {};
        for (var u in units[s1]){
            for (var s2 in units[s1][u])
                if (s2 != s1)
                    ps[s1][s2] = true;
        }
    }
    return ps;
}();

function eliminate(values, sq, dig){
    if (values[sq].indexOf(dig) == -1)  // already eliminated.
        return values;
    values[sq] = values[sq].replace(dig, "");
    if (values[sq].length == 0) // invalid input ?
        return false;
    else if (values[sq].length == 1){ // If there is only one value (values[sq]) left in square, remove it from peers
        var result = true;
        for (var s in peers[sq])
            result &= (eliminate(values, s, values[sq]) ? true : false);
        if (!result) return false;
    }
    for(var u in units[sq]){
        var iunit = units[sq][u];
        var dplaces = [];
        for(var s in iunit){
            if(values[s].indexOf(dig) != -1)
                dplaces.push(s);
        }
        if(dplaces.length === 0) return false;
        else if(dplaces.length === 1){
            if(!assign(values, dplaces[0], dig))
                return false;
        }
    }
    return values;
}

function assign(values, sq, dig){ // Eliminate all the other values (except dig) from values[sq] and propagate.
    var result = true;
    var vals = values[sq];
    for (var d = 0; d < vals.length; d++)
        if (vals.charAt(d) !== dig)
            result &= (eliminate(values, sq, vals.charAt(d)) ? true : false);
    return (result ? values : false);
}

function dup(v){
    var r = {};
    for (var s in v)
        r[s] = v[s];
    return r;
}

function search(values){
    if (!values)
        return false;
    var min = 10, max = 1, sq = null;
    for (var s in sqrIdx){
        var len =values[s].length;
        if (len > max)
            max = len;
        if (len > 1 && len < min){
            min = len;
            sq = s;
        }
    }

    if (max == 1)
        return values;
    for (var d = 0; d < len; d++){
        var res = search(assign(dup(values), sq, values[sq].charAt(d)));
        if (res)
            return res;
    }
    return false;
}

function sudoku(In){
    var values = {};
    for (var s in sqrIdx)
        values[s] = digits;
    for(var r in In.rows){
        var row = In.rows[r];
        var rIdx = row.rid.toString();
        for(var c in row.cols){
            var col = row.cols[c];
            if(col.vl !== ""){
                if(!assign(values, rIdx + col.cid.toString(), col.vl))
                    return false;
            }
        }
    }
    return search(values);
}

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
        //$http(req).success(function(data){
        //    puzzleData.solvable = data.solvable;
        //    if(puzzleData.solvable) puzzleData.solution = data.puzzle;
        //    else puzzleData.solution = puzzleData.oData;
        //    puzzleData.showres = true;
        //}).error(function(){
        //    alert('error');
        //})
        var solution = sudoku(puzzleData.oData);
        if(!solution){
            puzzleData.solvable = false;
            puzzleData.solution = puzzleData.oData;
        }else{
            puzzleData.solvable = true;
            puzzleData.solution = {};
            puzzleData.solution.rows = [];
            for(var r in ls){
                var row = {};
                var rid = parseInt(r);
                row.rid = rid;
                row.cols = [];
                for(var c in ls){
                    var col = {};
                    var cid = parseInt(c);
                    col.cid = cid;
                    col.vl = solution[r + c];
                    row.cols.push(col);
                }
                puzzleData.solution.rows.push(row);
            }
        }
        puzzleData.showres = true;
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