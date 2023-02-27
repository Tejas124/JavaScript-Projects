const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector('#uppercase');
const lowercaseCheck = document.querySelector('#lowercase');
const numbersCheck = document.querySelector('#numbers');
const symbolsCheck = document.querySelector('#symbols');
const indicator = document.querySelector('.indicator');
const generateBtn = document.querySelector('.generateButton');
const allCheckBox = document.querySelectorAll('input[type=checkbox]');
let symbols = "!@#$%^&*()[],./?;`~|";

let password = "";
let passwordLength = 10;
let checkCount = 0;
setIndicator("#ccc");
handleSilder();


//set Password Length
function handleSilder(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength -min)*100/(max - min)) + "% 100%";
}

//Strength color
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
    
}

function getRdnInteger(min, max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function generateRandomNumber(){
    return getRdnInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRdnInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRdnInteger(65,91));
}

function generateSymbols(){
    let randomNum = getRdnInteger(0, symbols.length);
    return symbols.charAt(randomNum);
}

//Calculate Strength
function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8){
        setIndicator("#0f0");
    }
    else if((hasUpper || hasLower) && (hasNum || hasSym) && passwordLength >=6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }


}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied!";
    }
    catch(e){
        copyMsg.innerText = "Failed!";
    }

    //To make copy span visible
    copyMsg.classList.add("active");

    //To make invisible(remove)
    setTimeout( () => {
        copyMsg.classList.remove("active");
    }, 2000);
}


// Update password Length
inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSilder();
})


//When to copy password on clipboard :
copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})


function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


function handleCheckBoxChnage(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    //special Condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSilder();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChnage);
})

generateBtn.addEventListener('click', () => {
    //none of the checkbox is clicked
    if(checkCount <= 0) return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSilder();
    }

    //Here is the journey to find new password
    console.log('Staring the journey');
    //remove old password
    password = "";

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);
    
    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbols);


    //compulsory addition
    for(let i=0;i<funcArr.length;i++){
        password += funcArr[i]();
    }
    console.log('Compulsory addition done');

    //remaining addition
    for(let i=0; i<(passwordLength - funcArr.length); i++){
        let randomIndex = getRdnInteger(0, funcArr.length);
        console.log('randomIndex ' + randomIndex);
        password += funcArr[randomIndex]();
    }
    console.log('Remaining addition done');

    //Shuffle the password
    password = shufflePassword(Array.from(password));
    console.log('Shuffling done');
    //Display password in UI
    passwordDisplay.value = password;
    console.log('UI updated');
    //calculate strength
    calcStrength(); 

    
});

