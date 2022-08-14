let PORT = process.env.PORT || 3000
const express = require('express')
const server  = express()

// for send JSON data

server.use(express.json())

const student = require('./dataBasic/students')
const book = require('./dataBasic/bookInfo')
const dataCustomers = require('./dataBasic/dataCustomer')


// student
server.post('/student', student.studentCreatController)
server.get('/student', student.studentReadController)
server.get('/student/:id', student.studentReadControllerbyId)
server.get('/student/filter/:firstName', student.studentReadControllerByName)
server.put('/student/:id', student.studentUpdateControllerById)
server.delete('/student/:id', student.studentDeleteControllerById)


// book

server.post('/book', book.bookCreatController)
server.get('/book', book.bookReadController)
server.get('/book/:id', book.bookReadControllerById)
server.get('/book/filter/:title', book.bookReadControllerByTitle)
server.put('/book/:id', book.bookUpdateControllerById)
server.delete('/book/:id', book.bookDeleteControllerById)


// dataCustomer

server.post('/dataCustomers/:idS/:idB/booked', dataCustomers.BookedController)

// update

server.put('/dataCustomers/:idS/:idB/returned', dataCustomers.bookReturnedController)

// joined

server.get('/dataCustomers/:idS', dataCustomers.readControllerByID)



server.listen(PORT, ()=> {
    console.log(`Serve is running on port: ${PORT}...`)
})