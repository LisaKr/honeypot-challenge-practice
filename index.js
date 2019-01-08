const express = require('express');
const app = express();
const compression = require('compression');

const { test } = require("./api_calls.js");


app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.static("./public"));


/////GETTING POKEMON INFORMATION////////
app.get("/pokemons/:number", async (req,res) => {
    try {
        let resp = await test(req.params.number);
        console.log("resp", resp);
        res.json(resp);
    } catch(err) {
        console.log("error in pokemons", err);
    }

});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
