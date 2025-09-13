import React, { useState, useEffect } from 'react';

interface WeatherData {
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
    };
    name: string;
    sys: {
        country: string;
    };
}
interface WeatherWidgetProps {
    weather: WeatherData | null;
    error: string | null;
    loading: boolean;
}
const WeatherWidget: React.FC<WeatherWidgetProps> = ({weather, error, loading}) => {
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!weather) return <p>Введите город</p>
    if (loading) return <p>Загрузка...</p>
    return (
        <div>

            <h3>
                {weather.name}, {weather.sys.country}
            </h3>
            <p>Температура: {weather.main.temp} °C</p>
            <p>Влажность: {weather.main.humidity} %</p>
            <p>Ветер: {weather.wind.speed} м/c</p>
            <p>Описание: {weather.weather[0].description}</p>
            <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
            />
        </div>
    )
}

export default WeatherWidget;