document.getElementById('sparqlForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

    const query = document.getElementById('query').value;

    // Vérifier si la requête est vide
    if (!query.trim()) {
        alert('Please enter a SPARQL query.');
        return;
    }

    // Envoyer la requête SPARQL à l'ontologie
    fetch('http://localhost:3030/Food_knowledge/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'query=' + encodeURIComponent(query),
    })
    .then(response => response.json())
    .then(data => {
        // Afficher les résultats de la requête
        const resultsElement = document.getElementById('results');
        resultsElement.innerHTML = ''; // Effacer les anciens résultats

        if (data.results.bindings.length > 0) {
            const table = document.createElement('table');
            table.classList.add('table');

            // Créer l'en-tête du tableau
            const headerRow = table.createTHead().insertRow();
            for (const variable of data.head.vars) {
                const cell = headerRow.insertCell();
                cell.textContent = variable;
            }

            // Remplir le tableau avec les résultats
            for (const binding of data.results.bindings) {
                const row = table.insertRow();
                for (const variable of data.head.vars) {
                    const cell = row.insertCell();
                    cell.textContent = binding[variable].value;
                }
            }

            resultsElement.appendChild(table);
        } else {
            resultsElement.textContent = 'No results found.';
        }
    })
    .catch(error => {
        console.error('Error executing SPARQL query:', error);
        alert('An error occurred. Please try again.');
    });
});
