
if (process.env.NODE_ENV === 'production') {
    /*exports.firebaseConfig = {
        apiKey: 'AIzaSyDQAmGCoZgz9sEPwGr-D4YgkJFZNeFbdPM',
        authDomain: 'baanheng-dev.firebaseapp.com',
        databaseURL: 'https://baanheng-dev.firebaseio.com',
        projectId: 'baanheng-dev',
        storageBucket: 'baanheng-dev.appspot.com',
        messagingSenderId: '1086485022003'
      }*/
    exports.firebaseConfig = {
        apiKey: "AIzaSyA68NKtxm09EyVqooD826nuqs1xJfTlJjE",
        authDomain: "baanheng-prod.firebaseapp.com",
        databaseURL: "https://baanheng-prod.firebaseio.com",
        projectId: "baanheng-prod",
        storageBucket: "baanheng-prod.appspot.com",
        messagingSenderId: "759363382302"
      }
  } else {
    exports.firebaseConfig = {
        apiKey: 'AIzaSyDQAmGCoZgz9sEPwGr-D4YgkJFZNeFbdPM',
        authDomain: 'baanheng-dev.firebaseapp.com',
        databaseURL: 'https://baanheng-dev.firebaseio.com',
        projectId: 'baanheng-dev',
        storageBucket: 'baanheng-dev.appspot.com',
        messagingSenderId: '1086485022003'
      }
      /*exports.firebaseConfig = {
        apiKey: "AIzaSyA68NKtxm09EyVqooD826nuqs1xJfTlJjE",
        authDomain: "baanheng-prod.firebaseapp.com",
        databaseURL: "https://baanheng-prod.firebaseio.com",
        projectId: "baanheng-prod",
        storageBucket: "baanheng-prod.appspot.com",
        messagingSenderId: "759363382302"
      }*/
  }


const contractStatusValue = {
    draft: 'ฉบับร่าง',
    ongoing: 'ทำสัญญา',
    break: 'หลุด',
    end: 'จบสัญญา'
};
exports.ContractStatusValue = contractStatusValue
exports.ContractStatus = [
    { value: contractStatusValue.draft, label: contractStatusValue.draft },
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
    renew: 'นัดต่อสัญญา',
    remindInterest: 'ทวงถามดอกเบี้ย',
    other: 'อื่นๆ'
};

exports.ActionsTypeValue = actionsTypeValue

exports.ActionsType = [
    { value: actionsTypeValue.renew, label: actionsTypeValue.renew },
    { value: actionsTypeValue.remindInterest, label: actionsTypeValue.remindInterest },
    { value: actionsTypeValue.other, label: actionsTypeValue.other }
]

const sortList = [
    { value: 'no' , label: 'เลขที่' },
    { value: 'value' , label: 'มูลค่า' },
    { value: 'beginDate' , label: 'วันที่ทำสัญญา' },
]

exports.SortList = sortList







