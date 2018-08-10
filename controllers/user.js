const User = require('../models/user');
const UserSubInvestor = require('../models/userSubInvestor');
const _ = require('lodash');

exports.createUserSubInvestor = async (req,res) => {

    const name = req.body.name
    
    try {
        //Find exist name in UerSubInvestor
        const user = await User.findOne({ '_id': req.user.id })            
            .populate('userSubInvestors')
            .select(['userSubInvestors', 'name','isAdmin','local'])
            .exec()

        if(_.find(user.userSubInvestors, {'name': name}))
            return res.status(422).send( {error: 'This name is already in use.'} )

        const updatedSubInvestor = new UserSubInvestor({
            name, 
            isDefault: false
        })

        await updatedSubInvestor.save()
        user.userSubInvestors.push(updatedSubInvestor)        
        const updatedUser = await user.save()

        return res.send({   
            id: updatedUser._id,     
            name: updatedUser.name,
            isAdmin: updatedUser.isAdmin,
            email:updatedUser.local.email,
            userSubInvestors: updatedUser.userSubInvestors
        })

    } 
    catch(e){
        console.log(e);
        res.status(422).send({ error: `Cannot fetch [createUserSubInvestor].} `+ e});
    }
}

exports.updateUserSubInvestor = async (req,res) => {

    const _id = req.query._id
    const updatedName = req.query.updatedName
    
    try {
        //!!! Pease exclude ชื่อเดิมออก
       
        //Find exist name in UserSubInvestor
        const user = await User.findOne({ '_id': req.user.id })            
            .populate('userSubInvestors')
            .select(['userSubInvestors', 'name','isAdmin','local'])
            .exec()

        if(_.find(user.userSubInvestors, {'name': updatedName})){
            return res.status(422).send( {error: 'This name is already in use.'} )
        }

        //Update data
        const userSubInvestor = await UserSubInvestor.findByIdAndUpdate(_id, {name : updatedName})   
        await userSubInvestor.save()
        
        //Fetch updated data
        const updatedUser = await User.findOne({ '_id': req.user.id })            
            .populate('userSubInvestors')
            .select(['userSubInvestors', 'name','isAdmin','local'])
            .exec()

        return res.send({   
            id: updatedUser._id,     
            name: updatedUser.name,
            isAdmin: updatedUser.isAdmin,
            email:updatedUser.local.email,
            userSubInvestors: updatedUser.userSubInvestors
        })
    } 
    catch(e){
        console.log(e);
        res.status(422).send({ error: `Cannot fetch [updateUserSubInvestor].} `+ e});
    }
}


