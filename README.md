## Contact form email setup

The contact form sends enquiries through the Vercel serverless function at `/api/contact`.
Configure these environment variables in Vercel (or in a local `.env` file):

- `SMTP_USER`: `andharagujratlog@gmail.com`
- `SMTP_APP_PASSWORD`: the Gmail app password for that account
- `CONTACT_RECIPIENT`: `andhragujaratlog@yahoo.com`

Never commit the real app password. `.env` files are ignored by git; use `.env.example` as the template.


