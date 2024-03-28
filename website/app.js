/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=2520fbbb69466d6852b9b07264685f46&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Get data from Open Weather

document.getElementById('generate').addEventListener('click', performAction);

function performAction(){
    let zipCode = document.getElementById('zip').value;
    retrieveData(baseURL, zipCode, apiKey)
    .then(function(data){
        let userResponse = document.getElementById('feelings').value;
        postData('/data',{temperature: data.main.temp, date: newDate, userResponse:userResponse})
        updateUI()
    });
}

const retrieveData = async (url, zip, key)=>{
   try{
        const request = await fetch(url+zip+key);
        return await request.json();
    }catch(error){
        console.log('errorRetrieveData', error);
    }
}

const postData = async (url = '', data = {}) => {
    try{
        await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }catch(error){
        console.log('errorPostData', error);
    }
}

const updateUI = async()=>{
    const request = await fetch('/all');
    try{
        const data = await request.json();
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML  = data.temperature;
        document.getElementById('content').innerHTML = data.userResponse;
    }catch(error){
        console.log('errorUpdateUI:', error);
    }
}