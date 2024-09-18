/** Helper function to select random element in array
 *  Used in functionality that navigates user to random tag
 */
function pickRandom(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

export default pickRandom;