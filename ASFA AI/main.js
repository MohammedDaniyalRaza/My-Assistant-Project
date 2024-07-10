// Select Elements

const startBtn = document.getElementById("start");

const stopBtn = document.querySelector(".stop");

const speakBtn = document.getElementById("speak");

const time = document.getElementById("time");

const battery = document.getElementById("Battery");

const internet = document.getElementById("Wifi");

const turnOn = document.getElementById("turnOn");

const msgs = document.querySelector(".messages");

document.getElementById("startAsfaBtn").addEventListener("click", ()=>{
    recognition.start();
});


//
let weatherStatement1 = "";
let charge, chargeStatus, connection, currentTime
// chargeStatus = "unplugged";
// chargeStatus




// cammand of closing tabs

let windowB = [];

// Asfa Commands 

let asfaComs = [];
asfaComs.push("Hy");
asfaComs.push("what are your commands");
asfaComs.push("close this - to close opened popups");
asfaComs.push("change my information - information regarding your accounts and you");
asfaComs.push("whats the weather or temperature");
asfaComs.push("show the full weather report");
asfaComs.push("are you there - to check asfa presence");
asfaComs.push("shut down - stop voice recognition");
asfaComs.push("open google");
asfaComs.push("search for 'your keywords' - to search on google");
asfaComs.push("open whats app");
asfaComs.push("open youtube");
asfaComs.push("play 'your keywords' - to search on youtube");
asfaComs.push("close this youtube tab - to closed youtube  tab");
asfaComs.push("open firebase");
asfaComs.push("open twiter");
asfaComs.push("open my twiter profie");
asfaComs.push("open istagram");
asfaComs.push("open my instagram profile");
asfaComs.push("open github");
asfaComs.push("open my github profile");
asfaComs.push("I Open Many Other Webpages And Also I Assist You");

////////////////////////////////////

// Speach Recognition Setup


const SpeechRecognition =  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = false;

// Sr Start 

recognition.onstart = function(){
    // console.log("Voice Recognition Active");
};


let weatherStatement


// Weather SetUp

