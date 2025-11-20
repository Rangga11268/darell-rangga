## Error Type
Build Error

## Error Message
Parsing ecmascript source code failed

## Build Output
./my-portfolio/src/app/components/hero-section.tsx:21:1
Parsing ecmascript source code failed
  19 |
  20 |   return (
> 21 | <<<<<<< HEAD
     | ^^^^^^^
  22 |     <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
  23 |       {/* Background Elements */}
  24 |       <div className="absolute inset-0 w-full h-full bg-background">

Merge conflict marker encountered.

Import traces:
  Client Component Browser:
    ./my-portfolio/src/app/components/hero-section.tsx [Client Component Browser]
    ./my-portfolio/src/app/page.tsx [Client Component Browser]
    ./my-portfolio/src/app/page.tsx [Server Component]

  Client Component SSR:
    ./my-portfolio/src/app/components/hero-section.tsx [Client Component SSR]
    ./my-portfolio/src/app/page.tsx [Client Component SSR]
    ./my-portfolio/src/app/page.tsx [Server Component]

Next.js version: 15.5.2 (Turbopack)
## Error Type
Console Error

## Error Message
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

  ...
    <HotReload assetPrefix="" globalError={[...]}>
      <AppDevOverlayErrorBoundary globalError={[...]}>
        <ReplaySsrOnlyErrors>
        <DevRootHTTPAccessFallbackBoundary>
          <HTTPAccessFallbackBoundary notFound={<NotAllowedRootHTTPFallbackError>}>
            <HTTPAccessFallbackErrorBoundary pathname="/" notFound={<NotAllowedRootHTTPFallbackError>} ...>
              <RedirectBoundary>
                <RedirectErrorBoundary router={{...}}>
                  <Head>
                  <__next_root_layout_boundary__>
                    <SegmentViewNode type="layout" pagePath="/my-portfo...">
                      <SegmentTrieNode>
                      <link>
                      <script>
                      <script>
                      <RootLayout>
                        <html
                          lang="en"
+                         className="scroll-smooth"
-                         className="scroll-smooth dark"
-                         style={{color-scheme:"dark"}}
                        >
                  ...



    at createConsoleError (file://D:/Ngoding/WEB Poject/my-portfolio/.next/static/chunks/26b9f_next_dist_4974cf23._.js:1605:71)
    at handleConsoleError (file://D:/Ngoding/WEB Poject/my-portfolio/.next/static/chunks/26b9f_next_dist_4974cf23._.js:2203:54)
    at console.error (file://D:/Ngoding/WEB Poject/my-portfolio/.next/static/chunks/26b9f_next_dist_4974cf23._.js:2354:57)
    at <unknown> (file://D:/Ngoding/WEB Poject/my-portfolio/.next/static/chunks/26b9f_next_dist_compiled_react-dom_5c2a1560._.js:3013:25)
    at runWithFiberInDEV (file://D:/Ngoding/WEB Poject/my-portfolio/.next/static/chunks/26b9f_next_dist_compiled_react-dom_5c2a1560._.js:886:74)
    at emitPendingHydrationWarnings (file://D:/Ngoding/WEB Poject/my-portfolio/.next/static/chunks/26b9f_next_dist_compiled_react-dom_5c2a1560._.js:3012:13)
    at completeWork (file://D:/Ngoding/WEB Poject/my-portfolio/.next/static/chunks/26b9f_next_dist_compiled_react-dom_5c2a1560._.js:6296:102)
    at runWithFiberInDEV (file://D:/Ngoding/WEB Poject/my-portfolio/.next/static/chunks/26b9f_next_dist_compiled_react-dom_5c2a1560._.js:886:131)
    at completeUnitOfWork (file://D:/Ngoding/WEB Poject/my-portfolio/.next/static/chunks/26b9f_next_dist_compiled_react-dom_5c2a1560._.js:8363:23)
    at performUnitOfWork (file://D:/Ngoding/WEB Poject/my-portfolio/.next/static/chunks/26b9f_next_dist_compiled_react-dom_5c2a1560._.js:8300:28)
    at workLoopConcurrentByScheduler (file://D:/Ngoding/WEB Poject/my-portfolio/.next/static/chunks/26b9f_next_dist_compiled_react-dom_5c2a1560._.js:8294:58)
    at renderRootConcurrent (file://D:/Ngoding/WEB Poject/my-portfolio/.next/static/chunks/26b9f_next_dist_compiled_react-dom_5c2a1560._.js:8276:71)
    at performWorkOnRoot (file://D:/Ngoding/WEB Poject/my-portfolio/.next/static/chunks/26b9f_next_dist_compiled_react-dom_5c2a1560._.js:7908:176)
    at performWorkOnRootViaSchedulerTask (file://D:/Ngoding/WEB Poject/my-portfolio/.next/static/chunks/26b9f_next_dist_compiled_react-dom_5c2a1560._.js:8882:9)
    at MessagePort.performWorkUntilDeadline (file://D:/Ngoding/WEB Poject/my-portfolio/.next/static/chunks/26b9f_next_dist_compiled_0a2b95e2._.js:2601:64)
    at html (<anonymous>:null:null)
    at RootLayout (src\app\layout.tsx:27:5)

## Code Frame
  25 | }>) {
  26 |   return (
> 27 |     <html lang="en" className="scroll-smooth">
     |     ^
  28 |       <body
  29 |         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
  30 |       >

Next.js version: 15.5.2 (Turbopack)
