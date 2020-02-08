const { expect } = require('chai');
const index = require("../index");

describe('text correction', function () {
    const text = "මථකය (ස්මෘතිය) යනු ජීවියෙකු තුළ තොරතුරු ගබඩා කිරීමට සහ ඉන්පසුව එම තොරතුරු ණැවත එලි දැක්වීමට ඇති හැකියාවයි.";

    it('should give a non empty corrected string', (done) => {
        index.correct(text).then(data => {
            expect(data.text).to.be.not.empty.string;
            done();
        });
    });

    it('should give an object with corrections', (done) => {
        index.correct(text).then(data => {
            expect(data.corrections).to.be.an("Object");
            done();
        });
    });

    it('should reject with an error when input text is not given', (done) => {
        index.correct().catch(error => {
            expect(error).to.be.an("Error");
            done();
        });
    });

    it('should reject with an error when input text is empty', (done) => {
        index.correct(" ").catch(error => {
            expect(error).to.be.an("Error");
            done();
        });
    });
});
