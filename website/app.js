/* Global Variables */

const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';

const apiKey = '&APPID=808d6773c39a5dbf277c1ad0a9d83adb&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Function to input the user zip code into the URL

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {

    const townId = document.getElementById('zip').value + ',';
    const countryCode = document.getElementById('country').value;
    const feeling = document.getElementById('feelings').value;
    
    getData(baseURL,townId,countryCode,apiKey)
    .then(function(weatherData){
        postData('/post',{temperature: weatherData.list[0].main.temp, date: weatherData.list[0].dt_txt, userResponse: feeling})
    })
    .then(function(){
        sendData('/get')
    })
    .then(function(){
        updateUI('/get')
    })
} 

// GET Request to the API
const getData = async (baseURL, townId, countryCode, apiKey) => {
    const resget =  await fetch(baseURL+townId+countryCode+apiKey)
    try {
        const weatherData = await resget.json();
        console.log(weatherData)
        return weatherData;
    } catch(error) {
        console.log('error',error);
    }
}

// POST request
const postData = async ( url = '', data = {}) => {
    const response = await fetch (url, {
        method:'POST',
        credentials:'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData
    } catch(error) {
        console.log('error',error)
    }
}

// GET Request from the server to the client side
const sendData = async (url = '') => {
    const res =  await fetch(url)
    try {
        const htmlData = await res.json();
        console.log(htmlData)
        return htmlData;
    } catch(error) {
        console.log('error',error);
    }
}

// UPDATE UI
const updateUI = async (url ='') => {
    const req = await fetch(url);
    try{
        const allData = await req.json();
        document.getElementById('temp').innerHTML = `Temperature (F): ${allData.temperature}`;
        document.getElementById('date').innerHTML = `Date (YYYY-MM-DD HH:MM:SS): ${allData.date}`;
        document.getElementById('content').innerHTML = `Content: ${allData.userResponse}`;
    } catch(error){
        console.log('error',error)
    }
}