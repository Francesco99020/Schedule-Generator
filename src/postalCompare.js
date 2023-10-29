const geolib = require('geolib');
const { zipData } = require('./zipLonLat');
//const { mockApiData } = require('./mockData');

function getCoordinates(zipcode) {
    let l = 0;
    let r = zipData.length - 1;
    let mid;
    let prevCheck;
    //revent method from endlessly looping by adding a repeat fallout
    while(r >= 1){
        mid = l + Math.floor((r-l)/2);
        //zipcode found, return long and lat
        //console.log(zipData[mid].zip + " == " + zipcode)
        if(zipData[mid].zip == zipcode){
            return { latitude: zipData[mid].lat, longitude: zipData[mid].lng };
        }
        //zipcode smaller than mid, look to left subarray
        if(zipData[mid].zip > zipcode){
            r = mid - 1;
        }
        //zipcode larger than mid, look to right subarray
        else{
            l = mid + 1;
        }
        if(prevCheck == zipData[mid].zip){
            break;
        }
        prevCheck = zipData[mid].zip;
    }
    //zipcode not found, return null
    return null;
  }

  // Function to calculate distance between two coordinates using geolib and return in miles
function calculateDistanceInMiles(coord1, coord2) {
    if (coord1 && coord2) {
      const distanceInMeters = geolib.getDistance(coord1, coord2);
      const distanceInMiles = distanceInMeters / 1609.344; // 1 meter is approximately 0.000621371 miles
      return distanceInMiles;
    }
    return null;
}

function getDistancesFromTarget(targetZipcode, comparesZipcodes){
    const targetCoords = getCoordinates(targetZipcode);
    let response = [];

    if(comparesZipcodes.length > 0){
        for(i = 0; i < comparesZipcodes.length; i++){
            const compareCoords = getCoordinates(comparesZipcodes[i]);
            let newObj = {
                zipcode: comparesZipcodes[i],
                distanceFromTarget: calculateDistanceInMiles(targetCoords, compareCoords)
            };
            response.push(newObj);
        }
    }
    return response;
}
// let zipCodes = [];
// for(i = 0; i < mockApiData.length; i++){
//     zipCodes.push(mockApiData[i].postalCode);
// }
// //console.log(zipCodes);

// console.log(getDistancesFromTarget(11510, zipCodes));//12345 make a fallout for this

module.exports = { getDistancesFromTarget };