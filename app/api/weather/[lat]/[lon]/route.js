import { NextResponse } from "next/server";

export async function GET (request, context) {
    let latitude = context.params.lat;
    let longitude = context.params.lon;
    let key = process.env.WEATHER_KEY

    try {
        let weatherData = await fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${latitude},${longitude}`)
        let data = await weatherData.json();
        return NextResponse.json(data);
    } catch(error) {
        console.error(error);
    }
}