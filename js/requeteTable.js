function loadClassesAndSubClasses() {
    const queryClasses = `
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX Food_Knowledge: <http://www.semanticweb.org/prunelle/ontologies/2024/2/Food_Knowledge#>
        
        SELECT DISTINCT ?class ?subClass WHERE {
            ?class a owl:Class .
            OPTIONAL { 
                ?subClass rdfs:subClassOf ?class .
            }
        }
    `;

    fetch('http://localhost:3030/Food_knowledge/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'query=' + encodeURIComponent(queryClasses),
    })
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('.table-responsive tbody');
        let lineNumber = 1;

        data.results.bindings.forEach(binding => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><span class="text-muted">${lineNumber++}</span></td>
                <td>${binding.class.value}</td>
                <td>${binding.subClass ? binding.subClass.value : ''}</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

// Appeler la fonction pour charger les classes et sous-classes
window.onload = function() {
    loadClassesAndSubClasses();
};
