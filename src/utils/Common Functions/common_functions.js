
//function to convert the date (generated from new date class) into string date
export const getFormatedDate = (date) => {
    let formattedDate = '';
    if (date) {
        const generatedDate = new Date(date);
        formattedDate = new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).format(generatedDate);
    }
    return formattedDate;
}

//function to convert numeric num to number with k, m like 10K, 1M
export const getFormatedNo = (number) => {
    if (number > 999) {
        return (number / 1000).toFixed(1) + 'K';
    } else if(number > 999999) {
        return (number / 1000000).toFixed(1) + 'M';
    }else{
        return number
    }
}