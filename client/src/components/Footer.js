import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class Footer extends Component {
    render() {
        
        return (
            <footer className="page-footer teal lighten-2">
            <div className="container">
            <div className="row">
                <div className="col l6 s12">
                <h5 className="white-text">Baan-hengheng Admin</h5>
                    <p className="grey-text text-lighten-4">
                        ระบบบัญทึกสัญญาจำนอง-ขายฝาก
                    </p>
                </div>
                <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Menus</h5>
                <ul>
                    <li><Link to="/Dashboard" className="grey-text text-lighten-3" href="#!">การแจ้งเตือน</Link></li>
                    <li><Link to="/ContractLists" className="grey-text text-lighten-3" href="#!">รายการทั้งหมด</Link></li>
                    <li><Link to="/Reports" className="grey-text text-lighten-3" href="#!">รายงาน</Link></li>
                </ul>
                </div>
            </div>
            </div>
            <div className="footer-copyright">
            <div className="container">
            © 2018 Copyright Text
            <a className="grey-text text-lighten-4 right" href="#!">Contact admin</a>
            </div>
            </div>
            </footer>
        )
    }
}

export default withRouter(Footer);