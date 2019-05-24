import _ from 'lodash';
import { ContractStatusValue } from '../../const';
import { SubmissionError } from 'redux-form';

const validate = values => {
  if (!values.title)
    throw new SubmissionError({
      title: 'ต้องระบุ',
      _error: 'ยังไม่ได้ระบุ "สถานะ"'
    });
  else if (values.title.length > 120)
    throw new SubmissionError({
      title: 'ต้องไม่เกิน 120 ตัวอักษร',
      _error: '"ชื่อหลักทรัพย์" ต้องไม่เกิน 120 ตัวอักษร'
    });

  if (values.description && values.description.length > 600)
    throw new SubmissionError({
      description: 'ต้องไม่เกิน 600 ตัวอักษร',
      _error: '"รายละเอียด" ต้องไม่เกิน 600 ตัวอักษร'
    });

  if (!values.status)
    throw new SubmissionError({
      status: 'ต้องระบุ',
      _error: 'ยังไม่ได้ระบุ "สถานะ"'
    });

  if (!values.type)
    throw new SubmissionError({
      type: 'ต้องระบุ',
      _error: 'ยังไม่ได้ระบุ "ประเภท"'
    });

  if (!values.value)
    throw new SubmissionError({
      value: 'ต้องระบุ',
      _error: 'ยังไม่ได้ระบุ "มูลค่า"'
    });
  else if (values.value < 0)
    throw new SubmissionError({
      value: 'ต้องมีค่ามากกว่า 0',
      _error: '"มูลค่า" ต้องมีค่ามากกว่า 0'
    });

  if (!values.pact)
    throw new SubmissionError({
      pact: 'ต้องระบุ',
      _error: 'ยังไม่ได้ระบุ "สัญญา"'
    });

  if (
    (values.status === ContractStatusValue.break ||
      values.status === ContractStatusValue.end) &&
    !values.closeDate
  ) {
    throw new SubmissionError({
      closeDate: 'ต้องระบุ',
      _error: 'ยังไม่ได้ระบุ "วันที่สิ้นสุด"'
    });
  }

  //Validate actionsArrayErrors
  _.forEach(values.contractActions, function(value, index) {
    if (!value || !value.type) {
      throw new SubmissionError({
        contractActions: '',
        _error: 'กรอกข้อมูลไม่ครบถ้วนในช่อง "การดำเนินงาน"'
      });
    }
    if (!value || !value.dueDate) {
      throw new SubmissionError({
        contractActions: '',
        _error: 'กรอกข้อมูลไม่ครบถ้วนในช่อง "การดำเนินงาน"'
      });
    }
  });

  //Validate subInvestorsArrayErrors
  let sumSubInvestorsValues = 0;
  //Calc sum SubInvestors Values
  _.forEach(values.contractSubInvestors, function(value, index) {
    if (value.value) {
      sumSubInvestorsValues =
        sumSubInvestorsValues +
        parseFloat(value.value.toString().replace(/,/g, ''));
    }
  });

  _.forEach(values.contractSubInvestors, function(value, index) {

    const isDupplicateName =
      _(values.contractSubInvestors)
        .map(function(o) {
          if (o._userSubInvestor === value._userSubInvestor) return o;
          return undefined;
        })
        .compact()
        .value().length > 1
        ? true
        : false;

    if (!value || !value._userSubInvestor) {
      throw new SubmissionError({
        contractSubInvestors: '',
        _error: 'กรุณากรอกข้อมูลให้ถูกต้องในช่อง "สัดส่วนการลงทุน"'
      });
    } else if (isDupplicateName) {
      /*valueErrors._userSubInvestor = 'ชื่อผู้ลงทุนซ้ำ';
            subInvestorsArrayErrors[index] = valueErrors;*/
    }

    if (!value || !value.value) {
      throw new SubmissionError({
        contractSubInvestors: '',
        _error: 'กรุณากรอกข้อมูลให้ถูกต้องในช่อง "สัดส่วนการลงทุน"'
      });
    } else if (
      values.value &&
      sumSubInvestorsValues !==
        parseFloat(values.value.toString().replace(/,/g, ''))
    ) {
      throw new SubmissionError({
        contractSubInvestors: '',
        _error: '"สัดส่วนการลงทุน" ต้องมีมูลค่ารวมเท่ากับมูลค่าสัญญา'
      });
    }
  });

  //Validate debtorsArrayErrors
  _.forEach(values.contractDebtor, function(value, index) {
    if (!value || !value.name) {
      throw new SubmissionError({
        contractDebtor: '',
        _error: 'กรุณากรอกข้อมูลให้ถูกต้องในช่อง "ติดต่อ"'
      });
    }
    /*if (!value || !value.tel) {
          valueErrors.tel = 'ต้องระบุ'
          debtorsArrayErrors[index] = valueErrors
        }*/
  });
  return ;
};

export default validate;
