/** @jsx jsx */
import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";
import { etag } from "hono/etag";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx } from "hono/jsx";

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
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/icons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <title>abekoh.dev</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.classless.min.css"
        />
        <link rel="me" href="https://mstdn.jp/@abekoh" />
      </head>
      <body>{props.children}</body>
    </html>
  );
};

const links: { href: string; text: string }[] = [
  {
    href: "https://github.com/abekoh",
    text: "GitHub",
  },
  {
    href: "https://blog.abekoh.dev/",
    text: "abekoh's tech note",
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
    href: "https://www.linkedin.com/in/abekoh",
    text: "LinkedIn",
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
    href: "https://github.com/abekoh/abekoh/blob/main/RESUME-ja.md",
    text: "Resume",
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

app.get("/icons/*", serveStatic({ root: "./" }));

app.get("/favicon.ico", serveStatic({ path: "./icons/favicon.ico" }));

app.get("/.well-known/atproto-did", (c) => {
  return c.text("did:plc:eadrwmh2en6uubkc5cmslqom");
});

export default app;
