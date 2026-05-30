/**
 * Telemetry — error reporting (Sentry) + product analytics (PostHog).
 *
 * Both are gated by environment variables. If the env var is missing, the
 * corresponding service is silently inert. This means:
 *   - Local development needs no setup.
 *   - Preview deployments don't pollute production analytics.
 *   - Production won't crash if a service is misconfigured — it just runs
 *     without that signal.
 *
 * Required Vercel env vars to activate:
 *   - VITE_SENTRY_DSN          (from sentry.io after creating project)
 *   - VITE_POSTHOG_KEY         (from posthog.com after creating project)
 *   - VITE_POSTHOG_HOST         (optional, defaults to https://us.i.posthog.com)
 *
 * No personally-identifiable information is sent by default. Sentry uses
 * anonymized session IDs; PostHog uses anonymous device IDs.
 */

import * as Sentry from '@sentry/react';
import posthog from 'posthog-js';

type Env = {
  VITE_SENTRY_DSN?: string;
  VITE_POSTHOG_KEY?: string;
  VITE_POSTHOG_HOST?: string;
  PROD?: boolean;
  MODE?: string;
};

const env = ((import.meta as unknown as { env: Env }).env) || {};

let initialized = false;

export function initTelemetry() {
  if (initialized) return;
  initialized = true;

  // ─── Sentry: error reporting ───────────────────────────────────────
  if (env.VITE_SENTRY_DSN) {
    try {
      Sentry.init({
        dsn: env.VITE_SENTRY_DSN,
        environment: env.MODE || 'production',
        // Sample rates kept conservative so free tier comfortably handles a
        // soft launch. Adjust upward when you're confident in volume.
        tracesSampleRate: 0.1,
        replaysSessionSampleRate: 0,
        replaysOnErrorSampleRate: 1.0,
        integrations: [
          Sentry.browserTracingIntegration(),
          Sentry.replayIntegration({
            maskAllText: true,
            blockAllMedia: true,
          }),
        ],
        // Filter out noise — service worker errors, browser extension errors,
        // and well-known non-actionable warnings.
        ignoreErrors: [
          'ResizeObserver loop limit exceeded',
          'ResizeObserver loop completed with undelivered notifications',
          'Non-Error promise rejection captured',
          'Failed to fetch dynamically imported module',
        ],
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('[telemetry] Sentry init failed', e);
    }
  }

  // ─── PostHog: product analytics ────────────────────────────────────
  if (env.VITE_POSTHOG_KEY) {
    try {
      posthog.init(env.VITE_POSTHOG_KEY, {
        api_host: env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
        // We only want events for what users do in-app, not auto-capture
        // everything (which can be noisy and PII-leaky).
        autocapture: false,
        capture_pageview: true,
        capture_pageleave: true,
        // No session recording until we have a privacy policy.
        disable_session_recording: true,
        // Respect Do-Not-Track header.
        respect_dnt: true,
        // Persist with localStorage+cookie for cross-session continuity.
        persistence: 'localStorage+cookie',
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('[telemetry] PostHog init failed', e);
    }
  }
}

// ─── Event tracking helpers ──────────────────────────────────────────
// Use these from anywhere in the app. They no-op if PostHog isn't
// configured, so they're safe to call unconditionally.

export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>,
) {
  if (!env.VITE_POSTHOG_KEY) return;
  try {
    posthog.capture(eventName, properties);
  } catch {
    // Swallow — never let telemetry break user experience.
  }
}

export function trackError(
  error: Error | string,
  context?: Record<string, unknown>,
) {
  if (env.VITE_SENTRY_DSN) {
    try {
      if (typeof error === 'string') {
        Sentry.captureMessage(error, { extra: context });
      } else {
        Sentry.captureException(error, { extra: context });
      }
    } catch {
      // Swallow.
    }
  }
}

// ─── Pre-named events for consistency ────────────────────────────────
// Use these instead of free-string event names so the analytics dashboard
// stays clean and queryable. Add new events here, not inline.

export const Events = {
  // Career Predictor wizard
  WizardStarted: 'wizard_started',
  WizardStepCompleted: 'wizard_step_completed',
  WizardCompleted: 'wizard_completed',
  WizardAbandoned: 'wizard_abandoned',
  ResultViewed: 'result_viewed',
  CareerCardOpened: 'career_card_opened',

  // Chat
  ChatOpened: 'chat_opened',
  ChatMessageSent: 'chat_message_sent',
  ChatLanguageToggled: 'chat_language_toggled',

  // Discovery
  WorthALookExpanded: 'worth_a_look_expanded',
  CollapsibleFamilyExpanded: 'collapsible_family_expanded',

  // Cross-app
  QuickActionTapped: 'quick_action_tapped',
  ExternalLinkOpened: 'external_link_opened',
  ShareTapped: 'share_tapped',
} as const;
