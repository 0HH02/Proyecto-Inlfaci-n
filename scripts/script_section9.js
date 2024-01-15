
var IsShow = false;
window.addEventListener('scroll', () => {
    
    
    if( document.querySelector('.container-section9').getBoundingClientRect().top <= 200){
        
        document.querySelector('.text-introduction9').classList.add('visible');
        if(!IsShow)
        {
            anima();
            IsShow = true;
        }
    }
    else{
        IsShow = false;
        document.querySelector('.text-introduction9').classList.remove('visible');
    }
});

function anima (){
    var animacion = setInterval(function () {
        for (var i = 0; i < 10; i++) {
            data.shift();
            data.push(randomData(index));
            index = index+1;
        }
            myChart.setOption({
            series: [
                {
                data: data
                }
            ]
            });
        
        if(index > 900){
            clearInterval(animacion);
        }
      }, 500);
};


var chartDom = document.getElementById('ofertaVSdemanda-grafic');
var myChart = echarts.init(chartDom);
var index = 0;
var oferta = 600;
var demanda = 800;
function randomData(i) {
    now = new Date(+now + oneDay);
    value = 200 + ((1000 - i)*(Math.sin((10000/(1000-i))))/(30));
    document.querySelector('.oferta').innerHTML = `${Math.round((-200 + value + demanda))}`;
    document.querySelector('.precio').innerHTML = `${Math.round((value))}`
    document.querySelector('.oferta-p').style.position = 'relative';
    document.querySelector('.oferta-p').style.top = `${200 - value}`;
    if (Math.round(-200 + value + demanda) > oferta)
    {
    document.querySelector('.oferta').classList.add('text-verde');
    document.querySelector('.oferta').classList.remove('text-rojo');
    document.querySelector('.subir img').src = 'assets/incrementar.png';
    
}else{
    document.querySelector('.oferta').classList.add('text-rojo');
    document.querySelector('.oferta').classList.remove('text-verde');
    document.querySelector('.subir img').src = 'assets/flecha-hacia-abajo.png';


    }   
    oferta = Math.round(-200 + value + demanda);

    return {
      name: now.toString(),
      value: [
        [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
        Math.round(value)
      ]
    };
  }
  let data = [];
  let now = new Date(2019, 1, 1);
  let oneDay = 24 * 3600 * 1000;
  let value;
  for (var i = 0; i < 100; i++) {
    data.push(randomData(i));
  }
  var option = {
    title: {
      text: 'Estabilización de los precios'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function() {
            return '<div style="display:flex; align-items: center;"><div style="width: 7px; height: 7px; border-radius: 50%; margin-right: 5px; background-color: green"></div>Precio de equilibrio</div><div style="display:flex; align-items: center;"><div style="width: 7px; height: 7px; border-radius: 50%; margin-right: 5px; background-color: blue"></div>Precio de la calle</div>';
          }
        },
    xAxis: {    
      type: 'time',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '40%'],
      splitLine: {
        show: false
      },
      min: 120,
      
    },
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        showSymbol: false,
        data: data
      }
    ]
  };


  myChart.setOption(option)