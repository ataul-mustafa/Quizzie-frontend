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


export const getFormatedNo = (number) => {
    if (number > 999) {
        return (number / 1000).toFixed(1) + 'K';
    } else if(number > 999999) {
        return (number / 1000000).toFixed(1) + 'M';
    }else{
        return number
    }
}