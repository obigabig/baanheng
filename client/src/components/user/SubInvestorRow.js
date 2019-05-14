import React, { Component } from 'react'
import FormSubInvestor from './FormSubInvestor'

class SubInvestorRow extends Component{

    render() {
        const { _id, name, index } = this.props
        const { isShowEdit, showEditForm, closeEditForm } = this.props

        if(isShowEdit){
            return (
                <li>
                    <FormSubInvestor 
                        mode="Edit" 
                        _id={_id}
                        name={name}
                        onCancel={() => closeEditForm()
                    } />
                </li>
            )
        }

        return (
            <li className="collection-item">  
                <div>
                    {`#${index+1}: ${name}`}
                    { index === 0 ? 
                        '' : 
                        <a href="#!" 
                            className="secondary-content"
                            onClick={() => showEditForm()}
                        >
                            <i className="material-icons">edit
                            </i>
                        </a>
                    }
                </div>             
            </li>
        )
    }
}

export default (SubInvestorRow)