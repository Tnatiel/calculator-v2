



class Calculator111 {

    firstOperand: string;
    secondOperand: string;
    thirdOperand: string;
    action1: string;
    action2 :string;
    operArr: string[];
    lastCalculated: number;
    scietificModeState: boolean;
    historyModeState: boolean;
    remoteModeState: boolean;
    expressionStorage: string[];
    constructor() {
        this.firstOperand = '';
        this.secondOperand = '';
        this.action1 = '';
        this.lastCalculated = 0;
        this.scietificModeState = false;
        this.historyModeState = false;
        this.remoteModeState = false;
        this.expressionStorage = [];
    }

    updateScreen(key: string) {
        let temp: HTMLDivElement = byId('screen');
        temp.innerHTML += `${key}`;
    } 

    parseNum (num:string): void {
        console.log('num');
        const lastChar:string =  byId('screen').innerHTML.slice(-1)
        if (byId('screen').innerHTML.length === 1 && byId('screen').innerHTML == '0') {
            if (this.firstOperand = '') {
                this.firstOperand = num;
                byId('screen'). innerHTML = num;
                
            } else if (this.secondOperand = '') {
                this.secondOperand = num
                byId('screen'). innerHTML = num;
                
            } else {
                this.thirdOperand = num;
                byId('screen'). innerHTML = num;
            }
        } 
        else if (this.lastCalculated !== 0 &&  this.action1 === '') { 
            this.clearData();
            this.firstOperand += num;
            this.updateScreen(num);
            return

        } if (this.scietificModeState === false) {

            // DOT CASES
            if (num === '.' && '1234567890'.includes(lastChar)){
                console.log(this.firstOperand);     
                if (this.firstOperand !== '' && this.firstOperand.includes(num) === false) {
                    this.firstOperand += num;
                    this.updateScreen(num);
                } else if (this.secondOperand !== '' && this.secondOperand.includes(num) === false) {
                    this.secondOperand += num;
                    this.updateScreen(num);
                } else {return}

            // FILL OPERANDS
            } else if (this.action1 === '' && num !== '.') {

                this.firstOperand += num;
                this.updateScreen(num);
            } else if (num !== '.') {
                
                this.secondOperand += num ; 
                this.updateScreen(num);
            }
        } else if (this.scietificModeState === true) {

            //  DOT CASES
            if (num === '.' && '1234567890'.includes(lastChar)){

                if (this.firstOperand !== '' && this.firstOperand.includes(num) === false) {
                    this.firstOperand += num;
                    this.updateScreen(num);
                } else if (this.secondOperand !== '' && this.secondOperand.includes(num) === false) {
                    this.secondOperand += num;
                    this.updateScreen(num);
                } else if (this.thirdOperand !== '' && this.thirdOperand.includes(num) === false) {
                    this.thirdOperand += num;
                    this.updateScreen(num);
                } else {return}

            // FILL OPERANDS
            } else if (this.action1 === '' && num !== '.') {
                this.firstOperand += num;
                this.updateScreen(num);
            } else if (this.action2 === '' && num !== '.') {
                this.secondOperand += num ; 
                this.updateScreen(num);
            } else if (num !== '.') {
                this.thirdOperand += num;
                this.updateScreen(num);
            }
        } else {alert(`The state ${this.scietificModeState}isn\'t defined.\nPlease check calculator\'s state`);}
        // console.log(`fr-op: ${this.firstOperand} sc-op: ${this.secondOperand}`)
        // console.log()
    }

    parseAction(oper:string) {
        const lastChar:string =  byId('screen').innerHTML.slice(-1);
        if (lastChar === '' || lastChar == '.') {return} 
        if ('+-/*'.includes(lastChar)) {
           byId('screen').innerHTML = byId('screen').innerHTML.slice(0,-1); 
           this.action1 = oper;
           this.updateScreen(oper);
       } 
        else if (this.scietificModeState === false) {
             if (this.firstOperand !== '' && this.secondOperand !== ''){
                this.calculate();
                this.action1 = oper;
                byId('screen').innerHTML = this.lastCalculated + oper;
            } else {
                this.action1 = oper;
                this.updateScreen(oper);
            }
        
        } else if (this.scietificModeState === true) {
            // console.log(`this: ${this} act1: ${this.action1} act2: ${this.action2}`);
            if (this.action1 === '') {
                this.action1 = oper;
                this.updateScreen(oper);
            } else if (this.action2 === '') {
                this.action2 = oper;
                this.updateScreen(oper);

            } if (this.firstOperand !== '' && this.secondOperand !== '' && this.thirdOperand !== ''){
                this.calculate();
                this.action1 = oper;
                byId('screen').innerHTML = this.lastCalculated + oper;
            } 
        } else {alert(`The state ${this.scietificModeState}isn\'t defined.\nPlease check calculator\'s state`)}
    }

