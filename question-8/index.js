const API_KEY = 'YOUR_OMDB_API_KEY'; // Replace with your OMDB API key
let currentPage = 1;
let totalResults = 0;

document.getElementById('search-button').addEventListener('click', () => {
    const title = document.getElementById('movie-title').value;
    if (title) {
        fetchMovies(title, currentPage);
    }
});

async function fetchMovies(title, page) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(title)}&page=${page}&apikey=${API_KEY}`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        if (data.Response === 'False') {
            throw new Error(data.Error);
        }

        totalResults = parseInt(data.totalResults, 10);
        displayResults(data.Search);
        displayPagination(totalResults, page);
    } catch (error) {
        displayError(error.message);
    }
}

function displayResults(movies) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title} (${movie.Year})</h3>
            <p>${movie.Plot || 'No plot available.'}</p>
        `;
        resultsDiv.appendChild(movieCard);
    });
}

function displayPagination(totalResults, currentPage) {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';
    const totalPages = Math.ceil(totalResults / 10);

    if (currentPage > 1) {
        const prevButton = createPageButton(currentPage - 1, 'Previous');
        paginationDiv.appendChild(prevButton);
    }

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = createPageButton(i, i);
        paginationDiv.appendChild(pageButton);
    }

    if (currentPage < totalPages) {
        const nextButton = createPageButton(currentPage + 1, 'Next');
        paginationDiv.appendChild(nextButton);
    }
}

function createPageButton(page, text) {
    const button = document.createElement('button');
    button.className = 'page-button';
    button.innerText = text;
    button.onclick = () => {
        currentPage = page;
        const title = document.getElementById('movie-title').value;
        fetchMovies(title, currentPage);
    };
    return button;
}

function displayError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.innerText = message;
}
