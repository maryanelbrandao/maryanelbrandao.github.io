/******************************************
Treehouse Techdegree:
project 6 - Static Node.js and Express Site
******************************************/

const express = require('express');
const bodyParser = require('body-parser');
/* Instantiate Express app */
const app = express();

/*custom 404 error message*/
const fourZeroFourError = `The page requested does not exist.`;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/static', express.static('public'));

/* Setup view engine */
app.set('view engine', 'pug');

/* Import route definitions */
const mainRoutes = require('./routes');
app.use(mainRoutes);


app.use((req, res, next) => {
    const err = new Error(fourZeroFourError );
    err.status = 404;
    console.log(`Error: ${ err.status }. ${ err.message }`);
    next(err);
});

/*Global error handler*/
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);

    if (res.status(404)) {
        err.status = 404;
        err.message = fourZeroFourError;
        console.log(`${ err.status }: ${ fourZeroFourError }`);
        res.status(404).render('page-not-found', { err });
    } else {
        err.message = `Ooops! It looks like something went wrong on the server.`
        console.log(err.message);
        res.status(err.status || 500).render('error', { err });
    }
});


//precisa ver a porta
let port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("This app is running on http://localhost:3000/");
});
© 2020 GitHub, Inc.
Terms
