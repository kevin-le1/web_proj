// candle.tsx created using https://apexcharts.com/react-chart-demos/candlestick-charts/basic/ as reference
// Couldn't get a library to work that supports this

import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface CandlestickItem {
  x: string; // Date in string format
  o: number; // Open price
  h: number; // High price
  l: number; // Low price
  c: number; // Close price
}

interface ApexChartProps {
  candlestickData: CandlestickItem[];
}

class ApexChart extends React.Component<ApexChartProps> {
  state = {
    series: [{
      data: this.formatData(this.props.candlestickData)
    }],
    options: {
      chart: {
        type: 'candlestick',
        height: 350
      },
      title: {
        text: 'Candlestick Chart',
        align: 'left'
      },
      xaxis: {
        type: 'datetime',
        labels: {
          format: 'dd MMM',
        }
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    } as ApexOptions
  };

  componentDidUpdate(prevProps: ApexChartProps) {
    if (prevProps.candlestickData !== this.props.candlestickData) {
      this.setState({
        series: [{
          data: this.formatData(this.props.candlestickData)
        }]
      });
    }
  }

  formatData(data: CandlestickItem[]) {
    return data.map(item => ({
      x: new Date(item.x).getTime(),
      y: [item.o, item.h, item.l, item.c]
    }));
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="candlestick" height={350} />
      </div>
    );
  }
}

export default ApexChart;
