import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class CustomPlot extends Component {
  render() {
    const { data } = this.props;
    const x = data.filter(d => d.sender === 'Rating 2').map(e => e.sender_id);
    const y = data.filter(d => d.sender === 'Rating 2').map(e => e.rating_post);

    return (
      <Plot
        data={[
          {
            x,
            y,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
        ]}
        layout={{ title: 'Your post ratings' }}
      />
    );
  }
}

export default CustomPlot;
