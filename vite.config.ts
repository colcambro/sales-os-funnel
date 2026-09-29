import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// NOTE: the installed @tanstack/react-start version (1.168.32) dropped the
// Nitro-based `preset` option that the migration doc's original vite.config.ts
// used (`tanstackStart({ preset: "netlify" })`) — that option no longer
// exists on this plugin and was silently ignored (a TS type error, caught
// while validating this migration, was the tell). Netlify deployment target
// is now handled by the official @netlify/vite-plugin-tanstack-start plugin
// instead, per https://docs.netlify.com/build/frameworks/framework-setup-guides/tanstack-start/
// — added below. `server.entry` is still a valid tanstackStart() option and
// is kept pointed at src/server.ts (the custom SSR error-page wrapper from
// earlier work on this project).
// Deployed at sossalesandscaling.com/sales-os/ — a hidden subpath of
// the existing S.OS site, proxied through from that site's own (separate)
// Netlify project (mirrors the pattern used by the sister
// realestate-os-funnel project, which is deployed under /realestate-os/).
// This value MUST match src/lib/base-path.ts's BASE_PATH — they can't share
// an import since this file runs outside the app bundle, in Vite's own
// config-loading context. See HANDOFF.md for the proxy rule this depends on
// and required env vars.
//
// Traced through the installed @tanstack/react-start version's source
// (node_modules/@tanstack/start-plugin-core/dist/esm/vite/plugin.js) to
// confirm: this version derives its router basepath and asset base from
// Vite's own `base` option below (not a separate tanstackStart-specific
// option) — so setting `base` here is the correct, version-confirmed way to
// do this, not a guess from possibly-stale docs.
const BASE_PATH = "/sales-os";

export default defineConfig({
    base: `${BASE_PATH}/`,
    plugins: [
          tsConfigPaths(),
          tanstackStart({
                  server: {
                            entry: "src/server.ts",
                  },
          }),
          react(),
          netlify(),
          tailwindcss(),
        ],
});
test
