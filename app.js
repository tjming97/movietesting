const express = require('express');
const app = express();
const Movie = require('./Movie');
const bodyParser = require('body-parser');
const axios = require('axios');

const apikey = '385e80';

//x-ww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//localhost:5000/getmovie?title=YourMovieTitle
app.get('/getmovie', (req, res) => {
  const title = req.query.title;

  const querystr = `http://www.omdbapi.com/?t=${title}&apikey=${apikey}`;

  axios
    .get(querystr)
    .then(response => {
      const movie = new Movie({
        title: response.data.Title,
        year: response.data.Year,
        genre: response.data.Genre,
        actors: response.data.Actors,
        plot: response.data.Plot,
        poster: response.data.Poster
      });

      if (!movie.title) {
        res.status(200).json('Not found');
        return;
      }
      movie
        .save()
        .then(response => {
          res.status(200).json(response);
        })
        .catch(error => {
          res.status(400).json(error);
        });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost:5000/create?name=YourName&value=YourValue

app.get('/create', (req, res) => {
  const name = req.query.name;
  const value = req.query.value;

  //   const obj = {
  //     name: req.query.name,
  //     value: req.query.value
  //   };
  //   res.status(200).send('create ok');
  const movie = new Movie({
    name: req.query.name,
    value: req.query.value
  });

  movie
    .save()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });

  //   res.status(200).send(obj);
});

app.get('/getallmovies', (req, res) => {
  Movie.find({})
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost:5000/delete?name=NAME
app.get('/delete', (req, res) => {
  const query = {
    name: req.query.name
  };
  Movie.deleteMany(query)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost/postcreate
//x-www-form-urlencoded
//name=NAME value = VALUE

app.post('/postcreate', (req, res) => {
  const movie = new Movie({
    name: req.body.name,
    value: req.body.value
  });
  movie
    .save()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});

//npm body-parser --save
