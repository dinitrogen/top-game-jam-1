import { cp, mkdir, rm } from "node:fs/promises";
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
await mkdir(resolve(output, "vendor"), { recursive: true });
await cp(
  resolve(root, "node_modules/tone/build/Tone.js"),
  resolve(output, "vendor/Tone.js"),
);
