const request = require("request");

const correct = async (text) => {
    try {
        if (!text || text.trim() == "") throw new Error("no text defined.");

        // find incorrect words
        const icWordsResponse = await sendRequest(text, false);
        const icWordLinesRegex = new RegExp("<span class=\"wordIncorrect.word[0-9]{1,2}\" id=\"word[0-9]{1,2}\">([\u0D80-\u0Dff]+)<\/span>", "g");
        const icWordLines = icWordsResponse.match(icWordLinesRegex);
        const icWords = icWordLines.map(str => str.match(/([\u0D80-\u0Dff]+)/g)[0]);


        // find corrected words
        const cWordsResponse = await sendRequest(text, true);
        const cWordLinesRegex = new RegExp("<span class=\"wordCorrected\">([\u0D80-\u0Dff]+)<\/span>", "g");
        const cWordLines = cWordsResponse.match(cWordLinesRegex);
        const cWords = cWordLines.map(str => str.match(/([\u0D80-\u0Dff]+)/g)[0]);

        // correct the text
        let cText = text;
        let corrections = {};
        icWords.forEach((icWord, index) => {
            let wordRegex = new RegExp(icWord, "g");
            cText = cText.replace(wordRegex, cWords[index]);
            corrections[icWord] = cWords[index];
        });
        
        return {
            text: cText,
            corrections: corrections
        }

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