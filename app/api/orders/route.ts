import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real application, you would validate the body against a schema
    // and then save the order to your database.
    console.log('Received order:', body);

    // For now, we'll just simulate a success response.
    const orderId = `ORD${Date.now()}`;

    return NextResponse.json({
      orderId: orderId,
      status: 'Processing',
      message: 'Order placed successfully.',
    }, { status: 201 });

  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json({ message: 'Error processing order' }, { status: 500 });
  }
}
