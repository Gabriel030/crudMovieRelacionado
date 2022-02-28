const db = require('../database/models');
const sequelize = db.sequelize;


const genresController = {
    list: (req, res) => {
        db.Genre.findAll({
            include: [{association: 'movie'}]
        })
            .then(genres => {
                //asi traigo todas las peliculas del genero 0 
                //res.send(genres[0].movie)
                res.render('genresList.ejs', {genres})
            })
    },
    'detail': (req, res) => {
        db.Genre.findByPk(req.params.id)
            .then(genre => {
                res.render('genresDetail.ejs', {genre});
            });
    }

}

module.exports = genresController;