exports.handler = async (event) => {
  const { messages } = JSON.parse(event.body)

  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({ model: 'gpt-4o-mini', messages })
  })

  const data = await r.json()
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}