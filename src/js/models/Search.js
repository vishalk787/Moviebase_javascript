import axios from 'axios';

const key = '69058331fe295fbe92db92d040420904';
const image = "https://image.tmdb.org/t/p/w342/";

async function getTrending(){

    const trending = await fetch (`https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`);

    let   movieLists = await trending.json();

     let movieList = movieLists.results;

    // movieList = await trending.data.results;
    console.log(movieLists, movieList);

    for(let i=0; i<movieList.length; i++){
        let movieImage, movieScore, movieTitle, HTML, newHTML;
        movieTitle = movieList[i].title;
        movieScore = movieList[i].vote_average;
        movieImage = movieList[i].poster_path;
        HTML = '<div class="column"><div > <img class="image" id="img-%img%" src=""></div> <div class="name-%name%" > %movie name% </div><div class="scr-%scr%"> %score%</div></div>';
        
        newHTML = HTML.replace('%img%' , i);
        newHTML = newHTML.replace('%name%' , i);
        newHTML = newHTML.replace('%scr%' , i);

        document.querySelector('.list').insertAdjacentHTML('beforeend', newHTML);
        document.querySelector(`.scr-${i}`).textContent = `Score - ${movieScore}`;
        document.getElementById(`img-${i}`).src = `${image}${movieImage}` ;
        document.querySelector(`.name-${i}`).textContent =`${movieTitle}`;     
        

    } 

    document.querySelector('.list').addEventListener('click', function(){
    
        let imgID = event.target.id;
        if(imgID){
            let splitID, index, ID, element;
            splitID = imgID.split('-');
            index = splitID[1]
            
            ID = movieList[index].id;

            element = document.getElementById(`${imgID}`);
            element.parentNode.parentNode.parentNode.parentNode.removeChild(document.querySelector('.list'))
            console.log(ID)
            getMovieDetails(ID)
        
        };
    })    
}
getTrending();


async function getMovieDetails(movieID){

    const details = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${key}&append_to_response=credits `)
    
    let  data, movieImage, backgroundImage, movieTitle, summary, date, score, HTML;

    data = await details.json();
    movieTitle = data.title
    movieImage = data.poster_path;
    backgroundImage = data.backdrop_path;
    summary = data.overview;
    date = data.release_date;
    score = data.vote_average;

    HTML = '<div><img id="detailsImg" src="" ><div><h1 id="title"></h1><h3 id="date"></h3></div><div ><h2 id="score"></h2></div><div><p id="overview"></p></div></div>'

    document.querySelector('.top').insertAdjacentHTML('beforeend', HTML)
    document.getElementById('detailsImg').src = `${image}${movieImage}` ;
    document.getElementById('title').textContent = `${movieTitle}`;
   // document.getElementById('date').textContent =  `(${date})`
    document.getElementById('score').textContent = `Score - ${score}`;
    document.getElementById('overview').textContent = `OVERVIEW :         "${summary}"`

};

//  getMovieDetails()


