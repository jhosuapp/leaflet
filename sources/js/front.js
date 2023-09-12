//COMPONENTS
import { loadMapHandlers } from "./modules/MapLeaflet";
import "../sass/main.scss";

window.addEventListener('load', ()=>{
    loadMapHandlers();
});