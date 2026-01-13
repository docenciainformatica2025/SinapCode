// This is a Mock Email Service to unblock development without external keys.
// In production, replace `console.log` with Resend/SendGrid/Nodemailer.

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    console.log("==========================================");
    console.log(`📧 EMAIL MOCK SERVICE: Sending to ${email}`);
    console.log(`🔑 Verification Link: ${confirmLink}`);
    console.log("==========================================");

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return { success: true };
};
