import { generateSite } from "./generateSite.ts";

(() => {
  generateSite()
    .then(() => {
      console.log("done");
      process.exit(0);
    })
    .catch((e: unknown) => {
      console.error(e);
      process.exit(1);
    });
})();
