/**
 * Created by lenovo on 2017/10/18.
 */
window.onload = function(){
    function foo(){
//        将共同的变量提取
        var check = document.querySelectorAll(".check");            //商品选定的class
        var price = document.getElementsByClassName("price");       //显示价格
        var part = document.getElementsByClassName("number") ;      //页面商品样数
        var discount = document.getElementsByClassName("discount");  //商品的计算价格
//        alert(discount.length);
        var allmoney = document.getElementById("money");            //结算总价
        function add(){
            for(let i = 0 ; i<part.length ; i++){     //这里的2要改
                document.querySelectorAll(".add")[i].addEventListener("click",function(){
//            alert(i+1);  //如果这里要输出不同的i的值，要用闭包，或者let声明i
//            关于取文本值，这里其实可以不用querySelector，可以通过取节点，获得值
                    var score = part[i].querySelector(".score");
                    var num = parseInt(score.innerText);    //单样商品个数
                    num+=1 ;
                    score.innerHTML = num ;
                    var Discount = parseInt(discount[i].innerHTML);
                    var allP = (num * Discount).toFixed(2) ;      //单样商品的总价格
                    price[i].innerText = allP ;
                    var allm = parseInt(allmoney.innerHTML) ;
//增加一个功能，点击数量加（减）的时候，判断check是否为true，如果是则每点击一次给总金额增加单件商品的金额。使用if判断
                    if(check[i].checked){
                        allm+=Discount      //将此价格传给总价格
                        allmoney.innerHTML = allm+".00" ;
                    }
                })
            }
        }
        add();
        function minus(){
            for(let i = 0 ; i<part.length ; i++){
                document.querySelectorAll(".minus")[i].addEventListener("click",function(){
                    var score = part[i].querySelector(".score");
                    var num = parseInt(score.innerText);
                    var allm = parseInt(allmoney.innerHTML) ;
                    if(num != 1){
                        num-=1 ;
                        score.innerHTML = num ;
                        var Discount = parseInt(discount[i].innerText);
                        var allP = (num * Discount).toFixed(2) ;
                        price[i].innerText = allP ;
                        if(check[i].checked){
                            allm -= Discount      //将此价格传给总价格
                            allmoney.innerHTML = allm+".00" ;
                        }
                    }
                })
            }
        }
        minus();
        //商品选中时
        function sel(){
            for(let i = 0 ; i<part.length ; i++){
                check[i].addEventListener("click",function(){
                    var shopC = document.querySelectorAll(".shopCheck") ;
                    if(check[i].checked){
                        shopC[i].checked = true ;  //将店铺的checkbox勾选
                        var b = 1 ;                //b作为参考值，判断checkb是否选择
                        getCountMoney(i,b);
                    }else{
                        shopC[i].checked = false ;
                        getCountMoney(i);
                    }
//然后就是商品的价格。如果直接将单价的价格传给总价格不合适，这样做的话，当价格传给总价格以后，数量增加时，总价格并不会增加。
//我之前的策略是，当数量增加的时候判断checked是否为true，为true就直接执行这个函数。
                })
            }}
        sel();
//总价格
        function getCountMoney(i,b){
//    如何处理check为false的情况？再传递一个参数，参数为1的时候加
            var check = document.querySelectorAll(".check")[i];
//      取个数
            var score = part[i].querySelector(".score");
            var num = parseInt(score.innerText);
//      应该还取一个总价格。
            var Discount = parseInt(discount[i].innerText);
            var allP = ( num * Discount);               //单样商品的总价格
            var allm = parseInt(allmoney.innerHTML) ;   //结算总价格
            if(b == 1){
                allm+=allP;
            }else{
                allm-=allP;
            }
            allmoney.innerHTML = allm+".00";
//        如何将两个check的值加起来?取总价格和第二个（第三个。。。）单样商品的总价格相加就可以了。
        }
    }
    foo();
}


