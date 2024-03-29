const GOOGLE_API_KEY = 'AIzaSyDlu5B3B_eZi-2Ub1AeC_eTTL0qwlWQZ5I'


export function getMapPreview({ lat, lng }) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
  &markers=color:red%7Clabel:S%7C${lat},${lng} &key=${GOOGLE_API_KEY}`;
    return imagePreviewUrl;
}

export async function getAddress(lat, lng) {  //reverse geocode api
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
    const response = await fetch(url); //returns a json

    if (!response.ok) {
        throw new Error('Failed to fetch address');
    }

    const data= await response.json(); //convert a json javascript object
    console.log(data,123);
    const address = data.results[0].formatted_address;
    return address;
}
