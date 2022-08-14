const DS = require('../source/base')

const fileName = "sourceInfo.json"

const { validateStudent } = require('../validetionBase')

const studentCreatController = (req, res) => {
    const libary = DS.readFile(fileName);
    let student = req.body;
    
    if(!validateStudent(res, student)){
        return
    }

    let found = libary.students.find(r => r.id == student.is)

    if(found){
        res.status(400).json(`id:${student.id} student has been exist already..!`)
        return
    }

    student.createdAt = new Date()
    libary.students.push(student)
    DS.saveFile(libary,fileName)
    res.status(200).json("created Successfuly")
  
}

const studentReadController = (req,res) => {
    const libary = DS.readFile(fileName)
    if(!libary.students.length) {
        res.status(404).json("Empty date base..!")
        return
    }
    res.status(200).json(libary.students)
}


const studentReadControllerbyId = (req,res) => {
    const libary = DS.readFile(fileName)
    let id = req.params.id
    let found = libary.students.find(r => r.id == id)
    if(!found) {
        res.status(404).json(`${id} -- id student not found`)
    }
    res.status(200).json(found)
    
}

const studentReadControllerByName = (req,res) => {
    const libary = DS.readFile(fileName)
    let firstName = req.params.firstName.toLowerCase()
    let student = libary.students.filter( r=> (r.firstName+ ' ' + r.lastName).toLowerCase().includes(firstName))   
    if (student.length) {
        res.json(student)
    }
    else{
        res.status(404).json("Not found")
    }
}

const studentUpdateControllerById = (req,res) => {
    const libary =DS.readFile(fileName)
    let id = req.params.id
    let student = req.body
    if(!validateStudent(res, student)){
        return
    }
    if(!libary.students[id-1]){
        res.status(404).json(`${id}--id student not found`)
        return
    }
    student.createdAt = libary.students[id-1].createdAt
    student.updatedAt = new Date()
    libary.students[id-1] = student
    DS.saveFile(libary, fileName)
    res.status(200).json("Successfuly updated..!")
}

const studentDeleteControllerById = (req,res)=>{
    const libary = DS.readFile(fileName)
    let id = parseInt(req.params.id)
    let found = libary.students.find(r => r.id == id)
    if (!found) {
        res.status(404).json(`${id}--id student not found..!`)
        return
    }
    libary.students = libary.students.filter(r => r.id != id)
    DS.saveFile(libary, fileName)
    res.status(200).json("Successfuly deleted..!")

}


module.exports = {
    studentCreatController,
    studentDeleteControllerById,
    studentReadController,
    studentReadControllerByName,
    studentReadControllerbyId,
    studentUpdateControllerById
}