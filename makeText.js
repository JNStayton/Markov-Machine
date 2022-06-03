/** Command-line tool to generate Markov text. */

const fs = require('fs');
const process = require('process');
const axios = require('axios');
const markov = require('./markov');

//accepts text, returns text as run through makeText of Markov Machine
function markovMe(text) {
	let mm = new markov.MarkovMachine(text);
	let newText = mm.makeText();
	return newText;
}

//reads file and runs markovMe with file text, prints the outcome
function markovFile(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.log('ERROR', err);
			process.exit(1);
		}
		return console.log(markovMe(data));
	});
}

//accesses URL and parses data, runs markovMe with data text, prints the outcome
async function markovUrl(url) {
	try {
		let response = await axios.get(url);
		return console.log(markovMe(response.data));
	} catch (err) {
		console.log(`ERROR WITH ${url}: URL not found`);
		process.exit(1);
	}
}

//determines if input is URL or file
let path = process.argv[2];
if (path.includes('http')) {
	markovUrl(path);
} else {
	markovFile(path);
}
