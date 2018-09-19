const Contract = require('../models/contract/contract')
const User = require('../models/user')
const { StatusMapping , PactMapping, TypeMapping} = require('../const')
const { getFilterContractQuery } = require('../queries/contract')
const contractQuerues = require('../queries/contract')
const _ = require('lodash')
const moment = require('moment')
const { sortByKeyValue } = require('../utils/utils')

exports.initialContractForm = async (req, res) => {
    const email = req.user.email;
    try{
        //Get default sub investor
        const user = await User.findOne({ "email": email })
            .select('userSubInvestors')
            .populate('userSubInvestors')
            .exec();
        
        // If a user with email does exist, return an error
        if (!user){
            return res.status(422).send( {error: 'User sub investors is not found.'} )
        }

        const defaultSubInvestor = _(user.userSubInvestors)
            .map(subInvestor => {
                if(subInvestor.isDefault){
                    return {
                        _id : subInvestor._id,
                        name : subInvestor.name
                    }
                }                    
                return undefined;
            })
            .compact()
            .value();
        
        res.send({
            subInvestor: defaultSubInvestor[0]
        });

    }catch(err){
        return res.status(422).send( {error: err} )
    }
     
}

exports.createContract = async (req, res, next) => {

    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    const type = req.body.type;
    const pact = req.body.pact;
    const value = req.body.value;
    const _agent = req.user.id;
    const beginDate = req.body.beginDate;
    const closeDate = req.body.closeDate;
    const googleMapsUrl = req.body.contractLocation.url;
    const actions = req.body.contractActions;
    const debtor = req.body.contractDebtor;
    const subInvestor = req.body.contractSubInvestors;   
    const _createBy = req.user.id; 

    //Get lastest number
    const objNewNo = await Contract.findOne({_agent: req.user.id}, {'no':1,'_id':0}).sort({no : -1});
    let newNo = 1;
    if(objNewNo)
        newNo = objNewNo["no"] + 1

    //prepare data to insert
    let contract = new Contract({
            no: newNo,
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

    try {
        await contract.save();
        res.send(contract);
    }
    catch(e){
        console.log(e);
        res.status(422).send({ error: `Cannot save new contract: ${contract.title} `+ e});
    }
}

exports.updateContract = async (req, res, next) => {

    const title = req.body.title;
    const no = req.body.no;
    const description = req.body.description;
    const status = req.body.status;
    const type = req.body.type;
    const pact = req.body.pact;
    const value = req.body.value;
    const _agent = req.user.id;
    const beginDate = req.body.beginDate;
    const closeDate = req.body.closeDate;
    const googleMapsUrl = req.body.contractLocation.url;
    const actions = req.body.contractActions;
    const debtor = req.body.contractDebtor;
    const subInvestor = req.body.contractSubInvestors;   
    const _modifiedBy = req.user.id
    const modifiedDate = moment()  

    try {
        
        const contract = await Contract.findOneAndUpdate({
            _createBy : req.user.id,
            no
        }, 
        {
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
            _modifiedBy,
            modifiedDate
        });

        res.send(contract);
    }
    catch(e){
        console.log(e);
        res.status(422).send({ error: `Cannot save update contract: ${contract.title} `+ e});
    }
}

exports.getContract = async (req, res) => {
    try {       
        const contract = await Contract
                .findOne({
                    _createBy : req.user.id,
                    no: Number(req.params.id)
                })
                .exec();
        res.send(contract);
    }
    catch(e){
        console.log(e);
        res.status(422).send({ error: `Cannot fetch [getContract]. `+e});
    }
};

exports.getContractLists = async (req, res) => {
    try {     
        const { skip, limit, sort, no, title, sortType, status, pact, propType, value } = req.query

        let aryStatus = _.map(String(status).split(','), n => StatusMapping[n])
        let aryPact = _.map(String(pact).split(','), n => PactMapping[n])
        let aryPropType = _.map(String(propType).split(','), n => TypeMapping[n])
        
        const constraint = getFilterContractQuery(req.user.id, no, title, value)

        const contract = await Contract
                .find(constraint)            
                .where('status').in(aryStatus)
                .where('pact').in(aryPact)
                .where('type').in(aryPropType)
                .skip(Number(skip))
                .limit(Number(limit))
                .sort([[sort, Number(sortType)]])
                .populate("subInvestor._userSubInvestor")
                .exec()

        res.send(contract)
    }
    catch(e){
        console.log(e);
        res.status(422).send({ error: `Cannot fetch [getContractLists]. `+e});
    }
};

exports.getContractListsLength = async (req, res) => {
    try {      
        const { no, title, status, pact, propType, value } = req.query

        let aryStatus = _.map(String(status).split(','), n => StatusMapping[n])
        let aryPact = _.map(String(pact).split(','), n => PactMapping[n])
        let aryPropType = _.map(String(propType).split(','), n => TypeMapping[n])

        const constraint = getFilterContractQuery(req.user.id, no, title, value)
        
        const contract = await Contract
                .find(constraint)
                .where('status').in(aryStatus)
                .where('pact').in(aryPact)
                .where('type').in(aryPropType)
                .exec();

        res.send(contract.length.toString());
    }
    catch(e){
        console.log(e);
        res.status(422).send({ error: `Cannot fetch [getContractListsLength].} `+ e});
    }
};

exports.getInvestorRatio = async (req, res) => {
    try {     
        const activeContractList = await Contract
                .find({
                    _createBy : req.user.id,
                    status: 'ทำสัญญา'
                })
                .populate("subInvestor._userSubInvestor")
                .exec();
        
        //get active subInvestorList
        const allSubInvestors = [];
        _(activeContractList).map(({subInvestor}) => {
            return _.map(subInvestor, ({_userSubInvestor, value }) => {
                return ({
                    name: _userSubInvestor.name,
                    value
                });
            });
        }).each( dataAry => {
            _.each(dataAry, data => {
                allSubInvestors.push(data);
            });
        });

        const investorRatio = sortByKeyValue(_(allSubInvestors)
            .groupBy('name')
            .map((data, key) => {
                return {
                    name: key,
                    value: _.sumBy(data, 'value')
                }
            })
            .value()
        , 'value','desc')

        res.send(investorRatio);
    }
    catch(e){
        console.log(e);
        res.status(422).send({ error: `Cannot fetch [getInvestorRatio].} `+ e});
    }
};

const getActiveContractListWithUpcomingAction = async (userId) => {

    
    const activeContractList = await Contract
        .find({
            _createBy : userId
        })
        .where('actions.isCompleted').equals(false)
        .exec();

    //เลือกเฉพาะ Actions ล่าสุดที่จะแจ้งเตือน
    const result = _(activeContractList).map(activeContract => {
        const upComingAction = contractQuerues.getUpcomingAction(activeContract);
        if(upComingAction){
            activeContract.actions = upComingAction;
            return(activeContract);
        }                
        return undefined;                
    })
    .compact()      
    .value();   

    return result
}


exports.getDueContractLists = async (req, res) => {

    try {       
        const result = await getActiveContractListWithUpcomingAction(req.user.id)

        res.send(result);
    }
    catch(e){
        console.log(e);
        res.status(422).send({ error: `Cannot fetch [getDueContractLists].} `+ e});
    }
};

exports.markActionAsComplete = async (req, res) => {

    const contractId = req.query.contractId
    const actionId = req.query.actionId

    try {
        
        const contract = await Contract.findById(contractId)        
        //find sub document
        const action = contract.actions.id(actionId)
        //Edit sub document
        action.set('isCompleted', true)
        //Save sub document
        await contract.save()
        //Fetch updated data
        res.send(await getActiveContractListWithUpcomingAction(req.user.id));
    }
    catch(e){
        console.log(e);
        res.status(422).send({ error: `Cannot do [markActionAsComplete]: ${contract.title} `+ e});
    }
}

exports.deleteContract = async (req, res) => {
    try {       
        const contract = await Contract
                .deleteOne({
                    _createBy : req.user.id,
                    no: Number(req.params.id)
                })
                .exec();
        res.send(contract)
    }
    catch(e){
        console.log(e);
        res.status(422).send({ error: `Cannot complete [deleteContract]. `+e});
    }
};

            
    
            