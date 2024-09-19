"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { TiCancel } from "react-icons/ti";
import { IoIosSunny } from "react-icons/io";
import { IoIosPartlySunny } from "react-icons/io";
import { IoRainySharp } from "react-icons/io5";
import { FaRegSnowflake } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Sun from "./sun";
import Rain from "./rain";
import Snow from "./snow";

export default function Dashboard() {
    const {logOut} = useAuth()
    const router = useRouter()

    function handleLogOut() {
        logOut();
        router.push("/");
    }

    //Weather stuff
    const [temp, setTemp] = useState("--");
    const [weatherText, setWeatherText] = useState("No Location");
    const [weatherIcon, setWeatherIcon] = useState(<TiCancel/>);
    const [sunnyBackground, setSunnyBackground] = useState(false);
    const [rainyBackground, setRainyBackground] = useState(false);
    const [snowyBackground, setSnowyBackground] = useState(false);

    async function updateWeather() {
        try {
            if(navigator.geolocation) {
                await navigator.geolocation.getCurrentPosition((position) => {
                    let latitude = position.coords.latitude;
                    let longitude = position.coords.longitude;
        
                    fetch(`/api/weather/${latitude}/${longitude}`)
                        .then((res) => {return res.json()})
                        .then((json) => {
                            const wText = json.current.condition.text;
                            setTemp(Math.round(json.current.temp_c));
                            setWeatherText(wText);
                            switch(wText.toLowerCase()) {
                                case "sunny":
                                case "clear":
                                    setWeatherIcon(<IoIosSunny/>);
                                    setSunnyBackground(true);
                                    setRainyBackground(false);
                                    setSnowyBackground(false);
                                    break;
                                case "partly cloudy":
                                case "cloudy":
                                case "overcast":
                                case "mist":
                                case "fog":
                                    setWeatherIcon(<IoIosPartlySunny/>);
                                    setSunnyBackground(true);
                                    setRainyBackground(false);
                                    setSnowyBackground(false);
                                    break;
                                case "patchy light drizzle":
                                case "patchy rain possible":
                                case "patchy rain nearby":
                                case "patchy freezing drizzle possible":
                                case "thundery outbreaks possible":
                                case "light drizzle":
                                case "patchy light rain":
                                case "light rain":
                                case "moderate rain at times":
                                case "moderate rain":
                                case "heavy rain at times":
                                case "heavy rain":
                                case "light rain shower":
                                case "moderate or heavy rain shower":
                                case "torrential rain shower":
                                case "moderate or heavy rain with thunder":
                                case "patchy light snow with thunder":
                                case "moderate or heavy snow with thunder":
                                    setWeatherIcon(<IoRainySharp/>);
                                    setSunnyBackground(false);
                                    setRainyBackground(true);
                                    setSnowyBackground(false);
                                    break;
                                case "blizzard":
                                case "patchy snow possible":
                                case "patchy sleet possible":
                                case "blowing snow":
                                case "freezing fog":
                                case "freezing drizzle":
                                case "light freezing rain":
                                case "heavy freezing drizzle":
                                case "moderate or heavy freezing rain":
                                case "light sleet":
                                case "moderate or heavy sleet":
                                case "patchy light snow":
                                case "light snow":
                                case "patchy moderate snow":
                                case "moderate snow":
                                case "patchy heavy snow":
                                case "heavy snow":
                                case "ice pellets":
                                case "light sleet showers":
                                case "moderate or heavy sleet showers":
                                case "might snow showers":
                                case "moderate or heavy snow showers":
                                case "light showers of ice pellets":
                                case "moderate or heavy showers of ice pellets":
                                case "patchy light rain with thunder":
                                    setWeatherIcon(<FaRegSnowflake/>);
                                    setSunnyBackground(false);
                                    setRainyBackground(false);
                                    setSnowyBackground(true);
                                    break;
                                default:
                                    setWeatherIcon(<TiCancel/>);
                                    break;

                            }
                        });
                })
            }
        } catch(error) {
            console.error(error);
            return;
        }
    }

    useEffect(() => {
        updateWeather()
        setInterval(updateWeather, 600000);
        console.log("Updated Weather")
    },[]);


    //Clock stuff
    const [hours, setHours] = useState(12);
    const [mins, setMins] = useState("00");
    const [amPm, setAmPm] = useState("am");
    const [day, setDay] = useState("Sunday");
    const [month, setMonth] = useState("JAN");
    const [date, setDate] = useState("01");

    useEffect(updateClock,[]);

    let clockInterval = 1000;

    let clockTimer = setInterval(updateClock , clockInterval);

    function updateClock() {
        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
    
        const months = [
            "JAN",
            "FEB",
            "MAR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC"
        ];

        let currentTime = new Date();

        let newHours = currentTime.getHours();
        let newMins = ("00" + currentTime.getMinutes()).slice(-2);
        let newAmPm = (newHours >= 12? "pm":"am");
        newHours = newHours % 12;
        if(newHours == 0) {
            newHours = 12
        }
        let newMonth = months[currentTime.getMonth()];
        let newDay = days[currentTime.getDay()];
        let newDate = ("00" + currentTime.getDate()).slice(-2);
        
        setHours(newHours);
        setMins(newMins);
        setAmPm(newAmPm);
        setMonth(newMonth);
        setDay(newDay);
        setDate(newDate);
    }

    

    return(
        <div id="dashboardPane" className={`flex flex-row w-screen min-h-32 justify-center items-center
        top-0 relative bg-gradient-to-t overflow-hidden ${snowyBackground ? "text-black" : "text-white"}
        ${rainyBackground? "from-slate-800 to-slate-600":"from-sky-900 to-sky-300"}`}>
            <div id="weatherDiv" className="flex flex-col absolute top-5 left-5 z-30">
                <div id="tempDiv" className="flex flex-row">
                    <span id="weatherIcon" className="sm:text-3xl text-2xl">{weatherIcon}</span>
                    <h2 id="tempText" className="sm:text-2xl text-lg">{temp}°C</h2>
                </div>
                <h3 id="weatherText" className="text-xs sm:text-sm max-w-10">{weatherText}</h3>
            </div>
            <div id="timeDiv" className="flex flex-col text-center z-30">
                <h1 id="timeText" className="text-2xl">
                    <span id="hoursSpan">{hours}</span>:<span id="minsSpan">{mins}</span>
                    <span id="amPmText" className="text-lg"> {amPm}</span>
                </h1>
                <h2 id="dayText" className="text-lg">{day}</h2>
                <h2 id="dateText" className="text-lg">{date} {month}</h2>
            </div>
            <span id="logoutButton" className="text-2xl top-5 right-5 absolute cursor-pointer 
            duration-300 hover:scale-125 hover:opacity-50 sm:text-3xl z-30"
            onClick={handleLogOut}><RiLogoutBoxFill/></span>
            {sunnyBackground && <Sun/>}
            {rainyBackground && <Rain/>}
            {snowyBackground && <Snow/>}
        </div>
    )
}