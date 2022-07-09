
export async function fetchNews() {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
            'X-RapidAPI-Key': '840a55cf1emsh71b0d92da24c8ffp184c2cjsn81240e17e962'
        }
    };
    try {
        const fetchedNews = await fetch('https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=climate-change&pageNumber=1&pageSize=10&autoCorrect=true&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null', options)
        const processedNews = await fetchedNews.json()
        //console.log(processedNews);
        return processedNews;
    }
    catch (err) {
        console.log("123",err);
    }

}

// export function fetchNews() {
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
//             'X-RapidAPI-Key': '840a55cf1emsh71b0d92da24c8ffp184c2cjsn81240e17e962'
//         }
//     };
    
//     fetch('https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=climate-change&pageNumber=1&pageSize=10&autoCorrect=true&fromPublishedDate=null&toPublishedDate=null', options)
//         .then(response => response.json())
//         .then(response => console.log(response))
//         .catch(err => console.error(err));
// }




