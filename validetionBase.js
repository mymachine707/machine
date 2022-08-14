function validateStudent(res, student) {
    if(!student["id"] ||
        !student["firstName"] ||
        !student["lastName"] ||
        !student["email"] ||
        !student["phone"] ||
        !student["birthdayDate"] ||
        !student["address"]
    ) {
        res.status(400)
        res.json("Invalid fields")
        return false
    }
    return true
}

function validatebooks(res, book ) {
    if(!book["id"] ||
        !book["isbn"] ||
        !book["title"] ||
        !book["gener"] ||
        !book["decription"] ||
        !book["author"] ||
        !book["publishyear"] ||
        !book["books_photo_url"] 
    ) {
        res.status(400)
        res.json("Invalid fields")
        return false
    }
    return true
}

module.exports = {
    validateStudent,
    validatebooks
}