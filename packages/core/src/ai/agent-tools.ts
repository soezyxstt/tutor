import { agentTools } from '@ui-sdk/react/agent';
import { jsonSchema, tool } from 'ai';

export const tutorAgentTools = Object.fromEntries(agentTools.map((definition) => [
  definition.name,
  tool({
    description: `${definition.description} Only the current lesson's approved learning controls are available. snapshot and query never open hidden sections. Use act to open a named section.`,
    parameters: jsonSchema<Record<string, unknown>>(definition.inputSchema as Parameters<typeof jsonSchema>[0]),
  }),
]));
