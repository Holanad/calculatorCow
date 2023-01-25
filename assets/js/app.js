// jQuery function

$(document).ready(function() {
    $.ajax({
        url: "assets/json/data.json",
        dataType: "json",
        success: function(data) { 
            const animals = $('.animals');   
            const food = $('.food');   
            
            function beginScript() {
                animals.find('.c-select__title span').attr(
                    { 
                        'data-name': animals.find('.c-select-item').eq(0).attr('data-name'), 
                        'data-cv': animals.find('.c-select-item').eq(0).attr('data-cv'), 
                        'data-nel': animals.find('.c-select-item').eq(0).attr('data-nel'), 
                        'data-cp': animals.find('.c-select-item').eq(0).attr('data-cp'), 
                        'data-ndf': animals.find('.c-select-item').eq(0).attr('data-ndf'), 
                        'data-upd': animals.find('.c-select-item').eq(0).attr('data-upd'),
                        'data-crahmal': animals.find('.c-select-item').eq(0).attr('data-crahmal')          
                    }
                )
                animals.find('.c-select__title span').text(animals.find('.c-select-item').eq(0).find('p').text())
                food.find('.c-select__title span').attr(
                    { 
                        'data-name': food.find('.c-select-item').eq(0).attr('data-name'), 
                        'data-cv': food.find('.c-select-item').eq(0).attr('data-cv'), 
                        'data-nel': food.find('.c-select-item').eq(0).attr('data-nel'), 
                        'data-cp': food.find('.c-select-item').eq(0).attr('data-cp'), 
                        'data-ndf': food.find('.c-select-item').eq(0).attr('data-ndf'), 
                        'data-upd': food.find('.c-select-item').eq(0).attr('data-upd'),
                        'data-crahmal': food.find('.c-select-item').eq(0).attr('data-crahmal')          
                    }
                )
                food.find('.c-select__title span').text(food.find('.c-select-item').eq(0).find('p').text())
            }

            for(let i = 1; i <= Object.keys(data.animals).length; i++) {
                $('.animals .c-select-list').append(`
                    <li class="c-select-item" data-name="${data.animals['cow' + i].name}" data-cv="${data.animals['cow' + i].cv}" data-nel="${data.animals['cow' + i].nel}" data-cp="${data.animals['cow' + i].cp}" data-ndf="${data.animals['cow' + i].ndf}" data-upd="${data.animals['cow' + i].upd}" data-crahmal="${data.animals['cow' + i].crahmal}"> 
                        <p>${data.animals['cow' + i]._comment}</p>
                    </li>
                `);
            }
            for(let i = 1; i <= Object.keys(data.food).length; i++) {
                $('.food .c-select-list').append(`
                    <li class="c-select-item" data-name="${data.food['food' + i].name}" data-cv="${data.food['food' + i].cv}" data-nel="${data.food['food' + i].nel}" data-cp="${data.food['food' + i].cp}" data-ndf="${data.food['food' + i].ndf}" data-upd="${data.food['food' + i].upd}" data-crahmal="${data.food['food' + i].crahmal}"> 
                        <p>${data.food['food' + i]._comment}</p>
                    </li>
                `);
            }
            beginScript()
            $('.c-select__title').click(function () {
                if($(this).parent().hasClass('open')) {
                    $('.c-select').removeClass('open');
                    $(this).parent().removeClass('open');
                } else {
                    $('.c-select').removeClass('open');
                    $(this).parent().addClass('open');
                }
            })
            $('.c-select-item').click(function () {
                $(this).parent().prev().find('span').text($(this).find('p').text());
                $(this).parent().prev().find('span').attr('data-name', $(this).attr('data-name'));
                $(this).parent().prev().find('span').attr('data-cv', $(this).attr('data-cv'));
                $(this).parent().prev().find('span').attr('data-nel', $(this).attr('data-nel'));
                $(this).parent().prev().find('span').attr('data-cp', $(this).attr('data-cp'));
                $(this).parent().prev().find('span').attr('data-ndf', $(this).attr('data-ndf'));
                $(this).parent().prev().find('span').attr('data-upd', $(this).attr('data-upd'));
                $(this).parent().prev().find('span').attr('data-crahmal', $(this).attr('data-crahmal'));
                $('.c-select').removeClass('open');
                setTimeout(() => {
                    calcSum()
                }, 100);
            })

            $('.calculator-food-item input').keyup(function() {
                setTimeout(() => {
                    calcSum()
                }, 100);
            });

            function calcSum () {
                food.each(function () {
                    let foodDataInputCV = $(this).find('.c-select__title span').attr('data-cv') * $(this).find('.calculator-food-item__input').val();
                    let foodDataInputNel = $(this).find('.c-select__title span').attr('data-nel') * $(this).find('.calculator-food-item__input').val();
                    let foodDataInputCp = $(this).find('.c-select__title span').attr('data-cp') * $(this).find('.calculator-food-item__input').val();
                    let foodDataInputNDF = $(this).find('.c-select__title span').attr('data-ndf') * $(this).find('.calculator-food-item__input').val();
                    let foodDataInputUPD = $(this).find('.c-select__title span').attr('data-upd') * $(this).find('.calculator-food-item__input').val();
                    let foodDataInputCRAHMAL = $(this).find('.c-select__title span').attr('data-crahmal') * $(this).find('.calculator-food-item__input').val();
                    
                    $(this).attr("data-cv-sum", foodDataInputCV)
                    $(this).attr("data-nel-sum", foodDataInputNel)
                    $(this).attr("data-cp-sum", foodDataInputCp)
                    $(this).attr("data-ndf-sum", foodDataInputNDF)
                    $(this).attr("data-upd-sum", foodDataInputUPD)
                    $(this).attr("data-crahmal-sum", foodDataInputCRAHMAL) 
                })
                
                let sumAllCv = 0;
                let sumAllNel = 0;
                let sumAllCp = 0;
                let sumAllNDF = 0;
                let sumAllUPD = 0;
                let sumAllCRAHMAL = 0;
                for(let i = 0; i < food.length; i++) {
                    // sumAllCv
                    if($(food[i]).attr('data-cv-sum') == 'NaN') {
                        sumAllCv += 0
                    } else {
                        sumAllCv += Number($(food[i]).attr('data-cv-sum'))
                    }
                    // sumAllNel
                    if($(food[i]).attr('data-nel-sum') == 'NaN') {
                        sumAllNel += 0
                    } else {
                        sumAllNel += Number($(food[i]).attr('data-nel-sum'))
                    }
                    // sumAllCp
                    if($(food[i]).attr('data-cp-sum') == 'NaN') {
                        sumAllCp += 0
                    } else {
                        sumAllCp += Number($(food[i]).attr('data-cp-sum'))
                    }
                    // sumAllNDF
                    if($(food[i]).attr('data-ndf-sum') == 'NaN') {
                        sumAllNDF += 0
                    } else {
                        sumAllNDF += Number($(food[i]).attr('data-ndf-sum'))
                    }
                    // sumAllUPD
                    if($(food[i]).attr('data-upd-sum') == 'NaN') {
                        sumAllUPD += 0
                    } else {
                        sumAllUPD += Number($(food[i]).attr('data-upd-sum'))
                    }
                    // sumAllCRAHMAL
                    if($(food[i]).attr('data-crahmal-sum') == 'NaN') {
                        sumAllCRAHMAL += 0
                    } else {
                        sumAllCRAHMAL += Number($(food[i]).attr('data-crahmal-sum'))
                    }
                };
                $('.calculator-food-sum').attr({ 
                    'data-cv-sumAll': sumAllCv, 
                    'data-nel-sumAll': sumAllNel, 
                    'data-cp-sumAll': sumAllCp, 
                    'data-ndf-sumAll': sumAllNDF, 
                    'data-upd-sumAll': sumAllUPD, 
                    'data-crahmal-sumAll': sumAllCRAHMAL     
                });
                $('.calculator-indicator-item').eq(0).find('input').val((sumAllCp / sumAllCv / 10).toFixed(2));
                $('.calculator-indicator-item').eq(1).find('input').val((sumAllNel / sumAllCv).toFixed(2));
                $('.calculator-indicator-item').eq(2).find('input').val(((sumAllNel - 50) / 2.8).toFixed(2));
                $('.calculator-indicator-item').eq(3).find('input').val(((sumAllCp - 1200)/85).toFixed(2));
                // проценты
                $('.calculator-food-procent').attr({
                    'data-cv-procent': sumAllCv / animals.find('.c-select span').attr('data-cv') * 100, 
                    'data-nel-procent': sumAllNel / animals.find('.c-select span').attr('data-nel') * 100, 
                    'data-cp-procent': sumAllCp / animals.find('.c-select span').attr('data-cp') * 100, 
                    'data-ndf-procent': sumAllNDF / animals.find('.c-select span').attr('data-ndf') * 100, 
                    'data-upd-procent': sumAllUPD / animals.find('.c-select span').attr('data-upd') * 100, 
                    'data-crahmal-procent': sumAllCRAHMAL / animals.find('.c-select span').attr('data-crahmal') * 100   
                })
                // рекомендации
                //Для CV
                if($('.calculator-food-procent').attr('data-cv-procent') < 90) {
                    $('.recomend-cv p').text('эй,Хозяин мне этого не хватит - сделай так, чтобы в СВ было 100%')
                } else if ($('.calculator-food-procent').attr('data-cv-procent') > 110) {
                    $('.recomend-cv p').text('слишком много Я столько не съем');
                } else {
                    $('.recomend-cv p').text('в пределах допустимого');
                }
                //Для NEL
                if($('.calculator-food-procent').attr('data-nel-procent') < 90) {
                    $('.recomend-nel p').text('мало энергии - подкинь концентратов');
                } else if ($('.calculator-food-procent').attr('data-nel-procent') > 110) {
                    $('.recomend-nel p').text('много энергии - буду жиреть');
                } else {
                    $('.recomend-nel p').text('в пределах допустимого');
                }
                //Для CP
                if($('.calculator-food-procent').attr('data-cp-procent') < 90) {
                    $('.recomend-cp p').text('эй,Хозяин дай протеина - дам молока')
                } else if ($('.calculator-food-procent').attr('data-cp-procent') > 110) {
                    $('.recomend-cp p').text('перебор по протеину-прощай печень');
                } else {
                    $('.recomend-cp p').text('в пределах допустимого');
                }
                //Для ndf
                if($('.calculator-food-procent').attr('data-ndf-procent') < 90) {
                    $('.recomend-ndf p').text('не жадничай - дай концентратов')
                } else if ($('.calculator-food-procent').attr('data-ndf-procent') > 110) {
                    $('.recomend-ndf p').text('слишком много Я столько не съем');
                } else {
                    $('.recomend-ndf p').text('в пределах допустимого');
                }
                //Для upd
                if($('.calculator-food-procent').attr('data-upd-procent') < 90) {
                    $('.recomend-upd p').text('подкинь сои или рапса')
                } else if ($('.calculator-food-procent').attr('data-upd-procent') > 110) {
                    $('.recomend-upd p').text('можно и карбамидика добавить');
                } else {
                    $('.recomend-upd p').text('в пределах допустимого');
                }
                //Для crahmal
                if($('.calculator-food-procent').attr('data-crahmal-procent') < 90) {
                    $('.recomend-crahmal p').text('добавь кукурузы')
                } else if ($('.calculator-food-procent').attr('data-crahmal-procent') > 110) {
                    $('.recomend-crahmal p').text('слишком много крахмала - будет ацидоз');
                } else {
                    $('.recomend-crahmal p').text('в пределах допустимого');
                }
                // Убираем непонятные числа
                if($('.calculator-indicator-item__input').val() == 'NaN') {
                    $('.calculator-indicator-item__input').val('-')
                }
                // Подводим итог КГ
                let itog = 0;
                for(let i = 0; i < food.length; i++) {
                    itog += Number($(food[i]).find('.calculator-food-item__input').val())
                };
                $('.itog').find('.calculator-food-head__unit span').text(itog)
            }
            calcSum();
        }
    })

});

/*

        "food1": {
            "name": "clear",
            "cv": 0,
            "nel": 0,
            "cp": 0,
            "ndf": 0,
            "upd": 0,
            "crahmal": 0,
            "_comment": "Выберите корм"
        },
*/