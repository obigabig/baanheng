import _ from 'lodash';
import { ContractStatusValue } from '../../const'

const validate = values => {
    const errors = {}
    
    if (!values.title)
        errors.title = 'ต้องระบุ';
    else if(values.title.length > 120)
        errors.title = 'ต้องไม่เกิน 120 ตัวอักษร';
    
    if (values.description && values.description.length > 600) 
        errors.description = 'ต้องไม่เกิน 600 ตัวอักษร';

    if (!values.status)
        errors.status = 'ต้องระบุ';
    
    if (!values.type)
        errors.type = 'ต้องระบุ';
    
    if (!values.value)
        errors.value = 'ต้องระบุ';
    else if(values.value < 0)
        errors.value = 'ต้องมีค่ามากกว่า 0';

    if (!values.pact)
        errors.pact = 'ต้องระบุ';

    if((values.status === ContractStatusValue.break || values.status === ContractStatusValue.end)
        && !values.closeDate){
        errors.closeDate = 'ต้องระบุ';
    }

    //Validate actionsArrayErrors
    const actionsArrayErrors = []
    _.forEach(values.contractActions, function(value, index) {
        const valueErrors = {}
        if (!value || !value.type) {
          valueErrors.type = 'ต้องระบุ'
          actionsArrayErrors[index] = valueErrors
        }
        if (!value || !value.dueDate) {
          valueErrors.dueDate = 'ต้องระบุ'
          actionsArrayErrors[index] = valueErrors
        }
    });
        
    if (actionsArrayErrors.length) {
        errors.contractActions = actionsArrayErrors
    }

    //Validate subInvestorsArrayErrors
    const subInvestorsArrayErrors = []
    let sumSubInvestorsValues = 0;
    //Calc sum SubInvestors Values
    _.forEach(values.contractSubInvestors, function(value, index) {
        if (value.value) {        
              sumSubInvestorsValues = (sumSubInvestorsValues + parseFloat(value.value.toString().replace(/,/g,'')));
        }
    });

    _.forEach(values.contractSubInvestors, function(value, index) {
        const valueErrors = {};

        const isDupplicateName = _(values.contractSubInvestors).map(function(o) { 
            if (o._userSubInvestor === value._userSubInvestor) return o;
            return undefined
        }).compact().value().length > 1 ? true : false;

        if (!value || !value._userSubInvestor) {
          valueErrors._userSubInvestor = 'ต้องระบุ';
          subInvestorsArrayErrors[index] = valueErrors;
        }
        else if(isDupplicateName){
            /*valueErrors._userSubInvestor = 'ชื่อผู้ลงทุนซ้ำ';
            subInvestorsArrayErrors[index] = valueErrors;*/
        }

        if (!value || !value.value) {
          valueErrors.value = 'ต้องระบุ';
          subInvestorsArrayErrors[index] = valueErrors;
        }
        else if(values.value && sumSubInvestorsValues !== parseFloat(values.value.toString().replace(/,/g,''))){
          valueErrors.value = 'ต้องมีมูลค่ารวมเท่ากับมูลค่าสัญญา';
          subInvestorsArrayErrors[index] = valueErrors;
        }
       
    });

    if (subInvestorsArrayErrors.length) {
        errors.contractSubInvestors = subInvestorsArrayErrors
    }

    //Validate debtorsArrayErrors
    const debtorsArrayErrors = []
    _.forEach(values.contractDebtor, function(value, index) {
        const valueErrors = {}
        if (!value || !value.name) {
          valueErrors.name = 'ต้องระบุ'
          debtorsArrayErrors[index] = valueErrors
        }
        /*if (!value || !value.tel) {
          valueErrors.tel = 'ต้องระบุ'
          debtorsArrayErrors[index] = valueErrors
        }*/
    });
        
    if (debtorsArrayErrors.length) {
        errors.contractDebtor = debtorsArrayErrors
    }

    return errors;
  }
  
  export default validate