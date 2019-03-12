import React, { Component } from 'react';
import '../RevenueProtected/revenueProtected.css'
import {Doughnut} from 'react-chartjs-2';

class ProTransDoughnutGraph extends Component {
  render() {
    let {proTransData} = this.props;
    const data = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0,0,70,0);
    gradient.addColorStop(0, '#45DCE5');
    gradient.addColorStop(1, '#8287ED');

        return {
            labels: ["Protected Transactions", "Not Protected"],
            datasets: [{
            label: "Protected Transactions",
            backgroundColor: [
                gradient,
            ],
            borderWidth: 0,
            data: [proTransData, 100-proTransData],
            // data: [80, 20],
            }],
        }
    }
    return (
        <div className="pro-trans-doughnut">
            <Doughnut
                data={data}
                width={100}
                height={55}
                options={{
                    maintainAspectRatio: false,
                    cutoutPercentage: 93,
                    legend: false,
                    tooltips: { enabled: false },
                    hover: { mode: null }
                }}
            />
        </div>
    );
  }
}

export default ProTransDoughnutGraph;