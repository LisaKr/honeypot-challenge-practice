const https = require("https");
// const { promisify } = require("util");


//this function goes and gets the information about one specific pokemon. we will call it multiple times. it is also a promise,
//so that we can wait for it to resolve before proceeding.
function getPokeInfo(someNumber) {
    return new Promise((resolve, reject) => {
        //the object we're gonna populate with properties
        let pokemon;

        let options = {
            method: "GET",
            host: "pokeapi.co",
            path: `/api/v2/pokemon/${someNumber}/`,
        };

        //runs when we have a response from the api
        let callback = resp => {

            if (resp.statusCode != 200) {
                reject("something didnt work", resp.statusCode);
            }

            let body = "";
            //when we start getting a response
            resp.on("data", chunk => {
                body += chunk;
            });
            //when the response is successfully transmitted
            resp.on("end", () => {
                let parsedBody = JSON.parse(body);

                let types = [];
                let abilities = [];
                let stats = [];
                let moves = [];
                let imgurlLarge, imgurlSmall;
                let moveLen;

                for (let i =0; i < parsedBody.types.length; i++) {
                    types.push(parsedBody.types[i].type.name);
                }

                for (let i =0; i < parsedBody.abilities.length; i++) {
                    abilities.push(parsedBody.abilities[i].ability.name);
                }

                for (let i =0; i < parsedBody.stats.length; i++) {
                    stats.push({statName: parsedBody.stats[i].stat.name,
                        stat: parsedBody.stats[i].base_stat
                    });
                }

                if (parsedBody.moves.length > 20) {
                    moveLen = 21;
                }  else {
                    moveLen = parsedBody.moves.length;
                }
                for (let i = 0; i < moveLen; i++) {
                    moves.push(parsedBody.moves[i].move.name);
                }

                if (parsedBody.id.toString().length == 1) {
                    imgurlLarge = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${parsedBody.id}.png`;
                    imgurlSmall=`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${parsedBody.id}.png`;
                } else if (parsedBody.id.toString().length == 2) {
                    imgurlLarge = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${parsedBody.id}.png`;
                    imgurlSmall=`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${parsedBody.id}.png`;
                } else {
                    imgurlLarge = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${parsedBody.id}.png`;
                    imgurlSmall=`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${parsedBody.id}.png`;
                }

                pokemon = {
                    id: parsedBody.id,
                    name: parsedBody.name,
                    types: types,
                    weight: parsedBody.weight,
                    height: parsedBody.height,
                    abilities: abilities,
                    stats: stats,
                    moves: moves,
                    imgurlLarge: imgurlLarge,
                    imgurlSmall: imgurlSmall
                };
                //after the response is successfully translated in the object for us to use later we resolve the promise
                resolve(
                    pokemon
                );
            });
        }; //callback ends here

        const req = https.request(options, callback);
        req.end();
    });
}

module.exports.test = function test(num, secondNum) {
    let arrayOfPromises = [];

    num = parseInt(num);
    secondNum = parseInt(secondNum);
    secondNum++;

    //we await a promise for every iteration, so that arrayOfPromises is full of pending promises
    for (let i = num; i < secondNum; i++) {
        console.log(i);
        arrayOfPromises.push(getPokeInfo([i]));
    }

    //once all requests/promises in the array are resolved, their results (array of objects) is returned
    return Promise.all(arrayOfPromises).then((results) => {
        // console.log("promise all resolved! here is array of promises", results);
        return results;
    });
};
