import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { BASE_PATH } from "./lib/base-path";

export const getRouter = () => {
    const queryClient = new QueryClient();

    const router = createRouter({
          routeTree,
          context: { queryClient },
          scrollRestoration: true,
          defaultPreloadStaleTime: 0,
          // Deployed at sossalesandscaling.com/sales-os/ — see src/lib/base-path.ts.
          basepath: BASE_PATH,
    });

    return router;
};
