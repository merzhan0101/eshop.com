<?php
$route = $_GET['route'];

require_once "blocks/header.php";

switch($route){
    case '': 
        require_once 'blocks/main.php';
        break;
    case 'cart':
        require_once 'blocks/cart.php';
        break;
}
require_once "blocks/footer.php";
?>
