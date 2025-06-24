import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const locationId = searchParams.get('locationId')
    const starsParam = searchParams.get('stars')
    const minPrice = parseInt(searchParams.get('minPrice') || '0')
    const maxPrice = parseInt(searchParams.get('maxPrice') || '999999')
    
    const starRatings = starsParam 
      ? starsParam.split(',').map(s => parseInt(s)).filter(s => !isNaN(s))
      : []
    
    // Build where clause based on your actual schema
    const whereClause: any = {}
    
    // Price filter - always applied
    if (minPrice > 0 || maxPrice < 999999) {
      whereClause.price = {
        gte: minPrice,
        lte: maxPrice
      }
    }
    
    // Location filter - only if locationId is provided
    if (locationId && locationId.trim() !== '') {
      whereClause.locationId = locationId
    }
    
    // Star rating filter - only if ratings are selected
    if (starRatings.length > 0) {
      whereClause.star_rating = {
        in: starRatings
      }
    }
    
    console.log('Filtering with:', JSON.stringify(whereClause, null, 2))
    
    const hotels = await prisma.hotels.findMany({
      where: whereClause,
      include: {
        locations: {
          select: { 
            name: true, 
            state: true 
          }
        }
      },
      orderBy: { price: 'asc' }
    })
    
    console.log(`Found ${hotels.length} hotels`)
    
    const result = hotels.map(hotel => ({
      id: hotel.id,
      name: hotel.name || 'Unknown Hotel',
      price: hotel.price || 0,
      star_rating: hotel.star_rating || 0,
      user_rating: hotel.user_rating ? hotel.user_rating.toString() : '0.0',
      description: hotel.description || '',
      address: hotel.address || '',
      room_description: hotel.room_description || '',
      room_image_url: hotel.room_image_url || '/placeholder.jpg',
      location_name: hotel.locations?.name || '',
      location_state: hotel.locations?.state || ''
    }))
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Database error:', error)
    // Return empty array on error to prevent frontend crashes
    return NextResponse.json([])
  } finally {
    await prisma.$disconnect()
  }
}