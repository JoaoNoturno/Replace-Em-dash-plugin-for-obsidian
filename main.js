const { Plugin } = require("obsidian");

module.exports = class AutoEmDashPlugin extends Plugin {

    timers = {};

    async onload() {

        this.registerEvent(
            this.app.workspace.on("editor-change", (editor) => {

                const cursor = editor.getCursor();
                const lineNumber = cursor.line;
                const line = editor.getLine(lineNumber);

                
                if (!line) return;
                clearTimeout(this.timers[lineNumber]);
                this.timers[lineNumber] = setTimeout(() => {
                    const newLine = line.replace(/(?<!-)--(?!-)/g, "—");
                    if (newLine !== line) {
                        editor.setLine(lineNumber, newLine);
                    }
                }, 250); 
            })
        );
    }
};
