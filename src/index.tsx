import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";

const app = new Hono();

app.use("*", poweredBy());

const TopView = () => {
  return (
    <html>
      <body>
        <h1>Hello Hono!</h1>
      </body>
    </html>
  );
};

app.get("/", (c) => {
  return c.html(<TopView />);
});

export default app;
