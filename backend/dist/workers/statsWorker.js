import { flushUnprocessedEvents } from "../services/events.js";
async function run() {
    const result = await flushUnprocessedEvents(1000);
    // eslint-disable-next-line no-console
    console.log("stats-worker:", result);
}
run().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=statsWorker.js.map