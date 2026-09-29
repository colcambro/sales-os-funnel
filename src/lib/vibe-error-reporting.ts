type VibeErrorOptions = {
    mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
    handled?: boolean;
    severity?: "error" | "warning" | "info";
};

type VibeEvents = {
    captureException?: (
          error: unknown,
          context?: Record<string, unknown>,
          options?: VibeErrorOptions,
        ) => void;
};

declare global {
    interface Window {
          __vibeEvents?: VibeEvents;
          __vibeReportRuntimeError?: (payload: {
            message: string;
            stack?: string;
            filename?: string;
          }) => void;
    }
}

export function reportVibeError(error: unknown, context: Record<string, unknown> = {}) {
    if (typeof window === "undefined") return;
    window.__vibeEvents?.captureException?.(
          error,
      {
              source: "react_error_boundary",
              route: window.location.pathname,
              ...context,
      },
      {
              mechanism: "react_error_boundary",
              handled: false,
              severity: "error",
      },
        );
    const message =
          error instanceof Response
        ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`
            : error instanceof Error
          ? error.message
              : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    window.__vibeReportRuntimeError?.({
          message,
          ...(stack !== undefined && { stack }),
          filename: window.location.pathname,
    });
}
