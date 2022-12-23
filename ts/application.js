var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
var Calculator111 = /** @class */ (function () {
    function Calculator111() {
        this.firstOperand = '';
        this.secondOperand = '';
        this.action1 = '';
        this.lastCalculated = 0;
        this.scietificModeState = false;
        this.historyModeState = false;
        this.remoteModeState = false;
        this.expressionStorage = [];
    }
    Calculator111.prototype.updateScreen = function (key) {
        var temp = byId('screen');
        temp.innerHTML += "".concat(key);
    };
    Calculator111.prototype.parseNum = function (num) {
        console.log('num');
        var lastChar = byId('screen').innerHTML.slice(-1);
        if (byId('screen').innerHTML.length === 1 && byId('screen').innerHTML == '0') {
            if (this.firstOperand = '') {
                this.firstOperand = num;
                byId('screen').innerHTML = num;
            }
            else if (this.secondOperand = '') {
                this.secondOperand = num;
                byId('screen').innerHTML = num;
            }
            else {
                this.thirdOperand = num;
                byId('screen').innerHTML = num;
            }
        }
        else if (this.lastCalculated !== 0 && this.action1 === '') {
            this.clearData();
            this.firstOperand += num;
            this.updateScreen(num);
            return;
        }
        if (this.scietificModeState === false) {
            // DOT CASES
            if (num === '.' && '1234567890'.includes(lastChar)) {
                console.log(this.firstOperand);
                if (this.firstOperand !== '' && this.firstOperand.includes(num) === false) {
                    this.firstOperand += num;
                    this.updateScreen(num);
                }
                else if (this.secondOperand !== '' && this.secondOperand.includes(num) === false) {
                    this.secondOperand += num;
                    this.updateScreen(num);
                }
                else {
                    return;
                }
                // FILL OPERANDS
            }
            else if (this.action1 === '' && num !== '.') {
                this.firstOperand += num;
                this.updateScreen(num);
            }
            else if (num !== '.') {
                this.secondOperand += num;
                this.updateScreen(num);
            }
        }
        else if (this.scietificModeState === true) {
            //  DOT CASES
            if (num === '.' && '1234567890'.includes(lastChar)) {
                if (this.firstOperand !== '' && this.firstOperand.includes(num) === false) {
                    this.firstOperand += num;
                    this.updateScreen(num);
                }
                else if (this.secondOperand !== '' && this.secondOperand.includes(num) === false) {
                    this.secondOperand += num;
                    this.updateScreen(num);
                }
                else if (this.thirdOperand !== '' && this.thirdOperand.includes(num) === false) {
                    this.thirdOperand += num;
                    this.updateScreen(num);
                }
                else {
                    return;
                }
                // FILL OPERANDS
            }
            else if (this.action1 === '' && num !== '.') {
                this.firstOperand += num;
                this.updateScreen(num);
            }
            else if (this.action2 === '' && num !== '.') {
                this.secondOperand += num;
                this.updateScreen(num);
            }
            else if (num !== '.') {
                this.thirdOperand += num;
                this.updateScreen(num);
            }
        }
        else {
            alert("The state ".concat(this.scietificModeState, "isn't defined.\nPlease check calculator's state"));
        }
        // console.log(`fr-op: ${this.firstOperand} sc-op: ${this.secondOperand}`)
        // console.log()
    };
    Calculator111.prototype.parseAction = function (oper) {
        var lastChar = byId('screen').innerHTML.slice(-1);
        if (lastChar === '' || lastChar == '.') {
            return;
        }
        if ('+-/*'.includes(lastChar)) {
            byId('screen').innerHTML = byId('screen').innerHTML.slice(0, -1);
            this.action1 = oper;
            this.updateScreen(oper);
        }
        else if (this.scietificModeState === false) {
            if (this.firstOperand !== '' && this.secondOperand !== '') {
                this.calculate();
                this.action1 = oper;
                byId('screen').innerHTML = this.lastCalculated + oper;
            }
            else {
                this.action1 = oper;
                this.updateScreen(oper);
            }
        }
        else if (this.scietificModeState === true) {
            // console.log(`this: ${this} act1: ${this.action1} act2: ${this.action2}`);
            if (this.action1 === '') {
                this.action1 = oper;
                this.updateScreen(oper);
            }
            else if (this.action2 === '') {
                this.action2 = oper;
                this.updateScreen(oper);
            }
            if (this.firstOperand !== '' && this.secondOperand !== '' && this.thirdOperand !== '') {
                this.calculate();
                this.action1 = oper;
                byId('screen').innerHTML = this.lastCalculated + oper;
            }
        }
        else {
            alert("The state ".concat(this.scietificModeState, "isn't defined.\nPlease check calculator's state"));
        }
    };
    Calculator111.prototype.calculate = function () {
        if (this.remoteModeState) {
            this.remoteCalculate();
            return;
        }
        if (this.scietificModeState === false) {
            // console.log(`fir op: ${this.firstOperand} act: ${this.action} sec: ${this.secondOperand}`)
            var res = (eval(this.firstOperand + this.action1 + this.secondOperand));
            if (res.toString().length >= 6) {
                res = Number(res.toString().slice(0, 6));
                console.log(res);
            }
            var curData = "".concat(this.firstOperand, " ").concat(this.action1, " ").concat(this.secondOperand, " = ").concat(res);
            this.expressionStorage.push(curData);
            this.clearData();
            this.lastCalculated = res;
            this.firstOperand = res.toString();
            this.updateScreen(res.toString());
            if (this.historyModeState) {
                this.updateHistory();
            }
        }
        else if (this.scietificModeState === true) {
            var res = (eval(this.firstOperand + this.action1 + this.secondOperand + this.action2 + this.thirdOperand));
            if (res.toString().length >= 6) {
                res = Number(res.toString().slice(0, 6));
            }
            var curData = "".concat(this.firstOperand, " ").concat(this.action1, " ").concat(this.secondOperand, " ").concat(this.action2, " ").concat(this.thirdOperand, " = ").concat(res);
            this.expressionStorage.push(curData);
            this.clearData();
            this.lastCalculated = res;
            this.firstOperand = res.toString();
            this.updateScreen(res.toString());
            if (this.historyModeState) {
                this.updateHistory();
            }
        }
        else {
            alert("The state ".concat(this.scietificModeState, " isn't defined.\nPlease check calculator's state"));
        }
    };
    Calculator111.prototype.remoteCalculate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rawExpression, toSendExpression, response, result, rawExpression, toSendExpression, response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this.thirdOperand);
                        if (!(this.thirdOperand !== undefined)) return [3 /*break*/, 3];
                        rawExpression = this.firstOperand + this.action1 + this.secondOperand + this.action2 + this.thirdOperand;
                        toSendExpression = encodeURIComponent(rawExpression);
                        return [4 /*yield*/, fetch("http://api.mathjs.org/v4/?expr=".concat(toSendExpression))];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.text()];
                    case 2:
                        result = _a.sent();
                        this.expressionStorage.push(rawExpression);
                        this.clearData();
                        this.lastCalculated = Number(result);
                        this.firstOperand = result.toString();
                        this.updateScreen(result);
                        return [3 /*break*/, 7];
                    case 3:
                        if (!(this.secondOperand !== undefined)) return [3 /*break*/, 6];
                        rawExpression = this.firstOperand + this.action1 + this.secondOperand;
                        toSendExpression = encodeURIComponent(rawExpression);
                        return [4 /*yield*/, fetch("http://api.mathjs.org/v4/?expr=".concat(toSendExpression))];
                    case 4:
                        response = _a.sent();
                        return [4 /*yield*/, response.text()];
                    case 5:
                        result = _a.sent();
                        this.expressionStorage.push(rawExpression);
                        this.clearData();
                        this.lastCalculated = Number(result);
                        this.firstOperand = result.toString();
                        this.updateScreen(result);
                        return [3 /*break*/, 7];
                    case 6:
                        alert('Please enter a valid expression');
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Calculator111.prototype.clearData = function () {
        this.firstOperand = '';
        this.secondOperand = '';
        this.action1 = '';
        this.lastCalculated = 0;
        byId('screen').innerHTML = '';
        if (this.scietificModeState === true) {
            this.action2 = '';
            this.thirdOperand = '';
        }
    };
    Calculator111.prototype.deleteLastKey = function () {
        var lastKey = byId('screen').innerHTML.slice(-1);
        if (byId('screen').innerHTML.length < 1) {
            return;
        }
        if (this.scietificModeState === false) {
            if ('+-/*'.includes(lastKey)) {
                this.action1 = '';
            }
            else if (this.secondOperand !== '') {
                this.secondOperand = this.secondOperand.slice(0, -1);
            }
            else if ('+-/*'.includes(lastKey)) {
                this.action1 = '';
            }
            else {
                this.firstOperand = this.firstOperand.slice(0, -1);
            }
        }
        else if (this.scietificModeState === true) {
            if ('+-/*'.includes(lastKey)) {
                if (this.action2 !== '') {
                    this.action2 = '';
                }
                else {
                    this.action1 = '';
                }
            }
            else if (this.thirdOperand !== '') {
                this.thirdOperand = this.thirdOperand.slice(0, -1);
            }
            else if (this.secondOperand !== '') {
                this.secondOperand = this.secondOperand.slice(0, -1);
            }
            else {
                this.firstOperand = this.firstOperand.slice(0, -1);
            }
        }
        else {
            alert("The state ".concat(this.scietificModeState, " isn't defined.\nPlease check calculator's state"));
        }
        byId('screen').innerHTML = byId('screen').innerHTML.slice(0, -1);
    };
    Calculator111.prototype.updateHistory = function () {
        var curLi = document.createElement('li');
        curLi.innerHTML = this.expressionStorage.slice(-1).toString();
        byId('express-list').appendChild(curLi);
    };
    return Calculator111;
}());
// When i worked with the calculator.ts file sometimes, randomly application.ts didn't recognized the Calculator class
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
