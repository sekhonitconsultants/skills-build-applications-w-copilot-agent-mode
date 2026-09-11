export const PORT = process.env.PORT || 8000;

const codespaceName = process.env.CODESPACE_NAME;

// Prefer the Codespaces forwarded URL when running in a Codespace, else fall back to localhost
export const BASE_URL = codespaceName
  ? `https://${codespaceName}-${PORT}.app.github.dev`
  : `http://localhost:${PORT}`;
