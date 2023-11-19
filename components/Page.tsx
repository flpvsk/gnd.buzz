import * as React from "react";

export interface PageProps {
  title: string;
  children: React.ReactNode;
}

export const Page = (props: PageProps) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{props.title}</title>
        <link rel="stylesheet" href="main.css" />
      </head>

      <body>
        {props.children}
        <footer>This is a page layout</footer>
      </body>
    </html>
  );
};
