# POTIFY Operations Workflow

## Find your way in

| If you are… | Start here | Try this |
| --- | --- | --- |
| An editor | [Read the workflow question](#what-exactly-did-the-editor-approve) | See why an approved version and a changed draft are different. |
| A developer | [Inspect state transitions](lib/workflow.ts) | Trace review, scheduling evidence and publication states. |
| A tester | [Run the synthetic tests](#setup-and-usage) | Follow what happens when approved copy changes. |

[Complete repository directory tree](docs/DIRECTORY.md)

## What exactly did the editor approve?

Change a single word after a post is approved and a different piece of writing may go out under somebody’s name. This little workflow takes that ordinary editorial concern seriously enough to put it in code.

Read the [state transitions](lib/workflow.ts) beside the [seven workflow tests](tests/workflow.test.mjs). Watch for three different decisions: accepting a particular version, recording an actual schedule and recording publication evidence. A time typed into a form satisfies none of them by itself.

Take one approved fixture and change material copy while keeping its time. Follow its review state and explain which evidence would let it advance again. A useful contribution is a small example an editor can read aloud and an engineer can reproduce.

**Public approval-state library.** Let an editor prove the difference between a reviewed draft and a verified publication.

### Setup and usage

Use Node.js 24 for the included checks.

```sh
node --test tests/workflow.test.mjs
```

Run the state-transition fixtures. 

### Developer entry points

Pure transitions govern review, schedule evidence, publication and revision. Tests operate on synthetic items without a publishing connection. Explore `lib/`, `tests/` in the full tree.

### Verification

All seven original workflow tests passed. They cover approval scope, revisions, required schedule evidence and publication receipts.

```sh
node --test tests/workflow.test.mjs
```

### Release scope

The private operations app, imported tasks, comments and production publishing records stay separate. potify-operations at `bc14edd67ff70bff6666dac0345aee60b321ead4`. Original state transitions and tests. No imported items, connection identifiers, records or credentials.

[Technical whitepaper](docs/WHITEPAPER.md) · [Marketing and sales plan](docs/MARKETING.md) · [Dated developer log](docs/BUILD-LOG.md)

Existing asset and code terms remain applicable. Public access to a recording, illustration, brand or manuscript does not itself grant commercial reuse rights.
