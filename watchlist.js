document.addEventListener('DOMContentLoaded', function() {
    const watchlistContainer = document.getElementById('watchlist-container')
    const movies = getWatchlistMovies()
    if(movies.length === 0) {
        watchlistContainer.innerHTML = `<p>Your watchlist is empty.</p>`
    } else {
        watchlistContainer.innerHTML = movies.map(movie => {
            return `
            <div id="card-container">
                <img src=${movie.Poster} id="movie-img" class="movie-img">
                <div>
                    <div id="title-container">
                        <h3 id="movie-title">${movie.Title}</h3>
                        <div>
                            <img src="images/ratings-logo.png">
                            <p id="movie-rating">${movie.imdbRating}</p>
                        </div>
                    </div>
                    <div id="info-container">
                        <p id="movie-run-length">${movie.Runtime}</p>
                        <p id="movie-genre">${movie.Genre}</p>
                        <div>
                            <button id="add-to-watchlist" class="add-to-watchlist remove-from-watchlist"
                            data-movie-id="${movie.imdbID}">+</button>
                            <label for="add-to-watchlist">Remove</label>
                        </div>
                    </div>
                    <p id="movie-summary" class="movie-summary">${movie.Plot}</p>
                </div>
            </div>
            `
        }).join('')
        addRemoveWatchlistEventListeners()
    }
})

function getWatchlistMovies(){
    const movies = []
    for (let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i)
        const movie = JSON.parse(localStorage.getItem(key))
        movies.push(movie)
    }
    return movies
}

function addRemoveWatchlistEventListeners(){
    const removeButtons = document.querySelectorAll('.remove-from-watchlist')
    removeButtons.forEach(button => {
        button.addEventListener('click', function(){
            const movieID = this.getAttribute(`data-movie-id`)
            localStorage.removeItem(movieID)
            location.reload()
        })
    })
}