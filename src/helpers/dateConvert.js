/** Helper function dateConvert 
 * Takes date string and reformats to display 
 * month abbreviation and year
 * Ex: "2024-09-01" => "Sep 2024"
 */

function dateConvert(dateStr){
    const date = new Date(dateStr);
    const options = {year: 'numeric', month: 'short'};
    const formattedDate = new Intl.DateTimeFormat('en-US', options)
                        .format(date);
    return formattedDate;
}

export default dateConvert;