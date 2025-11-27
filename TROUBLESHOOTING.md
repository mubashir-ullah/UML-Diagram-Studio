# Troubleshooting OpenAI API Key Issues

## Common Issues and Solutions

### Error: "Invalid OpenAI API key"

If you're getting this error even though you have a valid API key with credits, try these steps:

#### 1. Check Your Environment File

Make sure you have a `.env.local` file in the **root directory** of your project (same level as `package.json`):

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

**Important:**
- No quotes around the API key
- No spaces before or after the `=`
- The file must be named `.env.local` (not `.env` or `.env.local.txt`)

#### 2. Verify API Key Format

Your OpenAI API key should:
- Start with `sk-`
- Be approximately 51 characters long
- Have no spaces or line breaks

Example format: `sk-proj-abc123def456ghi789jkl012mno345pqr678stu901vwx234yz`

#### 3. Restart Your Development Server

After adding or changing environment variables, you **must** restart your server:

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

Environment variables are only loaded when the server starts.

#### 4. Check for Hidden Characters

Sometimes copying the API key can add hidden characters. Try:
- Copy the key again from OpenAI dashboard
- Paste it into a text editor first
- Remove any extra spaces or line breaks
- Copy it again and paste into `.env.local`

#### 5. Verify API Key is Active

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Check that your API key is still active
3. Verify you have available credits
4. Check if there are any usage limits or restrictions

#### 6. Check Server Console

Look at your terminal/console where `npm run dev` is running. You should see:
- Any error messages about environment variables
- API request logs

#### 7. Test API Key Directly

You can test your API key using curl:

```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_API_KEY_HERE"
```

If this returns a 401 error, your API key is invalid.

### Still Not Working?

1. **Double-check the file location**: `.env.local` must be in the project root
2. **Check file permissions**: Make sure the file is readable
3. **Try a new API key**: Create a new API key from OpenAI dashboard
4. **Check Next.js version**: Make sure you're using a recent version of Next.js

### For Production/Deployment

If deploying to a hosting platform (Vercel, Netlify, etc.):
- Add the environment variable in the platform's dashboard
- Don't commit `.env.local` to git (it should be in `.gitignore`)
- Restart/redeploy after adding the variable

