import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, verifyPassword, generateToken } from '@/lib/auth'
import { z } from 'zod'

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

export async function POST(request: NextRequest) {
  try {
    console.log('Auth API called')
    
    const body = await request.json()
    console.log('Request body:', { ...body, password: '[HIDDEN]' })
    
    const { action } = body

    if (action === 'signup') {
      console.log('Processing signup')
      const validatedData = signupSchema.parse(body)
      
      // Check if user already exists
      console.log('Checking for existing user')
      const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email },
      })

      if (existingUser) {
        console.log('User already exists')
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 400 }
        )
      }

      // Hash password and create user
      console.log('Hashing password')
      const hashedPassword = await hashPassword(validatedData.password)
      
      console.log('Creating user')
      const user = await prisma.user.create({
        data: {
          name: validatedData.name,
          email: validatedData.email,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      })

      // Generate JWT token
      console.log('Generating token')
      const token = generateToken({
        userId: user.id,
        email: user.email,
      })

      // Set HTTP-only cookie
      const response = NextResponse.json({
        success: true,
        user,
      })

      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      console.log('Signup successful')
      return response

    } else if (action === 'login') {
      console.log('Processing login')
      const validatedData = loginSchema.parse(body)

      // Find user by email
      console.log('Finding user by email')
      const user = await prisma.user.findUnique({
        where: { email: validatedData.email },
      })

      if (!user) {
        console.log('User not found')
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        )
      }

      // Verify password
      console.log('Verifying password')
      const isValidPassword = await verifyPassword(validatedData.password, user.password)

      if (!isValidPassword) {
        console.log('Invalid password')
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        )
      }

      // Generate JWT token
      console.log('Generating token')
      const token = generateToken({
        userId: user.id,
        email: user.email,
      })

      // Set HTTP-only cookie
      const response = NextResponse.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      })

      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      console.log('Login successful')
      return response

    } else {
      console.log('Invalid action:', action)
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Detailed auth error:', error)
    console.error('Error stack:', error.stack)
    
    if (error instanceof z.ZodError) {
      console.log('Validation error:', error.errors)
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    console.log('Processing logout')
    const response = NextResponse.json({ success: true })
    
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
    })

    console.log('Logout successful')
    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}