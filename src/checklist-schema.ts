/**
 * Pull Checklist Schema Types
 * These types define the structure of .pull-checklist.json
 */

export interface ChecklistCheck {
  /** Unique identifier for the check */
  id: string;
  /** Human-readable name */
  name: string;
  /** Detailed description of what this check verifies */
  description: string;
  /** Whether this check must pass to allow merge */
  required: boolean;
  /** Type of check - automated runs a command, manual requires human verification */
  type: 'automated' | 'manual';
  /** Command to run for automated checks */
  command?: string;
  /** Number of approvers required for manual review checks */
  approvers_required?: number;
  /** Condition expression for when this check applies */
  condition?: string;
}

export interface ChecklistSettings {
  /** Block merge if any required check fails */
  block_merge_on_failure: boolean;
  /** Roles that can override failed checks */
  allow_override_by: string[];
  /** Send notifications when checks fail */
  notify_on_check_failure: boolean;
  /** Events that trigger automatic check runs */
  auto_run_on: ('pull_request' | 'push' | 'schedule')[];
}

export interface PullChecklistSchema {
  /** JSON Schema reference */
  $schema?: string;
  /** Schema version */
  version: string;
  /** Checklist name */
  name: string;
  /** Checklist description */
  description: string;
  /** Array of checks to perform */
  checks: ChecklistCheck[];
  /** Global settings */
  settings: ChecklistSettings;
}

/**
 * Validates a checklist configuration object
 */
export function validateChecklist(config: unknown): config is PullChecklistSchema {
  if (!config || typeof config !== 'object') return false;

  const c = config as Record<string, unknown>;

  if (typeof c.version !== 'string') return false;
  if (typeof c.name !== 'string') return false;
  if (!Array.isArray(c.checks)) return false;

  return c.checks.every((check: unknown) => {
    if (!check || typeof check !== 'object') return false;
    const ch = check as Record<string, unknown>;
    return (
      typeof ch.id === 'string' &&
      typeof ch.name === 'string' &&
      typeof ch.required === 'boolean' &&
      (ch.type === 'automated' || ch.type === 'manual')
    );
  });
}

/**
 * Loads and parses a checklist from JSON string
 */
export function parseChecklist(json: string): PullChecklistSchema {
  const config = JSON.parse(json);
  if (!validateChecklist(config)) {
    throw new Error('Invalid checklist schema');
  }
  return config;
}
