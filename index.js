let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//fonction pour récupérer des données depuis une API

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
    //si le champ de saisie est vide

    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Merci de saisir le nom d'un film </h3>`;
    }

    //si le champ de saisie n'est pas vide
    else {
        fetch(url).then((resp) => resp.json()).then((data) => {
           //si le film existe dans la base de données
            if (data.Response == "True") {
                result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Intrigue:</h3>
                    <p>${data.Plot}</p>
                    <h3>Distribution:</h3>
                    <p>${data.Actors}</p>
                `;
            }

            //si le film n'existe pas dans la base de données
            else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
            //si une erreur se passe
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Une erreur s'est produite</h3>`;
            });
    }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);