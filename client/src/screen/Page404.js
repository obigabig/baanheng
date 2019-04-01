
import React, { Component } from 'react';

class Page404 extends Component {
    render(){
        return(
            
                <div >                    
                    <img src={require('../img/Page-not-found.png')} 
                        alt="Page not found"
                            style={{width: '100%',
                            margin: '10px 0px 10px 0px'}} />
                </div>
           
        )
    }
}

export default (Page404); 