import React, { Component } from 'react';
import {
  reduxForm,
  Field,
  FieldArray,
  getFormValues,
  FormSection,
  getFormSyncErrors
} from 'redux-form';
import { compose } from 'redux';
import { ContractStatus, ContractType, PropertyType } from '../../const';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from '../../utils/format';
import Popup from 'react-popup';
import 'react-popup/style.css';

//Sub component
import ContractFormActions from './ContractFormActions';
import ContractFormSubInvestors from './ContractFormSubInvestors';
import ContractFormDebtor from './ContractFormDebtor';
import ContractFormLocation from './ContractFormLocation';
import contractFormValidate from './contractFormValidate';
import contractFormSubmitValidate from './contractFormSubmitValidate';
import SelectInputAsync from '../reduxFormComponent/SelectInputAsync';

//reduxFormComponent
import SelectInput from '../reduxFormComponent/SelectInput';
import TextInput from '../reduxFormComponent/TextInput';
import TextArea from '../reduxFormComponent/TextArea';
import NumberInput from '../reduxFormComponent/NumberInput';
import Datepicker from '../reduxFormComponent/Datepicker';
import SubmitButton from '../reduxFormComponent/SubmitButton';
import Spinner from '../reduxFormComponent/SubmitSpinner';
import {
  initContractFormAction,
  createContractAction,
  updateContractAction,
  getContractAction,
  updateContractSubInvestorFormAction,
  deleteContractAction,
  clearErrorMessageAction
} from '../../actions';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export class ContractForm extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      formData: {}
    };
  }

  componentDidMount() {
    if (this.props.mode === 'new') {
      this.props.initContractFormAction(() => {
        this.props.initialize({
          contractLocation: { url: '' },
          contractSubInvestors: [
            {
              _userSubInvestor: this.props.contracts.data.subInvestor._id,
              value: ''
            }
          ]
        });
      });
    } else if (this.props.mode === 'edit') {
      this.props.getContractAction(this.props.id, () => {
        const {
          no,
          title,
          type,
          value,
          pact,
          status,
          description,
          beginDate,
          closeDate,
          _signBy,
          actions,
          debtor,
          subInvestor,
          googleMapsUrl
        } = this.props.contracts.data;

        if (this.props.contracts.data) {
          this.props.initialize({
            no,
            title,
            description,
            type,
            value,
            pact,
            status,
            beginDate,
            closeDate,
            _signBy,
            contractActions: actions,
            contractDebtor: debtor,
            contractSubInvestors: subInvestor,
            contractLocation: { url: googleMapsUrl }
          });
        } else {
          this.props.history.push('/Dashboard');
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    //Set default contract form
    if (nextProps.contracts.errorMessage) {
      Popup.alert(nextProps.contracts.errorMessage, 'พบข้อผิดพลาด');
      this.props.clearErrorMessageAction();
    }
  }

  submit = values => {
    //Validate by SubmissionError
    contractFormSubmitValidate(values);

    this.setState({ isLoading: true });
    if (this.props.mode === 'new') {
      this.props.createContractAction(
        values,
        () => {
          this.setState({ isLoading: false });
          this.props.history.push('/ContractLists');
        },
        () => {
          this.setState({ isLoading: false });
        }
      );
    } else if (this.props.mode === 'edit') {
      this.props.updateContractAction(
        values,
        () => {
          this.setState({ isLoading: false });
          this.props.history.push('/ContractLists');
        },
        () => {
          this.setState({ isLoading: false });
        }
      );
    }
  };

  renderDeleteBtn = () => {
    const deleteData = () => {
      confirmAlert({
        title: '',
        message: 'ต้องการลบข้อมูล ?',
        buttons: [
          {
            label: 'ตกลง',
            onClick: () =>
              this.props.deleteContractAction(
                this.props.contracts.data.no,
                () => {
                  this.props.history.push('/Dashboard');
                }
              )
          },
          {
            label: 'ยกเลิก',
            onClick: () => {}
          }
        ]
      });
    };

    return (
      <a
        href="#!"
        data-test="button-delete"
        className="formBtnDelte right red-text darken-4"
        onClick={() => deleteData()}
      >
        ลบ
      </a>
    );
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div data-test="component-contract-form">
        <Popup />
        <form onSubmit={handleSubmit(this.submit)}>
          <div
            className="blue lighten-2 white-text text-darken-2 valign-wrapper"
            style={{ marginTop: '10px' }}
          >
            <div className="col s1 right ">
              <i className="Medium material-icons valign-wrapper">info</i>
            </div>
            <div className="col s11">
              <h5> รายละเอียด </h5>
            </div>
          </div>
          {this.props.mode === 'edit' && this.props.contracts.data ? (
            <div className="row">
              <div className="col s12 m6 indigo-text darken-4">
                <h5>{`รายการเลขที่ #${this.props.contracts.data.no}`}</h5>
              </div>
              <div className="col s12 m6">{this.renderDeleteBtn()}</div>
            </div>
          ) : (
            ''
          )}
          <div className="col s12">
            <Field
              name="status"
              data-test="field-status"
              component={SelectInput}
              options={ContractStatus}
              label="สถานะ"
              require={true}
            />
          </div>
          <div className="col s12 m3">
            <Field
              name="type"
              component={SelectInput}
              options={PropertyType}
              label="ประเภท"
              require={true}
            />
          </div>
          <div className="col s12 m9">
            <Field
              type="text"
              name="title"
              component={TextInput}
              label="ชื่อหลักทรัพย์"
              placeholder="ชื่อหลักทรัพย์"
              require={true}
            />
          </div>
          <div className="col s12 m11">
            <Field name="description" component={TextArea} label="รายละเอียด" />
          </div>
          <div className="col s12 m3">
            <Field
              name="pact"
              component={SelectInput}
              options={ContractType}
              label="สัญญา"
              require={true}
            />
          </div>
          <div className="col s12 m8">
            <Field
              type="number"
              name="value"
              component={NumberInput}
              label="มูลค่า"
              thousandSeparate={true}
              placeholder="มูลค่าสัญญา"
              require={true}
            />
          </div>
          <div className="col s12 m6">
            <Field
              name="_signBy"
              component={SelectInputAsync}
              label="ผู้ทำสัญญา"
              url="/api/select/user-subInvestors"
            />
          </div>
          <div className="col s12">
            <Field
              name="beginDate"
              component={Datepicker}
              label="วันที่เริ่มสัญญา"
              placeholder="DD/MM/YYYY"
            />
          </div>
          <div className="col s12">
            <Field
              name="closeDate"
              component={Datepicker}
              label="วันที่สิ้นสุด"
              placeholder="DD/MM/YYYY"
            />
          </div>
          <div className="col s12">
            <FieldArray
              name="contractActions"
              component={ContractFormActions}
            />
          </div>
          <div className="col s12">
            <FormSection name="contractLocation">
              <ContractFormLocation />
            </FormSection>
          </div>
          <div className="col s12">
            <FieldArray
              name="contractSubInvestors"
              component={ContractFormSubInvestors}
            />
          </div>
          <div className="col s12">
            <FieldArray name="contractDebtor" component={ContractFormDebtor} />
          </div>
          <div className="col s12" style={{ border: '1px solid grey' }} />
          <div className="col s12" style={{ margin: '15px 0px 15px 0px' }}>
            <div className="right-align red-text">
              {this.props.contracts.errorMessage && (
                <strong>{this.props.contracts.errorMessage}</strong>
              )}
              {!isEmpty(this.props.formSyncErrors) && (
                <strong>คุณยังกรอกข้อมูลไม่ครบถ้วน!!</strong>
              )}
              {this.props.error && <strong>{this.props.error}</strong>}
            </div>
            <div className="right-align">
              <SubmitButton text="บันทึกและออก" data-test="submit-button" />
              {this.state.isLoading ? <Spinner /> : ''}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contractForm: getFormValues('contract')(state),
    user: state.user,
    contracts: state.contracts,
    formSyncErrors: getFormSyncErrors('contract')(state)
  };
};

export default compose(
  reduxForm({
    form: 'contract',
    validate: contractFormValidate
  }),
  connect(
    mapStateToProps,
    {
      createContractAction,
      updateContractAction,
      updateContractSubInvestorFormAction,
      initContractFormAction,
      getContractAction,
      deleteContractAction,
      clearErrorMessageAction
    }
  )
)(withRouter(ContractForm));
