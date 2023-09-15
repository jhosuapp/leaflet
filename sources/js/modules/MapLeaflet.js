import conectApi from '../api/MapGeoJson';

const Map = (()=>{

    const _MapConfig = async (dinamicGeoJson, lat = 0, lng = 0, zoom = 0)=>{

        // Function for paint map
        function style(feature) {
            const { population } = feature.properties;
            return {
                fillColor: getColor(population),
                weight: 1,
                opacity: 1,
                color: 'white',
                dashArray: '1',
                fillOpacity: 0.9
            };
        }

        // Get color according to population
        function getColor(population) {
            return population > 60000000 ? '#800026' :
                population > 50000000 ? '#BD0026' :
                population > 40000000 ? '#002345' :
                '#002345';
        }

        // Create map + coords + zoom
        const map = L.map('map',{
            center: [lat, lng],
            zoom: zoom,
            minZoom: 2 
        }); // Coordenadas iniciales y nivel de zoom

        // Add map cap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add cap and aply styles
        const geojsonLayer = await L.geoJson(dinamicGeoJson, { style }).addTo(map);

        // Info control personality
        const infoControl = await L.control();

        //Create template
        infoControl.onAdd = function(map) {
            this._div = L.DomUtil.create('div', 'info-control');
            this.update();
            return this._div;
        };

        //Method for update info control
        infoControl.update = function(props) {
            this._div.innerHTML = props ?
                `<strong>${props.name}</strong><br>Población:${props.population}` :
                'Pasa el cursor sobre un área';
        };

        //Add to map info control
        await infoControl.addTo(map);

        // Add popups depending on the population of each country
        geojsonLayer.eachLayer(function(layer) {
            const { population, name } = layer.feature.properties;   

            //Update in real time data of countries
            layer.on('mouseover', function(e) {
                const props = e.target.feature.properties;
                infoControl.update(props);
            });
            layer.on('mouseout', function() {
                infoControl.update();
            });

            // Open popup
            layer.bindPopup(`<strong>${name}</strong><br>Población:${population}`);
        });
    }

    /*
    *Enable map
    */
    const _MapEnableHome = async()=>{
        await conectApi('./lib/colombia-country.geojson')
        .then((geoJson)=>{
                console.log(geoJson);
                //Add new parameter with hc-key
                const { features } = geoJson;
                features.forEach((getData)=>{
                    const { properties } = getData;
                    properties['hc-key'] = properties.region_code;
                });
                //Conect to Endpoint with data dinamic
                conectApi('./lib/colombia-test-endpoint.json')
                    .then((dataMap)=>{
                            //Filter and compare data
                            const arrayWithData = [];
                            dataMap.forEach((regionEndpoint)=>{
                                const { region_code:region_code_endpoint, name, population } = regionEndpoint;
                                const { features } = geoJson;
                                features.forEach((dataProperties)=>{
                                    const { properties:{region_code}, properties } = dataProperties;
                                    if(region_code_endpoint == region_code){
                                        properties.name = name;
                                        properties.population = population;
                                    }
                                });
                                const createNewArr = [];
                                createNewArr.push(region_code_endpoint, population);
                                arrayWithData.push(createNewArr);
                            });
                            console.log(arrayWithData);
                            //Compare region_code and asign values dinamics of endpoint
                            _MapConfig(geoJson, 4.710989, -74.072092, 5, 5);
                            //Remove loader
                            getLoader.remove();
                            getLegend.classList.add('active');
                        }).catch((err)=>{
                            console.log(err + 'second fetch');
                        });

        }).catch((err)=>{
            console.log(err + 'fitst fetch');
        });
    }


    /*
    *Return child functions in a objects
    */
    return{
        setHandleEvent: function(){
            try { _MapEnableHome(); } catch (error) { console.log(error) }
        },
    }
})();

/*
*Load global functions
*/
const loadMapHandlers = ()=>{
    Map.setHandleEvent();
}

export { loadMapHandlers }