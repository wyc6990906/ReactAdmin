import React, {Component} from 'react'
import {
  Icon,
  Card,
  Statistic,
  DatePicker,
  Timeline
} from 'antd'
import moment from 'moment'

import Line from './line'
import Bar from './bar'
import './home.less'

const dateFormat = 'YYYY/MM/DD'
const {RangePicker} = DatePicker
export default class Home extends Component {
  state = {
    isVisited: true
  }

  handleChange = (isVisited) => {
    return () => this.setState({isVisited})
  }

  render() {
    const {isVisited} = this.state

    return (
      <div className='home'>
        <Card
          className="home-card"
          title="Total Volume"
          extra={<Icon style={{color: 'rgba(0,0,0,.45)'}} type="question-circle"/>}
          style={{width: 250}}
          headStyle={{color: 'rgba(0,0,0,.45)'}}
        >
          <Statistic
            value={8241314}
            style={{fontWeight: 'bolder'}}
          />
          <Statistic
            value={15}
            valueStyle={{fontSize: 15}}
            prefix={'Week compared'}
            suffix={<div>%<Icon style={{color: 'red', marginLeft: 10}} type="arrow-down"/></div>}
          />
          <Statistic
            value={10}
            valueStyle={{fontSize: 15}}
            prefix={'Day compared'}
            suffix={<div>%<Icon style={{color: '#3f8600', marginLeft: 10}} type="arrow-up"/></div>}
          />
        </Card>

        <Line/>

        <Card
          className="home-content"
          title={<div className="home-menu">
            <span className={isVisited ? "home-menu-active home-menu-visited" : 'home-menu-visited'}
                  onClick={this.handleChange(true)}>Visit</span>
            <span className={isVisited ? "" : 'home-menu-active'} onClick={this.handleChange(false)}>Sales</span>
          </div>}
          extra={<RangePicker
            defaultValue={[moment('2020/01/01', dateFormat), moment('2019/11/01', dateFormat)]}
            format={dateFormat}
          />}
        >
          <Card
            className="home-table-left"
            title={isVisited ? 'Visitor Trending' : 'Sales Trending'}
            bodyStyle={{padding: 0, height: 275}}
            extra={<Icon type="reload"/>}
          >
            <Bar/>
          </Card>

          <Card title='Task' extra={<Icon type="reload"/>} className="home-table-right">
            <Timeline>
              <Timeline.Item color="green">First Group Meeting</Timeline.Item>
              <Timeline.Item color="green">Complete the first version of the website design</Timeline.Item>
              <Timeline.Item color="red">
                <p>Alignment interface</p>
                <p>The function acceptance</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>Login function Design</p>
                <p>Permission verify</p>
                <p>The page layout</p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Card>
      </div>
    )
  }
}