$('#button').click(function() {
    $('#proposal').hide(0);
    return $.get('data/data.txt', buttonHandler);
});

buttonHandler = function(data) {
    return $('#proposal').text(generateSentence(data,3)).fadeIn('slow');
};

buildDatabase = function(text, N) {
    text = text.replace(/\r\n|\n|\r| /gm, " ");
    sentences = text.split('. ');
    table = {};
    for (num=0; num<sentences.length; num++) {
	words = sentences[num].split(' ');
	for (i=0; i<words.length - N + 1; i++) {
	    chain = words.slice(i,i + N - 1);
	    if (table[chain] == null) {
		table[chain] = [];
	    }
	    table[chain].push(words[i + N - 1]);
	}
    }
    return table;
};

generateSentence = function(text, N) {
    table = buildDatabase(text, N);
    chain = ['I', 'propose'];
    for (i=0; i< 40; i++) {
	snip = chain.slice(i, i + N - 1);
	if (table[snip] == null) {
	    console.log(i);
	    break;
	}
	next = table[snip][Math.floor(table[snip].length * Math.random())];
	chain.push(next);
    }
    output = chain.join(' ');
    return output;
};