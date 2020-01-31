import axios from 'axios'

export default { uploadImages, getLatLngFromAddress }

function _uploadImg(file) {
    const CLOUD_NAME = 'due4sgv19'
    const PRESET_NAME = 'ldwisjpq'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', file)
    formData.append('upload_preset', PRESET_NAME);
    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            return res
        })
        .catch(err => console.error(err))
}

async function uploadImages(files) {
    const urls = []
    for (let i = 0; i < files.length; i++) {
        const res = await _uploadImg(files[i]);
        urls.push(res.url);
    }
    return urls
}

function getLatLngFromAddress(address) {
    let regex = / /g;
    address = address.replace(regex, '+');
    //sends an HTTP request to google maps API with the given address string to get lat and lng
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAlRYsJRB1drgRGQVcSCbwcWhRpcaM7Z08`)
        .then(res => {
            let address = {
                lat: res.data.results[0].geometry.location.lat,
                lng: res.data.results[0].geometry.location.lng,
                address: res.data.results[0].formatted_address
            }
            return address;
        });
}