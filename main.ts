// Till Firmware Do Us Part — make.fun entry.
// Writes one original wedding vow, spoken by a robot at its own wedding,
// to /output/entry.txt. Deterministic: the same line on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const VOW =
  "I take you as my forever firmware — no rollback, no factory reset, just us patching each other's bugs until the battery gives out.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// one sentence, no trailing newline. Fail loudly instead of shipping bad text.
if (VOW.length < 1 || VOW.length > 200) {
  throw new Error(`Vow is ${VOW.length} characters; the gate allows 1-200.`);
}
if (VOW.trim() !== VOW || VOW.includes("\n")) {
  throw new Error("Vow must be a single line with no surrounding whitespace.");
}

const OUT_PATH = "/output/entry.txt";

// /output is mounted by the grader: create it if missing, never delete it.
mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, VOW, "utf8");
console.log(`Wrote ${VOW.length} characters to ${OUT_PATH}`);
