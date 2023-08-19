import app from '.'

describe('Test the application', () => {
  it('Should return 200 response', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
  })
})
