const request = require("request");
const cheerio = require('cheerio')

const correct = async (text) => {
    try {
        if (!text || text.trim() == "") throw new Error("no text defined.");

        // find incorrect words
        let body = await sendRequest(text, false);
        let $ = cheerio.load(body);

        // store corrections
        const corrections = {};

        // incorrect words
        const iWords = [];

        // scrape words using cheerio
        $(".wordIncorrect").each((i, el) => {
            const word = $(el).text();
            if (iWords.indexOf(word) == -1) {
                iWords.push(word);
            }
        });

        // find corrected words
        body = await sendRequest(text, true);
        $ = cheerio.load(body);

        // corrected words
        const cWords = [];

        $(".wordCorrected").each((i, el) => {
            const word = $(el).text();
            if (cWords.indexOf(word) == -1) cWords.push(word);
        });

        // replace incorrect words in text with correct ones
        let cText = text;

        iWords.forEach((word, i) => {
            var regEx = new RegExp(word, 'g');
            cText = cText.replace(regEx, cWords[i]);

            // add to corrections
            corrections[word] = cWords[i];
        });

        return ({ text: cText, corrections });

    } catch (error) {
        // if request failed, throw error
        throw new Error(error);
    }
}

const sendRequest = (text, ac = false) => {
    // send request to subasa website
    return new Promise((resolve, reject) => {
        const options = {
            method: "POST",
            url: "http://speller.subasa.lk/spellerweb.py",
            port: 443,
            headers: {
                "Content-Type": "multipart/form-data"
            },
            formData: {
                "inputtext": text,
                "autocorrect": ac ? "on" : "false"
            }
        };

        request(options, function (err, res, body) {
            if (err) reject(err);
            resolve(body);
        });
    });
}

module.exports = {
    correct
}