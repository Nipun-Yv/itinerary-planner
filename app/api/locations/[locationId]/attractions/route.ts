import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { locationId: string } }
) {
  try {
    const attractions = await prisma.attraction.findMany({
      where: {
        locationId: params.locationId,
        isActive: true,
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
      },
      orderBy: { rating: 'desc' },
    })

    return NextResponse.json(attractions)
  } catch (error) {
    console.error('Failed to fetch attractions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch attractions' },
      { status: 500 }
    )
  }
}