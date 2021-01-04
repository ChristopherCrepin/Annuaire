<?php
    try
    {
        $bdd = new PDO('mysql:host=localhost;port=8889;dbname=annuaire;charset=utf8', 'root', 'root');
    }
    catch (Exception $e)
    {
        die('Erreur : ' . $e->getMessage());
    }

    $req = $bdd->query('SELECT genre, nom, prenom, pays, phone FROM numéro');

    $messages = array();
    //extraction des message
    while($donnée = $req->fetch())
    {
        array_push($messages, array("genre"=>$donnée["genre"],"nom"=>$donnée["nom"],"prenom"=>$donnée["prenom"],"pays"=>$donnée["pays"],"phone"=>$donnée["phone"]));
    }
    $output = json_encode($messages);
    // renvoie des nouveaux messages
    echo $output;
    
?>