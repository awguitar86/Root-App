import React, {Component} from 'react';
import './revenueProtected.css';
import { updateMerchant, updateEntity, updatePlatform, updateUser } from '../../Redux/actions';
import { connect } from 'react-redux';
import RevenueLineGraph from '../Graphs/RevenueLineGraph';
import ProTransDoughnutGraph from '../Graphs/ProTransDoughnutGraph';
// import ClaimAppDoughnutGraph from '../Graphs/ClaimAppDoughnutGraph';
// import moment from 'moment';
import { findGraphData, findGraphDataByDate, findMerchant } from '../../services/merchant.service';
import { findPlatformGraph, findPlatformGraphDate} from '../../services/platform.service';
import { findAllOrders } from '../../services/order.services';


class RevenueProtected extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lineGraphLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            lineGraphData: [0, 50, 98, 130, 169, 205, 380, 450, 525, 480, 400, 376, 300, 324, 385, 438, 491, 540, 600, 650, 520, 468, 430, 370],
            role: 'platform.admin',
            stats: []
          };
          this.handleAll = this.handleAll.bind(this);
          this.handleYear = this.handleYear.bind(this);
          this.handleMonth = this.handleMonth.bind(this);
          this.handleWeek = this.handleWeek.bind(this);
          this.handleDay = this.handleDay.bind(this);
      }

    // componentDidMount(){
    //     let merchId = this.props.merchantInfo.id;
    //     let platId = this.props.platformInfo.id;
    //     let entity = this.props.entityInfo.entity;
    //     if(entity.includes('ROUTE_PLATFORM')){
    //         findPlatformGraph(platId)
    //         .then( res => {
    //             console.log(res.data);
    //             this.setState({
    //                 lineGraphLabels: res.data.labels,
    //                 lineGraphData: res.data.data,
    //                 stats: this.props.platformInfo.stats
    //             });
    //         })
    //     }
    //     else {
    //         findAllOrders(merchId)
    //             .then( res => {
    //                 console.log(res.data[0]);
    //                 if(res.data[0]){
    //                     findGraphData(merchId)
    //                     .then( res => {
    //                         console.log(res.data);
    //                         this.setState({
    //                             lineGraphLabels: res.data.labels,
    //                             lineGraphData: res.data.data,
    //                             stats: this.props.merchantInfo.stats
    //                         });
    //                     })
    //                 }
    //                 else {
    //                     this.setState({
    //                         lineGraphLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    //                         lineGraphData: [0, 50, 98, 130, 169, 205, 380, 450, 525, 480, 400, 376, 300, 324, 385, 438, 491, 540, 600, 650, 520, 468, 430, 370],
    //                         stats: {
    //                             revenue_insured: '5,689',
    //                             total_transactions: '3,568',
    //                             number_of_insured: '1,457',
    //                             uptake_percentage: 68
    //                         }
    //                     });
    //                 }
    //             })
    //     }
    // }

    handleDay(){
        let merchId = this.props.merchantInfo.id;
        let platId = this.props.platformInfo.id;
        let entity = this.props.entityInfo.entity;
        let date = 'DAY'
        console.log(this.state);
        if(entity.includes('ROUTE_PLATFORM')){
            findPlatformGraphDate(platId, date)
            .then( res => {
                if (res.status !== 200){
                    alert(res);
                }
                else {
                this.setState({
                    lineGraphLabels: res.data.labels,
                    lineGraphData: res.data.data
                });
                console.log(res.data);
                }
            })
        }
        else {
            findAllOrders(merchId)
                .then( res => {
                    console.log(res.data[0]);
                    if(res.data[0]){
                        findGraphData(merchId)
                        .then( res => {
                            console.log(res.data);
                            this.setState({
                                lineGraphLabels: res.data.labels,
                                lineGraphData: res.data.data,
                                stats: this.props.merchantInfo.stats
                            });
                        })
                    }
                    else {
                        this.setState({
                            lineGraphLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
                            lineGraphData: [0, 50, 98, 130, 169, 205, 380, 450, 525, 480, 400, 376, 300, 324, 385, 438, 491, 540, 600, 650, 520, 468, 430, 370],
                            stats: {
                                revenue_insured: '5,689',
                                total_transactions: '3,568',
                                number_of_insured: '1,457',
                                uptake_percentage: 68
                            }
                        });
                    }
                })
        }
    }
    handleWeek(){
        let merchId = this.props.merchantInfo.id;
        let platId = this.props.platformInfo.id;
        let entity = this.props.entityInfo.entity;
        let date = 'WEEK'
        console.log(this.state);
        if(entity.includes('ROUTE_PLATFORM')){
            findPlatformGraphDate(platId, date)
            .then( res => {
                if (res.status !== 200){
                    alert(res);
                }
                else {
                this.setState({
                    lineGraphLabels: res.data.labels,
                    lineGraphData: res.data.data
                });
                console.log(res.data);
                }
            })
        }
        else {
            findAllOrders(merchId)
            .then( res => {
                console.log(res.data[0]);
                if(res.data[0]){
                    findGraphData(merchId)
                    .then( res => {
                        console.log(res.data);
                        this.setState({
                            lineGraphLabels: res.data.labels,
                            lineGraphData: res.data.data,
                            stats: this.props.merchantInfo.stats
                        });
                    })
                }
                else {
                    this.setState({
                        lineGraphLabels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                        lineGraphData: [98, 205, 380, 450, 525, 480, 376],
                        stats: {
                            revenue_insured: '5,689',
                            total_transactions: '3,568',
                            number_of_insured: '1,457',
                            uptake_percentage: 68
                        }
                    });
                }
            })
        }
    }
    handleMonth(){
        let merchId = this.props.merchantInfo.id;
        let platId = this.props.platformInfo.id;
        let entity = this.props.entityInfo.entity;
        let date = 'MONTH'
        console.log(this.state);
        if(entity.includes('ROUTE_PLATFORM')){
            findPlatformGraphDate(platId, date)
            .then( res => {
                if (res.status !== 200){
                    alert(res);
                }
                else {
                this.setState({
                    lineGraphLabels: res.data.labels,
                    lineGraphData: res.data.data
                });
                console.log(res.data);
                }
            })
        }
        else {
            findAllOrders(merchId)
            .then( res => {
                console.log(res.data[0]);
                if(res.data[0]){
                    findGraphData(merchId)
                    .then( res => {
                        console.log(res.data);
                        this.setState({
                            lineGraphLabels: res.data.labels,
                            lineGraphData: res.data.data,
                        });
                    })
                }
                else {
                    this.setState({
                        lineGraphLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                        lineGraphData: [0, 50, 98, 130, 169, 205, 380, 450, 525, 480, 400, 376, 300, 324, 385, 438, 491, 540, 600, 650, 520, 468, 430, 370, 450, 525, 480, 400, 376, 300],
                    });
                }
            })
        }
    }
    handleYear(){
        let merchId = this.props.merchantInfo.id;
        let platId = this.props.platformInfo.id;
        let entity = this.props.entityInfo.entity;
        let date = 'YEAR'
        console.log(this.state);
        if(entity.includes('ROUTE_PLATFORM')){
            findPlatformGraphDate(platId, date)
            .then( res => {
                if (res.status !== 200){
                    alert(res);
                }
                else {
                this.setState({
                    lineGraphLabels: res.data.labels,
                    lineGraphData: res.data.data
                });
                console.log(res.data);
                }
            })
        }
        else {
            findAllOrders(merchId)
            .then( res => {
                console.log(res.data[0]);
                if(res.data[0]){
                    findGraphData(merchId)
                    .then( res => {
                        console.log(res.data);
                        this.setState({
                            lineGraphLabels: res.data.labels,
                            lineGraphData: res.data.data,
                        });
                    })
                }
                else {
                    this.setState({
                        lineGraphLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        lineGraphData: [50, 98, 130, 169, 205, 380, 450, 525, 480, 400, 376, 300],
                    });
                }
            })
        }
    }
    handleAll(){
        let merchId = this.props.merchantInfo.id;
        let platId = this.props.platformInfo.id;
        let entity = this.props.entityInfo.entity;
        let date = 'ALL'
        console.log(this.state);
        if(entity.includes('ROUTE_PLATFORM')){
            findPlatformGraphDate(platId, date)
            .then( res => {
                if (res.status !== 200){
                    alert(res);
                }
                else {
                this.setState({
                    lineGraphLabels: res.data.labels,
                    lineGraphData: res.data.data
                });
                console.log(res.data);
                }
            })
        }
        else {
            findAllOrders(merchId)
            .then( res => {
                console.log(res.data[0]);
                if(res.data[0]){
                    findGraphData(merchId)
                    .then( res => {
                        console.log(res.data);
                        this.setState({
                            lineGraphLabels: res.data.labels,
                            lineGraphData: res.data.data,
                        });
                    })
                }
                else {
                    this.setState({
                        lineGraphLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
                        lineGraphData: [0, 50, 98, 130, 169, 205, 380, 450, 525, 480, 400, 376, 300, 324, 385, 438, 491, 540, 600, 650, 520, 468, 430, 370],
                    });
                }
            })
        }
    }

    // handleSelectChange = (selectedOption) => {
    //     this.setState({ selectedOption });
    //     console.log(`Option selected:`, selectedOption);
    //   }

    render() {
        console.log(this.state);
        const { stats } = this.state;
        let uptakePercent = stats.uptake_percentage
        let newUptakePercent = Math.round(uptakePercent);
        return (
            <div className='revenue-container'>

                <div className='revenue-header'>
                    <div className='revenue-header-text'>
                        <h3>Revenue Protected</h3>
                        {/* <h1>${stats.revenue_insured ? stats.revenue_insured : '$0' }</h1> */}
                        <h1>$5,849</h1>
                    </div>
                    <div className='protected-transaction-info'>
                        <div className='total-transactions'>
                            <p>Total Transactions</p>
                            {/* <h3>{ stats.total_transactions ? stats.total_transactions : '0' }</h3> */}
                            <h3>25,000</h3>
                        </div>
                        <hr/>
                        <div className='protected'>
                            <p>Protected</p>
                            {/* <h3>{stats.number_of_insured ? stats.number_of_insured : '0' }</h3> */}
                            <h3>14,485</h3>
                        </div>
                    </div>
                    <div className='revenue-header-right'>
                    {/* <Select
                        value={selectedOption}
                        onChange={this.handleSelectChange}
                        options={merchants}
                        className='merchant-select'
                    /> */}
                    </div>
                </div>

                <div className='revenue-body'>
                    <div className='line-graph-wrap'>
                        <div className='revenue-line-graph'>
                            <RevenueLineGraph
                                labels={this.state.lineGraphLabels ? this.state.lineGraphLabels : 0}
                                lineData={this.state.lineGraphData ? this.state.lineGraphData : 0}
                                // labels={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]}
                                // lineData={[0, 50, 98, 130, 169, 205, 380, 450, 525, 480, 400, 376, 300, 324, 385, 438, 491, 540, 600, 650, 520, 468, 430, 370]}
                            />
                        </div>
                        <div className='line-graph-dates'>
                            <div className='date-buttons'>
                                <button className='date-buttons-day' onClick={this.handleDay}>Day</button>
                                <button className='date-buttons-week' onClick={this.handleWeek}>Week</button>
                                <button className='date-buttons-month' onClick={this.handleMonth}>Month</button>
                                <button className='date-buttons-year' onClick={this.handleYear}>Year</button>
                                <button className='date-buttons-all' onClick={this.handleAll}>All</button>
                            </div>
                        </div>
                    </div>
                    <div className='revenue-charts'>
                        <div className='protected-transactions'>
                            <div className='protected-circle-chart'>
                                <div className="protected-circle-text">
                                    {/* <h3>{ newUptakePercent ? newUptakePercent : 0}%</h3> */}
                                    <h3>85%</h3>
                                    <p>Protected<br/>Transactions</p>
                                </div>
                                <ProTransDoughnutGraph
                                    // proTransData={ newUptakePercent ? newUptakePercent : 0}
                                    proTransData={85}
                                />
                            </div>
                            {/* <div className='claim-circle-chart'>
                                <div className="claim-circle-text">
                                    <h3>{this.props.merchantInfo.claim_approval_percent}%</h3>
                                    <p>Claim<br/>Approval</p>
                                </div>
                                <ClaimAppDoughnutGraph
                                    proTransData={this.props.merchantInfo.claim_approval_percent}
                                />
                            </div> */}
                        {/* </div>
                            <div className='claim-approval'>
                                <div className='claim-approval-info'>
                                    <div className='cai'>
                                        <p>Total Claims</p>
                                        <h3>{this.props.merchantInfo.total_claims}</h3>
                                    </div>
                                    <hr/>
                                    <div className='cai'>
                                        <p>Approved</p>
                                        <h3>{this.props.merchantInfo.approved_claims}</h3>
                                    </div>
                                    <hr/>
                                    <div className='cai'>
                                        <p>Pending</p>
                                        <h3>{this.props.merchantInfo.pending}</h3>
                                    </div>
                                    <hr/>
                                    <div className='cai'>
                                        <p>Denied</p>
                                        <h3>{this.props.merchantInfo.denied}</h3>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {updateMerchant, updateEntity, updatePlatform, updateUser}) (RevenueProtected);