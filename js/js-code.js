
const showNumResults = (numResult) => {
    // This arrow function will show the seach result informations.

    const div = document.createElement('div'); // Create html div element here.

    if(numResult==="No"){
        div.innerHTML = `
                    <ul class="my-3">
                        <li class="red">${numResult} results found for search text.</li>
                    </ul>
                    `
    }
    else{
        div.innerHTML = `
                    <ul class="my-3">
                        <li>${numResult} results found for search text.</li>
                    </ul>
                    `
    }

    const searchContainer = document.getElementById('search-msg'); // Find html element.
    searchContainer.appendChild(div); // Added new html elelmnt in the div.
}


const display = (data)=> {
    // This arrow function will show all the books passed in the data parameters with the html .

    // Show the number search results found by searching.
    if (data.numFound === 0) {
        showNumResults("No");
        return;
    }
    else {
        showNumResults(data.numFound);
    }

    // Copying search results
    if (data.numFound >10) {
        books = data.docs.slice(1, 10);
    }
    else {
        books = [...data.docs];
    }

    // Display books information with html 
    books.forEach(book => {
        
        const cardList = document.getElementById('card-list'); // Find html element

        const div = document.createElement('div'); // Create an html div element.
        div.classList.add('col'); // Add class to the html div elemnt.

        // Book cover URL
        const cover_url = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        
        // Adding content to an html element.
        div.innerHTML = `
                        <div class="card h-100">
                            <img class="img-fluid" src=${cover_url? cover_url:'sorry!! not found.'} class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${book.title ? book.title : 'sorry!! not found.'}</h5>
                                <p class="card-text">Authors: ${book.author_name ? book.author_name.join() : 'sorry!! not found.'}</p>
                                <p class="card-text">Publishers: ${book.publisher ? book.publisher.join() : 'sorry!! not found.'}</p>
                                <p class="card-text">First Published: ${book.first_publish_year ? book.first_publish_year : 'sorry!! not found.'}</p>


                            </div>
                            <div class="card-footer border-0">
                            </div>
                        </div>
                        `

        cardList.appendChild(div);
    });

}


const lodaData = (url) => {
    // This arrow function will fetch ddata from the provided URL.
    console.log("I am fething result from ", url);
    fetch(url)
    .then(res => res.json())
    .then(data => display(data))
    .catch(error=>alert(error))
    
}


document.getElementById('search-button').addEventListener('click', () => {
    // Get the search text.
    const searchText = document.getElementById('search-box').value;

    // Create the url with the search text.
    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    // Fetch the data from the API and show the results.
    lodaData(url);
})
