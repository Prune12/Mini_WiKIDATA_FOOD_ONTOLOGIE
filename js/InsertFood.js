document.getElementById('foodForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

    const name = document.getElementById('name').value;
    const description = document.getElementById('matricule').value;
    const imageFile = document.getElementById('formFile').files[0];

    if (!name || !description || !imageFile) {
        alert('Please fill in all fields.');
        return;
    }

    // Convertir l'image en base64 pour l'inclure dans la requête
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = function() {
        const base64Image = reader.result.split(',')[1];

        const queryInsertFood = `
            PREFIX owl: <http://www.w3.org/2002/07/owl#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX Food_Knowledge: <http://www.semanticweb.org/prunelle/ontologies/2024/2/Food_Knowledge#>

            INSERT DATA {
                Food_Knowledge:${name.replace(/\s+/g, '_')} rdf:type Food_Knowledge:Food ;
                    Food_Knowledge:NameFood "${name}" ;
                    Food_Knowledge:DescriptionFood "${description}" ;
                    Food_Knowledge:imageFood "${base64Image}" .
            }
        `;

        fetch('http://localhost:3030/Food_knowledge/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'update=' + encodeURIComponent(queryInsertFood),
        })
        .then(response => {
            if (response.ok) {
                alert('Food added successfully!');
                document.getElementById('foodForm').reset(); // Réinitialiser le formulaire après l'ajout
            } else {
                alert('Failed to add food.');
            }
        })
        .catch(error => {
            console.error('Error adding food:', error);
            alert('An error occurred. Please try again.');
        });
    };
});
