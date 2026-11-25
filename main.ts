// The Tired Dark Lord: A 100-Word Villain Monologue
// SPDX-License-Identifier: MIT
//
// Deterministic entry generator for make.fun competition
// u-kevin-the-tired-dark-lord-a-100-word-villain-58b4f3cb
//
// Writes one original monologue (~100 words) to /output/entry.txt
// (or $OUTPUT_DIR/entry.txt when set). The gate (RULES.txt "## The gate"):
// entry.txt must be UTF-8 text of 1 to 600 characters, not only whitespace.
// Gate note: the sealed scorer only requires 1-600 UTF-8 characters and
// non-whitespace content, but the judge brief asks for "about 100 words"
// with the tiredness felt in rhythm and deflection, so this program also
// self-checks a 90-110 word window and a single unbroken block of text.
// The monologue itself is about 100 words: a fantasy villain who is
// secretly just very tired, the tiredness carried by rhythm, pauses and
// small deflections — never by a plain statement of weariness.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Hero. Come in \u2014 mind the third step, it bites. " +
  "I have ruled these marshes forty years, and every spring some champion climbs my tower to end it all. " +
  "Sit. Or stand. The kettle's gone cold again; the imps unionised. " +
  "I was going to flood the valley at dawn, drown the harvest, starve the king into kneeling \u2014 the usual. " +
  "But the floodgates rusted, the ravens filed a complaint, and honestly, the paperwork alone. " +
  "So swing your sword, hero. Just not the left shoulder. " +
  "That one's been aching since Barrowgate, and I have a night of scheming ahead. " +
  "...Where was I?";

function wordCount(text: string): number {
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

function selfCheck(text: string): void {
  // Gate: 1-600 characters, not only whitespace.
  if (text.length < 1 || text.length > 600) {
    throw new Error(`gate failed: entry is ${text.length} characters (must be 1-600)`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: entry is only whitespace");
  }
  // Single block of text: no line breaks at all.
  if (/[\r\n]/.test(text)) {
    throw new Error("gate failed: entry must be a single block of text");
  }
  // About 100 words: allow 90-110.
  const words = wordCount(text);
  if (words < 90 || words > 110) {
    throw new Error(`gate failed: entry is ${words} words (must be about 100)`);
  }
}

const outDir = process.env.OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
selfCheck(ENTRY);
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${ENTRY.length} chars, ${wordCount(ENTRY)} words)`);