    calculate() {
        if (this.remoteModeState) {
            this.remoteCalculate();
            return;
        }
        if (this.scietificModeState === false) {
            // console.log(`fir op: ${this.firstOperand} act: ${this.action} sec: ${this.secondOperand}`)
            let res: number = (eval(this.firstOperand + this.action1 + this.secondOperand));
            if (res.toString().length >= 6){
                res = Number(res.toString().slice(0, 6));
                console.log(res)
            } 
            let curData: string = `${this.firstOperand} ${this.action1} ${this.secondOperand} = ${res}`;
            this.expressionStorage.push(curData);
            this.clearData();
            this.lastCalculated = res;
            this.firstOperand = res.toString();
            this.updateScreen(res.toString());
            if (this.historyModeState) {
                this.updateHistory();
            }
            
        } else if (this.scietificModeState === true) {
            let res: number = (eval(this.firstOperand + this.action1 + this.secondOperand + this.action2 + this.thirdOperand));
            if (res.toString().length >= 6){
                res = Number(res.toString().slice(0, 6));
            } 
            let curData: string = `${this.firstOperand} ${this.action1} ${this.secondOperand} ${this.action2} ${this.thirdOperand} = ${res}`;
            this.expressionStorage.push(curData);
            this.clearData();
            this.lastCalculated = res;
            this.firstOperand = res.toString();
            this.updateScreen(res.toString());
            if (this.historyModeState) {
                this.updateHistory();
            }
        } else {alert(`The state ${this.scietificModeState} isn\'t defined.\nPlease check calculator\'s state`)}
    }

    async remoteCalculate() {
        console.log(this.thirdOperand);
        if ( this.thirdOperand !== undefined) {
            const rawExpression: string = this.firstOperand + this.action1 + this.secondOperand + this.action2 + this.thirdOperand;
            let toSendExpression: string = encodeURIComponent(rawExpression);
            const response: Response = await fetch(`http://api.mathjs.org/v4/?expr=${toSendExpression}`);
            const result: string = await response.text();
            this.expressionStorage.push(rawExpression);
            this.clearData();
            this.lastCalculated = Number(result);
            this.firstOperand = result.toString();
            this.updateScreen(result)

        } else if (this.secondOperand !== undefined) {
            const rawExpression: string = this.firstOperand + this.action1 + this.secondOperand;
            let toSendExpression: string = encodeURIComponent(rawExpression);
            const response: Response = await fetch(`http://api.mathjs.org/v4/?expr=${toSendExpression}`);
            const result: string = await response.text();
            this.expressionStorage.push(rawExpression);
            this.clearData();
            this.lastCalculated = Number(result);
            this.firstOperand = result.toString();
            this.updateScreen(result);
        } else {alert('Please enter a valid expression');}
    }

    clearData() {

        this.firstOperand = '';
        this.secondOperand = '';
        this.action1 = '';
        this.lastCalculated = 0;
        byId('screen').innerHTML = '';
        if (this.scietificModeState === true) {
            this.action2 = '';
            this.thirdOperand = '';
        }
    }

