import React, {useEffect, useState} from 'react';
import LightSwitch from "./LightSwitch";
import Search from "./Search";
import WeatherWidget from "./WeatherWidget";
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
function App() {
    const [city, setCity] = useState<string>('');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if(!city) {
            setWeather(null);
            setError(null);
            return;
        }
        const fetchWeather = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=2b26c9b701a91302bafc7a419da4a987&units=metric`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: WeatherData = await response.json();
                setWeather(data);
            } catch (error:any) {
                console.error('Error fetching weather:', error);
                setError(error.message);
                setWeather(null);
            }
            finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, [city]);
    return (
        <div className="WeatherWidgetApp">
            <header className="header">
                <LightSwitch />
                <Search onCityChange={setCity}/>
            </header>
            <div>
                <WeatherWidget weather={weather} error={error} loading={loading} />

            </div>
        </div>
    );
}

export default App;
