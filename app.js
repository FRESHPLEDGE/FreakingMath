var app = angular.module("FreakingMathApp", []);
app.controller("GameController", ['$scope', '$timeout', function ($scope, $timeout) {

    $scope.number1 = Math.round((Math.random() * 10));
    $scope.number2 = Math.round((Math.random() * 10));
    $scope.check = false;
    $scope.result = generateResult();
    $scope.count = 0;
    var timer;


    function generateResult() {
        var random = Math.round((Math.random() * 2));
        if (random == 1) {
            $scope.check = true;
            return $scope.number1 + $scope.number2;
        } else {
            $scope.check = false;
            return $scope.number1 + $scope.number2 + Math.round((Math.random() * 2));
        }
    }

    $scope.isTrue = function () {
        var snd = new Audio("click.wav");
        snd.play();
        snd.currentTime = 0;
        if (($scope.number1 + $scope.number2) == $scope.result) {
            $timeout.cancel(timer);
            generateNew();
            $scope.count++;
        } else {
            $scope.alert();
        }
    }
    $scope.isFalse = function () {
        var snd = new Audio("click.wav");
        snd.play();
        snd.currentTime = 0;
        if (($scope.number1 + $scope.number2) == $scope.result) {
            $scope.alert();
        } else {
            $timeout.cancel(timer);
            generateNew();
            $scope.count++;

        }
    }

    function generateNew() {
        $scope.number1 = Math.round((Math.random() * 10));
        $scope.number2 = Math.round((Math.random() * 10));
        $scope.result = generateResult();

        timer = $timeout(function () {
            $scope.alert();
        }, 2000);
    }


    var ALERT_TITLE = "GAME OVER!";
    var ALERT_BUTTON_TEXT = "RESTART";

    if (document.getElementById) {
        $scope.alert = function () {
            $timeout.cancel(timer);
            var snd = new Audio("fail.wav");
            snd.play();
            snd.currentTime = 0;
            createCustomAlert();
        }
    }

    function createCustomAlert() {
        d = document;

        if (d.getElementById("modalContainer")) return;

        mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
        mObj.id = "modalContainer";
        mObj.style.height = d.documentElement.scrollHeight + "px";

        alertObj = mObj.appendChild(d.createElement("div"));
        alertObj.id = "alertBox";
        if (d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
        alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px";
        alertObj.style.visiblity = "visible";

        h1 = alertObj.appendChild(d.createElement("h1"));
        h1.appendChild(d.createTextNode(ALERT_TITLE));

        msg = alertObj.appendChild(d.createElement("p"));
        //msg.appendChild(d.createTextNode(txt));
        msg.innerHTML = "New " + $scope.count + "</br>Best " + localStorage.getItem("bestscore") + "</br>";
        if (localStorage.getItem("bestscore") == null) {
            localStorage.setItem("bestscore", $scope.count);
        } else {
            if (localStorage.getItem("bestscore") <= $scope.count) {
                localStorage.setItem("bestscore", $scope.count);
            } else {
                localStorage.setItem("bestscore", localStorage.getItem("bestscore"));
            }
        }

        btn = alertObj.appendChild(d.createElement("a"));
        btn.id = "closeBtn";
        btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
        btn.href = "#";
        btn.focus();
        btn.onclick = function () {
            removeCustomAlert();
            return false;
        }

        alertObj.style.display = "block";

    }

    function removeCustomAlert() {
        document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
        location.reload();
    }

    var selectRandomNumber = function () {

    }
    selectRandomNumber();
}]);


