// app/api/attractions/[attractionId]/route.js
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { attractionId: string } }
) {
  try {
    const attraction = await prisma.attraction.findUnique({
      where: {
        id: params.attractionId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        rating: true,
        duration: true,
        price: true,
        imageUrl: true,
        location: {
          select: {
            id: true,
            name: true,
            state: true,
          }
        }
      },
    })

    if (!attraction) {
      return NextResponse.json(
        { error: 'Attraction not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(attraction)
  } catch (error) {
    console.error('Failed to fetch attraction:', error)
    return NextResponse.json(
      { error: 'Failed to fetch attraction' },
      { status: 500 }
    )
  }
}