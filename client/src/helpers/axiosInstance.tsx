import axios from "axios"

const instance = axios.create(
    {
        baseURL: 'https://streaming-availability.p.rapidapi.com',
        headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
            'X-RapidAPI-Host': "streaming-availability.p.rapidapi.com"

        }
    }
)

export default instance