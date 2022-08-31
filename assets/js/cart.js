var cart = {}; //корзина

//получение корзина из локал сторедж

$.getJSON('goods.json', function(data){ //команда на загрузку файла // data <- данные с json
    var goods = data;//все товары в массиве
    // console.log(goods); 
    checkCart();
    //console.log(cart); //получение товаров с главного и выводит в корзину
    showCart(); //вывод товаров на стр

    //вывод весь описание товара
    function showCart(){
        if($.isEmptyObject(cart)){
            //корзина пуста
            var out = 'Корзина пуста. Добавьте товар в корзину  <a href="/">Главная страница</a>';
            $('#my-cart').html(out);
        }
        else{
            var out = ''; 
            for (var key in cart){//key <- индексы ключи массива cart
                var out = '';
                for(var key in cart){
                    out += '<button class="delete" data-art="'+ key +'">x</button>';
                    out += '<img src="'+ goods[key].image +'" width="48">';
                    out += goods[key].name;
                    out += '<button class="minus" data-art="'+ key +'">-</button>';//уменьшение кол  
                    out += cart[key];//кол товара
                    out += '<button class="plus" data-art="'+ key +'">+</button>';// + 
                    out += cart[key]*goods[key].cost;//кол * цену товара
                    out += '<br>';
                // out += key + ' --- ' + cart[key] + '<br>'; -> вывод key, art на стр
                }
                $('#my-cart').html(out);
                $('.plus').on('click', plusGoods);
                $('.minus').on('click', minusGoods);
                $('.delete').on('click', deleteGoods);
            }
        }
    }

    function plusGoods(){
        var articul = $(this).attr('data-art');//кнопка.арт(data-art)
        cart[articul]++;//увел товара
        savecartToLS();
        showCart();//заново перерисовка
    }

    function minusGoods(){
        var articul = $(this).attr('data-art');//кнопка.арт(data-art)
        if(cart[articul] > 1) {
            cart[articul]--;
        }//умень товара
        else {
            delete cart[articul];
        } 
        savecartToLS();
        showCart();//заново перерисовка
    }

    function deleteGoods(){
        var articul = $(this).attr('data-art');
        delete cart[articul];
        savecartToLS();
        showCart();
    }
});

    function checkCart(){
        //проверка наличие корзины в localStorage
        if(localStorage.getItem('cart') != null){
            cart = JSON.parse(localStorage.getItem('cart'));//parse - строкадан в массив
        }
    }

    function savecartToLS(){ //сохр корз в локалстор
        localStorage.setItem('cart', JSON.stringify(cart));
    }