    deleteLastKey() {
        const lastKey = byId('screen').innerHTML.slice(-1);
        if (byId('screen').innerHTML.length < 1) {return}
        
        if (this.scietificModeState === false) {

            if ('+-/*'.includes(lastKey)) {
                this.action1 = ''

            } else if (this.secondOperand !== '') {
                this.secondOperand = this.secondOperand.slice(0,-1);

           } else if ('+-/*'.includes(lastKey)){
               this.action1 = '';
    
           } else {this.firstOperand = this.firstOperand.slice(0, -1);}

        } else if (this.scietificModeState === true) {

            if ('+-/*'.includes(lastKey)) {
                if (this.action2 !== '') {
                    this.action2 = '';
                } else { this.action1 = '';}

            } else if (this.thirdOperand !== '') {
                this.thirdOperand = this.thirdOperand.slice(0, -1);

            } else if (this.secondOperand !== '') {
                this.secondOperand = this.secondOperand.slice(0, -1);

            } else {this.firstOperand = this.firstOperand.slice(0, -1);}
        } else {alert(`The state ${this.scietificModeState} isn\'t defined.\nPlease check calculator\'s state`)}

        byId('screen').innerHTML = byId('screen').innerHTML.slice(0, -1);    
    }

    updateHistory() {
        const curLi:HTMLLIElement = document.createElement('li');
        curLi.innerHTML = this.expressionStorage.slice(-1).toString();
        byId('express-list').appendChild(curLi);
    }
}
// When i worked with the calculator.ts file sometimes, randomly application.ts didn't recognized the Calculator class


// APP PART 
// SHORTCUTS

const byId = document.getElementById.bind(document);
const byClass = document.getElementsByClassName.bind(document);

// BUTTONS
const numBtns: HTMLButtonElement[] = byClass('btn-num');
const operBtns: HTMLButtonElement[] = byClass('opers');

const cal = new Calculator111()

document.addEventListener('DOMContentLoaded', () => {
    localStorage.clear()
    
})


// CREATING MESSAGE DIV
const version = '1'
const pageDiv: HTMLDivElement =document.createElement('div');
const infoDiv: HTMLDivElement =document.createElement('div');
const nameP: HTMLParagraphElement = document.createElement('p'); 
const verP: HTMLParagraphElement = document.createElement('p'); 
const decP: HTMLParagraphElement = document.createElement('p'); 
const pageStyle: HTMLStyleElement = document.createElement('style');
const okBtn :HTMLButtonElement = document.createElement('button');
okBtn.setAttribute('id', 'info-ok-btn');
pageStyle.innerHTML = '.page-wraper {display: none;}';
pageDiv.setAttribute('id', 'page-wraper');
pageDiv.className = 'page-wraper';
infoDiv.setAttribute('id', 'info-wraper');
infoDiv.className = 'info-wraper';
okBtn.innerHTML = 'OK';
nameP.innerHTML = 'Developer name: Natiel';
verP.innerHTML = `Version: ${version}`;
decP.innerHTML = 'Description: A web calculator based on javascript, scss and html';
infoDiv.appendChild(nameP);
infoDiv.appendChild(verP);
infoDiv.appendChild(decP);
pageDiv.appendChild(infoDiv);
pageDiv.appendChild(okBtn);
byId('body').appendChild(pageDiv);
document.querySelector('head')?.appendChild(pageStyle);

// INFO FUCNTION
byId('info').addEventListener('click', () => {
    if (!byId('page-wraper').classList.contains('info-page-shown')) {
        byId('page-wraper').classList.remove('page-wraper');
        byId('page-wraper').classList.add('info-page-shown');
    } else {
        byId('page-wraper').classList.remove('info-page-shown');
        byId('page-wraper').classList.add('page-wraper');
    }
})

// INFO OK BUTTON
byId('info-ok-btn').addEventListener('click', () => {
    byId('page-wraper').classList.remove('info-page-shown');
    byId('page-wraper').classList.add('page-wraper');
})

//  EXPRESSION SCREEN LIGHTS 
byId('screen-light-btn').addEventListener('click', () => {
    byId('screen').classList.toggle('light-on-screen'); 
    byId('screen-light-btn').classList.toggle('light-on-btn');
});

// CONFIGUE PAGE

// POPUP 
 byId('settings').addEventListener('click', () => {
    let params: string = 'resizable=no,status=no,location=no,toolbar=no,menubar=no,scrollbars=no,location=no,width=600,height=500,left=300,top=200';
    const myWind = window.open('/config.html','config', params) as Window;
})

window.addEventListener('storage', () => {
    console.log(localStorage);
    if (localStorage.length > 0) {
        
        changeSettings();
    }
})

