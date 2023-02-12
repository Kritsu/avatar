import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";

declare let self: ServiceWorkerGlobalScope;

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

const denylist: RegExp[] = [/^\/api\//g, /^\/icon\//g, /^\/sw.js$/g];

// to allow work offline
registerRoute(new NavigationRoute(createHandlerBoundToURL("index.html"), { denylist }));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
self.skipWaiting();
clientsClaim();
