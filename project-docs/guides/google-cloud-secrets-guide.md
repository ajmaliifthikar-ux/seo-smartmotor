# Google Cloud Secret Manager Guide

> **Purpose:** Centralized reference for all environment variables and secrets migrated to Google Cloud Secret Manager.
> **Project:** `smartmotorwebandapp`

## 🔗 Quick Links
- **Google Cloud Console:** [Secret Manager Dashboard](https://console.cloud.google.com/security/secret-manager?project=smartmotorwebandapp)
- **Documentation:** [Google Cloud Secret Manager Docs](https://cloud.google.com/secret-manager/docs)
- **Node.js Client:** [@google-cloud/secret-manager](https://cloud.google.com/nodejs/docs/reference/secret-manager/latest)

---

## 🔐 Available Secrets & Call Names

The following secrets are actively managed as individual entries in Google Cloud Secret Manager. 

### Core Application & Auth
| Call Name / Secret Name | Description |
| :--- | :--- |
| `DATABASE_URL` | Connection string for the primary database |
| `NEXTAUTH_SECRET` | Secret used to encrypt NextAuth.js JWTs and hashes |
| `NEXTAUTH_URL` | Base URL for NextAuth (e.g., http://localhost:3000 or production URL) |
| `NODE_ENV` | Environment context (development/production) |
| `NEXT_PUBLIC_APP_URL` | Public-facing Application URL |
| `NEXT_PUBLIC_SITE_URL` | Public-facing Site URL |

### Firebase Integration
| Call Name / Secret Name | Description |
| :--- | :--- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web Client API Key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Web Auth Domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Web Project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`| Firebase Web Storage Bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Web Messaging Sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase Web App ID |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`| Firebase Web Measurement ID |
| `NEXT_PUBLIC_FIREBASE_DATABASE_URL` | Firebase Realtime Database URL |
| `FIREBASE_PROJECT_ID` | Admin SDK Project ID |
| `FIREBASE_PRIVATE_KEY_ID` | Admin SDK Private Key ID |
| `FIREBASE_PRIVATE_KEY` | Admin SDK Private Key |
| `FIREBASE_CLIENT_EMAIL` | Admin SDK Client Email |
| `FIREBASE_CLIENT_ID` | Admin SDK Client ID |
| `FIREBASE_CLIENT_X509_CERT_URL` | Admin SDK Cert URL |

### AI Models & APIs
| Call Name / Secret Name | Description |
| :--- | :--- |
| `GEMINI_API_KEY` | Google Gemini API Key |
| `GEMINI_MODEL` | Specific Gemini model identifier to use |
| `PERPLEXITY_API_KEY` | Perplexity AI API Key for SEO/Research workflows |
| `LANG_CACHE_TOKEN` | Token for internal language-model cache service |

### Infrastructure & Services
| Call Name / Secret Name | Description |
| :--- | :--- |
| `REDIS_HOST` | Redis Server Hostname |
| `REDIS_PORT` | Redis Server Port |
| `REDIS_PASSWORD` | Redis Server Authentication Password |
| `SPIFFY_API_KEY` | API Key for Spiffy automation tasks |
| `SPIFFY_USER_ID` | User ID identifier for Spiffy |

### Google Services & Maps
| Call Name / Secret Name | Description |
| :--- | :--- |
| `GOOGLE_BUSINESS_API_KEY` | API key for Google Business interactions |
| `GOOGLE_BUSINESS_ACCOUNT_ID` | Smart Motor Google Business Account ID |
| `GOOGLE_PLACES_API_KEY` | API key for Places API |
| `GOOGLE_PLACE_ID` | Main business Place ID |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Public maps API key for client-side rendering |
| `NEXT_PUBLIC_GOOGLE_PLACE_ID` | Public Place ID for client side mapping |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID |

### Email SMTP Configuration
| Call Name / Secret Name | Description |
| :--- | :--- |
| `EMAIL_HOST` | SMTP Server Host |
| `EMAIL_PORT` | SMTP Server Port |
| `EMAIL_USER` | SMTP Username |
| `EMAIL_PASSWORD` | SMTP Password |
| `EMAIL_FROM` | Default "From" address for outbound emails |

---

## 🛠️ How to Configure & Use Google Cloud Secrets

### 1. Prerequisites (CLI)
Ensure you are authenticated with the correct project using the `gcloud` CLI:
```bash
# Login to Google Cloud
gcloud auth login

# Set the active project
gcloud config set project smartmotorwebandapp
```

### 2. Managing Secrets via CLI

**Read a secret value:**
```bash
gcloud secrets versions access latest --secret="GEMINI_API_KEY"
```

**Add a new version to an existing secret:**
```bash
echo -n "YOUR_NEW_VALUE" | gcloud secrets versions add "GEMINI_API_KEY" --data-file=-
```

**Create a completely new secret:**
```bash
gcloud secrets create "NEW_SECRET_NAME" --replication-policy="automatic"
echo -n "VALUE" | gcloud secrets versions add "NEW_SECRET_NAME" --data-file=-
```

### 3. Accessing Secrets in Next.js / Node.js

Instead of reading from `.env` files locally, your production environment should dynamically fetch these or be injected via your hosting provider (like Vercel or Cloud Run). 

To fetch a secret programmatically in Node.js, use the `@google-cloud/secret-manager` package:

**Installation:**
```bash
npm install @google-cloud/secret-manager
```

**Code Example:**
```typescript
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const client = new SecretManagerServiceClient();

export async function getSecret(secretName: string) {
  try {
    const name = `projects/smartmotorwebandapp/secrets/${secretName}/versions/latest`;
    const [version] = await client.accessSecretVersion({ name });
    
    // Extract the payload as a string
    return version.payload?.data?.toString() || '';
  } catch (error) {
    console.error(`Error fetching secret ${secretName}:`, error);
    return null;
  }
}

// Usage:
// const geminiKey = await getSecret('GEMINI_API_KEY');
```

### 4. Local Development
For local development, it is still recommended to use a `.env.local` file to avoid making API calls to GCP for every local build. You can pull the latest secrets down to your local `.env.local` using a bash script if needed, but **never commit `.env.local` to version control.**

```
