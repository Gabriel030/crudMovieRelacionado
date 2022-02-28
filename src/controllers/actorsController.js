const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const actorsController = { 
    list: (req, res ) => { 
        db.Actor.findAll()
        .then((actors) => { 
            res.render('actorsList', {actors})
        })
    },
    detail: (req,res) => {
        db.Actor.findByPk(req.params.id)
        .then((actor) => {
            res.render("actorDetail", {actor})
        })
    },


    add : ( req, res) => {
        res.render("actorsAdd")
    },
    create: (req,res) => {
       const {first_name, last_name, rating} = req.body
            Actors.create({
                first_name ,
                last_name, 
                rating, 
            })
            .then(() => {
                res.redirect("/actors")
            })

    },
    edit: (req,res) => {
        Actors.findByPk(req.params.id)
        .then((Actor) =>  {
            res.render("actorsEdit", {Actor})
        })
        
    },
    update: (req,res) => {
        const {first_name, last_name, rating} = req.body

            Actors.update({
                first_name,
                last_name,
                rating
            }, {
                where: {id : req.params.id}
            })
            .then(() => {
                res.redirect("/actors")
            })

    },

    delete: (req,res) => {
        let actorId = req.params.id

        db.Actor.findByPk(actorId)
        .then((actor)=> { 
            return res.render("actorDelete", {actor:actor})
        })
    },
    destroy: (req,res) => {
        
        Actors.destroy({
            where: {id: req.params.id}
        })
        .then(()=> {
            res.redirect("/actors")
        })
    }
    
    
}

module.exports = actorsController;