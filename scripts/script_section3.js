fetch('assets/image-dolar.txt')
    .then(response => response.text())
    .then(data => {
        paperDataURI = data;
        
    })
    .catch((error) => {
        console.error('Error:', error);
    });
let paperDataURI;
var isView = false;
window.addEventListener('scroll', () => {

    const section = document.getElementById('section3');
    const container = document.getElementsByClassName('container-section3')[0];


    if (container.getBoundingClientRect().top <= 0) {
        if (!isView) {
            isView = true;
            CargarGrafica(paperDataURI)
        }
        section.classList.add('fixed2');
    }else if (container.getBoundingClientRect().bottom >= window.innerHeight) {
        section.classList.remove('fixed2');
      }
      else{
        section.classList.remove('fixed2');
      }
});





var chartDom = document.getElementById('inflacion');
var myChart = echarts.init(chartDom);
function CargarGrafica(paperDataRUI){
    var option = {
        backgroundColor: '#faebd7',
        tooltip: {},
        legend: {
          textStyle: { color: 'black',  
                        fontSize: 25},
            itemStyle: {        
                color: '#64872c',
            },	    
        },    
        xAxis: [
          {
            data: ['2017', '2018', '2019', '2020'],  
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: {
              margin: 20,  
              color: '#000',
              fontSize: 25
            }  
          }  
        ],  
        yAxis: {
          splitLine: { show: false },  
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { show: false }
        },  
        markLine: {
          z: -1  
        },  
        animationEasing: 'elasticOut',
        series: [
          {
            type: 'pictorialBar',  
            name: 'Emisión de pesos 2017-2020',
            emphasis: {
              scale: true  
            },  
            label: {
              show: true,  
              position: 'top',
              formatter: '{c} millones',
              fontSize: 16,
              color: '#64872c'
            },  
            data: [
              {
                value: 6841,  
                symbol: 'image://' + paperDataURI,
                symbolRepeat: true,
                symbolSize: ['50%', '30%'],
                symbolOffset: [0, 10],
                symbolMargin: '-30%',
                animationDelay: function (dataIndex, params) {
                  return params.index * 30;  
                }  
              },  
              {
                value: 6086,  
                symbol: 'image://' + paperDataURI,
                symbolRepeat: true,
                symbolSize: ['50%', '30%'],
                symbolOffset: [0, 10],
                symbolMargin: '-30%',
                animationDelay: function (dataIndex, params) {
                  return params.index * 30;  
                }  
              },  
              {
                value: 33113,  
                symbol: 'image://' + paperDataURI,
                symbolRepeat: true,
                symbolSize: ['50%', '30%'],
                symbolOffset: [0, 10],
                symbolMargin: '-30%',
                animationDelay: function (dataIndex, params) {
                  return params.index * 30;  
                }  
              },  
              {
                value: 93259,  
                symbol: 'image://' + paperDataURI,
                symbolRepeat: true,
                symbolSize: ['50%', '30%'],
                symbolOffset: [0, 10],
                symbolMargin: '-30%',
                animationDelay: function (dataIndex, params) {
                  return params.index * 30;  
                }  
              }  
            ],  
            markLine: {
              symbol: ['none', 'none'],  
              label: {
                show: false  
              },  
              lineStyle: {
                color: '#e54035',  
                width: 2
              },  
              data: [
                {
                  yAxis: 33113  
                }  
              ]  
            }  
          },  
          {
            type: 'pictorialBar',  
            barGap: '-100%',
            itemStyle: {
              color: '#90c13a'  
            },  
            silent: true,
            symbolOffset: [0, '50%'],
            z: -10,
            data: [
              {
                value: 1,  
                symbolSize: ['100%', 50]
              },  
              {
                value: 1,  
                symbolSize: ['100%', 50]
              },  
              {
                value: 1,  
                symbolSize: ['100%', 50]
              },  
              {
                value: 1,  
                symbolSize: ['100%', 50]
              },  
            ]  
          }  
        ]  
      };  
      chartDom.style.width = `${window.innerWidth}px}`;
      chartDom.style.height = `${window.innerHeight}px`;
      myChart.resize();

      myChart.setOption(option)
}      
