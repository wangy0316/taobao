/**
 * Created by lenovo on 2017/10/18.
 */
window.onload = function(){
    function foo(){
//        将共同的变量提取
        var shopC = document.querySelectorAll(".shopCheck") ;       //店铺
        var allCheck = document.getElementsByName("selectAll")
        var check = document.querySelectorAll(".check");            //商品选定的class
        var price = document.getElementsByClassName("price");       //显示价格
        var goods = document.getElementsByClassName("goods") ;      //页面商品样数
        var discount = document.getElementsByClassName("discount");  //商品的计算价格
        var selportnme = document.getElementById("number"); //选中商品总件数
//        alert(discount.length);
        var allmoney = document.getElementById("money");            //结算总价
//        添加一个删除商品的事件 delGoods
        var position = document.querySelectorAll(".position");
        var partGoods = document.querySelectorAll(".partGoods");
        var body = document.getElementById("body");
        var allSel = document.getElementById("as");   //全选的id
// 输入数量的时候，判断值
        function changeNum(){
            for(let i = 0 ; i<goods.length ; i++){
                var score = document.querySelectorAll(".score");
                score[i].addEventListener("input",function(){
                    var num = parseInt(score[i].value);
                    //这里的值还要传给总金额
                    var val = check[i].checked ;
                    if(val){       //当商品为选中状态时，显示总金额
                        getCountMoney(i);
                    }
                    var a = typeof num ;
                    if( num >= 1 && a === "number" ){
                        var num = parseInt(score[i].value);
                        var Discount = parseFloat(discount[i].innerText);
                        var allP = parseFloat(num * Discount);
                        price[i].innerText = changeFloat(allP) ;
                    }else{
                        alert("请输入数字且大于1") ;
                    }
                })
            }
        }
        changeNum();
//删除商品
        function delGoods(){
        //    给删除按钮添加事件，通过position p来定位
            for(let i = 0 ; i <3 ; i++){
                var selGoods = position[i].getElementsByTagName("p");
                selGoods[0].addEventListener("click",function(){    //每个position中只有一个p
                    //alert(selGoods.length)
                    //partGoods[i].innerHTML = "" ;     //这种删除会留下div，内容删除了。
                    var ok = confirm("确认要删除该宝贝吗？");
                    if(ok){
                        body.removeChild(partGoods[i]);
                    }
                })
            }
        }
        delGoods();
//值转换为带小数点后两位函数
        function changeFloat(v){
            var f = parseFloat( v * 100)/100;
            var s = f.toString();
            var rs = s.indexOf('.');   //找 . 第一次出现的位置，没有就返回-1
            if (rs < 0) {
                rs = s.length;
                s += '.';
            }
            while (s.length <= rs + 2) {
                s += '0';
            }
            var ss = parseFloat(s);
            return ss.toFixed(2) ;
        }
//数量加
        function add(){
            for(let i = 0 ; i<goods.length ; i++){     //这里的2要改
                document.querySelectorAll(".add")[i].addEventListener("click",function(){
//            alert(i+1);  //如果这里要输出不同的i的值，要用闭包，或者let声明i
//            关于取文本值，这里其实可以不用querySelector，可以通过取节点，获得值
                    var score = goods[i].querySelector(".score");
                    var num = parseInt(score.value);    //单样商品个数
                    num+=1 ;
                    score.value = num ;
                    var Discount = parseFloat(discount[i].innerHTML);
                    var allP = (num * Discount) ;      //单样商品的总价格
                    price[i].innerText =  changeFloat(allP) ;
                    var allm = parseFloat(allmoney.innerHTML) ;
//增加一个功能，点击数量加（减）的时候，判断check是否为true，如果是则每点击一次给总金额增加单件商品的金额。使用if判断
                    if(check[i].checked){
                        allm+=Discount      //将此价格传给总价格
                        allmoney.innerHTML =  changeFloat(allm);
                        //allmoney.innerHTML = allm+".00" ;
                        allNum()         // 数量传给总数
                    }
                })
            }
        }
        add();
//数量减
        function minus(){
            for(let i = 0 ; i<goods.length ; i++){
                document.querySelectorAll(".minus")[i].addEventListener("click",function(){
                    var score = goods[i].querySelector(".score");
                    var num = parseInt(score.value);
                    var allm = parseFloat(allmoney.innerHTML) ;
                    if(num != 1){
                        num-=1 ;
                        score.value = num ;
                        var Discount = parseFloat(discount[i].innerText);
                        var allP = parseFloat(num * Discount);
                        price[i].innerText = changeFloat(allP) ;
                        if(check[i].checked){
                            allm -= Discount      //将此价格传给总价格
                            allmoney.innerHTML = changeFloat(allm) ;
                            allNum()         // 数量传给总数
                        }
                    }
                })
            }
        }
        minus();

//判断是否都选中了
        function checkAll(element,element2,element3){
            var count = 0 ;   //用来判断选中的个数
            for(var i = 0 ; i < element.length ;i++){
                if(element2[i].checked){
                    count+=1 ;
                }
                if( count == element.length){
                    element3.checked = true ;
                }else{
                    element3.checked = false ;
                }
            }
        }
//店铺勾选
        function shopsel(){
            for(let i = 0 ; i< shopC.length ; i++){     //只有三个
                shopC[i].addEventListener("click",function(){  //店铺添加事件
                    allSelect(i);
                    checkAll(shopC,shopC,allSel);
                })
            }
        }
        shopsel();
        function allSelect(i){
        var checkNum = document.querySelectorAll(".partGoods") ;//每个商品都是一个块
        var number = checkNum[i].querySelectorAll(".check") ;  //取块中的check
        var value = shopC[i].checked ;              //每个块中店铺的check值
        var discount = checkNum[i].getElementsByClassName("discount") ; //单价
        var price = checkNum[i].getElementsByClassName("price") ; //结算价格
        var score = checkNum[i].querySelectorAll(".score") ; //数量
        var AllNum = 0 ;
        //要判断当前check是否为true
        for(let i = 0 ; i < number.length ; i++){  //给块中的check都设置为true
            var Price= parseFloat(price[i].innerText) ; //当前商品总价格
            var allm = parseFloat(allmoney.innerHTML) ; //结算总价格
            var num = parseInt(score[i].value);         //商品个数
            var AllNum = parseInt(selportnme.innerHTML) ;   //总个数
            if(value){
                if(number[i].checked != true){
                    number[i].checked = value ;    //全选
                    allm+=Price ;
                    allmoney.innerHTML = changeFloat(allm) ;
                    AllNum+=num ;
                    selportnme.innerHTML = AllNum ;
                }
            }else{
                //alert(value) ;
                number[i].checked = value;    //全不选
                allm -= Price;
                allmoney.innerHTML = changeFloat(allm);
                AllNum -= num;
                selportnme.innerHTML = AllNum;
            }
    }
}

//商品单选
        function sel(){
            //商品勾选时，如果当前块的所有商品都勾选了，店铺也要勾选
            for(let i = 0 ; i<goods.length ; i++){
                check[i].addEventListener("click",function(e){
                    checkAll(check,check,allSel);
                    var num = 0 ;
            //var checkNum = document.querySelectorAll(".partGoods") ;  //只有三个
            //checkd父元素是div.goods,他的父元素是partGoods，然后就可以找checkShop。
                    var thisNum = e.target.parentElement.parentElement;  //partGoods
                    var number = thisNum.querySelectorAll(".check");
                    var shopNumber = thisNum.querySelector(".shopCheck");
                    var checkNum = number.length ;
                    //alert(number.length);   //当前part中有多少个check
                    //通过num数来确定当前店铺下有多少个check被选中
                    for(let i = 0 ; i < checkNum ; i++){
                        if(number[i].checked == true){
                            num++ ;
                        }
                    }
                   if(check[i].checked == true) {
                       getCountMoney(i, check[i].checked);
                       if( num == checkNum){
                           shopNumber.checked = true;  //将店铺的checkbox勾选
                       }
                   }else {
                       shopNumber.checked = false;
                       getCountMoney(i);
                   }
                })
            }
    }
        sel();
        function selprice(val){
            for(let i = 0 ; i < shopC.length ; i++) {
                if(val){
                    shopC[i].checked = val;    //勾选店铺的checkbox,店铺数少于商品数
                    allSelect(i);
                }else{
                    shopC[i].checked = val;    //不勾选店铺的checkbox
                    allSelect(i);
                }
            }
        }
//总价格计算
        function getCountMoney(i,val){
            //取数量
            var score = goods[i].querySelector(".score"); //score有四个
            var num = parseInt(score.value);
            //应该还取一个总价格。
            var Discount = parseFloat(discount[i].innerText);
            var allP = ( num * Discount);               //单样商品的总价格
            var allm = parseFloat(allmoney.innerHTML) ;   //结算总价格
            if(val == true) {
                allm += allP;
            }else{
                allm-=allP;
            }
            allmoney.innerHTML = changeFloat(allm) ;
            allNum(num);
        }
//全选,所有的商品都选上了才叫全选
        function allsel(){
            allSel.addEventListener("click",function(){
                var val = allSel.checked ;
                selprice(val);              //通过val是true还是false做行动
            })
        }
        allsel();
//总个数
        function allNum(val){      //还要判断是全选还是单选
            var AllNum = num = 0 ;
            if(val != false){
                for(var i = 0 ; i< goods.length ; i++){
                    if(check[i].checked){     //单选的情况
                        var score = goods[i].querySelector(".score");
                        var num = parseInt(score.value);
                        AllNum+=num ;
                    }
                }
            }
            selportnme.innerHTML = AllNum ;
        }
    }
    foo();
}


