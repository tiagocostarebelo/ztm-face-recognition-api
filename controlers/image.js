const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '3f7e473eae35451a8f70e23278511985'
});

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('Unable to work with API'))
}


const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        }) 
        .catch(err => res.status(400).json('Unable to get count'))
}

module.exports = {
    handleImage,
    handleApiCall
}