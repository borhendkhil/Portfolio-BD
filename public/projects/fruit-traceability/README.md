# Screenshots — Fruit Traceability Mobile Application

Drop the real application screenshots in this folder. The gallery on the website
reads this folder at build time and shows a labelled placeholder for any file that
is missing, so add files incrementally and the page updates itself.

## Expected file names

| File                       | Shows                                | Type   |
| -------------------------- | ------------------------------------ | ------ |
| `login.jpeg`               | Login / Keycloak authentication      | Mobile |
| `dashboard.jpeg`           | Dashboard or home screen             | Mobile |
| `technical-itinerary.jpeg` | Technical itinerary for a plot       | Mobile |
| `ai-detection.jpeg`        | AI detection of plant diseases       | Mobile |

All four are portrait phone screenshots (roughly 390×860), so they render inside
the phone-shaped frames. JPEG, PNG and WebP all work. Keep files reasonably
compressed (roughly under 500 KB each) — they are served through `next/image`
and optimised automatically.

## Adding more screenshots

Add the file here, then register it in `src/data/projects.ts`:

```ts
images: [
  { file: "login.jpeg", label: "Login and Keycloak authentication", kind: "mobile" },
  { file: "dashboard.jpeg", label: "Dashboard", kind: "mobile" },
  // ...
]
```

`kind` accepts `"mobile"`, `"desktop"` or `"diagram"` and controls the frame
aspect ratio used by the placeholder.

## Note

The website deliberately does not ship generated or mocked-up screenshots. Until
real assets are added here, the gallery shows honest placeholders instead of
fake application screens.