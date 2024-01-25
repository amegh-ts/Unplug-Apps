import axios from "axios"

export const billData = async (data) => {
    console.log('apicalls', data);
    try {
        const res = await axios.post("http://localhost:7000/api/unplugapp", data)
        console.log('api data', res);
    } catch (err) {
        console.log(err);
    }
}


