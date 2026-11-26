import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const output = resolve(root, "www");
const files = [
  "audio.js",
  "high-scores.js",
  "how-to-play.js",
  "index.html",
  "konami.js",
  "levels.js",
  "maps.js",
  "note-library.js",
  "save-data.js",
  "script.js",
  "style.css",
];
const directories = ["fonts", "img", "music", "sounds"];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

await Promise.all(
  files.map((file) => cp(resolve(root, file), resolve(output, file))),
);
await Promise.all(
  directories.map((directory) =>
    cp(resolve(root, directory), resolve(output, directory), {
      recursive: true,
    }),
  ),
);
await mkdir(resolve(output, "node_modules/@capacitor/app/dist"), {
  recursive: true,
});
await cp(
  resolve(root, "node_modules/@capacitor/app/dist/esm"),
  resolve(output, "node_modules/@capacitor/app/dist/esm"),
  { recursive: true },
);
const appModulePath = resolve(
  output,
  "node_modules/@capacitor/app/dist/esm/index.js",
);
const appModule = await readFile(appModulePath, "utf8");
await writeFile(
  appModulePath,
  appModule.replaceAll("'./web'", "'./web.js'").replaceAll(
    "'./definitions'",
    "'./definitions.js'",
  ),
);
await cp(
  resolve(root, "node_modules/@capacitor/app/LICENSE"),
  resolve(output, "node_modules/@capacitor/app/LICENSE"),
);
await mkdir(resolve(output, "node_modules/@capacitor/core/dist"), {
  recursive: true,
});
await cp(
  resolve(root, "node_modules/@capacitor/core/dist/index.js"),
  resolve(output, "node_modules/@capacitor/core/dist/index.js"),
);
await cp(
  resolve(root, "node_modules/@capacitor/core/LICENSE"),
  resolve(output, "node_modules/@capacitor/core/LICENSE"),
);
await mkdir(resolve(output, "vendor"), { recursive: true });
await cp(
  resolve(root, "node_modules/tone/build/Tone.js"),
  resolve(output, "vendor/Tone.js"),
);
