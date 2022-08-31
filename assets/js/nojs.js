var cart = {}; //моя корзина

//выпся после загрузки стр
$('document').ready(function(){
    loadGoods();
    checkCart();
    showMiniCart();
});

function loadGoods(){
    //загружаю товары на страницу
    $.getJSON('goods.json', function(data){ //все данные из goods.json -> function(data)
        //console.log(data);
        //перебрать объект в массив
        var out = '';
        //перебор ассоц массивов
        for(var key in data){
            out += '<div class="single-goods">';
            out += '<h3>' + data[key]['name'] + '</h3>';
            out += '<p>Стоимость: ' + data[key]['cost'] + ' ₸</p>';//out -> строка которая куда я складываю и вывожу
            out += '<img src="' + data[key].image+'">'; //key -> переменная артикуля
            out += '<button class="add-to-cart" data-art="'+key+'">Купить</button>';
            out += '</div>';
        }
        $('#goods').html(out); //записать резы в #goods
        $('button.add-to-cart').on('click', addToCart);
    });
}

function addToCart(){
    //добавление товара в корзину    //проверка id и кол товара    //$this - кнопка  
    var articul = $(this).attr('data-art');
    //условие которое при одинаковых товаров, увел кол товара    
    if(cart[articul] != undefined){ //если товар сущ
        cart[articul]++;
    }
    else {
        cart[articul] = 1;   
    }
    localStorage.setItem('cart', JSON.stringify(cart)); //JSON.stringify() преобразует значение JavaScript в строку JSON и запис в локалстор, setItem(google)
    // console.log(cart);
    showMiniCart();
}

function checkCart(){
    //проверка наличие корзины в localStorage
    if(localStorage.getItem('cart') != null){
        cart = JSON.parse(localStorage.getItem('cart'));//parse - строкадан в массив
    }
}

function showMiniCart(){
    //показывает содержимое корзины
    var out = '';
    for(var w in cart){
        out += w + '---' +cart[w] + '<br>';//артик товара + '---' + кол товара
    }
    out += '<br><a href="cart">Корзина</a>';
    $('#mini-cart').html(out);
}