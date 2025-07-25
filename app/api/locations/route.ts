import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const locations = await prisma.location.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        state: true,
        description: true,
        imageUrl: true,
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(locations)
  } catch (error) {
    console.error('Failed to fetch locations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    )
  }
}