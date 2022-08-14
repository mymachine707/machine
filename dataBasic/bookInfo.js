const DS = require('../source/base') 

const fileName = "sourceInfo.json"  

const { validatebooks } = require('../validetionBase')  /// !!!


const bookCreatController = (req,res) => {
    const libary = DS.readFile(fileName);
    let book = req.body
    if (!validatebooks(res, book)){
        return
    }

    let found = libary.books.find(b => b.id == book.id)
    
    if(found){
        res.status(400).json(`id: ${book.id} book has bee exist already`)
        return
    }

    book.createdAt = new Date()
    libary.books.push(book)
    DS.saveFile(libary, fileName)
    res.status(200).json("Created Successfuly..!")
}

const bookReadController = (req,res) => {
    const libary = DS.readFile(fileName)
    if(!libary.books.length){
        res.status(404).json("Empty date base!")
    }
    res.status(200).json(libary.books)
}

const bookReadControllerById = (req,res) => {
    const libary = DS.readFile(fileName)
    let id = req.params.id
    let found = libary.books.find( b=> b.id==id )
    if(!found){
        res.status(404).json(`${id}-id book not found`)
        return
    }
    res.status(200).json(found)
}

const bookReadControllerByTitle = (req,res) => {
    const libary = DS.readFile(fileName)
    let title = req.params.title.toLowerCase()
    let books = libary.books.filter( b=> b.title.toLowerCase().includes(title))
    if (books.length){
        res.json(books)
    } else {
        res.status(404).json("Not Found")
    }
}

const bookUpdateControllerById = (req,res) => {
    const libary = DS.readFile(fileName)
    let id = req.params.id
    let book = req.body
    if(!validatebooks(res, book)){
        return
    }

    book.createdAt = libary.books[id-1].createdAt
    book.updatedAt = new Date()
    libary.books[id-1] = book
    DS.saveFile(libary, fileName)
    res.status(200).json("successfuly updated..!")
}

const bookDeleteControllerById = (req,res) => {
    const libary =DS.readFile(fileName)
    let id = parseInt(req.params.id)                                 //!!
    let found = libary.books.find(b => b.id == id)
    if (!found){
        res.status(404).json(`${id} -- id book not found..!`)
        return
    }
    libary.books = libary.books.filter(r => r.id != id)
    DS.saveFile(libary, fileName)
    res.status(200).json("Successfuly Deleted..!")
} 

module.exports = {
    bookCreatController,
    bookReadController,
    bookReadControllerById,
    bookReadControllerByTitle,
    bookUpdateControllerById,
    bookDeleteControllerById
}