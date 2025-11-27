# AI Assistant Setup Guide

The UML Tool uses OpenAI (ChatGPT) for generating PlantUML code with minimal token usage.

## Setup Steps

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a `.env.local` file in the project root
3. Add the following:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## Configuration Options

### Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `OPENAI_MODEL` - OpenAI model to use (default: `"gpt-3.5-turbo"` for minimal token usage)

### Model Options

- `gpt-3.5-turbo` - Default, cost-effective, minimal token usage
- `gpt-4o` - Higher quality but more expensive
- `gpt-4-turbo` - Alternative high-quality option

### Example `.env.local` file:

```env
# Minimal token usage (default)
OPENAI_API_KEY=your_openai_key_here

# Or use a different model
# OPENAI_API_KEY=your_openai_key_here
# OPENAI_MODEL=gpt-4o
```

## Restart Required

After adding environment variables, restart your development server:
```bash
npm run dev
```

