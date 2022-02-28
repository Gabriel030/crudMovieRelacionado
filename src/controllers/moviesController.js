const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const genresController = require("../controllers/genresController")

//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll({
            include: [{association: 'genre'}, {association: 'actors'}]
        })
            .then(movies => {
                // asi traigo el genero dee la pelicula 0
              //res.send(movies[0].genre) 
              //asi traigo los actores de cada pelicula
             // res.send(movies[1].actors) 
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: function (req, res) {
        
        
        
           res.render("moviesAdd")
           
        
          
    },
    create: function (req,res) {
        const {title, rating, awards, length, release_date} = req.body; 
       
        Movies.create({
            title, 
            rating,
            awards,
            length,
            release_date,
            genre_id: 1 , 
        })
        .then (() => {
            return res.redirect("/movies")
        })
    },
    edit: function(req,res) {
        let movieId = req.params.id ; 

        Movies.findByPk(movieId) 
        .then(Movie => {
            return res.render('moviesEdit', {Movie})
        })
    },
    update: function (req,res) {
        const {title, rating, awards, length, release_date} = req.body; 
        Movies.update({
            title, 
            rating,
            awards,
            length,
            release_date,
        }, {
            where: {id: req.params.id}
        })
        .then(()=> res.redirect("/movies"))
    },
    delete: function (req,res) {
        let movieId = req.params.id ; 

        Movies.findByPk(movieId) 
        .then(Movie => {
            return res.render('moviesDelete', {Movie})
        })
    },
    destroy: function (req,res) {
        Movies.destroy({
            where: {id: req.params.id}
        })
        .then(()=> res.redirect("/movies")) 
    },
    mostrarGeneros: function() { 
        
    }
}

module.exports = moviesController;