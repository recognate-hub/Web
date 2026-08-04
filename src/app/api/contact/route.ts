import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const validatedData = contactSchema.parse(body);

    // TODO: Connect to an email service like Resend, Nodemailer, or SendGrid here
    // Example:
    // await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: 'hello@recognate.com',
    //   subject: `New Lead from ${validatedData.name}`,
    //   text: `Service: ${validatedData.service}\n\nMessage:\n${validatedData.message}`,
    // });
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true, data: validatedData });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: (error as any).errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
