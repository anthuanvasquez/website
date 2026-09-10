/// <reference types="node" />

import type { EventHandler, EventHandlerRequest, H3Event } from 'h3';

declare global {
  var defineEventHandler: <
    T extends EventHandlerRequest = EventHandlerRequest,
    D = unknown,
  >(
    handler: EventHandler<T, D>
  ) => EventHandler<T, D>;
  var createError: (err: {
    statusCode?: number;
    statusMessage?: string;
  }) => Error & {
    statusCode?: number;
    statusMessage?: string;
  };
  var getHeader: (
    event: H3Event | { headers?: Record<string, string> },
    name: string
  ) => string | undefined;
  var getRequestHeader: (event: unknown, name?: string) => string;
  var readBody: <T = unknown>(event: unknown) => Promise<T>;
}

export {};
