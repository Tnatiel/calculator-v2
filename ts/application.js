// When i worked with the calculator.ts file sometimes, randomly application.ts didn't recognized the Calculator class
var _a;
// APP PART 
// SHORTCUTS
var byId = document.getElementById.bind(document);
var byClass = document.getElementsByClassName.bind(document);
// BUTTONS
var numBtns = byClass('btn-num');
var operBtns = byClass('opers');
var cal = new Calculator111();
document.addEventListener('DOMContentLoaded', function () {
    localStorage.clear();
});
// CREATING MESSAGE DIV
var version = '1';
var pageDiv = document.createElement('div');
var infoDiv = document.createElement('div');
var nameP = document.createElement('p');
var verP = document.createElement('p');
var decP = document.createElement('p');
var pageStyle = document.createElement('style');
var okBtn = document.createElement('button');
okBtn.setAttribute('id', 'info-ok-btn');
pageStyle.innerHTML = '.page-wraper {display: none;}';
pageDiv.setAttribute('id', 'page-wraper');
pageDiv.className = 'page-wraper';
infoDiv.setAttribute('id', 'info-wraper');
infoDiv.className = 'info-wraper';
okBtn.innerHTML = 'OK';
nameP.innerHTML = 'Developer name: Natiel';
verP.innerHTML = "Version: ".concat(version);
decP.innerHTML = 'Description: A web calculator based on javascript, scss and html';
infoDiv.appendChild(nameP);
infoDiv.appendChild(verP);
infoDiv.appendChild(decP);
pageDiv.appendChild(infoDiv);
pageDiv.appendChild(okBtn);
byId('body').appendChild(pageDiv);
(_a = document.querySelector('head')) === null || _a === void 0 ? void 0 : _a.appendChild(pageStyle);
// INFO FUCNTION
byId('info').addEventListener('click', function () {
    if (!byId('page-wraper').classList.contains('info-page-shown')) {
        byId('page-wraper').classList.remove('page-wraper');
        byId('page-wraper').classList.add('info-page-shown');
    }
    else {
        byId('page-wraper').classList.remove('info-page-shown');
        byId('page-wraper').classList.add('page-wraper');
    }
});
// INFO OK BUTTON
byId('info-ok-btn').addEventListener('click', function () {
    byId('page-wraper').classList.remove('info-page-shown');
    byId('page-wraper').classList.add('page-wraper');
});
//  EXPRESSION SCREEN LIGHTS 
byId('screen-light-btn').addEventListener('click', function () {
    byId('screen').classList.toggle('light-on-screen');
    byId('screen-light-btn').classList.toggle('light-on-btn');
});
// CONFIGUE PAGE
// POPUP 
byId('settings').addEventListener('click', function () {
    var params = 'resizable=no,status=no,location=no,toolbar=no,menubar=no,scrollbars=no,location=no,width=600,height=500,left=300,top=200';
    var myWind = window.open('/config.html', 'config', params);
});
window.addEventListener('storage', function () {
    console.log(localStorage);
    if (localStorage.length > 0) {
        changeSettings();
    }
});
// The function to apply the changes
function changeSettings() {
    var font = localStorage.getItem('font');
    var color = localStorage.getItem('color');
    var mode = localStorage.getItem('mode');
    console.log("font: ".concat(font));
    console.log("color: ".concat(color));
    console.log("mode: ".concat(mode));
    if (font !== null) {
        byId('body').style.fontFamily = font;
        for (var i = 0; i < byClass('written-btns').length; i++) {
            var element = byClass('written-btns')[i];
            element.style.fontFamily = font;
        }
    }
    if (color !== null) {
        byId('body').style.backgroundColor = color;
    }
    if (mode === 'dark') {
        byId('body').classList.add('dark-body');
    }
    else {
        byId('body').classList.remove('dark-body');
    }
}
var _loop_1 = function (i) {
    var numBtn = numBtns[i];
    numBtn.addEventListener('click', function () {
        cal.parseNum(numBtn.id);
    });
};
// ******************HANDLE BTNS CLICKS********************
// NUMBER BUTTONS
for (var i = 0; i < numBtns.length; i++) {
    _loop_1(i);
}
var _loop_2 = function (j) {
    var operBtn = operBtns[j];
    operBtn.addEventListener('click', function () {
        cal.parseAction(operBtn.id);
    });
};
// OPER BUTTONS
for (var j = 0; j < operBtns.length; j++) {
    _loop_2(j);
}
// EQUAL BUTTON
byId("=").addEventListener('click', function () {
    if (cal.scietificModeState) {
        if ((cal.firstOperand && cal.action1 && cal.secondOperand && cal.action2 && cal.thirdOperand !== '') || (cal.firstOperand && cal.action1 && cal.secondOperand !== ''))
            cal.calculate();
    }
    else if (cal.firstOperand && cal.action1 && cal.secondOperand !== '') {
        cal.calculate();
    }
});
// C BUTTON
byId('c').addEventListener('click', function () {
    cal.clearData();
    deleteHistory();
});
// RETURN BUTTON
byId('return').addEventListener('click', function () {
    cal.deleteLastKey();
});
// REMOTE MODE 
byId('remote-btn').addEventListener('click', function () {
    byId('remote-btn').classList.toggle('light-on-btn');
    if (byId('remote-btn').classList.contains('light-on-btn')) {
        cal.remoteModeState = true;
    }
});
// SCIENCE
byId('sci-btn').addEventListener('click', function () {
    if (byId('scientific-sec').classList.contains('sci-shown-r')) {
        byId('scientific-sec').classList.remove('sci-shown-r');
        byId('sci-btn').classList.remove('light-on-btn');
        cal.scietificModeState = false;
    }
    else {
        byId('scientific-sec').classList.add('sci-shown-r');
        byId('sci-btn').classList.add('light-on-btn');
        cal.clearData();
        cal.scietificModeState = true;
        cal.thirdOperand = '';
        cal.action2 = '';
    }
});
// HISTORY
byId('history-btn').addEventListener('click', function () {
    byId('history-btn').classList.toggle('light-on-btn');
    if (byId('history-btn').classList.contains('light-on-btn')) {
        deleteHistory();
        createInitialList();
        byId('history-sec').classList.add('history-shown-r');
        cal.historyModeState = true;
    }
    else {
        byId('history-sec').classList.remove('history-shown-r');
        cal.historyModeState = false;
    }
});
function createInitialList() {
    var expressionDiv = byId('cal-history');
    var expressionList = document.createElement('ul');
    expressionList.setAttribute('id', 'express-list');
    expressionDiv.appendChild(expressionList);
    for (var express in cal.expressionStorage) {
        var curExpress = cal.expressionStorage[express];
        var curLi = document.createElement('li');
        curLi.innerHTML = curExpress;
        expressionList.appendChild(curLi);
    }
}
function deleteHistory() {
    var expressionDiv = byId('cal-history');
    byId('history-sec').removeChild(expressionDiv);
    var newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'cal-history');
    byId('history-sec').appendChild(newDiv);
}