// The function to apply the changes

function changeSettings(): void {
    const font: string = localStorage.getItem('font') as string;
    const color: string = localStorage.getItem('color') as string;
    const mode: string = localStorage.getItem('mode') as string;
    console.log(`font: ${font}`);
    console.log(`color: ${color}`);
    console.log(`mode: ${mode}`);

    if (font !== null) {
        byId('body').style.fontFamily = font;
        for (let i = 0; i < byClass('written-btns').length; i++) {
            const element = byClass('written-btns')[i];
            element.style.fontFamily = font;
            
        }

    }
    if (color !== null) {
        byId('body').style.backgroundColor = color;

    }
    if (mode === 'dark') {
        byId('body').classList.add('dark-body');
    } else {byId('body').classList.remove('dark-body');}

 }



// ******************HANDLE BTNS CLICKS********************

// NUMBER BUTTONS
for (let i = 0; i < numBtns.length; i++) {
    const numBtn: HTMLButtonElement = numBtns[i];
    numBtn.addEventListener('click', () => {
        cal.parseNum(numBtn.id);
    })
}

// OPER BUTTONS
for (let j = 0; j < operBtns.length; j++) {
    const operBtn: HTMLButtonElement = operBtns[j];
    operBtn.addEventListener('click', () => {
    cal.parseAction(operBtn.id);
    });
}

// EQUAL BUTTON
byId("=").addEventListener('click', () => {
    if (cal.scietificModeState) {
        if ((cal.firstOperand && cal.action1 && cal.secondOperand && cal.action2 && cal.thirdOperand !== '') || (cal.firstOperand && cal.action1 && cal.secondOperand !== ''))
        cal.calculate()
    }
    else if (cal.firstOperand && cal.action1 && cal.secondOperand !== ''){
        cal.calculate();       
    }
})

// C BUTTON
byId('c').addEventListener('click', () => {
    cal.clearData()
    deleteHistory()
})
// RETURN BUTTON
byId('return').addEventListener('click', () => {
    cal.deleteLastKey();
})

// REMOTE MODE 

byId('remote-btn').addEventListener('click', () => {
    byId('remote-btn').classList.toggle('light-on-btn');
    if (byId('remote-btn').classList.contains('light-on-btn')) {
        cal.remoteModeState = true;
    } 
})


// SCIENCE

byId('sci-btn').addEventListener('click', () => {
    if (byId('scientific-sec').classList.contains('sci-shown-r')) {
        byId('scientific-sec').classList.remove('sci-shown-r');
        byId('sci-btn').classList.remove('light-on-btn');
        cal.scietificModeState = false;
    } else {
        byId('scientific-sec').classList.add('sci-shown-r');
        byId('sci-btn').classList.add('light-on-btn');
        cal.clearData();
        cal.scietificModeState = true;
        cal.thirdOperand = '';
        cal.action2 = '';
    }
})


// HISTORY

byId('history-btn').addEventListener('click', () => {
    byId('history-btn').classList.toggle('light-on-btn');
    if (byId('history-btn').classList.contains('light-on-btn')) {
        deleteHistory()
        createInitialList();
        byId('history-sec').classList.add('history-shown-r');
        cal.historyModeState = true
    } else {
        byId('history-sec').classList.remove('history-shown-r');
        cal.historyModeState = false
    }
})

function createInitialList() {
    const expressionDiv: HTMLDivElement = byId('cal-history');
    const expressionList: HTMLUListElement = document.createElement('ul');
    expressionList.setAttribute('id', 'express-list')
    expressionDiv.appendChild(expressionList);
    for (const express in cal.expressionStorage) {
        const curExpress = cal.expressionStorage[express];
        const curLi:HTMLLIElement = document.createElement('li');
        curLi.innerHTML = curExpress;
        expressionList.appendChild(curLi);
    }
}

function deleteHistory() {
    const expressionDiv: HTMLDivElement = byId('cal-history')
    byId('history-sec').removeChild(expressionDiv);
    const newDiv: HTMLDivElement =  document.createElement('div');
    newDiv.setAttribute('id', 'cal-history');
    byId('history-sec').appendChild(newDiv)
}


