const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async-wrapper')
const {createCustomError} = require('../error/custom-error');
const getAllTasks = asyncWrapper( async (req,res)=>{
    
        const tasks = await Task.find({})
        res.status(200).json({tasks})
        //res.status(200).json({tasks, amount: tasks.length})
        //res.status(200).json({status:'success', data:{tasks,nbhits: tasks.length}})
   
})

const createTask = asyncWrapper( async (req,res)=>{
    
        const task = await Task.create(req.body)
        res.status(201).json({task})
    })

const getSingleTask = asyncWrapper(async (req,res,next)=>{

        const {id: taskID} = req.params;
        // const task = await Task.findOne({_id:taskID})
        const task = await Task.findById(taskID)
        
        //if null
        if(!task){
            return next(createCustomError(`no task with the id ${taskID}`,404))
        }
        res.status(200).json({task})

    })

//patch method : replace only the specific attributes  
const updateTask = asyncWrapper(async (req,res)=>{
        const {id:taskID} = req.params;
        const task = await Task.findByIdAndUpdate(taskID,req.body,{
            //options
            new:true,//return new value
            runValidators:true//Validators
        })
        if(!task){
            return next(createCustomError(`no task with the id ${taskID}`,404))
        }
        res.status(200).json({task})
   

})

// //put method: replace data with the updated one
// const editTask = async (req,res)=>{
//     try{
//         const {id:taskID} = req.params;
//         const task = await Task.findByIdAndUpdate(taskID,req.body,{
//             //options
//             new:true,//return new value
//             runValidators:true,//Validators
//             overwrite:true,//
//         })
//         if(!task){
//             return res.status(404).json({msg: `no task with the id of ${taskID}`})
//         }
//         res.status(200).json({task})
//     }catch(error){
//         res.status(500).json({msg:error})

//     }

// }

const deletTask = asyncWrapper(async(req,res)=>{
        const {id: taskIDtoDelete} = req.params;
        const task = await Task.findByIdAndDelete(taskIDtoDelete);
        if(!task){
            return next(createCustomError(`no task with the id ${taskID}`,404))
        }
        res.status(200).json({msg:`deleted item with the id of ${taskIDtoDelete}`})
        //we can also write this :
        //res.status(200).send()
        //res.status(200).json({task: null, status: success})

    
})


module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deletTask,
    // editTask
}