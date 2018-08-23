const sql = require('mssql')
const _ = require('lodash')
const moment = require('moment')

const Contract = require('../models/contract/contract')
const User = require('../models/user')

const subinvestorMapping = (sqlName) => {
    if(sqlName === 'สุวิทย์')
        return '5b7e261dc915062d9c888499'   //subinvestor id
    else if(sqlName === 'สมพร')
        return '5b7e271ec915062d9c88849b'
    else if(sqlName === 'สิงห์')
        return '5b7e2723c915062d9c88849d'
    else if(sqlName === 'เนี้ยว')
        return '5b7e2728c915062d9c88849f'
    else if(sqlName === 'พรพิษ')
        return '5b7e2730c915062d9c8884a1'
    else if(sqlName === 'บิ๊ก')
        return '5b7e2749c915062d9c8884a3'
    else if(sqlName === 'ยายเฉลิม')
        return '5b7e274ec915062d9c8884a5'
    else if(sqlName === 'แป๊ะ')
        return '5b7e2754c915062d9c8884a7'
    else
        return '5b7e275ac915062d9c8884a9'

    //Suvit.jong
    /*    const subinvestorMapping = (sqlName) => {
            if(sqlName === 'สุวิทย์')
                return '5b7e261dc915062d9c888499'   //subinvestor id
            else if(sqlName === 'สมพร')
                return '5b7e271ec915062d9c88849b'
            else if(sqlName === 'สิงห์')
                return '5b7e2723c915062d9c88849d'
            else if(sqlName === 'เนี้ยว')
                return '5b7e2728c915062d9c88849f'
            else if(sqlName === 'พรพิษ')
                return '5b7e2730c915062d9c8884a1'
            else if(sqlName === 'บิ๊ก')
                return '5b7e2749c915062d9c8884a3'
            else if(sqlName === 'ยายเฉลิม')
                return '5b7e274ec915062d9c8884a5'
            else if(sqlName === 'แป๊ะ')
                return '5b7e2754c915062d9c8884a7'
            else
                return '5b7e275ac915062d9c8884a9'*/
}

exports.migrateContract = async (req, res) => {

    try {
        const userId = '5b7e261dc915062d9c888498';  //obigabig
        //const userId = '5b767d736aaef100141c4ab2';  //Suvit.jong

        const pool = await sql.connect('mssql://sa:12345@localhost\\SQLEXPRESS/ASSETMANAGER')
        const contractList = await sql.query`select * from CONTRACT WHERE ID > 0 AND ID < 999 AND ACTIVEFLAG = 'A' ORDER BY ID` 
        
        _.forEach(contractList.recordset, async (contract) => {
            const no = contract.ID;
            let title = String(contract.Title).substr(String(contract.Title).indexOf(' ')+1)
            let type = String(contract.Title).substr(0,String(contract.Title).indexOf(' '))
            if(type !== 'บ้าน' && type !== 'ที่ดิน' 
                && type !== 'คอนโด' && type !== 'เงินกู้' && type !== 'ทาวน์เฮาส์'
                && type !== 'อาคารพาณิชย์' && type !== 'บ้านและที่ดิน' && type !== 'อาพาร์ตเม้นต์' 
                && type !== 'แฟลต' ){
                    title = contract.Title
                    type = 'อื่นๆ'
            }

            const description = "";
            const status = contract.StatusID === 1 ? "ทำสัญญา" : "จบสัญญา"
            let pact = "";
            if(contract.ContractTypeId === 1)
                pact = "ขายฝาก"
                else if(contract.ContractTypeId === 2)
                pact = "จำนอง"
            else
                pact = "เงินกู้"
            
            const value = Number(contract.Value);
            const _agent = userId;
           
            const beginDate = moment().diff(moment(contract.ContractDate), 'years') < 10 ?
                 moment(contract.ContractDate).format('DD/MM/YYYY') : undefined

            const googleMapsUrl = "";            
            const actionsList = await sql.query`SELECT AlertType
                    ,AlertDate
                FROM CONTRACTALERT 
                WHERE ContractId = ${no} AND AlertType != ''
                ORDER BY No` 
            const actions = _.map(actionsList.recordset, action => {
                    const type = action.AlertType === 'ทวงถามดอกเบี้ย' ? "ทวงถามดอกเบี้ย" : "อื่นๆ"
                    const description = action.AlertType === 'ทวงถามดอกเบี้ย' ? "ทวงถามดอกเบี้ย" : "ไม่ได้ระบุ"
                    //แทรกช่องอื่นๆ 
                    /*const period = action.AlertDate && contract.ContractDate ?
                        moment(action.AlertDate).diff(moment(contract.ContractDate), "months") : 0*/
                    const period = 0;
                    const alertLength = action.AlertDate ? moment(action.AlertDate).diff(moment(), "months") : 0 
                    const isCompleted = 
                        contract.StatusID === 1 && alertLength > -5 && alertLength < 5 ? false : true
                    
                    return {
                        type ,
                        description,
                        period,
                        dueDate: moment(action.AlertDate).format('DD/MM/YYYY'),
                        isCompleted
                    }
            });
            const debtor = [];
            const subInvestorList = await sql.query`SELECT 
                B.NAME AS NAME
                ,VALUE
            FROM CONTRACTMEMBER A
            INNER JOIN MEMBER B ON A.MEMBERID = B.ID
            WHERE CONTRACTID = ${no}` 
            const subInvestor = _.map(subInvestorList.recordset, subInvestor => {
                const _userSubInvestor = subinvestorMapping(subInvestor.NAME)

                return {
                    _userSubInvestor ,
                    value: subInvestor.VALUE
                }
            });
              
            const _createBy = userId
        
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
                    _agent,
                    googleMapsUrl,
                    actions,
                    debtor,
                    subInvestor,
                    _createBy
            })
            //console.log(res)
        
           const saved = await newContract.save()

        })
        res.send('Completed');
        //sql.close()
    } catch (err) {
        console.log(err)
        res.status(422).send({ error: `Error: `+ err});
    }

}