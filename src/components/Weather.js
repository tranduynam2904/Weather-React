import { useState, useEffect, useRef } from "react"
import axios from "axios"
import moment from "moment"
import { AiOutlineSearch } from 'react-icons/ai'
import moderateRain from './imgs/moderateRain.jpg'
// import Weathericon from "./Weathericon"
export default function Weather() {
    const [data, setData] = useState(null)
    const [text, setText] = useState("Ha Noi")
    const getData = async () => {
        const apiKey = "6d09c9294aebfe4d74851c79390e9641"
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=${apiKey}`
        axios
            .get(url).then((res) => {
                console.log(res.data)
                setData(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        getData();
    }, []);
    const today = moment().format('dddd | MMMM DD YYYY |')
    const [currentTime, setCurrentTime] = useState("")
    useEffect(() => {
        const intervalTime = setInterval(() => {
            setCurrentTime(moment().format('hh:mm:ss A'))
        }, 1000)
        return () => clearInterval(intervalTime)
    }, [])
    console.log(today)
    const inputRef = useRef(null)
    const [weather, setWeather] = useState("")
    const weather_style = {
        // background: weather == ""? `url(${moderateRain})` : '',
        // backgroundSize: 'cover', backgroundPosition: 'center',
        color: '#FC4F00',
    }
    return (
        <div style={weather_style} className="weather">
            <div className="handle_search">
                <input className="input_location"
                    type="text"
                    placeholder="Your location"
                    value={text}
                    ref={inputRef}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key == "Enter" && text) {
                            getData()
                            setText("")
                        }
                    }}
                ></input><AiOutlineSearch className="icon" onClick={() => { inputRef.current.focus() }} />
            </div>
            {data && <div className="handle_data">
                {/* <Weathericon /> */}
                <div className="handle_info">
                    <h1 className="cityname">{data.name}</h1>
                    <h1 className="handle_time">{today} {currentTime}</h1>
                    <div className="temper">
                        <h1 className="handle_temper">Temper: {data.main.temp}</h1>
                        <img src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} />
                    </div>
                    <h1>Status: {data.weather[0].description}</h1>
                    <h1>Humidity: {data.main.humidity}</h1>
                </div>
            </div>}

        </div>
    )
}