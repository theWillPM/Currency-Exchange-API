/** 
* @name: JavaScript Essentials Class Activity 
* @Course Code: SODV1201 
* @class: Software Development Diploma program. 
* @author: Willian Pereira Munhoz. 
*/ 

const jsimage = document.getElementById("javascript-image");

let timer = document.getElementById('timer');
let timerTitle = document.getElementById('timerTitle');
let countdown = 10.0;

// Anonymous function call, with 10s delay to display an image. I avoided opacity because I thought some browsers might have a problem with how they deal with opacity values (despite https://caniuse.com/css-opacity stating all browsers are compatible). We had a case like this last term where the person made a website using an opacity filter and it didn't work well on presentation day. But I do think playing with opacity and transition would make look better.
setTimeout(() => {
jsimage.style.display = "flex";    
}, 10000);

// Here I assign an anonymous function to a variable so I can stop the setInterval process. This function controls an on-screen countdown timer and stops when timer reaches 0.
var repeat = setInterval(function()
    {   
        if(countdown>0.1) {
        countdown -= 0.1;
        timer.innerHTML = countdown.toFixed(1);
    }

    if (countdown.toFixed(1) == 0) {
        timer.style.display = "none";
        timerTitle.style.display = "none";
    }
    }, 100); 

// Stops the timer execution (repetition)
if (countdown <0.1 ) {
    clearInterval(repeat);
}


