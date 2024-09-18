/** Helper function to clean up data Objects for get/post requests
 *  Removes properties with empty/undefined values
 */

function cleanData(data){
    const cleanedData = {};
    const props = Object.keys(data);
    props.forEach(key => {
        if (data[key] !== "" && data[key] !== undefined ){
            cleanedData[key] = data[key];
        }
    });
    return cleanedData;
}

export default cleanData;