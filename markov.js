/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== '');
	}

	/** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		//make an array of unique words
		const unique = this.words.filter((val, idx, arr) => arr.indexOf(val) === idx);
		//instantiate the text chains
		let chains = {};

		//for each unique word...
		unique.forEach((word) => {
			//make a key of that word in the chains obj
			chains[word] = [];
			//for the length of this.words, if chain[word] matches the word in this.words...
			for (let i = 0; i < this.words.length; i++) {
				//add the next word to chain[word]'s array value
				if (word === this.words[i]) {
					if (i < this.words.length) {
						chains[word].push(this.words[i + 1]);
					}
				}
			}
		});
		return chains;
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		//make the text chains
		let chains = this.makeChains();
		//choose a random starting word
		let word = this.words[Math.floor(Math.random() * this.words.length)];
		//instantiate the text
		let text = [ word ];

		//while the length of the text is less than the numWords input AND the next word is not undefined, select a random word from the word chains
		do {
			let nextWord = chains[word][Math.floor(Math.random() * chains[word].length)];
			text.push(nextWord);
			word = nextWord;
		} while (text.length < numWords && chains[word] != undefined);

		//join the text on a space and log it
		console.log(text.join(' '));
	}
}
