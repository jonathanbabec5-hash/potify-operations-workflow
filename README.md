# POTIFY Operations Workflow

[Complete repository directory tree](docs/DIRECTORY.md)

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
