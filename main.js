
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

    display;

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
        this.pages = this.chunkRule.paginate(this.textContent);
        this.display = new Display(this.relHeight, this.relWidth, this.pages);
        this.display.reveal();
    }

    next() {
        if (this.pages === null) {
            console.error('Error in "next()" function, Story has not been started yet!');
        } else {
            this.display.next();
        }
    }

    abort() {
        if (this.pages === null) {
            console.error('Error in "abort()" function, Story has not been started yet!');
        } else {

        }
    }
}

class Display {
    displayDiv;
    
    width;
    height;
    pages;

    pageNo;

    constructor(height, width, pages) {
        this.width = width;
        this.height = height;
        this.pages = pages;

        let left = (100 - this.width) / 2;

        this.displayDiv = document.createElement("div");
        this.displayDiv.id = 'display-div';
        this.displayDiv.style.height = height + 'vh';
        this.displayDiv.style.width = width + 'vw';
        this.displayDiv.style.background = 'gray';
        this.displayDiv.style.position = 'absolute';
        this.displayDiv.style.left = left + 'vw';
        this.displayDiv.style.bottom = '-' + height + 'vh';
        this.displayDiv.style.transition = 'bottom 1s';

        this.pageNo = 1;
        this.displayDiv.innerHTML = this.pages[0];
    }

    reveal() {
        document.body.appendChild(this.displayDiv);

        setTimeout(function() {
            let bottom = (100 - this.height) / 2;
            this.displayDiv.style.bottom = bottom + 'vh';
        }.bind(this), 500);
    }

    conceal() {
        this.displayDiv.addEventListener('transitionend', function() {
            this.displayDiv.remove();
        }.bind(this));
        this.displayDiv.style.bottom = '-' + this.height + 'vh';
    }

    next() {
        if (this.pageNo === this.pages.length) {
            this.conceal();
        } else {
            this.displayDiv.innerHTML = this.pages[this.pageNo++];
        }
    }
}

class ChunkRule {
    chunkChar;

    // We can add in any chunking rules we want to support into this class
    // e.g. preserveChunkChar, replacementChar

    constructor(options) {
        this.chunkChar = options.char;
    }

    toString() {
        //JSON.stringify will escape hidden chars for us :)
        return '{chunkChar: "' + JSON.stringify(this.chunkChar) + '", chunkCharCode: ' + this.chunkChar.charCodeAt() + '}';
    }

    paginate(text) {
        return text.split(this.chunkChar);
    }
}