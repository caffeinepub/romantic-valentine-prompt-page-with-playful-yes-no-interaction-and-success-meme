# Specification

## Summary
**Goal:** Build a single-page, romantic Valentine prompt that nudges the user to click “Yes” and shows a success meme.

**Planned changes:**
- Create a single-page UI with one clear Valentine prompt and two prominent buttons labeled exactly “Yes” and “No”.
- Implement an avoidance interaction for the “No” button that repositions on hover (desktop) and on touch/pointer interactions (iPad Chrome), keeping it visible and not breaking layout.
- On “Yes” click, transition to a success state that displays a meme image containing the exact text “Good choice ❤”.
- Apply a cohesive pink-and-white romantic theme with consistent typography, spacing, and subtle decorative accents (e.g., hearts), ensuring readability on iPad Chrome.
- Add the meme image as a static asset under `frontend/public/assets/generated` and render it directly from the frontend without backend fetching.

**User-visible outcome:** The user sees a romantic Valentine question with “Yes” and “No”; “No” playfully dodges interaction, and clicking “Yes” immediately shows a “Good choice ❤” meme image.
