
const fs = require("fs");
const path = require("path");
const JavaScriptObfuscator = require("javascript-obfuscator");

const jsFolder = path.join(
  __dirname,
  "build",
  "static",
  "js"
);

const files = fs
  .readdirSync(jsFolder)
  .filter((file) => file.endsWith(".js"));

console.log("====================================");
console.log("Starting JavaScript Obfuscation...");
console.log("====================================");

files.forEach((file) => {
  const filePath = path.join(jsFolder, file);

  console.log(`Obfuscating: ${file}`);

  const code = fs.readFileSync(
    filePath,
    "utf8"
  );

  const result =
    JavaScriptObfuscator.obfuscate(
      code,
      {
        compact: true,

        identifierNamesGenerator: "hexadecimal",

        stringArray: true,
        stringArrayEncoding: ["base64"],
        stringArrayThreshold: 0.75,

        splitStrings: true,
        splitStringsChunkLength: 5,

        renameGlobals: false,

        selfDefending: false,

        controlFlowFlattening: false,

        deadCodeInjection: false,

        disableConsoleOutput: false,
      }
    );

  fs.writeFileSync(
    filePath,
    result.getObfuscatedCode(),
    "utf8"
  );

  console.log(`✅ Done: ${file}`);
});

console.log("====================================");
console.log("✅ Obfuscation Completed");
console.log("====================================");