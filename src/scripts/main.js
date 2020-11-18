"use strict";

import findByname from "./modules/findbyName";
import getLocation from "./modules/getGeoLocation";
import resetData from './modules/resetData';


window.addEventListener("DOMContentLoaded", () => {

    findByname();
    getLocation();


});
