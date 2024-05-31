const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')
const moviesContainer = document.getElementById('movies-container')

searchBtn.addEventListener('click', function(){
    fetch(`http://www.omdbapi.com/?apikey=c5b0dc84&s=${searchInput.value}`)
        .then(res => res.json())
        .then(data => {
            moviesContainer.innerHTML = ''
            moviesContainer.style.paddingTop = '2em'

            if (data.Response === 'True') {
                const moviesHTMLPromises = data.Search.map((movie) => {
                    return fetch(`https://www.omdbapi.com/?apikey=c5b0dc84&i=${movie.imdbID}`)
                    .then(res => res.json())
                    .then(data => {
                        return `
                            <div id="card-container">
                                <img src=${data.Poster} id="movie-img">
                                <div>
                                    <div id="title-container">
                                        <h3 id="movie-title">${data.Title}</h3>
                                        <div>
                                            <img src="images/ratings-logo.png">
                                            <p id="movie-rating">${data.imdbRating}</p>
                                        </div>
                                    </div>
                                    <div id="info-container">
                                        <p id="movie-run-length">${data.Runtime}</p>
                                        <p id="movie-genre">${data.Genre}</p>
                                        <div>
                                            <button id="add-to-watchlist" class="add-to-watchlist"
                                            data-movie-id="${data.imdbID}">+</button>
                                            <label for="add-to-watchlist">Watchlist</label>
                                        </div>
                                    </div>
                                    <p id="movie-summary" class="movie-summary">${data.Plot}</p>
                                </div>
                            </div>`
                    })
                })

                Promise.all(moviesHTMLPromises).then(moviesHTML => {
                    moviesContainer.innerHTML = moviesHTML.join('')
                    addWatchlistEventListeners()
                })

            } else {
                moviesContainer.innerHTML = `<p>No results found</p>`
            }
        })
})

function addWatchlistEventListeners(){
    const watchlistButtons = document.querySelectorAll('.add-to-watchlist')
    watchlistButtons.forEach(button => {
        button.addEventListener('click', function(){
            const movieID = this.getAttribute('data-movie-id')
            fetch(`https://www.omdbapi.com/?apikey=c5b0dc84&i=${movieID}`)
                .then(res => res.json())
                .then(data => {
                    addToWatchlist(data)
                })
        })
    })
}

function addToWatchlist(movie){
    localStorage.setItem(movie.imdbID, JSON.stringify(movie))
}







