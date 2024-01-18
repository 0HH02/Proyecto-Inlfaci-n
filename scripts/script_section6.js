var IsOut = false

window.addEventListener('scroll', () => {

    const section = document.getElementById('section6');
    const container = document.getElementsByClassName('container-section6')[0];


    if (container.getBoundingClientRect().top <= 0) {
        section.classList.add('fixed3');
        if(!IsOut){
            ShowGrafic();
            IsOut = true;
        }
    }else if (container.getBoundingClientRect().bottom >= window.innerHeight) {
        section.classList.remove('fixed3');
      }
      else{
        section.classList.remove('fixed3');
      }
});




function ShowGrafic(){
var chartDom = document.getElementById('equilibrio-grafic');
var myChart = echarts.init(chartDom);
var index = 0;
function randomData(i) {
    now = new Date(+now + oneDay);
    value = i<70 ? Math.random()*9 +(i+135) : 200 + ((220 - i)*(Math.sin((220-i))/20));
    var realvalue = i < 215 ? value : Math.random()*10 + (i-182)*6;
    var realrealvalue = i < 250 ? realvalue : 400 + ((350 - i)*(Math.sin((350-i))/20));
    return {
      name: now.toString(),
      value: [
        [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
        Math.round(realrealvalue)
      ]
    };
  }
  let data = [];
  let now = new Date(2019, 1, 1);
  let oneDay = 24 * 3600 * 1000;
  let value = Math.random() * 1000;
  for (var i = 0; i < 100; i++) {
    data.push(randomData(i));
  }
  var line2 = []
data.map(item => 
    {
    line2.push({
        name: item.name,
        value: 
        [item.value[0], 200]
        })
    });
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
      },
      {
        name: 'Line at 200',
        type: 'line',
        showSymbol: false,
        data: line2,
      }
    ]
  };
  var animacion = setInterval(function () {
    for (var i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData(index+100));
        index = index+1;
    }
    if (index < 120)
    {
        var line1 = []
        data.map(item => 
            {
            line1.push({
                name: item.name,
                value: 
                [item.value[0], 200]
                })
            }),
        myChart.setOption({
        series: [
            {
            data: data
            },
            {
                data: line1
            }
        ]
        });
    }
    else{
        var line1 = []
        data.map(item => 
            {
            line1.push({
                name: item.name,
                value: 
                [item.value[0], 400]
                })
            }),
        myChart.setOption({
        series: [
            {
            data: data
            },
            {
              data: line1
            }
        ]
        });
    }
    if(index > 200){
        clearInterval(animacion);
    }
  }, 500);
  myChart.setOption(option)
}


