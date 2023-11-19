import { register } from "node:module";

// order is important
register("ts-node/esm", import.meta.url);
register("@mdx-js/node-loader", import.meta.url);
