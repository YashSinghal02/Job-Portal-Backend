export const otpTemplate=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hirebase Verification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f14; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0b0f14; padding: 60px 10px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" max-width="480" cellspacing="0" cellpadding="0" border="0" style="max-width: 480px; background-color: #12171d; border: 1px solid #1f2937; border-radius: 28px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
                    
                    <tr>
                        <td align="center" style="padding: 45px 40px 25px 40px;">
                            <img src="https://raw.githubusercontent.com/YashSinghal02/HireBaseLogo/c17f4a1b302dc8061162829992b05f02d0aa9d73/logo.png" alt="Hirebase" width="160" style="display: block; border: 0;">
                          
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 0 45px 40px 45px; text-align: center;">
                            <h2 style="color: #ffffff; font-size: 26px; font-weight: 700; margin: 0 0 12px 0; letter-spacing: -0.8px;">Verify Account</h2>
                            <p style="color: #9ca3af; font-size: 15px; line-height: 1.6; margin: 0 0 35px 0;">
                                To protect your Hirebase account, please enter the following code to confirm your identity.
                            </p>

                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto;">
                                <tr>
                                    <td style="background: linear-gradient(145deg, #1a212a 0%, #0b0f14 100%); border: 1px solid #3DAA7D; border-radius: 18px; padding: 25px 35px;">
                                        <span style="font-family: 'Courier New', monospace; font-size: 44px; font-weight: 800; letter-spacing: 12px; color: #3DAA7D; text-shadow: 0 0 15px rgba(61, 170, 125, 0.3);">
                                            {otp}
                                        </span>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #5f6c7f; font-size: 13px; margin-top: 35px; line-height: 1.5;">
                                This security code expires in 10 minutes. <br>
                                Didn't request this? <a href="#" style="color: #3DAA7D; text-decoration: none; font-weight: 600;">Contact Support</a>
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="background-color: #0b0f14; padding: 30px 45px; text-align: center; border-top: 1px solid #1f2937;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 15px;">
                                        Secure Recruitment Infrastructure
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="#" style="color: #3DAA7D; text-decoration: none; font-size: 12px; font-weight: 600;">Dashboard</a>
                                        <span style="color: #747e8e; margin: 0 8px;">•</span>
                                        <a href="#" style="color: #3DAA7D; text-decoration: none; font-size: 12px; font-weight: 600;">Privacy</a>
                                        <span style="color: #747e8e; margin: 0 8px;">•</span>
                                        <a href="#" style="color: #3DAA7D; text-decoration: none; font-size: 12px; font-weight: 600;">Unsubscribe</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                
                <p style="color: #747e8e; font-size: 11px; margin-top: 25px; text-align: center;">
                    &copy; 2026 Hirebase Global Inc. All rights reserved.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
`