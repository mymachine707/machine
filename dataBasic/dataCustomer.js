const DS = require('../source/base')
const fileName = "sourceInfo.json"


const BookedController = (req, res) => {
    const library = DS.readFile(fileName)
    let idS = parseInt(req.params.idS)
    let idB = parseInt(req.params.idB)
    if ( idS && idB) {
        let findStudent = library.students.find(s => s.id == idS)
        let findBook = library.books.find(b => b.id == idB)

        if (!findStudent) {
            res.status(404).json(`id:${idS} student not found in students base!`)
            return
        }

        if (!findBook) {
            res.status(404).json(`id:${idB} book not found in books base!`)
            return
        }

        let find1 = library.dataCustomers.find(e=> e.students_id==idS)  // 
        if(!find1){
            library.dataCustomers.push({
                students_id: idS,
                book_id: idB,
                booked_day: new Date(),
                returned_day: null,
                created_at: new Date()
            })

            DS.saveFile(library, fileName)
            res.status(200),json("Successfuly created..!")
            return
        }else{
            if (find1.returned_day != null){
                library.dataCustomers.push({
                    students_id: idS,
                    book_id: idB,
                    booked_day: new Date(),
                    returned_day: null,
                    created_at: new Date()
                })
                DS.saveFile(library, fileName)
                res.status(200).json("Successfuly created..!")
                return
            }
            res.status(200).json("book isn't returned..!")
            return
        }
    } else{
        res.status(400).json("student_id and book_id are required!")
    }
}

const bookReturnedController = (req,res) => {
    const libary = DS.readFile(fileName)
    let idS = parseInt(req.params.idS)
    let idB = parseInt(req.params.idB)

    if(idS && idB){ // kitobbi qaytargani uchun qaytarish vaqti kirtiiladi returned date null dan hozirgi vaqtga o'zgartiriladi??
        let found = libary.dataCustomers.find(e=> e.students_id == idS && e.returned_day == null)
        if (found) {
            let i = libary.dataCustomers.indexOf(found)  // ???
            found.returned_day = new Date()
            found.created_at = new Date()
            libary.dataCustomers[i] =found  //???
            DS.saveFile(libary, fileName)
            res.status(200).json("Successfuly updated..!")
            return
        }
        res.status(200).json("All books were returned..!")
    }
    else{
        res.status(400).send("Student_id and book_id are required")
    }
}


const readControllerByID =(req,res) => {
    const libary = DS.readFile(fileName)
    let idS = req.params.idS
    let student = libary.students.find(r=> r.id == idS)
    if(!student) {
        res.status(404).json(`Student isn't found in students base..!`)
        return
    }
    if(!libary.dataCustomers.length){
        res.status(200).json("data base Cutomer is empty..!")
        return
    }

    let studentList = libary.dataCustomers.filter(r => r.students_id == student.id)

    if (studentList.length){                ///????
        studentList.forEach(rL => {
            libary.books.forEach(b=> {
                if(rL.book_id == b.id){
                    rL.books=[]
                    rL.books.push(b)
                }
            })            
        });
    }
    res.status(200).json(studentList)
}

module.exports = {
    BookedController,
    bookReturnedController,
    readControllerByID
}