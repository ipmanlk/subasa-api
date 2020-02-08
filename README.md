<a href="http://speller.subasa.lk/">
    <img src="https://i.imgur.com/gBcNlON.png" alt="Subasa logo" title="Subasa" align="right" height="60" />
</a>

# Javascript API for Subasa Sinhala spell checker

## Usage

Download node from nodejs.org and install it, if you haven't already.

Then install sinhala-sub-maker using npm or yarn.

```javascript
npm install @ipmanlk/subasa-api --save
```

Example,

```javascript
const { correct } = require("@ipmanlk/subasa-api");

const text = "මථකය (ස්මෘතිය) යනු ජීවියෙකු තුළ තොරතුරු ගබඩා කිරීමට සහ ඉන්පසුව එම තොරතුරු ණැවත එලි දැක්වීමට ඇති හැකියාවයි.";

correct(text).then(data => {
    console.log("corrected text: ", data.text);
    console.log("corrections: ", data.corrections);
});
```
