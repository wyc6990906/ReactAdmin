import React, {Component} from "react";
import {Button, Card} from "antd";
import ReactEcharts from "echarts-for-react";

export default class Bar extends Component {
  state = {
    sales: [5, 20, 36, 10, 10, 20],
    stores: [10, 22, 40, 20, 20, 30]
  }
  update = () => {
    this.setState(state => ({
      sales: state.sales.map(sale => sale + 1),
      stores: state.stores.reduce((pre, store) => {
        pre.push(store - 1)
        return pre
      }, []),
    }))
  }

  getOption = (stores, sales) => {
    return {
      title: {
        text: 'ECharts Demo'
      },
      tooltip: {},
      legend: {
        data: ['Sales', 'Inventory']
      },
      xAxis: {
        data: ["AJ10 Tinker", "Kobe V Chaos",
          "Rebook Question 1", "Why not zero 0.1", "Why not zero 0.2", "TMAC 5 Gold"]
      },
      yAxis: {},
      series: [{
        name: 'Sales',
        type: 'bar',
        data: sales
      }, {
        name: 'Inventory',
        type: 'bar',
        data: stores
      }
      ]
    }
  }

  render() {
    const {stores, sales} = this.state
    return (
      <div>
        <Card>
          <Button type='primary' onClick={this.update}>Update</Button>
        </Card>
        <Card title='Bar Chart '>
          <ReactEcharts option={this.getOption(stores, sales)}/>
        </Card>
      </div>
    )
  }
}