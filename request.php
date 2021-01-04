<?php
    try
    {
        $bdd = new PDO('mysql:host=localhost;dbname=Annuaire;charset=utf8', 'root', 'root');
    }
    catch (Exception $e)
    {
        die('Erreur : ' . $e->getMessage());
    }

    $req = $bdd->prepare('INSERT INTO numéro(genre, nom, prenom, pays, phone) VALUES(:genre, :nom, :prenom, :pays, :phone)');
    $req->execute(array(
        'genre' => $_POST["genre"],
        'nom' => htmlspecialchars($_POST["nom"]),
        'prenom' => htmlspecialchars($_POST["prenom"]),
        'pays' => htmlspecialchars($_POST["pays"]),
        'phone' => htmlspecialchars($_POST["phone"])
        ));
    header('Location: index.html');
?>