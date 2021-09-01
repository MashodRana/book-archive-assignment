
function showNumResults(numResult){
    const div = document.createElement('div');
    div.innerHTML = `
                    <ul>
                        <li>${numResult} results found for search text.</li>
                    </ul>
                    `

    const searchContainer = document.getElementById('search-container');
    searchContainer.appendChild(div);
}

function display(data){
    console.log(data);
    showNumResults(data.numFound);

    books = data.docs.slice(1,10);
    books.forEach(book => {
        // console.log(book);
        const cardList = document.getElementById('card-list');
        
        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
                        <div class="card h-100">
                            <img src="..." class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${book.title}</h5>
                                <p class="card-text">Authors: ${book.author_name.join()}</p>
                                <p class="card-text">Publishers: ${book.publisher.join()}</p>
                                <p class="card-text">First Published: ${book.first_publish_year}</p>
                                

                            </div>
                            <div class="card-footer">
                                <small class="text-muted">Last updated 3 mins ago</small>
                            </div>
                        </div>
                        `

        cardList.appendChild(div);
    });

}


const lodaData = (url)=>{
    fetch(url)
    .then(res => res.json())
    .then(data=>display(data))
}

document.getElementById('search-button').addEventListener('click', ()=>{
    const searchText = document.getElementById('search-box').value;
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    
    let jsonData;
    
    lodaData(url);

    console.log('I ma finished')
})

