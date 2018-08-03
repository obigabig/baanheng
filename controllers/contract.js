const Contract = require('../models/contract/contract');
const User = require('../models/user');

const contractQuerues = require('../queries/contract')
const _ = require('lodash');

exports.initialContractForm = async (req, res) => {
    const email = req.user.local.email;
    try{
        //Get default sub investor
        const user = await User.findOne({ "local.email": email })
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
    const _agent = req.user._id;
    const beginDate = req.body.beginDate;
    const googleMapsUrl = req.body.contractLocation.url;
    const actions = req.body.contractActions;
    const debtor = req.body.contractDebtor;
    const subInvestor = req.body.contractSubInvestors;   
    const _createBy = req.user._id; 

    //Get lastest number
    const objNewNo = await Contract.findOne({_agent: req.user._id}, {'no':1,'_id':0}).sort({no : -1});
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

    console.log(req.body)
    const title = req.body.title;
    const no = req.body.no;
    const description = req.body.description;
    const status = req.body.status;
    const type = req.body.type;
    const pact = req.body.pact;
    const value = req.body.value;
    const _agent = req.user._id;
    const beginDate = req.body.beginDate;
    const googleMapsUrl = req.body.contractLocation.url;
    const actions = req.body.contractActions;
    const debtor = req.body.contractDebtor;
    const subInvestor = req.body.contractSubInvestors;   
    const _createBy = req.user._id; 

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
            _agent,
            googleMapsUrl,
            actions,
            debtor,
            subInvestor,
            _createBy
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
        const contract = await Contract
                .find( {_createBy : req.user.id})
                .sort({'no':-1})
                .skip(Number(req.query.skip))
                .limit(Number(req.query.limit))
                .populate("subInvestor._userSubInvestor")
                .exec();
        res.send(contract);
    }
    catch(e){
        console.log(e);
        res.status(422).send({ error: `Cannot fetch [getContractLists]. `+e});
    }
};

exports.getContractListsLength = async (req, res) => {
    try {        
        const contract = await Contract
                .find( {_createBy : req.user.id})
                .sort({'no':-1})
                .exec();
        res.send(contract.length.toString());
    }
    catch(e){
        console.log(e);
        res.status(422).send({ error: `Cannot fetch [getContractListsLength].} `+ e});
    }
};

exports.getDueContractLists = async (req, res) => {
    try {        
        const activeContractList = await Contract
                .find({
                    _createBy : req.user.id
                })
                .where('actions.isCompleted').equals(false)
                .exec();
        
         const activeContractListWithUpcomingAction = 
            _(activeContractList).map(activeContract => {
                const upComingAction = contractQuerues.getUpcomingAction(activeContract);
                if(upComingAction){
                    activeContract.actions = upComingAction;
                    return(activeContract);
                }                
                return undefined;                
            })
            .compact()      
            .value();   
        res.send(activeContractListWithUpcomingAction);
    }
    catch(e){
        console.log(e);
        res.status(422).send({ error: `Cannot fetch [getDueContractLists].} `+ e});
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

        const investorRatio = _(allSubInvestors)
            .groupBy('name')
            .map((data, key) => {
                return {
                    name: key,
                    value: _.sumBy(data, 'value')
                }
            })
            .value()
        res.send(investorRatio);
    }
    catch(e){
        console.log(e);
        res.status(422).send({ error: `Cannot fetch [getInvestorRatio].} `+ e});
    }
};



            
    
            