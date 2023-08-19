import app from ".";

describe("root", () => {
  it("return 200", async () => {
    const res = await app.request("/");
    expect(res.status).toBe(200);
  });
  it("has mstdn.jp link", async () => {
    const res = await app.request("/");
    const body = await res.text();
    expect(body).toMatch('rel="me" href="https://mstdn.jp/@abekoh"');
  });
});

describe("atproto", () => {
  it("return value", async () => {
    const res = await app.request("/.well-known/atproto-did");
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toEqual("did:plc:eadrwmh2en6uubkc5cmslqom");
  });
});
