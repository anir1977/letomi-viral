# n8n setup (CurioSpark)

## Workflow included
- `n8n/workflows/curiospark-auto-publish.json`
- Trigger: daily at `08:00` (server timezone)
- Steps:
  1. `npm run publish:auto`
  2. `npm run seo:check`
  3. `npm run ping`

## Import in n8n
1. Open n8n UI.
2. Create new workflow.
3. Import from file: `n8n/workflows/curiospark-auto-publish.json`.
4. Save and activate.

## Important VPS requirements
- The repository must exist at `/workspaces/letomi-viral`.
- Node.js and npm must be installed.
- If your path is different, edit each `Execute Command` node and replace:
  - `cd /workspaces/letomi-viral`

## Optional (recommended)
- Add error alert node (Telegram/Email) connected to each command error output.
- Add a lock mechanism to avoid overlapping runs if one execution is slow.

## Deploy workflow via n8n API (auto)

Because API keys are sensitive, use environment variables on your VPS:

```bash
export N8N_URL="https://n8n.srv990593.hstgr.cloud"
export N8N_API_KEY="<your_new_api_key>"
```

Then deploy/update workflow automatically:

```bash
npm run n8n:deploy
```

Force active state on deploy:

```bash
npm run n8n:deploy -- --active=true
```

Deploy a different workflow file:

```bash
npm run n8n:deploy -- --file=n8n/workflows/curiospark-auto-publish.json
```

## Security note

If an API key is shared in chat/logs, revoke it immediately in n8n and generate a new one before using API deploy.
