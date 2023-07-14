const router = require('express').Router();
const fs = require('fs')
const uuid = require('uuid')

router.get('/notes', (req, res) => {

    const notes = fs.readFileSync("./db/db.json")
    res.json(JSON.parse(notes))

});

router.post('/notes', async (req, res) => {
    // Get new note from request body 
    const newNote = {
        title: req.body.title,
        text: req.body.text
    }
    // // Read db.json parse out data
    const notes = await JSON.parse(fs.readFileSync("./db/db.json"))
    // // Use uuid to give new note a unique identifier
    uuid.v4(newNote);
    // // use .push to add to parsed data
    notes.push(newNote)
    // // write to db.json with new data & strigify
    JSON.stringify(notes);
    // // res.json the note that came in from the body
    res.json(newNote)
    // fs.writeFile
    fs.writeFile('./db/db.json', newNote);
});

// router.delete('/notes/:id', async (req, res) => {
//     fs.readFile("./db/db.json")
//     notes.destroy({
        
//     })
// })



module.exports = router;