import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";
import { serveStatic } from "hono/cloudflare-workers";

const app = new Hono();

app.use("*", poweredBy());

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
          href="/assets/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/assets/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon-16x16.png"
        />
        <title>abekoh.dev</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.classless.min.css"
        />
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
    text: "abekoh's tech note (blog, Japanese)",
  },
  {
    href: "https://twitter.com/abekoh_bcky",
    text: "Twitter",
  },
  {
    href: "https://bsky.app/profile/abekoh.bsky.social",
    text: "Bluesky",
  },
  {
    href: "https://mstdn.jp/@abekoh",
    text: "Mastodon (mstdn.jp)",
  },
  {
    href: "https://www.linkedin.com/in/abekoh",
    text: "LinkedIn",
  },
  {
    href: "https://speakerdeck.com/abekoh",
    text: "Speaker Deck",
  },
  {
    href: "https://zenn.dev/abekoh",
    text: "Zenn",
  },
  {
    href: "https://qiita.com/abekoh",
    text: "Qiita",
  },
];

const Top = () => {
  return (
    <Layout>
      <main>
        <h1>abekoh.dev</h1>
        <img src="/assets/author.png" alt="author" />
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

app.get(
  "/assets/*",
  serveStatic({
    root: "./",
    rewriteRequestPath: (path) => path.replace(/^\/assets/, "/"),
  })
);

app.get("/favicon.ico", serveStatic({ path: "./favicon.ico" }));

app.get("/.well-known/atproto-did", (c) => {
  return c.text("did:plc:eadrwmh2en6uubkc5cmslqom");
});

export default app;
