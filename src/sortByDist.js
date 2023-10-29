function addDistToEmployeeData(employeeData, distData){
    employeeDataWithDist = [];
    if(employeeData.length > 0 && distData.length > 0){
        if(employeeData.length === distData.length){
            for(i = 0; i < employeeData.length; i++){
                let newObj = {
                    id: employeeData[i].id,
                    first_name: employeeData[i].first_name,
                    last_name: employeeData[i].last_name,
                    postalCode: employeeData[i].postalCode,
                    distanceFromTarget: distData[i].distanceFromTarget
                };
                employeeDataWithDist.push(newObj);
            }
        }
    }
    return employeeDataWithDist;
}

// Merge sort function to sort objects based on "distanceFromTarget"
function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
  
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
  
    return merge(mergeSort(left), mergeSort(right));
  }
  
  function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
  
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex].distanceFromTarget < right[rightIndex].distanceFromTarget) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }
  
    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
  }

  function sortEmployeesByDist(employeeData, distData){
    const employeeDataWithDist = addDistToEmployeeData(employeeData, distData);
    const sortedEmployees = mergeSort(employeeDataWithDist);
    return sortedEmployees;
  }

module.exports = { sortEmployeesByDist };
  