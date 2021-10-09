import React, {Component} from 'react';
import {getPositions, isAuthenticated} from '../repository';
import {Redirect} from 'react-router-dom';

class Positions extends Component {

 constructor(props) {
  super(props);
  this.state = {positions: [], auth: true};
 }

 componentDidMount() {
  if (isAuthenticated())
   getPositions().then((positions) => {
    this.setState({positions});
   }).catch(err => {
    alert('User Not Authenticated');
    this.setState({auth: false}
    )
   })
  else {
   alert('User Not Authenticated');
   this.setState({auth: false})
  }
 }

 render() {
  return (
      <div>
       {(this.state.auth) ? '' : <Redirect to="/"/>}
       <h3 className="text-center">Positions</h3>
       <hr/>
       {
        this.state.positions.map((pos) => (
            <div className="col-sm-10 col-sm-offset-1" key={pos.id}>
             <div className="panel panel-success">
              <div className="panel-heading">
               <h3 className="panel-title">
                <span className="btn">#{pos.id}</span></h3>
              </div>
              <div className="panel-body">
               <p> {pos.symbol.symbol} </p>
              </div>
             </div>
            </div>
        ))
       }
      </div>
  );
 }
}

export default Positions;