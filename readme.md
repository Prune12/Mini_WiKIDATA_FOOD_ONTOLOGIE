Ce repository contient une application web de gestion de Repas fait en html,css,javascript qui permet de consommer les données d'une ontologie à l'aide de requete sparql et donne aussi la possibilité à l'utilisateur de créer ses propres requêtes sparql

## PREREQUIS

- avoir un système d'exploitation ubuntu ou linux
- avoir Apache jena fuseki au moins la version (4.9.0 mais toutes autres versions marchera aussi) installé dans son Système d'exploitation (ubuntu ou linux)
- avoir Java installé dans son système

## STRUCTURE
Ce projet a été fait en html, css et Javascript(pour gérer la consommation des données de l'ontologie) et sa structure est la suivante:
 - un dossier "css": qui contient les styles pour mettre en forme les pages web de l'application
 - un dossier "js": qui contient les requetes pour recupérer les informations de l'ontologie, ses fichiers sont:
    - InsertFood.js: ce fichier a été fait pour l'execution de la requête sparql pour inserer de nouveaux repas dans l'ontologie et il est utilisé dans la page nommée "formulaire.html"
    - requetes.js: ce fichier a été fait pour l'execution de la requête sparql pour afficher les repas contenus dans l'ontologie et il est utilisé dans la page nommée "index.html"
    - requeteTable.js: ce fichier a été fait pour l'execution de la requête sparql pour afficher toutes les classes, les sous classes et les instances de l'ontologie et il est utilisé dans la page nommée "displayClassAndSubclass.html"
    - sendSparqlRequest.js: ce fichier a été fait pour  la génération d'une page permettant à l'utilisateur d'écrire lui même ses propres requêtes sparql et de visualiser les resultats de sa requete ,il est utilisé dans la page nommée "sendSparQuery.html"

 - A la racine du projet : nous avons les fichiers suivants: 

   - index.html: c'est la premiere page qui s'affichera lorsque le projet sera lancé, elle affichera les nom, image et description des repas de l'ontologie avec la possibilité à travers les listes déroulantes si on le souhaite de faire une recherche des repas consommés par une personne, ou des repas presents dans l'ontologie
   - formulaire.html: cette page affiche un formulare qui permet d'enregistrer un nouveau repas
   - displayClassAndSubclass.html: cette page affiche les classes, sous classes et instances de l'ontologie sous forme de tableau
   - sendSparqlQuery.html: cette page contient une zone de saisie permettant d'entrer manuellement des requete sparql pour retourner des informations provenant de l'ontologie et une fois la requete saisie,  les informations sont retournés sous forme de tableau juste en dessous de la zone de saisie
   - Food_Knowledge.rdf: c'est le fichier rdf qui contient toutes l'ontologie en question, il peut être importé dans Apache jena fuseki pour la manipulation de l'ontologie

## COMMENT LANCER LE PROJET ?
pour lancer le projet:
- il faut lancer le server Apache Jena Fuseki: apache jena fuseki est lancé differemment en fonction de la version que vous avez, Si vous utilisez la version 4.9.0, alors, pour lancer vous devez:
    - allez à la racine de votre dossier d'installation de votre server Apache Jena Fuseki , il doit contenir un fichier nommé "fuseki-server", 
    - alors ouvrer ce dossier d'installation dans votre terminal et 
    - tapez "./fuseki-server" et votrez server sera lancé

- Allez a la racine du projet et recuperer le fichier "Food_Knowledge.rdf"Food_knowledge
- Aller dans votre navigateur et saisissez "localhost:8080" 
- ensuite creer un nouveau dataset, ce dataset doit avoir pour nom "Food_knowledge" car c'est ainsi que mon ontologie est nommé dans le fichier rdf
- puis importer le fichier "Food_Knowledge.rdf" dans le dataset nommé "Food_knowledge" qui vous aurez creer
- et puis vous pouvez ouvrir vos fichier dans le navigateur

lorsque le projet est lancé la premiere page qui s'affiche provient du fichier index.html, dans cette page vous verrez dans la barre de navigation  differents menu qui sont:
   - "HOME": lorsque vous cliquer sur ce menu , cela ouvre la page d'accueil par defaut de l'application, cette page affiche les differents repas(nom,image et description) present dans l'ontologie
   - "Register New Food": lorsque vous cliquez sur ce menu cela ouvre une page contenant un formulaire vous donnant la possibilité d'entrer le nom, la description et l'image du repas que vous souhaitez ajouter, et pour verifier si votre repas a bien été ajouté vous pouvez revenir sur la page "HOME" et regarder si votre repas s'affiche
   - "Display class and Subclass": lorsque vous cliquez sur ce menu vous pouvez voir sous forme de tableau les classes, sous classes et instances presentent dans l'ontologie  
   - "write Sparql Query": lorsque vous cliquez sur ce menu vous pouvez voir une zone de saisie vous permettant de saisir manuellement vos requetes Sparql pour interroger les données de l'ontologie et lorsque vous cliquez sur le bouton "submit" après avoir écrit votre requête , vous verrez les resultats de votre requête s'afficher sous forme de tableau juste en dessous du bouton submit
