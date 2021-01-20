const quoteContainer= document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const authorText= document.getElementById('author');
const twitterButton= document.getElementById('twitter');
const newQuoteButton= document.getElementById('new-quote');
const loader= document.getElementById('loader');

//show loading
function loading(){
    loader.hidden= false;
    quoteContainer.hidden= true;
}

//show container, hide loading
function complete() {
    if(!loader.hidden){
        quoteContainer.hidden= false;
        loader.hidden= true;
    }
}

//getQuote
async function getQuote() {
    loading();
    const apiURL= 'https://bts-quotes-api.herokuapp.com/quote/random';
    //const proxyURL= "https://safe-chamber-79455.herokuapp.com/";
    try{
        const response= await fetch(apiURL);
        const data= await response.json();

        if(data.member === '') {
            authorText.innerText= 'BTS';
        }
        else{
            authorText.innerText= data.member;
        }

        if(data.quote.length > 120){
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText= data.quote;
        complete();
    }
    catch(error){
        getQuote();
        console.log("Oh no! ", error);
    }
}

//Tweet functionality
function tweetQuote(){
    const quote= quoteText.innerText;
    const author= authorText.innerText;
    const twitterURL= `https://twitter.com/intent/tweet?text= ${quote} - ${author}`;
    window.open(twitterURL, '_blank');
}

//Event Listeners
newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);

//onLoad
getQuote();
