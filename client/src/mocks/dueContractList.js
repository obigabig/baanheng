import moment from 'moment';

const getDueContractListMock = [
  {
    _id: '5bb420d3073f923888983898',
    no: 365,
    beginDate: '03/10/2018',
    contractActions: [
      {
        _id: '5baa2e9e99c4f250dc398072',
        type: 'นัดต่อสัญญา',
        description: '',
        dueDate: moment().format('DD/MM/YYYY')
      }
    ],
    contractDebtor: [{ name: 'พีรพง', tel: '22222' }],
    googleMapsUrl: "",
    escription: "",
    contractSubInvestors: [
      { _id: "5baa2e9e99c4f250dc398074",_userSubInvestor: '5b7e261dc915062d9c888499', value: 33333 }
    ],
    pact: 'ขายฝาก',
    status: 'ทำสัญญา',
    title: 'Lumpini 2019',
    type: 'บ้าน',
    value: 33333,
    _agent: "5b7e261dc915062d9c888498",
    createDate: '2018-10-03T01:52:19.889Z'
  },
  {
    _id: '5bb420d3073f923888983899',
    no: 366,
    beginDate: '03/10/2018',
    contractActions: [
      {
        _id: '5baa2e9e99c4f250dc398072',
        type: 'นัดต่อสัญญา',
        description: '',
        dueDate: moment().format('DD/MM/YYYY')
      }
    ],
    contractDebtor: [{ name: 'พีรพง', tel: '22222' }],
    googleMapsUrl: "",
    escription: "",
    contractSubInvestors: [
      { _id: "5baa2e9e99c4f250dc398074",_userSubInvestor: '5b7e261dc915062d9c888499', value: 44444 }
    ],
    pact: 'ขายฝาก',
    status: 'ทำสัญญา',
    title: 'Lumpini 2019',
    type: 'บ้าน',
    value: 44444,
    _agent: "5b7e261dc915062d9c888498",
    createDate: '2018-10-03T01:52:19.889Z'
  }
];

export default getDueContractListMock;
