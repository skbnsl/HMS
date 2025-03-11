const arrayToCSV = (arr:String[]) => {
    if(!arr || arr.length==0) return null ;
    return arr.join(", ");
}

export {arrayToCSV};