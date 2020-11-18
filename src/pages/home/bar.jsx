import React from "react"
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts"

export default class Bar extends React.Component {
  render() {
    const data = [
      {
        year: "Jan.",
        sales: 38
      },
      {
        year: "Feb.",
        sales: 52
      },
      {
        year: "March",
        sales: 61
      },
      {
        year: "April",
        sales: 145
      },
      {
        year: "May",
        sales: 48
      },
      {
        year: "June",
        sales: 38
      },
      {
        year: "July",
        sales: 28
      },
      {
        year: "Aug.",
        sales: 38
      },
      {
        year: "Sept.",
        sales: 68
      },
      {
        year: "Oct.",
        sales: 38
      },
      {
        year: "Nov.",
        sales: 58
      },
      {
        year: "Dec.",
        sales: 38
      }
    ]
    const cols = {
      sales: {
        tickInterval: 20
      }
    }
    return (
      <div style={{width: '100%', marginLeft: -30}}>
        <Chart height={338} data={data} scale={cols} forceFit>
          <Axis name="year"/>
          <Axis name="sales"/>
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="interval" position="year*sales"/>
        </Chart>
      </div>
    )
  }
}