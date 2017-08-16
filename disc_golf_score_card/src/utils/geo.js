const calc = (lat1, lon1, lat2, lon2) =>{
    const R = 6371;
    const lat = (lat2 - lat1).toRad();
    const lon = (lon2 - lon1).toRad();
    const a = Math.sin(lat / 2) * Math.sin(lat / 2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
          Math.sin(lon / 2) * Math.sin(lon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return (d * 0.621371) * 5280;
};

Number.prototype.toRad = function() {
    return this * Math.PI / 180;
};

export default calc
