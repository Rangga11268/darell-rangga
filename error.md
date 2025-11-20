18:06:48.731 Running build in Washington, D.C., USA (East) – iad1
18:06:48.732 Build machine configuration: 2 cores, 8 GB
18:06:48.862 Cloning github.com/Rangga11268/darell-rangga (Branch: master, Commit: 331add5)
18:06:48.863 Previous build caches not available.
18:06:49.215 Cloning completed: 353.000ms
18:06:50.661 Running "vercel build"
18:06:51.072 Vercel CLI 48.10.3
18:06:51.431 Installing dependencies...
18:07:05.056 
18:07:05.059 added 353 packages in 13s
18:07:05.060 
18:07:05.060 143 packages are looking for funding
18:07:05.060   run `npm fund` for details
18:07:05.137 Detected Next.js version: 15.5.2
18:07:05.141 Running "npm run build"
18:07:05.270 
18:07:05.271 > my-portfolio@0.1.0 build
18:07:05.271 > next build --turbopack
18:07:05.271 
18:07:06.089 Attention: Next.js now collects completely anonymous telemetry regarding usage.
18:07:06.089 This information is used to shape Next.js' roadmap and prioritize features.
18:07:06.089 You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
18:07:06.089 https://nextjs.org/telemetry
18:07:06.089 
18:07:06.144    ▲ Next.js 15.5.2 (Turbopack)
18:07:06.144 
18:07:06.217    Creating an optimized production build ...
18:07:15.715  ✓ Finished writing to disk in 9ms
18:07:15.742  ✓ Compiled successfully in 8.8s
18:07:15.748    Linting and checking validity of types ...
18:07:20.065 
18:07:20.069 ./src/app/components/hero-section.tsx
18:07:20.070 111:17  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element
18:07:20.070 
18:07:20.070 ./src/app/components/projects-section.tsx
18:07:20.070 105:17  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element
18:07:20.071 
18:07:20.071 info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
18:07:22.252 Failed to compile.
18:07:22.252 
18:07:22.253 ./src/app/components/navigation.tsx:4:10
18:07:22.253 Type error: Module '"@/app/providers/theme-provider"' has no exported member 'useTheme'.
18:07:22.253 
18:07:22.253 [0m [90m 2 |[39m
18:07:22.253  [90m 3 |[39m [36mimport[39m { useState[33m,[39m useEffect } [36mfrom[39m [32m"react"[39m
18:07:22.254 [31m[1m>[22m[39m[90m 4 |[39m [36mimport[39m { useTheme } [36mfrom[39m [32m"@/app/providers/theme-provider"[39m
18:07:22.254  [90m   |[39m          [31m[1m^[22m[39m
18:07:22.254  [90m 5 |[39m [36mimport[39m { [33mButton[39m } [36mfrom[39m [32m"@/components/ui/button"[39m
18:07:22.254  [90m 6 |[39m [36mimport[39m { [33mMoon[39m[33m,[39m [33mSun[39m[33m,[39m [33mMenu[39m[33m,[39m [33mX[39m } [36mfrom[39m [32m"lucide-react"[39m
18:07:22.254  [90m 7 |[39m[0m
18:07:22.273 Next.js build worker exited with code: 1 and signal: null
18:07:22.296 Error: Command "npm run build" exited with 1