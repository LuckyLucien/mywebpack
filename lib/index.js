const Compiler = require("./compiler");
const options = require("../mywebpack.config");

new Compiler(options).run();
