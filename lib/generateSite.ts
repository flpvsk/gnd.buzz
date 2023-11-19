import { createElement } from "react";
import { renderToPipeableStream } from "react-dom/server";
import * as path from "path";
import * as fs from "fs/promises";

export async function generateSite(): Promise<void> {
  try {
    for (const file of await fs.readdir("build")) {
      await fs.unlink(path.join("build", file));
    }
  } catch (e: unknown) {
    console.error(e);
  }

  try {
    await fs.mkdir("build");
  } catch {}

  const sourceFiles = await fs.readdir("pages");
  await Promise.all(sourceFiles.map(generatePage));
}

async function generatePage(fPath: string): Promise<void> {
  const importPath = path.join("../pages", fPath);

  const exportPath = path.join(
    "build",
    path.dirname(fPath),
    path.basename(fPath, path.extname(fPath)) + ".html",
  );
  console.log("[OUT]", importPath, "->", exportPath);

  const exportFile = await fs.open(exportPath, "w");
  const Page = (await import(importPath)).default;

  return new Promise((resolve, reject) => {
    const writeStream = exportFile.createWriteStream();

    const { pipe } = renderToPipeableStream(createElement(Page), {
      onShellReady() {
        pipe(writeStream);
      },

      onShellError(e) {
        reject(e);
      },

      onError(e) {
        reject(e);
      },
    });

    writeStream.on("close", () => {
      exportFile.close().then(resolve).catch(reject);
    });
  });
}
