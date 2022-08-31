<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<?php 
switch($route){
    case '':
        echo '<script src="/assets/js/nojs.js"></script>';
        break;
    case 'cart':
        echo '<script src="/assets/js/cart.js"></script>';
        break;
}
?>
</body>
</html>