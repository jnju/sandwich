const productArr={
    "sandwich1" : {'name':'우유퐁당<br> 케익샌드 초코','count':0,'price':3900 },
    "sandwich2" : {'name':'우유퐁당<br> 케익샌드 플레인','count':0,'price':3900 },
    "sandwich3" : {'name':'옥수수크림<br> 샌드위치','count':0,'price':2600 },
    "sandwich4" : {'name':'쿠키앤크림<br> 샌드위치','count':0,'price':2600 },
    "sandwich5" : {'name':'딸기퐁당<br> 샌드위치','count':0,'price':2300 },
    "sandwich6" : {'name':'초코퐁당<br> 샌드위치','count':0,'price':2600 },
    "sandwich7" : {'name':'오리지널<br> 햄샌드위치','count':0,'price':2300 },
    "sandwich8" : {'name':'햄치즈 샌드위치','count':0,'price':2400 },
    "sandwich9" : {'name':'치즈 샌드위치','count':0,'price':2200 },
    "sandwich10" : {'name':'갓군샌 눈꽃소보루','count':0,'price':3300 },
    "sandwich11" : {'name':'갓군샌 트리플치즈','count':0,'price':3500 },
    "sandwich12" : {'name':'갓군샌 갈릭버터','count':0,'price':3600 } 
};

function orderList(productName,productPrice){
    $.each(productArr, function(index, item){
            if(productName == item.name){ 
                if(item.count == 0){
                    item.count = countPlus(item.count);
                    let tempStringS = `
                        <section>
                            <span class="product_name">${productName}</span>
                            <div class="list_count_btn" id="${index}">
                                <span id="minusBtn" class="${index}_minus_btn">-</span>
                                <span class="product_count">${item.count}</span>
                                <span id="plusBtn" class="${index}_plus_btn">+</span>
                            </div>
                            <div class="product_price" id="${index}">
                                `;
                            tempStringS+=`<span class="product_total_price">`;
                            tempStringS+=commaFunc(productPrice)+'</span>';

                            tempStringS+=`
                                <span>원</span>
                                <span id="delBtn" class="${index}_del_btn">x</span>
                            </div>
                        </section>
                    `;
                    $('.list_product').append(tempStringS);
                    console.log(tempStringS);
                } else if(item.count>0){
                    this.count = countPlus(this.count);
                    let productPriceT = orderPrice(item.count, item.price);
                    $('#'+index+'>.product_count').html(this.count);
                    $('#'+index+'+ div > .product_total_price').html(commaFunc(productPriceT));
                }
            }             
    });
    totalCountFunc();
    totalPriceFunc();
}

function plusMinusFunc(eID, thisId, targetCN){
    switch(eID){
        case 'plusBtn':
            $.each(productArr, function(index, item){
                if(index == thisId){
                    this.count = countPlus(this.count);
                    let productPriceT = orderPrice(item.count, item.price);
                    $('#'+index+'>.product_count').html(this.count);
                    $('#'+index+'+ div > .product_total_price').html(commaFunc(productPriceT));
                }
            });
        break;

        case 'minusBtn':
            $.each(productArr, function(index, item){
                if(index == thisId){
                    if(this.count > 1){
                        this.count = countMinu(this.count);
                        let productPriceT = orderPrice(item.count, item.price);

                        $('#'+index+'>.product_count').html(this.count);
                        $('#'+index+'+ div > .product_total_price').html(commaFunc(productPriceT));
                    }else{
                        this.count = countMinu(this.count);
                        $('.'+targetCN).parent().parent().remove();
                    }
                }
            });
        break;

        case 'delBtn':
            $.each(productArr, function(index, item){
                if(index == thisId){
                    this.count = delCount(this.count);
                    let productPriceT = orderPrice(item.count, item.price);
                    console.log(targetCN);
                    $('.'+targetCN).parent().parent().remove();
                }
            });
        break;

    }
    totalCountFunc();
    totalPriceFunc();
}

function countPlus(count){
    count++;
    return count;
}

function countMinu(count){
    count--;
    return count;
}

function delCount(count){
    count = 0;
    return count;
}

function orderPrice(count, price){
    orderpay = count*price
    return orderpay
}


function commaFunc(target_number){
    let temp_target = String(target_number);
    let comma_regex = /\B(?=(\d{3})+(?!\d))/g;
    return temp_target.replace(comma_regex,",");
}

function stringNumberToInt(stringNumber){
    return parseInt(stringNumber.replace(/,/g , ''));
}

