// =========================== SIDE MENU FUNCTIONS ====================================================

let menuIcon = document.querySelector('.m-middle');
let sideMenuWidth = $('.side-menu').outerWidth();
let menuControlsWidth = $('.menu-controls').outerWidth();
let leftPosition = sideMenuWidth - menuControlsWidth;

$('.side-menu-container').css('left', `${-leftPosition}px`);

menuIcon.addEventListener('click', function () {
    if ($('.side-menu-container').css('left') == `${-leftPosition}px`) {
        $('.side-menu-container').css('left', `0px`);
        menuIcon.innerHTML = `<i class="fa-solid fa-xmark fa-2xl icon"></i>`;
    } else {
        $('.side-menu-container').css('left', `${-leftPosition}px`);
        menuIcon.innerHTML = `<i class="fa-solid fa-bars icon fa-2xl"></i>`;
    }
});


// =========================== DISPLAY PAGE CONTENT ====================================================

let pageContnet = document.querySelector('.page-content');
let allData;
async function fetchData(type) {
    let myResponse = await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=286c842c55d3dc4fb82f38d2fe5c14a6&language=en-US&page=1`);
    let myData = await myResponse.json();
    allData = myData.results;
    display(allData);
}

fetchData('now_playing');

function display(arr) {
    divs = ``
    for (let i = 0; i < arr.length; i++) {
        divs += `
            <div class="col-md-4 gy-5 ">
                <div class="show-item position-relative overflow-hidden">
                    <img class="w-100" src='https://image.tmdb.org/t/p/w500/${arr[i].poster_path}' alt="">
                    <div class="desc-layer d-flex flex-column justify-content-center">
                        <h3 class="title">
                            ${arr[i].title}
                        </h3>
                        <p class="overview">
                            ${arr[i].overview}
                        </p>
                        <p class="rate">Rate: ${arr[i].vote_average}</p>
                        <p class="date">${arr[i].release_date}</p>
                    </div>
                </div>
            </div>
        `
    }

    pageContnet.innerHTML = divs;
}

async function fetchTrending() {
    let myResponse = await fetch("https://api.themoviedb.org/3/trending/movies/day?api_key=286c842c55d3dc4fb82f38d2fe5c14a6");
    let myData = await myResponse.json();
    allData = myData.results;
    display(allData);
}

let menuItem = $('.side-menu a');
menuItem.eq(0).click(function () {
    fetchData('now_playing');
});

menuItem.eq(1).click(function () {
    fetchData('popular');
})

menuItem.eq(2).click(function () {
    fetchData('top_rated');
})
menuItem.eq(3).click(function () {
    fetchTrending();
})
menuItem.eq(4).click(function () {
    fetchData('upcoming');
})


// ====================================== SEARCH BY WORD FUNCTION ===============================================

let searchByWordInput = document.querySelector('.search-by-word');
let searchResults = []
async function fetchSearchApi(word) {
    let myResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=286c842c55d3dc4fb82f38d2fe5c14a6&language=en-US&page=1&include_adult=false&query=${word}`);
    let myData = await myResponse.json();
    searchResults = myData.results;
    display(searchResults);
}


searchByWordInput.addEventListener('keyup', function () {
    let word = searchByWordInput.value;
    fetchSearchApi(word);
})


// ======================================= VALIDATION ====================================================

let nameInput = document.querySelector('.nameInput');
let emailInput = document.querySelector('.emailInput');
let phoneInput = document.querySelector('.phoneInput');
let ageInput = document.querySelector('.ageInput');
let passwordInput = document.querySelector('.passwordInput');
let rePasswordInput = document.querySelector('.re-passwordInput');


function validName(){
    let nameRegex = /^[a-zA-Z]{3,20}$/                
    if(nameRegex.test(nameInput.value)==true){
        return true;
    }
    else {
        return false;
    }
}

function validEmail(){
    let emailRegex = /^[a-z]{1,20}@[a-z]{1,10}.com$/
    if(emailRegex.test(emailInput.value) == true){
        return true;
    }
    else {
        return false;
    }
}

function validAge(){
    let ageRegex = /^[1-9]{1,3}$/
    if(ageRegex.test(ageInput.value) == true){
        return true;
    }
    else {
        return false;
    }
}

function validPhone(){
    let phoneRegex = /^(01)(0|1|2|5)[0-9]{8}$/
    if(phoneRegex.test(phoneInput.value)== true){
        return true;
    }
    else {
        return false;
    }
}


function validRepassword(){
    if(rePasswordInput.value == passwordInput.value){
        return true;
    }
    else {
        return false;
    }
}

let nameAlert = document.getElementById('nameAlert');
let emailAlert = document.getElementById('emailAlert');
let phoneAlert = document.getElementById('phoneAlert');
let ageAlert = document.getElementById('ageAlert');

let repasswordAlert = document.getElementById('repasswordAlert');


nameInput.addEventListener('blur', function(){
    if(validName()==false){
        nameAlert.classList.replace('d-none', 'd-block')
    }
});

nameInput.addEventListener('focus', function(){
    if(nameAlert.classList.contains('d-block')){
        nameAlert.classList.replace('d-block', 'd-none');
    }
})

emailInput.addEventListener('blur', function(){
    if(validEmail()==false){
        emailAlert.classList.replace('d-none', 'd-block');
    }
});

emailInput.addEventListener('focus', function(){
    if(emailAlert.classList.contains('d-block')){
        emailAlert.classList.replace('d-block', 'd-none');
    }
})


phoneInput.addEventListener('blur', function(){
    if(validPhone()==false){
        phoneAlert.classList.replace('d-none', 'd-block');
    }
});

phoneInput.addEventListener('focus', function(){
    if(phoneAlert.classList.contains('d-block')){
        phoneAlert.classList.replace('d-block', 'd-none');
    }
})


ageInput.addEventListener('blur', function(){
    if(validAge()==false){
        ageAlert.classList.replace('d-none', 'd-block');
    }
});

ageInput.addEventListener('focus', function(){
    if(ageAlert.classList.contains('d-block')){
        ageAlert.classList.replace('d-block', 'd-none');
    }
})



rePasswordInput.addEventListener('blur', function(){
    if(validRepassword()==false){
        repasswordAlert.classList.replace('d-none', 'd-block');
    }
});

rePasswordInput.addEventListener('focus', function(){
    if(repasswordAlert.classList.contains('d-block')){
        repasswordAlert.classList.replace('d-block', 'd-none');
    }
})


let submitBtn = document.querySelector('.contact-btn');
if(validName()==false | validAge()==false | validEmail == false | validRepassword()== false | validPhone()==false){
    submitBtn.addEventListener('click', function(e){
        e.preventDefault();
    })
}
