import httpx
import asyncio

async def main():
    async with httpx.AsyncClient(base_url='https://solarresolve-24-production.up.railway.app') as client:
        r = await client.options('/api/v1/assessments/inline/generate', headers={
            'Origin': 'https://solar-resolve-24.vercel.app',
            'Access-Control-Request-Method': 'POST'
        })
        print(f"Status: {r.status_code}")
        print(f"Headers: {r.headers}")
        print(f"Body: {r.text}")

asyncio.run(main())
