import React, {Component} from 'react'
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react'

/*
后台管理的饼图路由组件
 */
export default class Pie extends Component {

  getOption = () => {
    return {
      title : {
        text: 'Site user access source',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Direct Access','Email Marketing','Google AdSense','Video Advertisement','Search Engine'],
      },
      series : [
        {
          name: 'Referer',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:335, name:'Direct Access'},
            {value:310, name:'Email Marketing'},
            {value:234, name:'Google AdSense'},
            {value:135, name:'Video Advertisement'},
            {value:1548, name:'Search Engine'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

  }

  getOption2 = () => {
    return {
      backgroundColor: '#2c343c',

      title: {
        text: '访问来源',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },

      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },

      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series : [
        {
          name:'访问来源',
          type:'pie',
          radius : '55%',
          center: ['50%', '50%'],
          data:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:274, name:'联盟广告'},
            {value:235, name:'视频广告'},
            {value:400, name:'搜索引擎'}
          ].sort(function (a, b) { return a.value - b.value; }),
          roseType: 'radius',
          label: {
            normal: {
              textStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            }
          },
          itemStyle: {
            normal: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <Card title='Pie Chart English'>
          <ReactEcharts option={this.getOption()} style={{height: 400}}/>
        </Card>
        <Card title='Pie Chart Chinese Version'>
          <ReactEcharts option={this.getOption2()} style={{height: 400}}/>
        </Card>
      </div>
    )
  }
}
