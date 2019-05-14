import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const NavBar = ({ActiveIndex}) => {

    const mobileTabletNavBar = () => {
        //hide-on-large-only
        return (
                <nav className="hide-on-large-only">
                    <div className="nav-wrapper">                
                        <ul id="nav-mobile" className="left">
                            <li className={ ActiveIndex==="Dashboard" ? "active" : ""}>
                                <Link to="/Dashboard" className="left">    
                                    <i className="left material-icons">alarm</i>                              
                                </Link>
                            </li>
                            <li className={ ActiveIndex==="ContractLists" ? "active" : ""}>
                                <Link to="/ContractLists">
                                    <i className="left material-icons">format_list_numbered</i>                                
                                </Link>
                            </li>
                            <li className={ ActiveIndex==="Reports" ? "active" : ""}>
                                <Link to="/Reports">
                                    <i className="left material-icons">library_books</i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
        )
    }
    
    const desktopNavBar = () => {
        return (
            <nav className="hide-on-med-and-down">
                    <div className="nav-wrapper">                
                        <ul id="nav-mobile" className="left">
                            <li className={ ActiveIndex==="Dashboard" ? "active" : ""}>
                                <Link to="/Dashboard" className="left">    
                                    <i className="left material-icons">alarm</i>
                                    <span className="left">การแจ้งเตือน</span>                                   
                                </Link>
                            </li>
                            <li className={ ActiveIndex==="ContractLists" ? "active" : ""}>
                                <Link to="/ContractLists">
                                    <i className="left material-icons">format_list_numbered</i>
                                    <span className="left">รายการทั้งหมด</span>                                      
                                </Link>
                            </li>
                            <li className={ ActiveIndex==="Reports" ? "active" : ""}>
                                <Link to="/Reports">
                                    <i className="left material-icons">library_books</i>
                                    <span className="left">รายงาน</span>                                      
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
        )
    }

    return (
        <div style={{marginBottom:'2px'}}>
                {mobileTabletNavBar(ActiveIndex)}
                {desktopNavBar(ActiveIndex)}
        </div>
    )
}

export default withRouter(NavBar)

