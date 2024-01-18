var index = 0;

var chartDom = document.getElementById('importaciones-grafic');
var myChart = echarts.init(chartDom);

var chartDom2 = document.getElementById('oferta-grafic');
var myChart2 = echarts.init(chartDom2);

var IsOut = false
var IsShow = false
var IsAnimated = false
ShowGrafic();
window.addEventListener('scroll', () => {

  const section = document.getElementById('section4');
  const container = document.getElementsByClassName('container-section4')[0];

  if (container.getBoundingClientRect().top <= 0) {
    if(!IsAnimated){
      animateGrafic();
      IsAnimated = true;
    }
      section.classList.add('fixed2');
  }else if (container.getBoundingClientRect().bottom >= window.innerHeight) {
      section.classList.remove('fixed2');
    }
    else{
      section.classList.remove('fixed2');
    }

    if (-container.getBoundingClientRect().top >= window.innerHeight){
      if(!IsOut){
        document.getElementsByClassName('traslade-ot-left')[0].classList.add('animation-left');
        document.getElementsByClassName('traslade-ot-left')[1].classList.add('animation-left');
        document.getElementsByClassName('traslade-ot-right')[0].classList.add('animation-right');
        document.getElementsByClassName('traslade-ot-right')[1].classList.add('animation-right');
        document.getElementsByClassName('second-container4')[0].classList.add('visible');
        IsOut = true;
      }
      document.getElementsByClassName('row4_1')[0].classList.add('visible-easy');
      if (-container.getBoundingClientRect().top >= window.innerHeight+(window.innerHeight/4)){
        document.getElementsByClassName('row4_2')[0].classList.add('visible');

        if (-container.getBoundingClientRect().top >= window.innerHeight+(window.innerHeight/2)){
          document.getElementsByClassName('row4_3')[0].classList.add('visible');
        }
        else{
          document.getElementsByClassName('row4_3')[0].classList.remove('visible');
        }
      }else{
        document.getElementsByClassName('row4_2')[0].classList.remove('visible');
      }
    }else{
      document.getElementsByClassName('traslade-ot-left')[0].classList.remove('animation-left');
      document.getElementsByClassName('traslade-ot-left')[1].classList.remove('animation-left');
      document.getElementsByClassName('traslade-ot-right')[0].classList.remove('animation-right');
      document.getElementsByClassName('traslade-ot-right')[1].classList.remove('animation-right');
      document.getElementsByClassName('second-container4')[0].classList.remove('visible');
      document.getElementsByClassName('row4_1')[0].classList.remove('visible-easy');
      IsOut = false
    }
});



function animateGrafic(){
  const animacion = setInterval(function () {
    var data = ['139', '138', '147', '130', '117', '102', '101', '114', '99', '72'];
    var date = ['2011','2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
    index = (index+1) % (date.length);
    myChart.setOption({
      series: [
        {
          data: [
            {
              value: data[index]
            }
          ],
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontSize: 60,
            fontWeight: 'bolder',
            formatter: `${date[index]}`,
            color: 'inherit'
          },
        }
      ]
    });
    if(index == 9){
      clearInterval(animacion);
    }
  }, 1000);


  var option2 = {
    animationDuration: 10000,
    title: {
      text: 'Oferta',
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        var tooltipText = params[0].axisValueLabel + '<br>';
        params.forEach(function (param) {
          if (param.seriesName== 'Bebida'){
            tooltipText += param.marker + ' ' + param.seriesName + ': ' + param.value + ' Mhl<br>';
          }
          else if (param.seriesName== 'Caucho y plástico'){
          tooltipText += param.marker + ' ' + param.seriesName + ': ' + param.value + ' MU<br>';
          }else{
            tooltipText += param.marker + ' ' + param.seriesName + ': ' + param.value + ' Mt<br>';
          }
        });
        return tooltipText;
      }
    },
    legend: {
      data: ['Agropecuario', 'Alimenticio', 'Bebida', 'Caucho y plástico', 'Construcción']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2018', '2019', '2020', '2021']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Agropecuario',
        type: 'line',
        stack: 'Total',
        data: [9523,  8154,  5323,  5158]
      },
      {
        name: 'Alimenticio',
        type: 'line',
        stack: 'Total',
        data: [2759,  2285,  2147,  1729]
      },
      {
        name: 'Bebida',
        type: 'line',
        stack: 'Total',
        data: [8040,  7641,  6200,  5160]
      },
      {
        name: 'Caucho y plástico',
        type: 'line',
        stack: 'Total',
        data: [156,  104,  78,  55]
      },
      {
        name: 'Construcción',
        type: 'line',
        stack: 'Total',
        data: [1640,  1375,  1052,  846]
      }
    ]
  };
  myChart2.clear();
  myChart2.setOption(option2)
}


function ShowGrafic(){

var option = {
    animationDuration: Infinity,
    series: [
      {
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: 70,
        max: 150,
        splitNumber: 10,
        itemStyle: {
          color: '#9bcc48'
        },
        axisLabel: {
          distance: -20,
          color: '#999',
          fontSize: 20,
          formatter: function(value) {
            return value + ' Precio en millones';
          }
        },
        progress: {
          show: true,
          width: 30
        },
        pointer: {
          show: false
        },
        axisLine: {
          lineStyle: {
            width: 30
          }
        },
        axisTick: {
          distance: -45,
          splitNumber: 5,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        splitLine: {
          distance: -52,
          length: 14,
          lineStyle: {
            width: 3,
            color: '#999'
          }
        },
        axisLabel: {
          distance: -20,
          color: '#999',
          fontSize: 20
        },
        anchor: {
          show: false
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          width: '60%',
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, '-15%'],
          fontSize: 60,
          fontWeight: 'bolder',
          formatter: '2011',
          color: 'inherit'
        },
        data: [
          {
            value: 139
          }
        ]
      }
    ]
  };
  
myChart.setOption(option)




var option2 = {
    animationDuration: Infinity,
    title: {
      text: 'Oferta',
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        var tooltipText = params[0].axisValueLabel + '<br>';
        params.forEach(function (param) {
          if (param.seriesName== 'Bebida'){
            tooltipText += param.marker + ' ' + param.seriesName + ': ' + param.value + ' Mhl<br>';
          }
          else if (param.seriesName== 'Caucho y plástico'){
          tooltipText += param.marker + ' ' + param.seriesName + ': ' + param.value + ' MU<br>';
          }else{
            tooltipText += param.marker + ' ' + param.seriesName + ': ' + param.value + ' Mt<br>';
          }
        });
        return tooltipText;
      }
    },
    legend: {
      data: ['Agropecuario', 'Alimenticio', 'Bebida', 'Caucho y plástico', 'Construcción']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2018', '2019', '2020', '2021']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Agropecuario',
        type: 'line',
        stack: 'Total',
        data: [9523,  8154,  5323,  5158]
      },
      {
        name: 'Alimenticio',
        type: 'line',
        stack: 'Total',
        data: [2759,  2285,  2147,  1729]
      },
      {
        name: 'Bebida',
        type: 'line',
        stack: 'Total',
        data: [8040,  7641,  6200,  5160]
      },
      {
        name: 'Caucho y plástico',
        type: 'line',
        stack: 'Total',
        data: [156,  104,  78,  55]
      },
      {
        name: 'Construcción',
        type: 'line',
        stack: 'Total',
        data: [1640,  1375,  1052,  846]
      }
    ]
  };

  myChart2.setOption(option2)}