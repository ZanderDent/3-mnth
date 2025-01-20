import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { width: string; height: string } }
) {
  const width = parseInt(params.width)
  const height = parseInt(params.height)

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f8f9fa"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial" 
        font-size="16" 
        fill="#dee2e6" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        ${width}x${height}
      </text>
    </svg>
  `

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable'
    },
  })
}