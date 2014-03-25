(function() {
    var AliceVShaney, dataLoadedHandler;

    $("#button").click(function() {
	$("#proposal").hide(0);
	return $.get("data/data.txt", dataLoadedHandler);
    });

    dataLoadedHandler = function(data) {
	return $("#proposal").text(AliceVShaney.generate(data, 3)).fadeIn("slow");
    };

    AliceVShaney = (function() {

	function AliceVShaney() {}

	AliceVShaney.words = [];

	AliceVShaney.splitter = " ";

	AliceVShaney.calcProbs = function(text, order) {
	    var chain, i, probs, _i, _ref;
	    probs = {};
	    text = text.replace(/\r\n|\n|\r|  /gm, " ");
	    this.words = text.split(this.splitter);
	    for (i = _i = 0, _ref = this.words.length - order + 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
		chain = this.words.slice(i, i + order - 1);
		if (!(probs[chain] != null)) {
		    probs[chain] = [];
		}
		probs[chain].push(this.words[i + order - 1]);
	    }
	    return probs;
	};

	AliceVShaney.generate = function(text, order) {
	    var chain, nextWord, output, probs, startPos, _ref;
	    probs = this.calcProbs(text, order);
	    nextWord = "";
	    output = "";
	    startPos = 1;
	    while (this.words[startPos - 1].substr(-1) !== ".") {
		startPos = Math.floor(Math.random() * (this.words.length - order - 1) + 1);
	    }
	    chain = this.words.slice(startPos, +(startPos + order - 2) + 1 || 9e9);
	    output = chain.join(this.splitter);
	    while ((_ref = nextWord.substr(-1)) !== '.' && _ref !== '!' && _ref !== '?') {
		nextWord = probs[chain][Math.floor(probs[chain].length * Math.random())];
		output = output + this.splitter + nextWord;
		chain.push(nextWord);
		chain = chain.slice(1);
	    }
	    return output;
	};

	return AliceVShaney;

    })();

}).call(this);