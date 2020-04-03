const { expect } = require('chai');
const index = require("../index");

describe('text correction', function () {
    const texts = [
        "මථකය (ස්මෘතිය) යනු ජීවියෙකු තුළ තොරතුරු ගබඩා කිරීමට සහ ඉන්පසුව එම තොරතුරු ණැවත එලි දැක්වීමට ඇති හැකියාවයි.",
        "කොරෝනාවෛරසයේ බලපෑම ලොව පුරා වෙසෙන ශ්‍රී ලාංකිකයින්ට වඩාත් බරපතළ ලෙස සංවේදී වන්නේ, ඔවුන් මව්බිම නොවන වෙනත් රටක සිට මෙම තත්ත්වයට මුහුණ දෙමින් සිටින හෙයිනි.",
        "දුකට පත් වැළපෙන්නන් මෘතදේහය වටා පැදකුණු කරමින් ගමන් ගන්නේ දේහය නරඹමිනි. පසුව මියගිය තැනැත්තාගේ පවුලේ සාමාජිකයන්ට අතට අත දී සිය ශෝකය පළ කරති."
    ];

    it('should give a non empty corrected string', (done) => {
        for (let text of texts) {            
            index.correct(text).then(data => {
                expect(data.text).to.be.not.empty.string;
            });
        }
        done();
    });

    it('should give an object with corrections', (done) => {
        for (let text of texts) {            
            index.correct(text).then(data => {
                expect(data.corrections).to.be.an("Object");
            });
        }
        done();
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
