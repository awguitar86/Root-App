import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import '../RevenueProtected/revenueProtected.css'

class RevenueLineGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            lineChartOptions: {
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                color: '#9799A8',
                                display: false,
                                drawBorder: true,
                            },
                            ticks: {
                                fontColor:'#9799A8'
                            },
                        }],
                        yAxes: [{
                            gridLines: {
                                color: '#9799A8',
                                drawBorder: false,
                                lineWidth: 0.5
                            },
                            ticks: {
                                fontColor:'#9799A8',
                                beginAtZero: true
                            },
                            scaleLabel: {
                                display: true,
                                fontColor: '#9799A8',
                                labelString: 'Revenue Protected ( $ )'
                            }
                        }],
                    },
                    tooltips: {
                        backgroundColor: '#445072',

                    }
            },
        }
    }

    render() {
        let {labels, lineData} = this.props;

        const data = (canvas) => {
            const ctx = canvas.getContext('2d');
            const gradient = ctx.createLinearGradient(0,0,800,0);
            gradient.addColorStop(0, '#E64688');
            gradient.addColorStop(1, '#AA54F8');
            const circleGradient = ctx.createRadialGradient(75,50,5,90,60,100)
            circleGradient.addColorStop(1, '#fff');
            circleGradient.addColorStop(0, 'rgba(255,255,255,0)');
            return {
                labels: labels ? labels : [],
                datasets: [{
                    label: 'Revenue Protected',
                    fill: false,
                    lineTension: 0.4,
                    borderColor: gradient,
                    borderCapStyle: 'butt',
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'none',
                    pointBackgroundColor: 'none',
                    pointBorderWidth: 0,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderWidth: 0,
                    pointHoverBorderColor: '#fffff00',
                    pointRadius: 0,
                    pointHitRadius: 10,
                    pointStyle: 'circle',
                    data: lineData ? lineData : [],
                }]
            }
        }
        return (
            <div className="line-graph">
                <Line
                    data={data}
                    options={this.state.lineChartOptions}
                    id='lineGraph'
                />
            </div>
        );
    }
}

export default RevenueLineGraph;