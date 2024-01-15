var chartDom = document.getElementById('optimist-grafic');
// var chartElement = echarts.init(chartDom);



var IsOut = false

window.addEventListener('scroll', () => {

    const section = document.getElementById('section11');
    const container = document.getElementsByClassName('container-section11')[0];
    const section2 = document.getElementById('section11_2');


    if(container.getBoundingClientRect().top <= 500){
        if(!IsOut){
            ShowGrafic2();
            IsOut = true;
        }
    }
    if (container.getBoundingClientRect().top <= 0) {
        section.classList.add('fixed3');
        
    }else if (container.getBoundingClientRect().bottom >= window.innerHeight) {
        section.classList.remove('fixed3');
      }
      else{
        section.classList.remove('fixed3');
      }
    if(section2.getBoundingClientRect().top <= 0){
        section2.classList.add('visible');
        section.classList.remove('visible');
    }
    else{
        section2.classList.remove('visible');
        section.classList.add('visible');
    }
});

document.querySelector('.back-button').addEventListener('click', function() {
    location.hash = '#grafics';
    console.log('click')
  });
















function ShowGrafic2(){
fetch('data/import-export-pib-emision.json').then(response => response.json()).then(data => {
    data = data.pib.Last;
    var Tipo = ['PIB (Millones)', 'Importaciones (Cientos de miles)', 'Exportaciones (Cientos de miles)'];
    chartDom.style.width = '1000px';
    chartDom.style.height = '600px';
    var myChart = echarts.init(chartDom);

    const datasetWithFilters = [];
    const seriesList = [];
    echarts.util.each(Tipo, function (Tipo) {
        var datasetId = 'dataset_' + Tipo;
        datasetWithFilters.push({
        id: datasetId,
        fromDatasetId: 'dataset_raw',
        transform: {
            type: 'filter',
            config: {
            and: [
                { dimension: 'Year', gte: 1996 },
                { dimension: 'Tipo', '=': Tipo }
            ]
            }
        }
    });
    seriesList.push({
    type: 'line',
    datasetId: datasetId,
    showSymbol: false,
    name: Tipo,
    endLabel: {
        show: true,
        formatter: function (params) {
        return params.value[1].split(' ')[0] + ': ' + params.value[2];
        }
    },
    labelLayout: {
        moveOverlap: 'shiftY'
    },
    emphasis: {
        focus: 'series'
    },
    encode: {
        x: 'Year',
        y: 'Pesos',
        label: ['Tipo', 'Pesos'],
        itemName: 'Year',
        tooltip: ['Pesos']
    }
    });
    });
    var option = {
        animation: true,
        animationDuration: 15000,
        dataset: [
        {
            id: 'dataset_raw',
            source: data
        },
        ...datasetWithFilters
        ],
        title: {
        text: 'Recuperación de la economía:'
        },
        tooltip: {
        order: 'TipoDesc',
        trigger: 'axis'
        },
        xAxis: {
        type: 'category',
        nameLocation: 'middle'
        },
        yAxis: {
        name: 'Pesos'
        },
        grid: {
        right: 140
        },
        series: seriesList
    };
    myChart.resize();
    myChart.setOption(option);
});
}