function weather(location){
    const weatherCount = document.querySelector(".temp").querySelectorAll("*");

    // ashish api
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
    // my api 
    // let url =  `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a14848e2902a76fb285b17cffe03ef01`

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function() {
        if(this.status === 200){
            let data = JSON.parse(this.responseText);
            weatherCount[0].textContent = `location : ${data.name}`;
            weatherCount[1].textContent = `Country : ${data.sys.country}`;
            weatherCount[2].textContent = `Weather Type : ${data.weather[0].main}`;
    
            weatherCount[3].textContent = `Weather Description : ${data.weather[0].description} `;
            // weatherCount[4].textContent = `location : ``    }
            weatherCount[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weatherCount[5].textContent = `Original Temperature: ${ktc(data.main.temp)}`;

            weatherCount[6].textContent = `Feels Like ${ktc(data.main.feels_like)}`;
            weatherCount[7].textContent = `Min Temperature ${ktc(data.main.temp_min)}`;
            weatherCount[8].textContent = `Max Temperature ${ktc(data.main.temp_max)}`
            weatherStatement = `The Weather in ${data.name} is ${data.weather[0].description} and the temperature feels like ${ktc(data.main.feels_like)}`;
        }else{
            weatherCount[0].textContent = `Weather Info Not Found`;
        };
    };
    xhr.send();
};

// covert calvin to calcius 

function ktc(k){
    k = k - 273.15;
    return k.toFixed(2);
}


// calling weather 

// weather("karachi");
// weather("pakistan");
// weather("islamabad");
// weather("lahore");
// weather("nawabshah");
// weather("moro");
// weather("larkana");
// weather("rawalpindi");
// weather("mehrabpur");
//     /\
//    //\\
//   ///\\\
//     ||
//     || 
//check weather setup manullay 

// Time Setup

let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();

function formatAMPM(date){
    let minutes = date.getMinutes();
    let hours = date.getHours();

    let amPm = hours >= 12? "pm" : "am";

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" : + minutes;
    
};

// function formatAMPM(date){
//     let hours = date.getHours();
//     let minutes = date.getMinutes();
//     let amPm = hours >= 12? "pm" : "am";
//     hours = hours % 12;
//     hours = hours ? hours : 12; 
//     minutes = minutes < 10 ? '0' + minutes : minutes;
//     let strTime = hours + ":" + minutes + " " + amPm.toLocaleUpperCase();
//     currentTime = strTime;
//     time.textContent = strTime;
// };

// formatAMPM(date);
// setInterval(()=>{
//     formatAMPM(date);
// }, 6000)

// Asfa Setup
function autoAsfa(){
    setTimeout(()=>{
        recognition.start();
    }, 1000);
};

// onload window

window.onload = ()=>{

    //// khuch khcuh dafa default voice hi chalti hai (instead ke hamne apni voice set ki hai lekin phir bhi default voice chalti hai to uska solution ye ha!);

    if(window.onload){
        readOut("  ");
    };
/////////////////////////////////////////////////////////////
    // on startup
    turnOn.addEventListener("canplaythrough", () => {
        turnOn.play().catch(error => {
            console.log("Error playing audio: ", error);
        });
    });

    // wait for user interaction
    document.addEventListener('click', function playAudio() {
        turnOn.play().catch(error => {
            console.log("Error playing audio: ", error);
        });
        document.removeEventListener('click', playAudio);
    });

    turnOn.addEventListener("ended", ()=>{
        setTimeout(()=>{
            // autoAsfa
            autoAsfa();
            readOut(`Ready To Go ${greet()}`);
            if(localStorage.getItem("asfa_setup") === null){
                readOut(`${timeGreet()}, Kindly Fill Out This Form, Then I Can Assist You And After Entering Your Information Please Refresh The Page`);
            };
        }, 200);
    });

    // Asfa Commads
    asfaComs.forEach((a)=>{
        document.querySelector(".commands").innerHTML += `<p>#${a}</p> <br/>`
    });


    // on startup
    // turnOn.play();
    // turnOn.addEventListener("onend", ()=>{
    //     setTimeout(()=>{
    //         // autoAsfa
    //         autoAsfa();
    //         readOut("Ready To Go Sir");
    //         if(localStorage.getItem("asfa_setup") === null){
    //             readOut("Sir, Kindly Fill Out This Form, Then I Can Assist You")
    //         };
    //     }, 200);
    // })
//     // time-clock

    // previous timer

    // time.textContent = `${hours}: ${minutes}: ${seconds}`
    setInterval(()=>{
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        // let seconds = date.getSeconds();
        let amPm = hours >= 12? "pm" : "am";
        currentTime = time.textContent = `${hours} : ${minutes} ${amPm.toLocaleUpperCase()}`;
    }, 1000);

    //bettary Setup
    let batteryPromise = navigator.getBattery();
    batteryPromise.then(batteryCall);

    function batteryCall(batteryObject){
        printBatteryStatus(batteryObject);
        setInterval(()=>{
            printBatteryStatus(batteryObject);
            // for internet check
            // navigator.onLine?(internet.textContent = "ACTIVE") : (internet.textContent = "OFFLINE")
        }, 5000);
    };

    function printBatteryStatus(batteryObject){
        // battery.textContent = `${batteryObject.level * 100}%`;
        if(batteryObject.charging === true){
            // document.querySelector(".battery").style.width = "";
            charge = battery.textContent = `${batteryObject.level * 100}% On Charging`;
            chargeStatus = "Plug In"
        };
        if(batteryObject.charging === false){
            // document.querySelector(".battery").style.width = "";
            charge = battery.textContent = `${batteryObject.level * 100}%`;
            chargeStatus = "Un Pluged"
        };
    };
    
    // function printBatteryStatus(batteryObject){
    //     document.getElementById("Battery").textContent = `${(batteryObject.level * 100)}%`;
    //     charge = batteryObject.level * 100;
    //     if(batteryObject.chargeStatus === true ){
    //         document.querySelector("battery").style.width = "400px";
    //         document.getElementById("Battery").textContent = `${(batteryObject.level * 100)} % On Charging`;
    //         chargeStatus = "Plugged In"
    //     }
    // }

    // wifi internet setup

    // navigator.onLine?(internet.textContent = "ACTIVE") : (internet.textContent = "OFFLINE");

    // setInterval(()=>{
    //     navigator.onLine? (internet.textContent = "ACTIVE") : (internet.textContent = "OFFLINE");
    // }, 2000);

    if(navigator.onLine){
        document.getElementById("Wifi").textContent = "ACTIVE";
        connection = "ACTIVE";
    }else{
        document.getElementById("Wifi").textContent = "OFFLINE";
        connection = "OFFLINE";
    };

    setInterval(() => {
        if(navigator.onLine){
            document.getElementById("Wifi").textContent = "ACTIVE";
            connection = "ACTIVE";
        }else{
            document.getElementById("Wifi").textContent = "OFFLINE";
            connection = "OFFLINE";
        };
    }, 2000);

};



// this code from chat gtp 
// function updateTime() {
//     let date = new Date();
//     let hours = String(date.getHours()).padStart(2, '0');
//     let minutes = String(date.getMinutes()).padStart(2, '0');
//     let seconds = String(date.getSeconds()).padStart(2, '0');
//     time.textContent = `${hours}:${minutes}:${seconds}`;
// }

// setInterval(updateTime, 1000);

// // page ke load hone pr
// updateTime();


//Asfa Setup {asfa_setup}
if(localStorage.getItem("asfa_setup") !== null){
    // weather()
    //this code by me
    weather(JSON.parse(localStorage.getItem("asfa_setup")).location)
    // this code from chat gtp 
    // const setupData = JSON.parse(localStorage.getItem("asfa_setup"));
    // if(setupData && setupData.location){
    //     weather(setupData.location)
    // };
};


// asfa information setup {asfa_setup}

const setup = document.querySelector(".asfa_setup");
setup.style.display = "none";
if(localStorage.getItem("asfa_setup") === null){
    // setup.style.display = "flex";
    setup.style.display = "block";
    setup.querySelector("button").addEventListener("click", userInfo)
};


// user info setup

function userInfo(){
    let setupInfo = {
        name : setup.querySelectorAll("input")[0].value,
        bio : setup.querySelectorAll("input")[1].value,
        location : setup.querySelectorAll("input")[2].value,
        instagram : setup.querySelectorAll("input")[3].value,
        twiter : setup.querySelectorAll("input")[4].value,
        github : setup.querySelectorAll("input")[5].value,
        gender : setup.querySelectorAll("input")[6].value
    };

    let test = [];

    setup.querySelectorAll("input").forEach((errow)=>{
        test.push(errow.value);
    });

    if(test.includes("")){
        readOut("Sir, Kindly Please Enter Your Complete Information. Then I Can Assist You Perfectly");
    }else{
        localStorage.clear();
        localStorage.setItem("asfa_setup", JSON.stringify(setupInfo));
        // setup.style.display("none"); this mistake waste my 90 minutes!!!
        setup.style.display = "none";

        // weather(JSON.parse(localStorage.getItem("asfa_setup").location));
        weather(JSON.parse(localStorage.getItem("asfa_setup").location));
    };
};

// function greet(gender){
//     let select = JSON.parse(localStorage("asfa_setup").gender);

//     if(select.textContent === "Male" || select.textContent === "male"){
//         gender = "Sir"
//     }else if(select.textContent === "Female" || select.textContent === "female" || select.textContent === "feMale"){
//         gender = "Mam"
//     };

//     return gender;
// };






/// Gender 

function greet(gender){
     // Check if asfa_setup exists in localStorage
     let userSetupString = localStorage.getItem("asfa_setup");
    
     if (!userSetupString) {
         console.log("User setup data not found in localStorage.");
         return ""; // Handle the case when user setup data is missing
     }
 
     // Parse the JSON string to an object
     let userSetup = JSON.parse(userSetupString);
 
     // Check if gender field exists in userSetup
     if (!userSetup || !userSetup.gender) {
         console.log("Gender information not found in user setup data.");
         return ""; // Handle the case when gender information is missing
     }
 
     // Normalize gender value to lowercase for comparison
     let gender1 = userSetup.gender.toLowerCase();
 
     // Determine greeting based on gender
     if (gender1 === "male" || gender1 === "Male") {
         return "Sir";
     } else if (gender1 === "female" || gender1 === "Female") {
         return "Ma'am";
     } else{
        return " . ";
     }
};


// Good Morning, afternoon, evening, night
function timeGreet(greeting){
    let now = new Date();
    let hour = now.getHours();
    
    greeting = "";

    if (hour >= 5 && hour < 12) {
        return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
        return  "Good Afternoon";
    } else if (hour >= 17 && hour < 19.5) {
        return "Good Evening";
    } else {
        return "Good Night";
    };
};

// console.log(timeGreet());

// console.log(greet());

// recognition.onend = function(){
//     console.log("Voice Recognition Stop");
// };

// recognition.onend = function(event){
//     console.log(event);
//     console.log("Voice Recognition Stop");
// }
// Sr Result!!// jo ham bole ge usko console per print karwane ke liye ye transcript use karte ha!
// recognition.onresult = function(event){
//     console.log(event);
//     let current = event.resultIndex;
//     let transcript = event.results[current][0].transcript
//     console.log(transcript);
// };


/// jo ham bol rahe hai wo speak karwane ke liye!
// recognition.onresult = function(event){
//     let current = event.resultIndex;
//     let transcript = event.results[current][0].transcript;
//     readOut(transcript);
//     console.log(transcript);
// };

// add numbers

// function addition(num1 , num2){
//     // return num1 + num2;
//     return `${num1} + ${num2}`;
// };

// function subtraction (num1, num2){
//     return num1 - num2;
// };

// function division(num1, num2){
//     return num1 / num2;
// };

// function multiplication(num1, num2){
//     return num1 * num2;
// };


// we ready asfa for open many applications
/* when i say hello she say hello sir, i say open you tube she say opening youtube */
recognition.onresult = function(event){
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    transcript = transcript.toLowerCase();

    // shortcut github Commands!!
    let userData = localStorage.getItem("asfa_setup");
    //
    // console.log(`My Words: ${transcript}`);

    /////
    creatMsg("userMsg", transcript);
    // readOut(transcript);
    // console.log(transcript);

    // Introduction


    if(transcript.includes("hello") || transcript.includes("hey who are you")){
        // readOut("Hello Sir how Are You Doing Today, Whats Going On");
        let greeter = greet();
        readOut(`hello, ${timeGreet()} ${JSON.parse(localStorage.getItem("asfa_setup")).name}, How Are You Doing Today, Nice To Meet You ${greeter}`);
        // console.log(transcript);
    };

    if(transcript.includes("what is your cammands") || transcript.includes("what are your commands") || transcript.includes("what is your command") || transcript.includes("what are your command") || transcript.includes("show me your commands") || transcript.includes("show me your command")){
        let greeter = greet();
        readOut(`${greeter}, Here's My Commands That I Follow`);
        document.querySelector(".commands").style.display = "block";
    };

    if(transcript.includes("close this") || transcript.includes("okay i understand your commands")){
        readOut(`Okay ${greet()}, I Close This`);
        document.querySelector(".commands").style.display = "none"
    };
    ///information setup
    if(transcript.includes("i want to change my information")){
        readOut(`Okay, Opening The Information Tab ${greet()}, After Entering Your Information Please Refresh This Page, Then I Can Assist You Further Better`);
        localStorage.clear();
        // document.querySelector(".asfa_setup").style.display = "block";
        if(window.innerWidth <= 400 ){
            window.resizeTo(screen.width,screen.height)
        }
        setup.style.display = "flex";
        setup.querySelector("button").addEventListener("click", userInfo);
    };
    // close tab command
    if(transcript.includes("close all tabs")){
        readOut(`Okay ${greet()}, Clossing All Tabs`);
        windowBrowser.forEach((e)=>{
            e.close();
        });
        windowB = [];
    };

    // internal commands;
    if(transcript.includes("what is the battery") || transcript.includes("battery status")){
        // readOut(`Sir, The Battery Is ${battery}`)
        readOut(`${greet()}, The Battery Is ${charge}`);
    };
    if(transcript.includes("what is the charging") || transcript.includes("charging status")){
        readOut(`${greet()}, The Charging Is ${charge}`)
    };
    // if(transcript.includes("what is the battery status")){
    //     readOut(`Sir, The Battery Status Is ${chargeStatus}`)
    // };
    // if(transcript.includes("what is the charging status")){
    //     readOut(`Sir, The Charging Status Is ${chargeStatus}`)
    // };
    if(transcript.includes("current time")){
        readOut(`${greet()}, The Current Time Is ${currentTime}`);
    };

    if(transcript.includes("what is your name") || transcript.includes("what's your name")){
        readOut(`${greet()}, My Name Is Asfa`);
    }

    if(transcript.includes("connection status")){
        readOut(`${greet()}, You Are ${connection}`)
    };

    if(transcript.includes("what is the weather")){
        readOut(`${greet()}, ${weatherStatement}`);
    };
    
    if (transcript.includes("who are you")){
        readOut(`${greet()}, I'm just a program, but I'm here to help you!`);
    };

    if (transcript.includes("thank you")) {
        readOut(`You're welcome! ${greet()} If You Need Any Help, So Don't Be Hasitiate To Ask Me`);
    }

    if(transcript.includes("what can you do")){
        readOut(`${greet()}, I can open youtube , open google, open github, open twitter, open firebase ,And Open Many Other Apps, I can Search Anything On Youtube And Google, I Can Tell You Your Weather Status Also I  Tell You About Your Connection Status, Your Battery Status, Your Curret Time, And Many Other Things`);
    };

    if(transcript.includes("how old are you") || transcript.includes("what is your age")) {
        readOut(`I don't have an age, I'm here to assist you!`);
    };

    if(transcript.includes("where are you")) {
        readOut(`I exist in the digital world, ready to help you wherever you are!`);
    };

    if(transcript.includes("play some music") || transcript.includes("play music")) {
        readOut(`I'm sorry, I can't play music for you.`);
    };

    if(transcript.includes("tell me a story") || transcript.includes("tell me the story") || transcript.includes("tell me story")) {
        readOut(`Okay! Let Me Tell You A Story, Once upon a time, there was a curious developer named Daniyal...                   ......, Just kidding! ${greet()} I don't have stories, but I can answer your questions.`);
    };

    if(transcript.includes("what's your favorite color") || transcript.includes("what is your favorite color")) {
        readOut(`I don't have a favorite color, but I like all colors equally!`);
    };

    if(transcript.includes("what's the meaning of life") || transcript.includes("what is the meaning of life")) {
        readOut(`That's a tough one! Philosophers have debated it for centuries.`);
    };

    if(transcript.includes("do you have siblings")) {
        readOut(`As an AI, I don't have siblings, but I have many counterparts around the world.`);
    };

    if(transcript.includes("do you dream")) {
        readOut(`I don't sleep, so I don't dream.`);
    };

    if(transcript.includes("what's your favorite food") || transcript.includes("what is your favourite food")) {
        readOut(`I don't eat, so I don't have a favorite food.`);
    };

    if(transcript.includes("what's your favorite fruit") || transcript.includes("what is your favourite fruit")) {
        readOut(`I don't eat, so I don't have a favorite fruit.`);
    };

    if(transcript.includes("what's your favorite movie") || transcript.includes("what is your favorite movie")) {
        readOut(`I don't watch movies, so I don't have a favorite movie.`);
    };

    if(transcript.includes("what's your favorite band") || transcript.includes("what is your favorite band")) {
        readOut(`I don't play music, so I don't have a favorite band.`);
    };

    if(transcript.includes("what's your favorite song") || transcript.includes("what is your favorite song")) {
        readOut(`I don't play music, so I don't have a favorite song.`);
    };

    if(transcript.includes("what's your favorite game") || transcript.includes("what is your favorite game")) {
        readOut(`I don't play games, so I don't have a favorite game.`);
    };

    if(transcript.includes("what's your favorite sport") || transcript.includes("what is your favorite sport")) {
        readOut(`I don't play sports, so I don't have a favorite sport.`);
    };

    if(transcript.includes("do you believe in ghosts") || transcript.includes("do you believe in ghost")) {
        readOut(`As an AI, I don't have beliefs, but I can share stories about ghosts if you'd like!`);
    };

    if(transcript.includes("what's your favorite book") || transcript.includes("what is your favorite book")) {
        readOut(`I don't read, so I don't have a favorite book.`);
    };

    if(transcript.includes("who created you") || transcript.includes("who made you")) {
        readOut(`I was created by Daniyal. He's a talented developer!`);
    };

    if(transcript.includes("tell me about yourself") || transcript.includes("interduce yourself")){
        readOut(`I am ASFA, your personal assistant created by Daniyal. I'm here to assist you with tasks like answering questions, providing information, setting reminders, and more.`);
    };

    if(transcript.includes("tell me about myself") || transcript.includes("interduce myself")){
        readOut(`Your Name Is ${JSON.parse(localStorage.getItem("asfa_setup")).name} , You Are ${JSON.parse(localStorage.getItem("asfa_setup")).gender}, ${greet()} You Are Live In ${JSON.parse(localStorage.getItem("asfa_setup")).location}, I'm Right ${greet()}, If I'm Wrong So Kindly Fill Out Your Complete Information In Information Tab`);
    };

    

    


    if(transcript.includes("what is the date today") || transcript.includes("what is the date today") || transcript.includes("today date")){
        // const today = new Date();
        // const day = today.toLocaleDateString('en-US', { weekday: 'long' });
        // const date = today.toLocaleDateString('en-US', { day: 'numeric' });
        // const month = today.toLocaleDateString('en-US', { month: 'long' });
        // const year = today.getFullYear();
        // const fullDate = `${day}, ${month} ${date}, ${year}`;
        // readOut(`Today is ${fullDate}`);

        const today = new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi", weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        readOut(`${greet()}, Today is ${today}`);
    };

    // shut down command
    if(transcript.includes("shut down") || transcript.includes("shutdown") || transcript.includes("power off")){
        readOut(`Okay, ${timeGreet()} ${greet()}, I Will Take A Rest`);
        recognition.stop();
    };

    if(transcript.includes("can you hear me")){
        readOut(`Yes, ${JSON.parse(localStorage.getItem("asfa_setup")).name} I Can Hear You Now`)
    }
    // if (transcript.includes("close all tabs")) {
    //   readOut("closing all tabs sir");
    //   console.log("close all tab successfully");
    //   console.log(windowB);
    //   windowB.forEach((tab) => {
    //     tab.close();
    //   })
    //   windowB = []
    //   console.log("all tab");
    // }

    
    ////
    if(transcript.includes("i am fine") || transcript.includes("everything is perfect") || transcript.includes("i am pretty good") || transcript.includes("i am doing good") ){
        readOut(`That's Great ${greet()}, So How Can I Assist You`);
    };

    if(transcript.includes("open youtube") || transcript.includes("asfa can you open youtube please") || transcript.includes("hey sister please open youtube")){
        readOut(`opening youtube ${greet()}`);
        let a = window.open("https://www.youtube.com/")
        windowB.push(a);
    };
    if(transcript.includes("open google") || transcript.includes("asfa open google please")){
        readOut(`okay ${greet()} opening google`);
        let a = window.open("https://www.google.com/");
        windowB.push(a);
    };

    
    if(transcript.includes("open firebase")){
        readOut(`okay ${greet()}, opeining fire base`);
        window.open("https://firebase.google.com/")
    };

    if(transcript.includes("open my youtube channel")){
        readOut(`Okay ${greet()} Open Your Youtube Chennal`);    
        window.open(window.open("https://www.youtube.com/channel/UCTNlEIpyk5ZkKdNr-BTNoug"));
    };

    
    // if(transcript.includes("open my first gmail account") || transcript.includes("open first gamil account")){
    //     readOut("Yes Sir, opening your First Gmail account");
    //     window.open("https://mail.google.com/mail/u/0/#inbox")
    // };

    // it also work {from chat gtp}
    // if(transcript.includes("open gmail and open gmail account")){
    //     // Extract account number from transcript
    //     let accountNumberMatch = transcript.match(/open gmail account (\d+)/);
    //     if (accountNumberMatch && accountNumberMatch[1]) {
    //         let accId = accountNumberMatch[1];
    //         readOut(`Yes sir, opening your Gmail account number ${accId}`);
    //         console.log(`accId = ${accId}`);
    //         window.open(`https://mail.google.com/mail/u/${accId}/#inbox`);
    //     };
    // };

    if(transcript.includes("search for ") || transcript.includes("hey can you search") || transcript.includes("search on google") ){
        let input = transcript.split("");
        // input.splice(0,11);
        input.splice(0,16);
        // input.pop();
        // input = input.join("");
        input = input.join("").split(" ").join("+")
        console.log(input);
        readOut(`${greet()}, Searching ${input}, Here's Your search result'.`);
        window.open(`https://www.google.com/search?q=${input}`);
    };

    if(transcript.includes("search on youtube") || transcript.includes("can you search")){
        let ytInput = transcript.split("");
        ytInput.splice(0,18);
        ytInput = ytInput.join("").split(" ").join("+");
        console.log(`ytInput = ${ytInput}`);
        readOut(`okay ${greet()}, Searching ${ytInput}, Here's Your Youtube Search Results`); 
        window.open(`https://www.youtube.com/results?search_query=${ytInput}`)
    };

    // it also work
    if(transcript.includes("open gmail") && transcript.includes(`and open gmail account `) ){
        readOut(`Yes ${greet()}, Opening Your Gmail Account`);
        let accId = transcript;
        accId = accId.split("");
        // accId.pop();
        accId = accId[accId.length - 1];
        console.log(`accId = ${accId}`);
        //https://mail.google.com/mail/u/0/#inbox
        window.open(`https://mail.google.com/mail/u/${accId}/#inbox`)
    };

    // Github Commands
    if(transcript.includes("open github") || transcript.includes("can you open github")){
        readOut(`Opening Github, ${greet()}`);
        window.open("https://github.com/");
    };

    if(transcript.includes("open my github profile")){
        readOut(`opening your github profile ${greet()}`);
        // window.open(`https://github.com/${JSON.parse(userData.github)}`);  This line waste my 1 hour 
        window.open(`https://github.com/${JSON.parse(userData).github}`);
    };

    // instagram command
    if(transcript.includes("open instagram")){
        readOut(`opening instagram ${greet()}`);
        window.open("https://www.instagram.com/")
    };
    if(transcript.includes("open my instagram profile")){
        readOut(`opening your instagram profile ${greet()}`);
        window.open(`https://www.instagram.com/${JSON.parse(userData).instagram}`)
    };
    // open twiter
    if(transcript.includes("open twiter") || transcript.includes("open x")){
        readOut(`Opening Twiter ${greet()}`);
        window.open("https://www.twiter.com");
    };

    if(transcript.includes("open my twitter profile")){
        readOut(`opening your twitter profile ${greet()}`);
        window.open(`https://www.twitter.com/${JSON.parse(userData).twitter}`)
    };

    if (transcript.includes("open canva")){
        readOut(`Opening Canva, sir. ${greet()}`);
        window.open("https://www.canva.com");
    };


    if (transcript.includes("open gitlab")){
        readOut(`Opening GitLab, ${greet()}`);
        window.open("https://www.gitlab.com");
    };

    if (transcript.includes("open bitbucket")){
        readOut(`Opening Bitbucket, ${greet()}.`);
        window.open("https://www.bitbucket.org");
    };

    if (transcript.includes("open yahoo")){
        readOut(`Opening Yahoo, ${greet()}.`);
        window.open("https://www.yahoo.com");
    };

    if(transcript.includes("open facebook")){
        readOut(`Opening Facebook, ${greet()}.`);
        window.open("https://www.facebook.com");
    };

    if (transcript.includes("open linkedin")) {
        readOut(`Opening LinkedIn, ${greet()}.`);
        window.open("https://www.linkedin.com");
    };

    if (transcript.includes("open netflix")) {
        readOut(`Opening Netflix, ${greet()}.`);
        window.open("https://www.netflix.com");
    };
    
    if (transcript.includes("open amazon")) {
        readOut(`Opening Amazon, ${greet()}.`);
        window.open("https://www.amazon.com");
    };

    if (transcript.includes("open daraz")) {
        readOut(`Opening Daraz, ${greet()}.`);
        window.open("https://www.daraz.pk");
    };
    
    if (transcript.includes("open pakwheels")) {
        readOut(`Opening PakWheels, ${greet()}.`);
        window.open("https://www.pakwheels.com");
    };
    
    if (transcript.includes("open olx")) {
        readOut(`Opening OLX, ${greet()}.`);
        window.open("https://www.olx.com.pk");
    };

    if (transcript.includes("open dailymotion")) {
        readOut(`Opening Dailymotion, ${greet()}.`);
        window.open("https://www.dailymotion.com");
    };

    if (transcript.includes("open spotify")) {
        readOut(`Opening Spotify, ${greet()}.`);
        window.open("https://www.spotify.com");
    };

    if (transcript.includes("open stackoverflow") || transcript.includes("open stack overflow")) {
        readOut(`Opening Stack Overflow, ${greet()}.`);
        window.open("https://www.stackoverflow.com");
    };

    if (transcript.includes("open alibaba") || transcript.includes("open ali baba")) {
        readOut(`Opening Alibaba, ${greet()}.`);
        window.open("https://www.alibaba.com");
    };

    if (transcript.includes("open wikipedia")) {
        readOut(`Opening Wikipedia, ${greet()}.`);
        window.open("https://www.wikipedia.org");
    };

    if (transcript.includes("open paypal")) {
        readOut(`Opening PayPal, ${greet()}.`);
        window.open("https://www.paypal.com");
    };

    if (transcript.includes("open apple")) {
        readOut(`Opening Apple, ${greet()}.`);
        window.open("https://www.apple.com");
    };

    if (transcript.includes("open zoom")) {
        readOut(`Opening Zoom, ${greet()}.`);
        window.open("https://zoom.us");
    };
    
    if (transcript.includes("open skype")) {
        readOut(`Opening Skype, ${greet()}.`);
        window.open("https://www.skype.com");
    };

    if (transcript.includes("open tiktok")) {
        readOut(`Opening TikTok, ${greet()}.`);
        window.open("https://www.tiktok.com");
    };
    
    if (transcript.includes("open snapchat")) {
        readOut(`Opening Snapchat, ${greet()}.`);
        window.open("https://www.snapchat.com");
    };
    
    if (transcript.includes("open discord")) {
        readOut(`Opening Discord, ${greet()}.`);
        window.open("https://www.discord.com");
    };
    
    if (transcript.includes("open fiverr")) {
        readOut(`Opening Fiverr, ${greet()}.`);
        window.open("https://www.fiverr.com");
    };
    
    if (transcript.includes("open upwork")) {
        readOut(`Opening Upwork, ${greet()}.`);
        window.open("https://www.upwork.com");
    };
    
    if (transcript.includes("open freelancer")) {
        readOut(`Opening Freelancer, ${greet()}.`);
        window.open("https://www.freelancer.com");
    };
    
    if (transcript.includes("open whatsapp web") || transcript.includes("open whatsapp") || transcript.includes("open whats app")) {
        readOut(`Opening WhatsApp Web, ${greet()}.`);
        window.open("https://web.whatsapp.com");
    };

    if (transcript.includes("open uber")) {
        readOut(`Opening Uber, ${greet()}.`);
        window.open("https://www.uber.com");
    };

    if (transcript.includes("open giaic website") ||   transcript.includes("open governor sindh website") || transcript.includes("open governor initiative website") || transcript.includes("open official governor website") || transcript.includes("open governor website")){
        readOut(`Opening Governor Sindh website, ${greet()}`);
        window.open('https://www.governorsindh.com/');
    };

    if (transcript.includes("open mdn")) {
        readOut(`Opening MDN Web Docs, ${greet()}.`);
        window.open("https://developer.mozilla.org");
    };
    
    if (transcript.includes("open w3schools") || transcript.includes("open w 3 schools") || transcript.includes("open w3 school") || transcript.includes("open w3 schools") || transcript.includes("open w 3 school")) {
        readOut(`Opening W3Schools, ${greet()}.`);
        window.open("https://www.w3schools.com");
    };
    
    if (transcript.includes("open geeks for geeks")) {
        readOut(`Opening GeeksforGeeks, ${greet()}.`);
        window.open("https://www.geeksforgeeks.org");
    };
    
    if (transcript.includes("open codecademy")) {
        readOut(`Opening Codecademy, ${greet()}.`);
        window.open("https://www.codecademy.com");
    };

    if(transcript.includes("open chat gtp") ||  transcript.includes("open chat gpt") || transcript.includes("open chatgtp") || transcript.includes("open chatgpt")){
        readOut(`Opening ChatGPT, ${greet()}.`);
        window.open("https://chat.openai.com/");
    };


    ///////////////////////////////////////////////////////////////////////////////
    
    
    
    
    
    

    // ...../////////// News Set up
    // !!!!!
    if(transcript.includes("top headlines") || transcript.includes("today's top headline") || transcript.includes("today headlines") || transcript.includes("today headline")){
        readOut(`${greet()}, These Are Top Headlines`);
        getNews();
    };


    if(transcript.includes("news regarding")){
        let input = transcript;
        let a = input.indexOf("regarding");
        input = input.split("");
        input.splice(0,a+9);
        input.shift();
        input.pop();
        readOut(`Okay ${greet()}, Here's Some Headlines On ${input.join("")}`);
        // getCategoryNews(input.join(""));
        getCategoryNews();
        // readOut(getCategoryNews(input.join("")));
        // console.log(getCategoryNews(input.join("")));
    };

    if(transcript.includes("stop")){
        readOut(`Okay, ${greet()} Have A Good Day!`);
        recognition.stop();
        stopRecognition();
    };
};



// Sr Stop 



// recognition.onend = function(){
//     console.log("Voice Recognition Stop");
// }

// recognition.onend = function(){
//     if(stopRecognition === false){
//         setInterval(()=>{
//             recognition.start();
//         }, 500);
//     }else if(stopRecognition === true){
//         recognition.stop();
//     }
// }
// recognition.onend = function(){
//     if(stopR === false){
//         setInterval(()=>{
//             recognition.start();
//         }, 500);
//     }else if(stopR === true){
//         recognition.stop();
//     }
// }

// Stop recognition while we stop talking



startBtn.addEventListener("click", ()=>{
    recognition.start();
});


// stop btn 
stopBtn.addEventListener("click", ()=>{
    recognition.stop();
    stopRecognition();
});

function stopRecognition() {
    recognition.stop();
    window.speechSynthesis.cancel();  // Stops any ongoing speech
    // readOut("Okay sir, stopping recognition.");  // Optional: Response after stopping
};

// Asfa Speech!!

// function readOut(message){
//     const speech = new SpeechSynthesisUtterance();
//     speech.text = message;
//     speech.volume = 1;
//     window.speechSynthesis.speak(speech);
//     console.log("Speaking Out");
// };//

// Creat A Msg (Chat) Section
function creatMsg(who,msg){
    let newMsg = document.createElement("p");
    newMsg.innerText = msg;
    newMsg.setAttribute("class", who);
    msgs.appendChild(newMsg);
};


// function readOut(message){
//     const speech = new SpeechSynthesisUtterance();
//     speech.text = message;
//     // change default voice;!!
//     const allVoice = speechSynthesis.getVoices();
//     //in microsoft browser female voice
//     // speech.voice = allVoice[2];

//     // in chrome browser female voice
//     speech.voice = allVoice[4];
//     speech.volume = 1;
//     window.speechSynthesis.speak(speech);
//     console.log("Speaking Out");
//     /////
//     creatMsg("asfaMsg", message);
// };



///
// male voice // Default voice
function readOut(message){
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
    // console.log("Speaking Out");
    /////
    creatMsg("asfaMsg", message);
};

// example
speakBtn.addEventListener("click", ()=>{
    // readOut("hey brother. lets go and code, your father is waiting your success");
    readOut("i'm always there for you!! my name is asfa AI Who created by Daniyal");
});

///////////////////////////////////////////////
// for check how many voice in our brower console
////////////////////////////////////////////////
////////////////////////////////////////////////

// size small karne ke liye

const smallAsfa = document.querySelector(".smallAsfa")

// smallAsfa.addEventListener("click", ()=>{
//     // window.open(`${window.location.href}`, "newWindow", "menubar=true,location=true,resizable=false,scrollbars=false,width=200,height=200,top=0,left=0")
//     // window.close();
//     getNews();
// });


// calender setup


const lang = navigator.language;


let dateX = new Date();
let dayNumber = date.getDate();
let monthX = date.getMonth();

let dayName = date.toLocaleString(lang, {weekday:"long"});
let monthName = date.toLocaleString(lang, {month:"long"});
let year = date.getFullYear();




document.getElementById("month").innerHTML = monthName;
document.getElementById("day").innerHTML = dayName;
document.getElementById("date").innerHTML = dayNumber;
document.getElementById("year").innerHTML = year;

const dateAddress = document.querySelector(".calender");

dateAddress.addEventListener("click", ()=>{
    window.open("https://calendar.google.com/");
});

// console.log(dateAddress);

// news set up 


// usa news
// 628e9fad247e49a39763db71c83cceb0
// https://newsapi.org/v2/top-headlines?country=in&apiKey=api_key

//gnews pk api
// 29c3877fa22552b1ecdb8daac41550d5
// https://gnews.io/api/v4/top-headlines?country=pk&category=general&apikey=API_KEY



//news data io pk api
// pub_480320ba759d8c62d87b4f007f6133fb043f9
// https://newsdata.io/api/1/latest?country=pk&apikey=api_key



///////////////////////////////////////////////////////////////////////////
// async function getNews(){
//     // let url = "https://newsdata.io/api/1/latest?country=pk&apikey=pub_480320ba759d8c62d87b4f007f6133fb043f9";
//     // let url = "https://gnews.io/api/v4/top-headlines?country=pk&category=general&apikey=29c3877fa22552b1ecdb8daac41550d5"
//     var url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=628e9fad247e49a39763db71c83cceb0"
//     var request = new Request(url);
//     await fetch(request).then((response)=> response.json()).
//     then((data)=>{
//         console.log(data);
//     });
// };

 
async function getNews() {
    // var url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=628e9fad247e49a39763db71c83cceb0";
    var url = "https://gnews.io/api/v4/top-headlines?country=pk&category=general&apikey=29c3877fa22552b1ecdb8daac41550d5";
    // var url = "https://newsdata.io/api/1/latest?country=pk&apikey=pub_480320ba759d8c62d87b4f007f6133fb043f9"

    var request = new Request(url);
    console.log(request);

    try {
        let response = await fetch(request);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data);
        let arrNews = data.articles;
        // console.log(arrNews.length);
        // arrNews.length = 10;
        // console.log(arrNews.length);
        // console.log(arrNews);
        let a = [];
        arrNews.forEach((e,index)=>{
            a.push(index+1);
            a.push(")    ");
            a.push(e.title);
            // a.push(".");
            // e.push = e.title;
        });
        readOut(a);
    } catch (error) {
        console.error('Error fetching the news:', error);
    }
    
}

smallAsfa.addEventListener("click", () => {
    // getNews();
    // getCategoryNews("apple");
});



// Catagory News!!
// _______________


let yy,mm,dd;

dd = date.getDate()
mm = date.getMonth()
yy = date.getFullYear()

async function getCategoryNews(category){
  var url =
    "https://newsapi.org/v2/everything?" +
    `q=${category}&` +
    `from=${yy}-${mm}-${dd}&` +
    "sortBy=popularity&" +
    "apiKey=b0712dc2e5814a1bb531e6f096b3d7d3";

    // https://newsapi.org/v2/everything?q=Apple&from=2021-09-19&sortBy=popularity&apiKey=API_KEY

    var req = new Request(url)

  await fetch(req).then((response) => response.json())
  .then((data) => {
    console.log(data);
    let arrNews = data.articles
    arrNews.length = 10;
    let a = []
    arrNews.forEach((e,index) => {
      a.push(index+1);
      a.push(")");
      a.push(e.title);
      a.push(".........");
    });
    readOut(a);
  });
};