function totalCountFunc(){
    let productCountClass = document.getElementsByClassName('product_count');
    let tempF =[];
    for(let i =0; i<productCountClass.length;i++){
        tempF.push(parseInt(productCountClass[i].innerHTML));
    }
    if(tempF != 0){
        const totalCount = tempF.reduce((a,b) => (a+b));
        $('.total_count').html(totalCount);    
    }else if(tempF == 0){
        $('.total_count').html(0);
    }
}

function totalPriceFunc(){
    let productTotalPriceClass = document.getElementsByClassName('product_total_price');
    let tempF =[];
    for(let i =0; i<productTotalPriceClass.length;i++){
        tempF.push(stringNumberToInt(productTotalPriceClass[i].innerHTML));
    }
    if(tempF != 0){
        const totalPrice = tempF.reduce((a,b) => (a+b));
        $('.total_price').html(commaFunc(totalPrice));
    }else if(tempF == 0){
        $('.total_price').html(0);
    }
    $('.totalAmount').val(stringNumberToInt($('.total_price').html())); //지불 할 금액
}


function moneyPayment(moneyKind){
    $('.total_money').text(commaFunc(stringNumberToInt($('.total_money').text()) + stringNumberToInt(moneyKind)));
}

function changeCalculator(totalAmount,totalPay){
    let change = totalPay-totalAmount;
}

function popupFunc(result, htmlText){
    switch(result){
        case 'success':
            $('.popup_bg').css('display','block');
            $('.change_popup_box').css('display','block');
        break;
        case 'fail':
            $('.popup_bg').css('display','block');
            $('.popup_text').css('display','block');
            $('.popup_text > span').html(htmlText);
        break;
        case 'overMoney':
            $('.popup_bg').css('display','block');
            $('.popup_text').css('display','block');
            $('.popup_text > span').html(htmlText);
            $('.popup_text > .close_btn').addClass(result);
        break;
    }

}

$(function(){ 
    $('.item_box span').on('click',function(){
        let productName = $(this).parent().children('strong').html();
        let productPrice = $(this).html();
        console.log(productPrice)
        orderList(productName,productPrice);
    });

    $('.money_list').on('click',function(){
        moneyPayment($(this).html());
        $('.totalPay').val(stringNumberToInt($('.total_money').text())); 
    });

    $('.pay_btn').on("click",function(){
        let totalAmount = parseInt($('.totalAmount').val());
        let totalPay =  parseInt($('.totalPay').val());
        let changeMoney = commaFunc(totalPay-totalAmount);
        $('.receipt_total').html(changeMoney);

        if(isNaN(totalAmount) || totalAmount ==0){
            popupFunc('fail','물건을 선택해주세요.');
        }else if(isNaN(totalPay) || totalPay ==0){
            popupFunc('fail','돈을 지불해주세요.');
        }else if(totalAmount > totalPay){
            popupFunc('fail','지불 가격이 부족합니다.'); 
        }else if(totalPay-totalAmount > 50000){
            popupFunc('overMoney','지불한 금액이 너무 많습니다.');
        }else if(totalAmount < totalPay){
            changeCalculator(totalAmount,totalPay);
            popupFunc('success');
        }else if(totalAmount == totalPay){
            changeCalculator(totalAmount,totalPay);
            popupFunc('success');
        }
    });

    $('.clear_btn').on('click',function(){
        $.each(productArr, function(index,item){
            item.count=0;
        });
        $('.list_product').html('');
        $('.total_count').html(0);
        $('.total_price').html(0);
        $('.total_money').html(0);
        $('.totalAmount').val(0);
        $('.totalPay').val(0);
        $('.close_btn').removeClass("overMoney");

    });


    $(document).on('click',function(e){
        if (e.target.id =='plusBtn' || e.target.id =='minusBtn' ||  e.target.id =='delBtn'){
            let targetCN = e.target.className;
            let thisId = $('.'+targetCN).parent().attr('id');
            plusMinusFunc(e.target.id,thisId,targetCN); 
        }
    });
    
    $('.close_btn').on("click",function(){
        if($(this).hasClass("overMoney")){
            $('.total_money').html(0);
            $('.totalPay').val(0);
        };
        $(this).parent().parent().css("display","none");
        $(this).parent().parent().css("display","none");
        $('.popup_bg').css('display','none');
        
    });
    $('.reset_btn').on('click',function(){
        location.href="./index.html";
    });

    
});