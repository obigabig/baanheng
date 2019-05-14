const sql = require('mssql');
const _ = require('lodash');
const moment = require('moment');

const Contract = require('../models/contract/contract');
const User = require('../models/user');

//SQL DB Connect
const sqlConnectStr = 'mssql://sa:12345@localhost\\SQLEXPRESS/ASSETMANAGER';
const userId = '5cb5564025550743948c8481'; //obigabig internal
//Email
//const email = 'obigabig.g@gmail.com'; //obigabig internal
const email = 'suvit.jong@gmail.com'; 

//const userId = '5b7e36834151560014482f8d';  //obigabig prod
//const userId = '5b767d736aaef100141c4ab2';  //Suvit.jong

/*const subinvestorMapping = (sqlName) => {
    //Internal
    if(sqlName === 'สุวิทย์')
        return '5ca434dbe113d55f887a98b5'   //subinvestor id
    else if(sqlName === 'สมพร')
        return '5ca5b54911066007ccfab098'
    else if(sqlName === 'สิงห์')
        return '5ca5b55211066007ccfab09a'
    else if(sqlName === 'เนี้ยว')
        return '5ca5b55711066007ccfab09c'
    else if(sqlName === 'พรพิษ')
        return '5ca5b55d11066007ccfab09e'
    else if(sqlName === 'บิ๊ก')
        return '5ca5b56311066007ccfab0a0'
    else if(sqlName === 'ยายเฉลิม')
        return '5ca5b56911066007ccfab0a2'
    else if(sqlName === 'แป๊ะ')
        return '5ca5b56d11066007ccfab0a4'
    else
        return '5ca5b70bef118e22486b8fd1'
}*/

//obigabig prod
/*const subinvestorMapping = sqlName => {
  if (sqlName === 'สุวิทย์') return '5caf2e9426d64900158852d5';
  //subinvestor id
  else if (sqlName === 'สมพร') return '5cb561e5df9e2b329c86a979';
  else if (sqlName === 'สิงห์') return '5cb561ebdf9e2b329c86a97b';
  else if (sqlName === 'เนี้ยว') return '5cb561efdf9e2b329c86a97d';
  else if (sqlName === 'พรพิษ') return '5cb561f2df9e2b329c86a97f';
  else if (sqlName === 'บิ๊ก') return '5cb561f6df9e2b329c86a981';
  else if (sqlName === 'ยายเฉลิม') return '5cb561fddf9e2b329c86a983';
  else if (sqlName === 'แป๊ะ') return '5cb565aadf9e2b329c86a985';
  else return '5cb565aedf9e2b329c86a987';*/

  //Suvit.jong
  const subinvestorMapping = sqlName => {
    if (sqlName === 'สุวิทย์') return '5cc31bf1c52f753620855be0';
    //subinvestor id
    else if (sqlName === 'สมพร') return '5cc31c1bc52f753620855be2';
    else if (sqlName === 'สิงห์') return '5cc31c22c52f753620855be4';
    else if (sqlName === 'เนี้ยว') return '5cc31c2cc52f753620855be6';
    else if (sqlName === 'พรพิษ') return '5cc31c35c52f753620855be8';
    else if (sqlName === 'บิ๊ก') return '5cc31c3bc52f753620855bea';
    else if (sqlName === 'ยายเฉลิม') return '5cc31c40c52f753620855bec';
    else if (sqlName === 'แป๊ะ') return '5cc31c46c52f753620855bee';
    else return '5cc31c4dc52f753620855bf0';
};

