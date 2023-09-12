const MapGeoJsonConect = async(url)=>{
    const fetchGeoJson = await fetch(url);
    const dataToJson = await fetchGeoJson.json();

    return dataToJson;
}

export default MapGeoJsonConect;