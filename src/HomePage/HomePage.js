import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import * as d3 from "d3";
import axios from "axios";


function HomePage() {

    const [budgetData, setBudgetData] = useState([]);
    var dataSource = {
        datasets: [
          {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#b882fa',
                '#7ba699',
                '#e67d57'
            ],
          },
        ],
        labels: [],
      };

    const fetchData = async () => {
        
        axios.get('http://localhost:3001/budget')
        .then( (res) => {
            for (var i = 0; i < res.data.myBudget.length; i++) {
                dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
                dataSource.labels[i] = res.data.myBudget[i].title;
              }
            setBudgetData(res.data.myBudget);
            createPieChart();
            d3jsChart(res.data.myBudget);
        } )
        .catch( (e) => {
            console.log(e);
        })
      };

    useEffect(() => {
        fetchData();
    }, []);

    function createPieChart(){
        var ctx = document.getElementById("myChart").getContext("2d");
        var myPieChart = new Chart(ctx, {
            type: "pie",
            data: dataSource
        });        
    }

    const d3jsChart = (data) => {
        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;
    
        const svg = d3.select('#d3js-chart')
                      .append('svg')
                      .attr('width', width)
                      .attr('height', height)
                      .append('g')
                      .attr('transform', `translate(${width / 2},${height / 2})`);

        const customColors = [ 
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#b882fa',
                '#7ba699',
                '#e67d57'
            ];

    
        const color = d3.scaleOrdinal()
                .domain(data.map(d => d.title))
                .range(customColors); // 
    
        const pie = d3.pie()
                      .value(d => d.budget)
                      .sort(null);
    
        const arc = d3.arc()
                      .innerRadius(radius * 0.3)
                      .outerRadius(radius * 0.8);
    
        const outerArc = d3.arc()
                           .innerRadius(radius * 0.85)
                           .outerRadius(radius * 0.85);
    
        const arcs = svg.selectAll('arc')
                        .data(pie(data))
                        .enter()
                        .append('g')
                        .attr('class', 'arc');
    
        arcs.append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(i))
            .attr('class', 'slice');
    
        
        arcs.filter(d => (d.endAngle + d.startAngle) / 2 < Math.PI)
            .append('text')
            .attr('transform', function(d) {
                const pos = outerArc.centroid(d);
                return 'translate(' + pos + ')';
            })
            .attr('dy', '.35em')
            .style('text-anchor', 'start')
            .text(d => d.data.title);
    
        arcs.filter(d => (d.endAngle + d.startAngle) / 2 < Math.PI)
            .append('polyline')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('fill', 'none')
            .attr('points', function(d) {
                const pos = outerArc.centroid(d);
                return [arc.centroid(d), outerArc.centroid(d), pos];
            });
    
        
        arcs.filter(d => (d.endAngle + d.startAngle) / 2 >= Math.PI)
            .append('text')
            .attr('transform', function(d) {
                const pos = outerArc.centroid(d);
                pos[0] = pos[0] - 10; 
                return 'translate(' + pos + ')';
            })
            .attr('dy', '.35em')
            .style('text-anchor', 'end')
            .text(d => d.data.title);
    
        arcs.filter(d => (d.endAngle + d.startAngle) / 2 >= Math.PI)
            .append('polyline')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('fill', 'none')
            .attr('points', function(d) {
                const pos = outerArc.centroid(d);
                pos[0] = pos[0] - 10; 
                return [arc.centroid(d), outerArc.centroid(d), pos];
            });
    
    };

    return (
      <main className="center" id="main">

        <div className="page-area">

            <article>
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>
    
            <article>
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>
    
            <article>
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </article>
    
            <article>
                <h1>Free</h1>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </article>
    
            <article>
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>
    
            <article>
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>
    
            <article>
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </article>
    
            <article>
                <h1>Chart</h1>
                <p>
                    <canvas id="myChart" width="400" height="400"></canvas>
                </p>
            </article>
                
            <div>
                <h1>D3JS Chart</h1>
                <svg id="d3js-chart" style={{ height: 400, width: 450 }}></svg>
            </div>

        </div>

    </main>
    );
  }
  
  export default HomePage;
  