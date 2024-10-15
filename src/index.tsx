/** @jsx jsx */
import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";
import { etag } from "hono/etag";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx } from "hono/jsx";

import manifest from "__STATIC_CONTENT_MANIFEST";

const app = new Hono();

app.use("/icons/*", etag());

const Layout = (props: { children?: string }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="author" content="abekoh" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/x-icon"
          href="/favicon.ico"
          sizes="48x48"
        />
        <title>abekoh.dev</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.classless.min.css"
        />
        <link rel="me" href="https://mstdn.jp/@abekoh" />
        <link rel="author" href="https://www.hatena.ne.jp/abekoh/" />
      </head>
      <body>{props.children}</body>
    </html>
  );
};

const links: { href: string; text: string }[] = [
  {
    href: "https://blog.abekoh.dev/",
    text: "abekoh's tech note (blog)",
  },
  {
    href: "https://github.com/abekoh",
    text: "GitHub",
  },
  {
    href: "https://twitter.com/abekoh_bcky",
    text: "Twitter",
  },
  {
    href: "https://bsky.app/profile/abekoh.dev",
    text: "Bluesky",
  },
  {
    href: "https://mstdn.jp/@abekoh",
    text: "Mastodon",
  },
  {
    href: "https://zenn.dev/abekoh",
    text: "Zenn",
  },
  {
    href: "https://qiita.com/abekoh",
    text: "Qiita",
  },
  {
    href: "https://speakerdeck.com/abekoh",
    text: "Speaker Deck",
  },
  {
    href: "https://connpass.com/user/abekoh",
    text: "connpass",
  },
];

const Top = () => {
  return (
    <Layout>
      <main>
        <h1>abekoh.dev</h1>
        <img src="/icons/author.png" alt="author" />
        <p>abekoh (Kotaro Abe, 阿部 耕太郎) is a software engineer.</p>
        <ul>
          {links.map((link) => (
            <li>
              <a href={link.href}>{link.text}</a>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};

app.get("/", (c) => {
  return c.html(<Top />);
});

app.get("/icons/*", serveStatic({ root: "./", manifest }));

app.get("/favicon.ico", serveStatic({ path: "./icons/favicon.ico" }));

app.get("/.well-known/atproto-did", (c) => {
  return c.text("did:plc:eadrwmh2en6uubkc5cmslqom");
});

export default app;
