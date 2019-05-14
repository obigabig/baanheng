import React from 'react'

const DataNotFound = () => {

    const style = {
        padding: '15px',
        fontSize: 'large'
    }

    return (
        <div className="grey lighten-4 grey-text center-align" style={style}>
            <div> 
                <i className="medium material-icons">sentiment_very_dissatisfied</i>
            </div>
            <div>
                ไม่พบข้อมูล
            </div>            
        </div>
    )
}

export default (DataNotFound)