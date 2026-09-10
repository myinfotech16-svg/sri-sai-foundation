# Sri Sai Foundation — Premium React Frontend

A responsive nonprofit / CSR-ready frontend built with React + Vite.

## Pages
- Home
- About
- Programs
- Compliance
- Contact

## Source grounding
Public-facing content in this frontend was derived from the documents supplied in `SriSaiFoundation.zip`, including the Trust Deed, NGO Darpan registration, CSR registration and 2022 Amendment Deed. The site intentionally avoids invented beneficiary counts, donation figures or unsupported impact statistics.

## Run locally
```bash
npm install
npm run dev
```

Then open the local URL shown by Vite (usually `http://localhost:5173`).

## Build for production
```bash
npm run build
npm run preview
```

## Frontend-only contact form
The Contact form opens the visitor's configured email client with a pre-filled message. When a backend is available, replace this with your preferred API/email service.

## Important before going live
1. Confirm the latest official address, phone and email with the Foundation.
2. Confirm how the organisation wants its brand name displayed: `Sri Sai Foundation` vs legal name `SREE SAI FOUNDATION`.
3. Add real Foundation programme/gallery photos when available.
4. Connect donation/payment and enquiry APIs only after the required backend and compliance review are complete.
