const contractStatusValue = {
    new: 'งานใหม่',
    ongoing: 'ทำสัญญา',
    break: 'หลุด',
    end: 'จบสัญญา',
};
exports.ContractStatusValue = contractStatusValue
exports.ContractStatus = [
    { value: contractStatusValue.new , label: contractStatusValue.new },
    { value: contractStatusValue.ongoing, label: contractStatusValue.ongoing },
    { value: contractStatusValue.break, label: contractStatusValue.break },
    { value: contractStatusValue.end, label: contractStatusValue.end }
]

const contractTypeValue = {
    mortgage: 'จำนอง',
    repurchase: 'ขายฝาก',
    loan: 'เงินกู้'
};
exports.ContractTypeValue = contractTypeValue
exports.ContractType = [
    { value: contractTypeValue.mortgage , label: contractTypeValue.mortgage },
    { value: contractTypeValue.repurchase, label: contractTypeValue.repurchase },
    { value: contractTypeValue.loan, label: contractTypeValue.loan }
]

exports.PropertyType = [
    { value: 'บ้าน', label: 'บ้าน' },
    { value: 'ที่ดิน', label: 'ที่ดิน' },
    { value: 'คอนโด', label: 'คอนโด' },
    { value: 'เงินกู้', label: 'เงินกู้' },
    { value: 'ทาวน์เฮาส์', label: 'ทาวน์เฮาส์' },
    { value: 'อาคารพาณิชย์', label: 'อาคารพาณิชย์' },
    { value: 'บ้านและที่ดิน', label: 'บ้านและที่ดิน' },
    { value: 'อาพาร์ตเม้นต์', label: 'อาพาร์ตเม้นต์' },
    { value: 'แฟลต', label: 'แฟลต' },
    { value: 'อื่นๆ', label: 'อื่นๆ' }
]

const actionsTypeValue = {
    redeem: 'ไถ่ถอน',
    renew: 'ต่อสัญญา',
    remindInterest: 'ทวงถามดอกเบี้ย',
    other: 'อื่นๆ'
};

exports.ActionsTypeValue = actionsTypeValue

exports.ActionsType = [
    { value: actionsTypeValue.redeem , label: actionsTypeValue.redeem },
    { value: actionsTypeValue.renew, label: actionsTypeValue.renew },
    { value: actionsTypeValue.remindInterest, label: actionsTypeValue.remindInterest },
    { value: actionsTypeValue.other, label: actionsTypeValue.other }
]







