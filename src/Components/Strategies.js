import React, { Component } from 'react';
import {getStrategies} from '../repository';

class Strategies extends Component {

  constructor(props) {
    super(props);
    this.state = { tips: [] };
  }

  componentDidMount() {
    getStrategies().then((tips) => {
      this.setState({ tips });
    });
  }

  render() {

    return (
      <div>
        <h3 className="text-center">Strategies</h3>
        <hr/>
        { 
          this.state.tips.map((tip) => (
              <div className="col-sm-10 col-sm-offset-1" key={tip.symbol}>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title"> <span className="btn">#{ tip.id }</span></h3>
                  </div>
                  <div className="panel-body">
                    <p> { tip.interval } </p>
                  </div>
                </div>
              </div>
          ))
        }
      </div>
    );
  }
}

export default Strategies;