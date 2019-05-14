import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class HomeScreen extends Component {

  componentWillMount() {
    if(this.props.authenticated){
      this.props.history.push('/Dashboard')
    }
    else{
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <div className="row grey lighten-3">
        <div className="col s12"> 
          <img src={require('../img/mainPic.jpg')} 
            alt="home pic"
            style={{width: '100%',
            margin: '10px 0px 10px 0px'}} />
        </div>        
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { 
              authenticated: auth.authenticated 
          };
}

export default connect(mapStateToProps) (withRouter(HomeScreen));

