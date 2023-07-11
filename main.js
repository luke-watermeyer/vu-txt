
class Story {

    // Possible config options
    // 
    // onlyLatin ('Latin' standin for any charset. i.e. limit the display to ONLY plain characters. optimal for remote displays)
    // chunkRulesets (Allow for setting multiple sets of chunkChars and chunkRules)
    // transitionType (Allow for setting the type of transition used for a specific chunkRule)

    textContent;
    bgColor;
    txtColor;

    relWidth;
    relHeight;

    chunk;
    chunkRule;

    pages = null;

    constructor(options) {
        if (options.remote !== false) {

        } else {
            this.textContent = options.data.text;
            this.bgColor = options.color.background;
            this.txtColor = options.color.text;

            this.relWidth = options.relWidth;
            this.relHeight = options.relHeight;

            if (options.chunkText !== false) {
                this.chunk = true;
                this.chunkRule = new ChunkRule(options.chunkText);
            }
        }
    }

    logSelf() {
        console.log(`[Width: ${this.relWidth}, Height: ${this.relHeight}] chunkRule: ${this.chunkRule}, contentLength: ${this.textContent.length}`);
    }

    // The troubles with logging the chunkRules options shows EXACTLY why this whole thing whould be Object Oriented :)

    start() {
        let displayDiv = document.createElement("div");
        displayDiv.id = 'display-div';
        displayDiv.style.height = this.relHeight + 'vh';
        displayDiv.style.width = this.relWidth + 'vw';
        displayDiv.style.background = 'gray';
        displayDiv.style.position = 'absolute';
        displayDiv.style.bottom = '-' + this.relHeight + 'vh';
        displayDiv.style.transition = 'bottom 1s';

        document.body.appendChild(displayDiv);
        displayDiv.style.bottom = '50vh';
    }

    next() {
        if (this.pages === null) {
            console.error('Error in "next()" function, Story has not been started yet!');
        } else {

        }
    }

    abort() {
        if (this.pages === null) {
            console.error('Error in "abort()" function, Story has not been started yet!');
        } else {

        }
    }
}

class ChunkRule {
    chunkChar;

    constructor(options) {
        this.chunkChar = options.char;
    }

    toString() {
        //JSON.stringify will escape hidden chars for us :)
        return '{chunkChar: "' + JSON.stringify(this.chunkChar) + '", chunkCharCode: ' + this.chunkChar.charCodeAt() + '}';
    }
}