const { MarkovMachine } = require('./markov');

describe('testing Markov Machine class', () => {
	let mm;

	//generate MarkovMachine test before running tests
	beforeEach(() => {
		mm = new MarkovMachine('i am a test');
	});

	//test that the makeChains method returns a dictionary with appropriate keys and values
	test('make chains', () => {
		let chains = mm.makeChains();
		expect(chains).toEqual({
			i: [ 'am' ],
			am: [ 'a' ],
			a: [ 'test' ],
			test: [ undefined ]
		});
	});

	//test that the .makeText method uses the chains to return string data
	test('make text from chains', () => {
		expect(mm.makeText()).toEqual(expect.any(String));
	});
});
