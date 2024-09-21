document.getElementById('get-category-data').addEventListener('click', getCategoriesData);
document.getElementById('get-ingredient-data').addEventListener('click', getIngredientData);

async function getCategoriesData() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log(data);
        displayResults(data);
    } catch (error) {
        console.error('Something went wrong:', error);
        displayError();
    }
}

async function getIngredientData() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log(data);
        displayResults(data);
    } catch (error) {
        console.error('Something went wrong:', error);
        displayError();
    }
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = JSON.stringify(data, null, 2);
}

function displayError() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.textContent = 'Something went wrong.';
}
