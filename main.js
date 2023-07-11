
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
    chunkRules;

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
                this.chunkRules = {chunkChar: options.chunkText.char}
            }
        }
    }

    logSelf() {
        console.log(`[Width: ${this.relWidth}, Height: ${this.relHeight}] chunkRules: ${JSON.stringify(this.chunkRules)}, contentLength: ${this.textContent.length}`);
    }

    // The troubles with logging the chunkRules options shows EXACTLY why this whole thing whould be Object Oriented :)
}

class ChunkRule {
    chunkChar;
}