const  mongoose  = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName:{
        type:String,
        required:false,
    },
    value:{
        type:String,
        required:false,
    }
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project;