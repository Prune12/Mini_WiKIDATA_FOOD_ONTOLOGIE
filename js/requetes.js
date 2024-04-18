
// Fonction pour charger les noms des personnes depuis l'ontologie
function loadPersons() {
    const queryPerson = `
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX Food_Knowledge: <http://www.semanticweb.org/prunelle/ontologies/2024/2/Food_Knowledge#>

        SELECT ?NamePers WHERE {
            ?person rdf:type Food_Knowledge:Person .
            ?person Food_Knowledge:NamePers ?NamePers .
        }
        ORDER BY ASC(?NamePers)
    `;

    fetch('http://localhost:3030/Food_knowledge/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'query=' + encodeURIComponent(queryPerson),
    })
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById('personSelect');
        data.results.bindings.forEach(binding => {
            const option = document.createElement('option');
            option.value = binding.NamePers.value;
            option.textContent = binding.NamePers.value;
            select.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

// Fonction pour charger les noms des aliments depuis l'ontologie
function loadFoods() {
    const queryFood = `
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX Food_Knowledge: <http://www.semanticweb.org/prunelle/ontologies/2024/2/Food_Knowledge#>

        SELECT ?NameFood WHERE {
            ?food rdf:type Food_Knowledge:Food .
            ?food Food_Knowledge:NameFood ?NameFood .
        }
        ORDER BY ASC(?NameFood)
    `;

    fetch('http://localhost:3030/Food_knowledge/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'query=' + encodeURIComponent(queryFood),
    })
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById('foodSelect');
        data.results.bindings.forEach(binding => {
            const option = document.createElement('option');
            option.value = binding.NameFood.value;
            option.textContent = binding.NameFood.value;
            select.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

// Fonction pour charger les repas avec leurs propriétés
function loadFoodsWithProperties() {
    const query2 = `
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX Food_Knowledge: <http://www.semanticweb.org/prunelle/ontologies/2024/2/Food_Knowledge#>

        SELECT ?repas ?NameFood ?imageFood ?DescriptionFood WHERE {
            ?repas rdf:type Food_Knowledge:Food .
            ?repas Food_Knowledge:NameFood ?NameFood .
            ?repas Food_Knowledge:imageFood ?imageFood .
            ?repas Food_Knowledge:DescriptionFood ?DescriptionFood .
        }
    `;

    fetch('http://localhost:3030/Food_knowledge/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'query=' + encodeURIComponent(query2),
    })
    .then(response => response.json())
    .then(data => {
        const gallerySection = document.querySelector('.gallery_section_2 .row1');
        data.results.bindings.forEach(binding => {
            const colDiv = document.createElement('div');
            colDiv.classList.add('col-md-4');

            const galleryBox = document.createElement('div');
            galleryBox.classList.add('gallery_box');

            const galleryImg = document.createElement('div');
            galleryImg.classList.add('gallery_img');
            const img = document.createElement('img');
            img.src = binding.imageFood.value;
            galleryImg.appendChild(img);

            const h3 = document.createElement('h3');
            h3.classList.add('types_text');
            h3.textContent = binding.NameFood.value;

            const p = document.createElement('p');
            p.classList.add('looking_text');
            p.textContent = binding.DescriptionFood.value;

            const readBt = document.createElement('div');
            readBt.classList.add('read_bt');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = 'Details';
            readBt.appendChild(a);

            galleryBox.appendChild(galleryImg);
            galleryBox.appendChild(h3);
            galleryBox.appendChild(p);
            galleryBox.appendChild(readBt);

            colDiv.appendChild(galleryBox);
            gallerySection.appendChild(colDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

// Appeler les fonctions pour charger les données initiales
window.onload = function() {
    loadPersons();
    loadFoods();
    loadFoodsWithProperties();
};

document.getElementById('searchPerson').addEventListener('click', function() {
    const selectedPerson = document.getElementById('personSelect').value;

    // Requête SPARQL pour récupérer les repas consommés par la personne sélectionnée
    const queryPersonFood = `
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX Food_Knowledge: <http://www.semanticweb.org/prunelle/ontologies/2024/2/Food_Knowledge#>

        SELECT ?repas ?NameFood ?imageFood ?DescriptionFood WHERE {
            ?repas rdf:type Food_Knowledge:Food .
            ?repas Food_Knowledge:NameFood ?NameFood .
            ?repas Food_Knowledge:imageFood ?imageFood .
            ?repas Food_Knowledge:DescriptionFood ?DescriptionFood .
            ?person rdf:type Food_Knowledge:Person .
            ?person Food_Knowledge:NamePers "${selectedPerson}" .
            ?person Food_Knowledge:eat ?repas .
        }

    `;

    fetch('http://localhost:3030/Food_knowledge/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'query=' + encodeURIComponent(queryPersonFood),
    })
    .then(response => response.json())
    .then(data => {
        const gallerySection = document.querySelector('.gallery_section_2 .row1');
        gallerySection.innerHTML = ''; // Efface les éléments précédemment affichés

        data.results.bindings.forEach(binding => {
            const colDiv = document.createElement('div');
            colDiv.classList.add('col-md-4');

            const galleryBox = document.createElement('div');
            galleryBox.classList.add('gallery_box');

            const galleryImg = document.createElement('div');
            galleryImg.classList.add('gallery_img');
            const img = document.createElement('img');
            img.src = binding.imageFood.value;
            galleryImg.appendChild(img);

            const h3 = document.createElement('h3');
            h3.classList.add('types_text');
            h3.textContent = binding.NameFood.value;

            const p = document.createElement('p');
            p.classList.add('looking_text');
            p.textContent = binding.DescriptionFood.value;

            const readBt = document.createElement('div');
            readBt.classList.add('read_bt');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = 'Details';
            readBt.appendChild(a);

            galleryBox.appendChild(galleryImg);
            galleryBox.appendChild(h3);
            galleryBox.appendChild(p);
            galleryBox.appendChild(readBt);

            colDiv.appendChild(galleryBox);
            gallerySection.appendChild(colDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});

//rechercher un repas 
document.getElementById('searchFood').addEventListener('click', function() {
    const selectedFood = document.getElementById('foodSelect').value;

    // Requête SPARQL pour récupérer les repas consommés par la personne sélectionnée
    const querydisplayFood = `
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX Food_Knowledge: <http://www.semanticweb.org/prunelle/ontologies/2024/2/Food_Knowledge#>

        SELECT ?repas ?NameFood ?imageFood ?DescriptionFood WHERE {
            ?repas rdf:type Food_Knowledge:Food .
            ?repas Food_Knowledge:NameFood "${selectedFood}".
            ?repas Food_Knowledge:imageFood ?imageFood .
            ?repas Food_Knowledge:DescriptionFood ?DescriptionFood .
            ?repas Food_Knowledge:NameFood ?NameFood .
        }

    `;

    fetch('http://localhost:3030/Food_knowledge/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'query=' + encodeURIComponent(querydisplayFood),
    })
    .then(response => response.json())
    .then(data => {
        const gallerySection = document.querySelector('.gallery_section_2 .row1');
        gallerySection.innerHTML = ''; // Efface les éléments précédemment affichés

        data.results.bindings.forEach(binding => {
            const colDiv = document.createElement('div');
            colDiv.classList.add('col-md-4');

            const galleryBox = document.createElement('div');
            galleryBox.classList.add('gallery_box');

            const galleryImg = document.createElement('div');
            galleryImg.classList.add('gallery_img');
            const img = document.createElement('img');
            img.src = binding.imageFood.value;
            galleryImg.appendChild(img);

            const h3 = document.createElement('h3');
            h3.classList.add('types_text');
            h3.textContent = binding.NameFood.value;

            const p = document.createElement('p');
            p.classList.add('looking_text');
            p.textContent = binding.DescriptionFood.value;

            const readBt = document.createElement('div');
            readBt.classList.add('read_bt');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = 'Details';
            readBt.appendChild(a);

            galleryBox.appendChild(galleryImg);
            galleryBox.appendChild(h3);
            galleryBox.appendChild(p);
            galleryBox.appendChild(readBt);

            colDiv.appendChild(galleryBox);
            gallerySection.appendChild(colDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});

