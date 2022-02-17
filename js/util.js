function getHtml({poster_path, title, release_date, vote_average}){
    return `<div class="movie">
                <img src='https://image.tmdb.org/t/p/w500${poster_path}' alt="Fast &amp; Furious Presents: Hobbs &amp; Shaw">

                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="orange">${vote_average}</span>
                </div>
                <span class="date">${release_date}</span>
            </div>`
}