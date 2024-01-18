let import_export_pib_emision;

fetch('data/import-export-pib-emision.json').then(response => response.json()).then(data => {
  import_export_pib_emision = data;
});



var index = 0;
var IsView1 = false;
var IsView2 = false;



window.addEventListener('scroll', () => {
  const grafics = document.getElementById('grafics');
  const container = document.getElementsByClassName('container-introduction')[0].getBoundingClientRect();
  const p1 = document.getElementsByClassName('text-introduction')[0];
  const p1_2 = document.getElementsByClassName('text-introduction2')[0];
  const p2 = document.getElementsByClassName('year-introduction')[0];
  const pib_graf = document.getElementById('grafic1');
  const pib_graf2 = document.getElementById('grafic2');

    

    // Verifica si el objeto está en el centro de la pantalla

    if (container.top <= 0) { 
      index = Math.floor((-(container.top)/(container.bottom - container.top - window.innerHeight)*30))<=30?Math.floor((-(container.top)/(container.bottom - container.top - window.innerHeight)*30)):30;
      p2.children[0].innerHTML = `${index + 1990}`
      if (import_export_pib_emision){CargarMapa(Mapa, Datos, index);}

      if (index < 22){
        p1.classList.add('visible');
        p1.classList.add('next-move-text');
        p2.classList.add('visible');
        p1.classList.remove('next-move-text');
        p1_2.classList.remove('visible');
        pib_graf2.classList.remove('visible');
        IsView2 = false;
        
        if (!IsView1) {
          // Si el objeto está completamente en pantalla, agrega la clase 'move-right'
          IsView1 = true
          PIB_Graf_Draw(pib_graf,import_export_pib_emision.pib.First, 'Estadísticas en Cuba antes del 2012', 750, 500)
          pib_graf.classList.add('visible');
          pib_graf.classList.add('move-right');
        }
      }
      else{
        IsView1 = false;
        pib_graf.classList.remove('visible');
        if (!IsView2) {
          // Si el objeto está completamente en pantalla, agrega la clase 'move-right'
          IsView2 = true
          PIB_Graf_Draw(pib_graf2, import_export_pib_emision.pib.Second, 'Estadísticas en Cuba después del 2012', 700, 300)
          pib_graf.classList.add('move-right');
          pib_graf2.classList.add('visible');
          pib_graf2.classList.add('move-left');

        }
        p1_2.classList.add('visible');

        p1.classList.remove('visible');
        p1.classList.add('next-move-text');
        p2.classList.add('next-move');
      }
      grafics.classList.add('fixed');
      grafics.classList.remove('invisible');
      
    }
    else if (container.bottom >= window.innerHeight) {
      // grafics.classList.add('invisible');
      grafics.classList.remove('fixed');
      // p1.classList.remove('visible');
      // p2.classList.remove('visible');
    }
    else{
      grafics.classList.remove('fixed');
    }
});


function PIB_Graf_Draw(chartElement,data, name, width, height){
  var Tipo = ['PIB (Millones)', 'Importaciones (Cientos de miles)', 'Exportaciones (Cientos de miles)'];

    chartElement.style.width = width;
    chartElement.style.height = height;

    // Luego, inicializa un gráfico ECharts en ese elemento.
    var myChart = echarts.init(chartElement);


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
      text: name
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
}




const projection = d3.geoMercator().center([-78,0 -20]).scale(600);
const path = d3.geoPath().projection(projection);


const svg = d3.select("#mapTime").append("svg")
    .attr("viewBox", [-500, -500, 2000, 1300]);


function CargarMapa(América, data, index){
    d3.select("svg").selectAll("*").remove();
        const colorScale = function(name){
            if ((name in data)){
                if (data[name]["presidential"][index][1] == "Left")
                {
                    return "#ff642a";
                }
                else if (data[name]["presidential"][index][1] == "Right")
                {
                    return "#9cdcfe";
                }
                else{
                    return "#ddd";
                }
            }
        }

        América.features.forEach(function(feature) {
            svg.append("path")
                .datum(feature)
                .attr("fill", function(d) { return colorScale(d.properties.name); })
                .attr("stroke", "white")
                .attr("stroke-linejoin", "round")
                .attr("d", path);
        });

        const g = svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#616161");
}

let Mapa;
let Datos;
d3.json("data/custom.geojson").then(function (América) {
    fetch('data/Países-Ideologies-clean.json').then(response => response.json()).then(data => {
        Mapa = América;
        Datos = data;
        CargarMapa(América, data, 0)
    });
});
