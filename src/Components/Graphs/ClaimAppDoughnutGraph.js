import React, { Component } from 'react';
import '../RevenueProtected/revenueProtected.css'
import {Doughnut} from 'react-chartjs-2';

class ClaimAppDoughnutGraph extends Component {
  render() {
    let {proTransData} = this.props;
    const data = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0,0,90,0);
    gradient.addColorStop(0, '#AA54F8');
    gradient.addColorStop(1, '#E64688');
        return {
            labels: ["Claim Approval", "Not Approved"],
            datasets: [{
            label: "Claim Approval",
            backgroundColor: [
                gradient,
            ],
            borderWidth: 0,
            data: [proTransData, 100-proTransData],
            }],
        }
    }
    return (
        <div className="claim-approval-doughnut">
            <Doughnut
                data={data}
                width={50}
                height={25}
                options={{
                    maintainAspectRatio: false,
                    cutoutPercentage: 93,
                    legend: false
                }}
            />
        </div>
    );
  }
}

export default ClaimAppDoughnutGraph;