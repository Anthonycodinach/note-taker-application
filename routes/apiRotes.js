const router = require('express').Router();
const fs = require('fs')
const {uuid} = require('uuidv4')

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
    newNote.id = uuid();
    const notes = await JSON.parse(fs.readFileSync("./db/db.json"))
    // // Use uuid to give new note a unique identifier
    // // use .push to add to parsed data
    notes.push(newNote)
    // // write to db.json with new data & strigify
    // // res.json the note that came in from the body
    // fs.writeFile
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(newNote)
});

router.delete('/notes/:id', async (req, res) => {
    try {
      const noteId = req.params.id;
  
      // Read existing notes from db.json
      const notes = await JSON.parse(fs.readFileSync('./db/db.json'));
  
      // Find the index of the note with the matching ID
      const noteIndex = notes.findIndex((note) => note.id === noteId);
  
      // Check if the note exists
      if (noteIndex === -1) {
        return res.status(404).json({ message: 'Note not found' });
      }
  
      // Remove the note from the notes array
      notes.splice(noteIndex, 1);
  
      // Write the updated notes array back to db.json
      fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  
      res.status(204).send();
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;