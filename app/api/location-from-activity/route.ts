import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const activityId = req.nextUrl.searchParams.get('activityId')

  if (!activityId) {
    return NextResponse.json({ error: 'Missing activityId' }, { status: 400 })
  }

  try {
    const activity = await prisma.activity.findUnique({
      where: { id: activityId },
      select: {
        attraction: {
          select: {
            location: {
              select: { name: true }
            }
          }
        }
      }
    })

    const locationName = activity?.attraction?.location?.name ?? null
    return NextResponse.json({ location: locationName })
  } catch (error) {
    console.error('Error fetching location:', error)
    return NextResponse.json({ error: 'Failed to fetch location' }, { status: 500 })
  }
}
