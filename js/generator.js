(function() {
    var AliceVShaney, dataLoadedHandler, hash_prop;

	//Full address of a page = (base_address) + (#! delimiter) + (encoded proposal)
    var full_url = document.URL;
    var share_url = full_url.split("#!/")[1]; //The shared-part of the URL used for IDing
    //Display proposal only if from proposal-shared link.
    if(share_url){
    	share_url = decodeURI(share_url);
		prop = share_url.split("").reverse().join(""); //The share-url is simply the reverse of the proposal-text, but URI encoded.
		$("#proposal").text(prop).fadeIn("slow");
    }

    $("#button").click(function() {
	$("#proposal").hide(0);
	return $.get("data/data.txt", dataLoadedHandler);
    });

    dataLoadedHandler = function(data) {
	return $("#proposal").text(AliceVShaney.generate(data, 3)).fadeIn("slow");
    };

    $("#share").click(function(){
    	var prop = $("#proposal").text();
    	if (prop != "") {
    		var encoded_url = AliceVShaney.encode_prop(prop);
    		//Currently sets the share-able link in the nav bar. 
    		// Ajay => You might want to display it in a small pop-up for better effect
    		//Full address = (base_address) + (#! delimiter) + (encoded proposal)
    		location.href = (location.href).split("#!/")[0] + "#!/" +encoded_url;
    	}
		
	});
	

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

	AliceVShaney.encode_prop = function(prop){
		prop = prop.split("").reverse().join("");
		prop = encodeURI(prop);
		return prop;
	}

	AliceVShaney.decode_prop = function(share_url){
		share_url = decodeURI(share_url);
		prop = share_url.split("").reverse().join("");
		return prop;
	}

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
