#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function requiredEnv(name) {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value.trim();
}

function sanitizeBaseUrl(value) {
  return value.replace(/\/$/, '');
}

function parseArgs() {
  const workflowPathArg = process.argv.find((arg) => arg.startsWith('--file='));
  const activateArg = process.argv.find((arg) => arg.startsWith('--active='));

  return {
    workflowPath: workflowPathArg
      ? workflowPathArg.slice('--file='.length)
      : 'n8n/workflows/curiospark-auto-publish.json',
    active: activateArg ? activateArg.slice('--active='.length) === 'true' : undefined,
  };
}

async function apiRequest(baseUrl, apiKey, endpoint, options = {}) {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      'X-N8N-API-KEY': apiKey,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`n8n API ${response.status} ${response.statusText} on ${endpoint}: ${text}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

function toWorkflowPayload(workflow, activeOverride) {
  return {
    name: workflow.name,
    nodes: workflow.nodes,
    connections: workflow.connections,
    settings: workflow.settings || {},
    active: typeof activeOverride === 'boolean' ? activeOverride : Boolean(workflow.active),
    staticData: workflow.staticData,
    pinData: workflow.pinData || {},
  };
}

async function main() {
  const { workflowPath, active } = parseArgs();
  const n8nUrl = sanitizeBaseUrl(requiredEnv('N8N_URL'));
  const n8nApiKey = requiredEnv('N8N_API_KEY');

  const resolvedPath = path.isAbsolute(workflowPath)
    ? workflowPath
    : path.join(root, workflowPath);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`Workflow file not found: ${resolvedPath}`);
  }

  const workflow = JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
  const payload = toWorkflowPayload(workflow, active);

  const list = await apiRequest(n8nUrl, n8nApiKey, '/api/v1/workflows?limit=250', {
    method: 'GET',
  });

  const existing = (list?.data || []).find((item) => item.name === workflow.name);

  if (existing) {
    const updated = await apiRequest(n8nUrl, n8nApiKey, `/api/v1/workflows/${existing.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    console.log(`Updated workflow: ${updated.name} (id=${updated.id})`);
    return;
  }

  const created = await apiRequest(n8nUrl, n8nApiKey, '/api/v1/workflows', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  console.log(`Created workflow: ${created.name} (id=${created.id})`);
}

main().catch((error) => {
  console.error(error.message || String(error));
  process.exit(1);
});
