import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const NavBar = ({ActiveIndex}) => {
    return (
        <div style={{marginBottom:'2px'}}>
            <nav>
                <div className="nav-wrapper">
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li className={ ActiveIndex==="Dashboard" ? "active" : ""}>
                        <Link to="/Dashboard">       
                            การแจ้งเตือน
                        </Link>
                    </li>
                    <li className={ ActiveIndex==="ContractLists" ? "active" : ""}>
                        <Link to="/ContractLists">
                            รายการทั้งหมด
                        </Link>
                    </li>
                    <li className={ ActiveIndex==="Reports" ? "active" : ""}>
                        <a href="/Reports">รายงาน</a>
                    </li>
                </ul>
                </div>
            </nav>
        </div>
    )
}

export default withRouter(NavBar)

