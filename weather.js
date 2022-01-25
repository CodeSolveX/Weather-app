const max=document.querySelector(".max-width");
wrapper=document.querySelector(".wrapper");
infoTxt=document.querySelector("info-txt");
inputField=wrapper.querySelector(".loc");
locationBtn=wrapper.querySelector("button");
weatherPart=document.querySelector(".display");
wIcon=weatherPart.querySelector("img");
weatherPart.classList.add("invisible");

let ap;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestAp(inputField.value);
    }
});

locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
});
function requestAp(city){
    ap = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f4d137f69ce05356ecf89b473454ba65`;
    fetchData();
}

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    ap = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=f4d137f69ce05356ecf89b473454ba65`;
    fetchData();
    
}
function onError(error){
    infoTxt.innerText = "Couldnt get geolocation";
  
}

function fetchData(){
    
  
    fetch(ap).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
       
    });
}



function weatherDetails(info){
    if(info.cod == "404"){
       
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;
        const{speed}=info.wind;
        if(id == 800){
            wIcon.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "icons/storm.svg";  
        }else if(id >= 600 && id <= 622){
            wIcon.src = "icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "icons/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "icons/rain.svg";
        }
        
        weatherPart.querySelector(".numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".status").innerText = description;
        weatherPart.querySelector(".location").innerText = `${city}, ${country}`;
   
        weatherPart.querySelector(".numb-2").innerText = `${humidity}%`;
        weatherPart.querySelector(".numb-1").innerText =`${speed}%`;

        weatherPart.classList.remove("invisible");
        infoTxt.innerText = "";
        inputField.value = "";
   
    }
}

