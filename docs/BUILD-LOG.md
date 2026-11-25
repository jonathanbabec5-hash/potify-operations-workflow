# November 25, 2026 · POTIFY Operations Workflow

**Question.** Let an editor prove the difference between a reviewed draft and a verified publication.

**Source and change.** potify-operations at `bc14edd67ff70bff6666dac0345aee60b321ead4`. Original state transitions and tests. No imported items, connection identifiers, records or credentials.

**Observed result.** All seven original workflow tests passed. They cover approval scope, revisions, required schedule evidence and publication receipts.

```sh
node --test tests/workflow.test.mjs
```

**Next acceptance check.** Run fixtures proving that editing approved content invalidates approval and a schedule requires a receipt.

**Owner and decision.** Chance owns the public release and approves campaign copy. The private operations app, imported tasks, comments and production publishing records stay separate.

This dated record describes the developer package. Verify remote commit and tree in the publication receipt before announcing a GitHub release.