exports.migrateContract = async (req, res) => {
  try {
    const pool = await sql.connect(sqlConnectStr);
    const contractList = await sql.query`select * from CONTRACT WHERE ID > 0 AND ID < 999 AND ACTIVEFLAG = 'A' ORDER BY ID`;

    console.log(contractList.recordset);
    _.forEach(contractList.recordset, async contract => {
      const no = contract.ID;
      let title = String(contract.Title).substr(
        String(contract.Title).indexOf(' ') + 1
      );
      let type = String(contract.Title).substr(
        0,
        String(contract.Title).indexOf(' ')
      );
      if (
        type !== 'บ้าน' &&
        type !== 'ที่ดิน' &&
        type !== 'คอนโด' &&
        type !== 'เงินกู้' &&
        type !== 'ทาวน์เฮาส์' &&
        type !== 'อาคารพาณิชย์' &&
        type !== 'บ้านและที่ดิน' &&
        type !== 'อาพาร์ตเม้นต์' &&
        type !== 'แฟลต'
      ) {
        title = contract.Title;
        type = 'อื่นๆ';
      }

      const description = '';
      const status = contract.StatusID === 1 ? 'ทำสัญญา' : 'จบสัญญา';
      let pact = '';
      if (contract.ContractTypeId === 1) pact = 'ขายฝาก';
      else if (contract.ContractTypeId === 2) pact = 'จำนอง';
      else pact = 'เงินกู้';

      const value = Number(contract.Value);
      const _agent = email;

      const beginDate =
        moment().diff(moment(contract.ContractDate), 'years') < 10
          ? moment(contract.ContractDate).format('DD/MM/YYYY')
          : undefined;

      const closeDateList = await sql.query`
            SELECT RedeemDate 
            FROM CONTRACTDATE 
            WHERE ContractId = ${no} 
              AND RedeemDate is not null 
            ORDER BY RedeemDate DESC`;

      const closeDate =
        closeDateList.recordset.length > 0
          ? moment(closeDateList.recordset[0].RedeemDate).format('DD/MM/YYYY')
          : undefined;

      const googleMapsUrl = '';
      const actionsList = await sql.query`  
                SELECT AlertType AS [TYPE], AlertDate AS [DATE]
                FROM CONTRACTALERT 
                WHERE ContractId = ${no} AND AlertType != ''
            
                UNION 
            
                SELECT 'นัดต่อสัญญา' AS [TYPE], SignDate AS [DATE]
                FROM CONTRACTDATE
                WHERE ContractId = ${no} AND SignDate is not null
                ORDER BY [DATE]`;
      const actions = _.map(actionsList.recordset, action => {
        let type = 'อื่นๆ';
        if (action.TYPE === 'ทวงถามดอกเบี้ย' || action.TYPE === 'นัดต่อสัญญา')
          type = action.TYPE;

        let description = '';
        if (action.TYPE !== 'ทวงถามดอกเบี้ย' && action.TYPE !== 'นัดต่อสัญญา')
          description = action.TYPE;
        //แทรกช่องอื่นๆ
        const alertLength = action.DATE
          ? moment(action.DATE).diff(moment().startOf('day'), 'months')
          : 0;
        const isCompleted =
          contract.StatusID === 1 && alertLength > -3 && alertLength < 3
            ? false
            : true;

        return {
          type,
          description,
          dueDate: moment(action.DATE).format('DD/MM/YYYY'),
          isCompleted
        };
      });
      const debtor = [];
      const subInvestorList = await sql.query`SELECT 
                B.NAME AS NAME
                ,VALUE
            FROM CONTRACTMEMBER A
            INNER JOIN MEMBER B ON A.MEMBERID = B.ID
            WHERE CONTRACTID = ${no}`;
      const subInvestor = _.map(subInvestorList.recordset, subInvestor => {
        const _userSubInvestor = subinvestorMapping(subInvestor.NAME);

        return {
          _userSubInvestor,
          value: subInvestor.VALUE
        };
      });

      const _createBy = email;

      //prepare data to insert
      const newContract = new Contract({
        no,
        title,
        description,
        status,
        type,
        pact,
        value,
        beginDate,
        closeDate,
        _agent,
        googleMapsUrl,
        actions,
        debtor,
        subInvestor,
        _createBy
      });
      //console.log(res)

      const saved = await newContract.save();
    });

    //sql.close()
    res.send('Completed');
    //sql.close()
  } catch (err) {
    //console.log(err)
    sql.close();
    res.status(422).send({ error: `Error: ` + err });
  }
};
