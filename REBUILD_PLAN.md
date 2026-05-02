# REBUILD PLAN — American Dream Sales Deck (Round 2)

> **Purpose of this file:** Complete handoff document. Captures the full context, strategy, prompts, and execution plan for rebuilding this deck for a job screening. If this chat is lost, a new Claude reading this file should be able to continue exactly where the previous Claude left off.
>
> **Last updated:** 2026-04-28
> **Submission deadline:** 2026-05-03 (5 days remaining)
> **Submission target:** medi@liat.ai

---

## 1. Background — what this project is

This is a **job screening assignment**. The candidate (the user) is applying for a senior multidisciplinary role. The brief was to build an **interactive, browser-based sales deck** for one of the world's largest shopping malls — selected: **American Dream Mall (Meadowlands, NJ)**.

The deck must:
- Tell the property's story without anyone explaining it
- Create immediate emotional buy-in within the first 10 seconds
- Make prospective tenants, sponsors, and event partners feel: *"I need to be here."*
- Push toward business action: leasing inquiries, sponsorship conversations, event bookings
- Work both as a screen-share on live calls AND as a standalone link

The reference is **Digideck** (https://www.thedigideck.com/) — a non-linear interactive sales tool. Not a website, not a slideshow.

## 2. Round 1 outcome — the email from Medi

The candidate **was shortlisted** but **not in the top 2**. The reviewer (Medi Ashraphijuo) sent the following feedback (key parts verbatim):

> "None of the shortlisted decks fully met the standard we expect for this senior multidisciplinary role. They did not feel like the kind of interactive sales tool we asked for. They leaned toward **linear navigation, limited interactivity, and only modest use of AI**, despite the range of strong tools now available. Most importantly, **none created the reaction the brief explicitly called for: 'I need to be here.'** Even many of the illustrative features shown in the Digideck examples shared in the assignment were absent from the submissions."

For round 2, Medi asked for:
1. **Visually strong and sophisticated** — polished, elevated, commercially compelling
2. **Interactive, not presentation-shaped** — closer to Digideck, ideally even more interactive. Non-linear journey
3. **Video-first, AI-rich** — generative tools used seriously for imagery, motion, atmosphere
4. **Storytelling, not stitched sections** — emotional arc pulling through scale, energy, opportunity
5. **At least one "I need to be here" moment** — choose the sharpest interaction and explain why it earns that reaction

The candidate must resend by **Sunday May 3**: live URL + GitHub link + write-up.

## 3. Round 1 architecture (current state of the codebase)

The current deck has these components:

- **Home deck** — `components/deck/DeckEngine.tsx` — 14 slides advanced via wheel/keyboard/touch
- **Leasing deck** — `components/deck/LeasingDeck.tsx` — 5 slides
- **Venues deck** — `components/deck/VenuesDeck.tsx` — 5 slides
- **Menu drawer** — `components/deck/MenuDrawer.tsx` — non-linear nav between decks
- **Presentation provider** — auto-advance for screen-share
- **Inquiry modal** — single global modal with 4 tabs (leasing/sponsorship/booking/press)

**Why this got shortlisted but not top 2:** The wheel/keyboard advance pattern feels linear. There are 14 slides which is too many. There's no "wow" interaction. AI was only used for stills, not video or real-time features.

---

## 4. Round 2 strategy — direct answers to Medi's 5 criteria

| Medi's complaint | Our answer |
|---|---|
| Linear, presentation-shaped | **Hub-and-drawer architecture.** A persistent interactive aerial map (the Hub) with hotspots opening into deep-dive drawers. Not slides advancing in sequence. |
| Modest AI | **AI in video, voice, AND real-time interaction.** Cold open is AI cinematic. Every section has AI loop video. Music is AI. Voice narration is AI. The killer feature uses AI on demand. |
| No "I need to be here" moment | **"Imagine Your Brand Here"** — text input, types brand name, AI-rendered storefront for that brand inside American Dream appears in seconds. Sharable. |
| Stitched sections | **14 slides → 6 beats** with a building emotional arc: cold open → hub → audience → worlds inside → killer feature → ask. |
| Features absent from Digideck | Adding: interactive aerial map, hotspot navigation, persona-aware drawers, stats counters, live activity ticker, brand cache, AI concierge (stretch). |

---

## 5. The new architecture — 6 beats

### 5.1 The mapping (old 14 → new 6)

| Old (14 slides) | New (6 beats) |
|---|---|
| 01. Welcome / Splash | → **Beat 1: Cold Open** (60s cinematic, no UI) |
| 02. Retail & Revenue (Story) | → folded into Beat 4 |
| 03. The Property | → **Beat 2: The Hub** (interactive aerial map) |
| 04. The Audience | → **Beat 3: The Audience** (kept, restructured) |
| 05. Luxury Wing | → folded into Beat 4 (drawer) |
| 06. The Experience | → folded into Beat 4 (drawer) |
| 07. Retail & Brands | → folded into Beat 4 (drawer) |
| 08. Our Partners | → folded into Beat 4 (logo wall inside drawer) |
| 09. Dining | → folded into Beat 4 (drawer) |
| 10. Food & Restaurants | → **deleted** (duplicate of Dining) |
| 11. Events | → folded into Beat 4 (drawer) |
| 12. Leasing Paths | → **stays as its own sub-deck** (5 slides, opens from Hub) |
| 13. Venues | → **stays as its own sub-deck** (5 slides, opens from Hub) |
| 14. Contact | → **Beat 6: The Ask** |
| *(new)* | → **Beat 5: Imagine Your Brand Here** |

### 5.2 The 6 beats described

**Beat 1 — Cold Open**
60-second AI cinematic plays the moment the deck loads. Click anywhere to skip. No buttons, no UI. Pure cinema with the Suno music track.

**Beat 2 — The Hub** (the home base)
Stylized aerial view of American Dream with glowing hotspots (Luxury, Retail, Dining, Entertainment, Events). Click any hotspot → drawer opens. Close drawer → back at the hub. Live activity ticker overlay. Background loop video.

**Beat 3 — The Audience**
Animated demographics, regional reach, 60M visitor stat, NYC metro radius overlay. Animated counters, kinetic typography. One screen, dense, memorable.

**Beat 4 — The Worlds Inside (drawers)**
Five drawers (Luxury / Retail / Dining / Entertainment / Events). Each opens with a video loop + 3 key data points + a CTA. Drawers stack — open Luxury, then click "Available spaces" → opens Leasing sub-deck.

**Beat 5 — Imagine Your Brand Here** ⭐ (THE KILLER FEATURE)
Text input → AI-rendered flagship of their brand inside American Dream. See section 6 below for full architecture.

**Beat 6 — The Ask**
One beautiful screen. Three buttons: Lease / Sponsor / Book. Click → existing InquiryModal opens, pre-filled.

### 5.3 The two sub-decks (kept from round 1)

- **Leasing Deck** (5 slides) — accessible from the Hub or Lease CTA
- **Venues Deck** (5 slides) — accessible from the Hub or Book CTA

Total experience surface: 6 home beats + 5 leasing slides + 5 venue slides = 16 screens, but it FEELS non-linear because the Hub is the navigation, drawers stack over the hub, and sub-decks are user-opted.

---

## 6. The Killer Feature — "Imagine Your Brand Here"

### 6.1 What it does
A prospect (e.g., a Gucci exec) opens the deck. They scroll to a section called *"See your brand here."* There's a text box: **"Enter your brand name."** They type **"Gucci"** and hit go. Eight seconds later, a photoreal image appears: a Gucci flagship store, with the Gucci logo on the storefront, sitting inside American Dream's luxury wing. They can save it, share it, email it.

### 6.2 Why this earns "I need to be here"
- Personal: It's literally their brand
- Sharable: They forward to their team in 30 seconds
- Memorable: No salesperson can replicate this experience
- Concrete: Makes the abstract pitch tangible

### 6.3 Architecture (important — initial Pollinations approach was abandoned)

**Initial idea (abandoned):** Pollinations.ai (free, unlimited Flux) generates a custom render with the brand logo embedded.

**Why abandoned:** Pollinations + Flux Schnell garbles all text. Brand logos came out as gibberish ("Đălenşula" instead of "Balenciaga"). Quality also wasn't luxe enough.

**Final approach (hybrid):**
1. **5 pre-generated empty storefront templates** (different palettes — luxury gold, minimal white, classic black, warm bronze, modern retail). Generated on **Imagen 4** (Google AI Studio, free tier — much higher quality than Pollinations).
2. **Brand → template matching:** when user types "Gucci" we map it to the luxury-gold template. "Apple" → minimal-white. "Rolex" → warm-bronze. Etc.
3. **Logo overlay via browser:** fetch the real brand logo from **Clearbit Logo API** (`https://logo.clearbit.com/{domain}` — free, no signup) and composite it onto the storefront's blank signage panel via CSS or canvas.
4. **Color tinting:** subtle CSS filter applied to match the brand's color palette.
5. **Reveal animation:** storefront fades in, logo materializes.

**Why this is better than pure AI:**
- Logo is always sharp and accurate (real SVG/PNG from Clearbit)
- Storefront is photoreal cinematic quality (Imagen 4)
- Works for ANY brand, instantly (Clearbit has 75K+ logos)
- No garbled text ever
- Premium feel, no AI weirdness

### 6.4 Brand-to-template matching logic (pseudocode)

```js
const BRAND_CATEGORIES = {
  // Luxury Gold
  'gucci': 'luxury-gold', 'louis vuitton': 'luxury-gold', 'hermes': 'luxury-gold',
  'cartier': 'luxury-gold', 'tiffany': 'luxury-gold', 'dior': 'luxury-gold',
  // Minimal White
  'apple': 'minimal-white', 'tesla': 'minimal-white', 'saint laurent': 'minimal-white',
  // Classic Black
  'chanel': 'classic-black', 'prada': 'classic-black', 'bottega veneta': 'classic-black',
  'balenciaga': 'classic-black',
  // Warm Bronze
  'rolex': 'warm-bronze', 'bulgari': 'warm-bronze', 'omega': 'warm-bronze',
  // Modern Retail
  'nike': 'modern-retail', 'sephora': 'modern-retail', 'adidas': 'modern-retail',
  'lululemon': 'modern-retail',
};
function pickTemplate(brand) {
  return BRAND_CATEGORIES[brand.toLowerCase()] || 'luxury-gold'; // default
}
```

---

## 7. The free AI tool stack (everything is $0)

| Need | Tool | Why free |
|---|---|---|
| Music | **Suno v4** | 50 credits/day free |
| Cold open + loop video | **Kling AI** | ~5/day daily credits free |
| Backup video | **Hailuo MiniMax / Luma / Pika** | Daily free tiers |
| Hero stills | **Imagen 4 (Google AI Studio)** | Free tier, generous limits |
| Brand renders fallback | **Pollinations.ai** | Unlimited free Flux, no auth |
| Brand logos | **Clearbit Logo API** | Free, `logo.clearbit.com/{domain}` |
| Voice narration | **Edge TTS (npm `edge-tts`)** OR **ElevenLabs free** | Edge TTS unlimited, ElevenLabs 10K chars/mo |
| AI Concierge chat (stretch) | **Gemini 2.5 Flash API** | 1500 req/day free |
| Image upscaling | **Upscayl** (local, free) | Open source |
| Video editing | **CapCut** | Free |

---

## 8. Asset shopping list & status

| # | Asset | Tool | Status | Notes |
|---|---|---|---|---|
| 1 | Music track (`american-dream-theme.mp3`) | Suno | ✅ DONE | Iterated — first attempt was too sad/romantic, fixed with "propulsive" prompt |
| 2 | 60-second cold open cinematic | 7 Kling clips → CapCut edit | ✅ DONE | 180MB initial, optimized via Cloudinary `f_auto,q_auto:good,vc_h264` |
| 3 | Loop 1 — Hub | Kling | ⏳ TO DO | |
| 4 | Loop 2 — Audience | Kling | ⏳ TO DO | v2 prompt — fewer people, more luxe (Galleria Milan / Bvlgari ref) |
| 5 | Loop 3 — Luxury | Kling | ⏳ TO DO | |
| 6 | Loop 4 — Retail | Kling | ⏳ TO DO | |
| 7 | Loop 5 — Dining (bar/lounge) | Kling | ⏳ TO DO | |
| 8 | Loop 6 — Entertainment (Big SNOW) | Kling | ⏳ TO DO | |
| 9 | Hub aerial map image | Imagen 4 | ⏳ TO DO | The home base. Most important still. |
| 10 | Drawer cover — Luxury | Imagen 4 | ⏳ TO DO | |
| 11 | Drawer cover — Retail | Imagen 4 | ⏳ TO DO | |
| 12 | Drawer cover — Dining | Imagen 4 | ⏳ TO DO | |
| 13 | Drawer cover — Entertainment | Imagen 4 | ⏳ TO DO | Empty arena pre-show |
| 14 | Drawer cover — Events | Imagen 4 | ⏳ TO DO | |
| 15 | CTA hero background | Imagen 4 | ⏳ TO DO | |
| 16 | Storefront template — Luxury Gold | Imagen 4 | ⏳ TO DO | For Gucci/LV/Hermès/Chanel/Cartier |
| 17 | Storefront template — Minimal White | Imagen 4 | ⏳ TO DO | For Apple/Tesla/Saint Laurent |
| 18 | Storefront template — Classic Black | Imagen 4 | ⏳ TO DO | For Chanel/Prada/Bottega/Balenciaga |
| 19 | Storefront template — Warm Bronze | Imagen 4 | ⏳ TO DO | For Rolex/Bulgari/Omega |
| 20 | Storefront template — Modern Retail | Imagen 4 | ⏳ TO DO | For Nike/Sephora/Adidas |
| 21 | Voice narration (optional) | Edge TTS or ElevenLabs | ⏳ TO DO | Single line for Beat 5 |

---

## 9. ALL THE PROMPTS (verbatim, copy-paste ready)

### 9.1 Suno music prompt

**Mode:** Custom Mode, Instrumental ON.

**Style of Music:**
```
modern cinematic epic, luxury brand film score, driving pulse, arpeggiated synths, soaring strings, deep sub bass, bright major key, hopeful and confident, propulsive build, subtle electronic groove, Hans Zimmer and Ludwig Göransson inspired, M83 atmosphere, 100 BPM, instrumental, anthemic, expensive, modern, building to a climax
```

**Title:** `American Dream — Anthem`
**Lyrics:** `[Instrumental]`

### 9.2 Cold open — 7 Kling clips (in order)

All Kling settings: Kling 2.1, Standard or Pro mode, 5–8 seconds, 16:9.

**Clip 1 — Aerial Push-In (the opener)**
```
Cinematic aerial drone shot at golden hour, slow forward push-in toward a colossal modern shopping and entertainment complex in the New Jersey Meadowlands. The structure is a futuristic mountain of glass, white panels, and curved steel — massive in scale, wider than a stadium. Manhattan skyline visible in the far distance behind it, slightly hazy. Soft golden sunset light reflecting off thousands of windows. Lens flare. Anamorphic widescreen, 2.39:1 aspect ratio, shot on ARRI Alexa, shallow depth of field, slight film grain, color graded warm and luxurious. No text, no people visible, no audio needed. Confident, epic, cinematic mood — like the opening of a Christopher Nolan film.
```

**Clip 2 — Atrium Reveal**
```
Cinematic interior wide shot, low angle, looking up into a vast eight-story glass atrium of a modern luxury shopping and entertainment complex. Soaring curved white architecture, polished marble floors reflecting overhead lights, sweeping escalators climbing to upper levels, hanging golden light installations. Warm afternoon sunlight pours through massive skylights creating dramatic light beams. Subtle slow motion blur of well-dressed shoppers crossing the frame in the distance. Architectural grandeur, scale of Apple Park meets a Dubai luxury mall. Slow upward camera tilt revealing the ceiling. Anamorphic widescreen, shot on ARRI Alexa, shallow depth of field, slight film grain, warm cinematic color grade, lens flare. Confident, epic, modern luxury cinema mood.
```

**Clip 3 — Luxury Corridor (forward dolly with figure walking)**
```
Cinematic slow tracking shot moving down a high-end luxury shopping corridor at dusk. Polished black marble floors with mirror reflections, illuminated minimalist glass storefronts on both sides emitting soft warm gold light, brushed bronze accents on the architecture, tall ceilings with hidden cove lighting. A single elegantly dressed figure in a tailored coat walks slowly away from camera in the distance, slight motion blur. Atmospheric haze catches the warm light. The vibe is hushed, intimate, expensive, like a private wing of a luxury hotel after hours. Anamorphic widescreen, shot on ARRI Alexa, shallow depth of field, lens flare, subtle film grain, rich blacks, warm gold and amber color grade. Confident, refined, modern luxury cinema mood.
```

**Clip 4 — Arena**
```
Cinematic concert arena shot from on-stage perspective, slow aerial pull-back revealing a massive 18,000 seat arena bowl completely packed with cheering fans, hands raised, phone lights twinkling like stars across the crowd. Powerful stage rim lights and lasers cutting through atmospheric haze and stage smoke, beams sweeping the audience. Massive curved LED video wall behind the stage glowing electric blue and magenta. Confetti drifting through the air in slow motion. Pyro flashes on either side of the stage. The energy is electric, sold out, peak concert moment. Anamorphic widescreen, shot on ARRI Alexa, shallow depth of field, lens flare, slight film grain, dramatic high contrast cinematic color grade, deep blacks and saturated stage colors. Epic, climactic, world-class venue mood.
```

**Clip 5 — Dining Macro**
```
Cinematic extreme close-up macro shot of a chef's hands in slow motion placing a delicate garnish on a beautifully plated luxury dish in a fine dining restaurant. Pristine white plate with a perfectly composed modern dish, microgreens, a swoosh of sauce, a glistening seared protein. Tweezers in hand, precise movement. Warm candlelight bokeh in the deep background, blurred silhouettes of well-dressed diners, soft golden chandelier glow. Subtle steam drifts up from the plate. Polished dark wood table surface reflecting the candlelight. Anamorphic widescreen, shot on ARRI Alexa with macro lens, ultra shallow depth of field, slight film grain, rich warm cinematic color grade with deep blacks and amber highlights. Mouth-watering, sensory, refined, Michelin-restaurant mood.
```

**Clip 6 — Indoor Water Park**
```
Cinematic wide aerial shot, slow forward camera move revealing a colossal indoor tropical water park inside a massive transparent glass dome. Towering colorful water slides spiraling down, multiple twisting tube slides, a vast wave pool with crystal blue water rippling, lush real palm trees and tropical landscaping, faux rocky cliffs, lazy river winding through the scene. Sunlight streams down through the glass roof creating dramatic light beams in the misty air. Distant blurred silhouettes of guests floating on tubes and splashing in the pool, motion blur. Vibrant turquoise water, lush greens, soft golden light. Anamorphic widescreen, shot on ARRI Alexa, shallow depth of field, lens flare, slight film grain, vibrant cinematic color grade. The mood is awe-inspiring, joyful, impossible, like a tropical paradise sealed inside a futuristic megastructure.
```

**Clip 7 — Night Pull-Back (the closer, wordmark fades over this)**
```
Cinematic aerial drone shot at blue hour twilight, slow continuous backwards pull-back camera move starting close on a massive futuristic shopping and entertainment complex, gradually revealing more and more of its colossal scale as the camera retreats. The structure glows from within, thousands of warm interior lights pouring through glass facades, exterior architectural lighting in soft white and gold. The deep blue twilight sky has streaks of pink and purple on the horizon. Manhattan skyline visible in the distance, fully lit up, towers glittering. Long red and white light trails of highway traffic streaming around the property. A few aircraft warning lights blinking. Reflections shimmer on a wet parking surface. Anamorphic widescreen, shot on ARRI Alexa, shallow depth of field at the start sharpening as we pull back, subtle lens flare, slight film grain, rich cinematic color grade with deep blues, warm interior gold, and saturated city lights. Epic, anthemic, climactic mood, like the final shot of a cinematic trailer.
```

**CapCut edit settings:**
- 1080p, 30 fps, 6000 kbps bitrate (target 30–40 MB)
- Crossfade 0.5s between each clip
- Mute all clip audio, layer Suno track
- Music fade in 1s, fade out 2s
- Total runtime ~60s

### 9.3 The 6 background loops (Kling)

All Kling settings: Kling 2.1 Standard, 5 seconds, 16:9.

**Loop 1 — Hub**
```
Cinematic aerial loop, very slow continuous gentle sideways drift over a vast modern shopping and entertainment complex at golden hour. The structure is a futuristic mountain of glass, white panels, and curved steel, set in the New Jersey Meadowlands landscape. Manhattan skyline visible in the hazy distance behind it. Soft golden warm sunset light bathes the scene, atmospheric haze, subtle lens flare drift. Camera movement is extremely slow, smooth, continuous — designed to loop seamlessly with no visible cut point. Anamorphic widescreen, shot on ARRI Alexa, shallow depth of field, slight film grain, warm luxurious color grade. The mood is contemplative, vast, confident, like the establishing shot of a high-end brand film.
```

**Loop 2 — Audience (v2 — fewer people, more luxe)**
```
Cinematic locked-off wide static shot inside the elegant atrium of a world-class luxury destination — the architecture feels like a hybrid of the Galleria Vittorio Emanuele II in Milan and a five-star Bvlgari hotel lobby. Camera completely still. Polished calacatta marble floors with mirror-like reflections, soaring vaulted bronze-framed glass roof above, monumental hand-blown glass chandelier suspended in the center of the space, brushed gold and travertine architectural details, sculptural cream leather seating, lush curated greenery, hidden cove lighting throughout. Only three or four elegantly dressed figures move slowly across the frame in slow motion at varying distances — sparse, refined, never crowded — soft motion trails leaving ghostly silhouettes, faces obscured. Soft directional sunlight pours through the vaulted glass roof creating dramatic light beams that catch fine dust particles drifting through the air. Continuous flowing slow motion designed to loop seamlessly. Anamorphic widescreen, shot on ARRI Alexa, shallow depth of field, subtle film grain, rich cinematic color grade with deep blacks, brushed gold highlights, creamy whites. The mood is hushed, refined, expensive, poetic — like a luxury fashion brand campaign film.
```

**Loop 3 — Luxury (lateral side-tracking shot at night, empty)**
```
Cinematic slow horizontal lateral tracking shot, camera gliding sideways past a row of illuminated minimalist luxury storefronts in a high-end retail wing at night. Completely empty, after-hours, no people. Polished black marble floors with mirror-perfect reflections, brushed bronze architectural framing, glass storefronts emitting soft warm gold light from within, sculptural minimalist window displays glowing like jewelry boxes, hidden cove lighting. Atmospheric haze in the air catches the warm interior glow. Subtle reflections of the storefronts in the marble below. Camera moves continuously and smoothly at a slow steady pace, designed to loop seamlessly. Anamorphic widescreen, shot on ARRI Alexa, shallow depth of field, subtle lens flare drift, slight film grain, rich cinematic color grade with deep blacks, warm gold and amber highlights, hints of brushed bronze. The mood is hushed, mysterious, exclusive, expensive — like a luxury car commercial gliding past a closed Rodeo Drive at midnight.
```

**Loop 4 — Retail (overhead time-lapse blur)**
```
Cinematic high wide shot looking down from a balcony into a vast multi-level open retail concourse, bright modern atmosphere. Three or four floors of polished retail levels visible, illuminated storefronts on every level, glass railings, sweeping escalators in the center transporting blurred figures up and down in continuous flow. Time-lapse style motion blur on the crowd below — shoppers reduced to streaks of light and color moving across the polished floors, ghost trails. Storefronts on every level glowing with warm gold and white light, modern signage glowing softly without readable text. Sweeping curved architectural lines, white panels, brushed steel accents, pendant light installations hanging through the open void. Daylight from above mixes with warm interior accent lighting. Camera barely moves — extremely slow gentle push-in or static lock — but the world below is alive with continuous flowing motion. Designed to loop seamlessly. Anamorphic widescreen, shot on ARRI Alexa, shallow depth of field, subtle film grain, vibrant cinematic color grade, balanced highlights and rich contrast. The mood is alive, energetic, commercial, scale-revealing — like a beautifully shot fashion week B-roll or an Apple product launch venue.
```

**Loop 5 — Dining (bar/lounge wide moody)**
```
Cinematic moody wide static shot inside an elegant luxury hotel-style bar and lounge at evening. Floor-to-ceiling backlit shelving filled with rows of premium amber-toned spirits and crystal glassware glowing softly from behind. Polished black marble bartop with mirror reflections, brushed brass and bronze accents, hand-selected cocktail glassware, slow drifting candle flames on the bar surface and at distant blurred tables in the background bokeh. A single bartender silhouette behind the bar, faceless, slowly stirring a drink with very subtle motion. Atmospheric haze in the air. Soft warm pendant lighting. The deep background blurred with dim candlelit tables and seated silhouettes barely visible through shallow depth of field. Anamorphic widescreen, shot on ARRI Alexa, ultra-shallow depth of field, lens flare, subtle film grain, rich cinematic color grade with deep blacks, warm amber and gold highlights, hints of brushed bronze. Designed to loop seamlessly. The mood is hushed, sensual, expensive, hospitality-grade, like a private members club or a five-star hotel rooftop bar.
```

**Loop 6 — Entertainment (Big SNOW indoor mountain)**
```
Cinematic wide cinematic shot inside a colossal indoor alpine ski mountain enclosed by a transparent glass dome. Real snow blanketing the slope, crisp pine trees on either side, distant blurred skiers and snowboarders carving graceful tracks down the mountain in slow motion. Soft snowflakes drift gently through the air. Cool blue and silver light from above filtered through the glass roof, ambient haze. Urban skyline silhouette barely visible beyond the glass dome in the far distance — the surreal contrast of a winter mountain inside a futuristic megastructure. Camera moves with extremely slow gentle forward drift toward the slope, designed to loop seamlessly. Anamorphic widescreen, shot on ARRI Alexa, shallow depth of field, subtle lens flare, slight film grain, cinematic color grade with cool blues, crisp whites, hints of warm sunset light catching the highest peaks. The mood is awe-inspiring, surreal, impossible, magical — like a real mountain teleported inside a glass cathedral.
```

### 9.4 Imagen 4 stills (8 prompts)

All Imagen 4 settings: 16:9, highest resolution, 4 variants per generation.

**Still 1 — Hub Aerial Map**
```
Cinematic three-quarter elevated aerial view at blue hour twilight, looking down at a colossal modern shopping and entertainment complex set in the New Jersey Meadowlands. The structure is a futuristic mountain of curved white architectural panels, glass facades, and brushed steel — visibly massive, wider than a stadium, multi-zoned. Distinct architectural wings visible in the layout: a luxury glass wing on one side glowing warm gold from within, a multi-level retail concourse with skylights, a transparent geodesic dome housing an indoor ski mountain visibly snow-covered through the glass, an arena structure with stage rigging visible from above, a tropical glass dome glowing aqua-blue with the indoor water park inside. The complex glows from thousands of interior warm gold lights pouring through glass walls. Soft architectural exterior lighting in white and gold. Deep blue twilight sky with hints of pink and purple on the horizon. Manhattan skyline visible in the hazy distance, glittering with city lights. Long red and white light trails of highway traffic streaming around the property like rivers. Wet parking surfaces reflecting the lights. Hyper-detailed, ultra-realistic architectural photography, anamorphic widescreen 16:9, shot on ARRI Alexa with a tilt-shift lens, subtle film grain, rich cinematic color grade with deep navy blues, warm interior gold, saturated city lights, ultra-sharp.
```

**Still 2 — Luxury Drawer Cover**
```
Photoreal cinematic hero shot of a single elegant luxury flagship storefront entrance at dusk, polished black marble entry portal, brushed gold framing, etched glass doors with subtle warm illumination from within, hidden cove lighting tracing the entrance perimeter, sculptural minimalist window display visible through the glass, polished marble floor with mirror reflections, atmospheric haze catching the warm interior glow, anamorphic widescreen, shot on ARRI Alexa, shallow depth of field, lens flare, slight film grain, deep blacks, warm gold and amber highlights, hints of brushed bronze, ultra-detailed, 4K, refined exclusive expensive mood like a luxury fashion campaign
```

**Still 3 — Retail Drawer Cover**
```
Photoreal cinematic hero shot of a flagship retail entrance inside a modern luxury shopping concourse during golden hour, large glass storefront with warm interior lighting glowing through, brushed steel signage area above without text, polished marble walkway with subtle reflections, sweeping curved white architectural panels framing the entrance, daylight pouring in from skylights above, sculptural pendant lighting hanging in the void, anamorphic widescreen, shot on ARRI Alexa, shallow depth of field, lens flare, vibrant balanced cinematic color grade, ultra-detailed, 4K, energetic confident commercial flagship mood
```

**Still 4 — Dining Drawer Cover**
```
Photoreal cinematic medium shot of an elegantly set fine dining table beside a floor-to-ceiling window with Manhattan skyline twinkling at twilight, polished dark walnut table with crisp linen runner, hand-blown crystal glassware, brushed gold flatware, single tall taper candle with a flickering flame, a beautifully composed modern dish on a pristine white plate, soft pendant lighting from above, atmospheric haze, anamorphic widescreen, shot on ARRI Alexa, ultra-shallow depth of field, lens flare, slight film grain, deep blacks, warm amber and gold highlights, ultra-detailed, 4K, hushed refined hospitality mood like a five-star hotel dining room
```

**Still 5 — Entertainment Drawer Cover**
```
Photoreal cinematic wide shot of a massive 18,000 seat arena in pre-show preparation, empty rows of seats descending into atmospheric haze, moving stage lights and laser beams cutting through thick fog from a fully prepared concert stage, massive curved LED video wall behind stage glowing electric blue and magenta, rigged lighting truss visible above, single roadie silhouette walking across the stage in the distance, anticipation in the air, anamorphic widescreen, shot on ARRI Alexa, shallow depth of field, lens flare, deep blacks, saturated stage colors, slight film grain, ultra-detailed, 4K, epic anticipatory spectacle mood like the moment before a sold-out concert
```

**Still 6 — Events Drawer Cover**
```
Photoreal cinematic wide shot of a high-end branded pop-up activation inside a luxury concourse, sculptural modern installation as the centerpiece of a vast atrium, immersive theatrical lighting design with sweeping color washes in deep purple and warm amber, well-dressed guests in slow motion mingling around the activation holding champagne flutes, polished marble floors reflecting the colored lights, soaring glass ceiling above, anamorphic widescreen, shot on ARRI Alexa, shallow depth of field, lens flare, vibrant rich cinematic color grade, slight film grain, ultra-detailed, 4K, premium brand activation experiential mood like a luxury launch event
```

**Still 7 — CTA Hero Background**
```
Photoreal cinematic poster-style hero shot of a colossal modern shopping and entertainment complex at golden hour, low-angle three-quarter view, the structure looming majestically with curved white panels and glass facades catching the warm sunset light, Manhattan skyline silhouetted in the hazy distance, dramatic god rays through atmospheric haze, lens flare, anamorphic widescreen, shot on ARRI Alexa, ultra-shallow depth of field on the foreground, deep saturated cinematic color grade with rich warm gold tones, slight film grain, ultra-detailed, 4K, iconic cinematic poster mood like the hero shot of a Christopher Nolan film
```

**Still 8 — Empty Storefront Template (fallback for the killer feature)**
```
Photoreal cinematic three-quarter view of a beautifully empty luxury flagship storefront ready for tenant fit-out, clean floor-to-ceiling glass facade, brushed bronze framing around the entrance, polished black marble entry portal, completely blank empty signage area above the entrance, hidden cove lighting tracing the architecture, mirrored marble floors, atmospheric haze, soft dusk lighting spilling out from inside the larger luxury concourse, neutral elegant canvas waiting for a brand identity, anamorphic widescreen, shot on ARRI Alexa, shallow depth of field, lens flare, deep blacks, warm gold and amber accents, ultra-detailed, 4K, refined empty premium retail space mood
```

### 9.5 The 5 storefront templates (for "Imagine Your Brand Here")

All Imagen 4 settings: 16:9, highest resolution. **CRITICAL:** the signage panel above the entrance must be empty (no text, no garbled letters). Regenerate if Imagen tries to put text there.

**Template 1 — Luxury Gold** (for Gucci, LV, Hermès, Chanel, Cartier)
```
Photoreal cinematic three-quarter view of a beautifully empty luxury flagship storefront ready for tenant fit-out, set inside a high-end shopping concourse at dusk. Polished black calacatta marble entry portal, brushed gold framing around the floor-to-ceiling glass facade, completely blank empty signage panel above the entrance — pure black or empty space ready for a logo, no text, no letters, no symbols. Hidden warm cove lighting tracing the architectural lines, mirrored marble floors with reflections, atmospheric haze catching the warm gold glow, soft pendant lights visible inside through the glass. Anamorphic widescreen, shot on ARRI Alexa, shallow depth of field, lens flare, slight film grain, deep blacks, warm gold and amber highlights, brushed bronze accents, ultra-detailed, 4K, refined empty premium retail space mood, like a closed Hermes or Cartier flagship at night.
```

**Template 2 — Minimal White** (for Apple, Tesla, Saint Laurent)
```
Photoreal cinematic three-quarter view of a beautifully empty modern minimalist flagship storefront ready for tenant fit-out, set inside a bright luxury shopping concourse during the day. Clean floor-to-ceiling glass facade with thin brushed aluminum framing, completely blank empty signage panel above the entrance — pure white empty space ready for a logo, no text, no letters, no symbols. Polished light grey concrete floors, white architectural panels, soft natural daylight pouring in from skylights above, hidden recessed lighting, sculptural minimalist interior visible through the glass with no products. Anamorphic widescreen, shot on ARRI Alexa, shallow depth of field, lens flare, slight film grain, balanced bright cinematic color grade, crisp whites, soft greys, hint of warm accent light, ultra-detailed, 4K, refined Apple-flagship-style minimalist mood.
```

**Template 3 — Classic Black** (for Chanel, Prada, Bottega Veneta, Balenciaga)
```
Photoreal cinematic three-quarter view of a beautifully empty classic high-fashion flagship storefront ready for tenant fit-out, set inside a sophisticated shopping concourse at evening. Polished obsidian black stone facade, slim brushed nickel framing around the glass, completely blank empty signage panel above the entrance — pure black empty space ready for a logo, no text, no letters, no symbols. Mirror-polished black marble floor with crisp reflections, hidden cool white cove lighting, atmospheric haze, soft cool overhead lighting, monochrome interior visible through the glass with no products. Anamorphic widescreen, shot on ARRI Alexa, shallow depth of field, lens flare, slight film grain, monochrome cinematic color grade, deep blacks, crisp whites, cool grey highlights, ultra-detailed, 4K, sophisticated Saint-Laurent-flagship mood.
```

**Template 4 — Warm Bronze** (for Rolex, Bulgari, Omega, Tiffany)
```
Photoreal cinematic three-quarter view of a beautifully empty heritage luxury flagship storefront ready for tenant fit-out, set inside a refined shopping concourse at evening. Rich dark walnut wood facade with brushed bronze trim, vintage-inspired curved glass, completely blank empty signage panel above the entrance — pure dark wood or empty space ready for a logo, no text, no letters, no symbols. Polished marble floor with rich amber reflections, warm pendant chandeliers visible inside, leather-and-wood interior visible through the glass with no products, atmospheric haze catching the warm glow. Anamorphic widescreen, shot on ARRI Alexa, shallow depth of field, lens flare, slight film grain, rich warm cinematic color grade, deep browns, warm bronzes, gold highlights, ultra-detailed, 4K, Rolex or Bulgari heritage flagship mood.
```

**Template 5 — Modern Retail** (for Nike, Sephora, Adidas, Lululemon)
```
Photoreal cinematic three-quarter view of a beautifully empty modern flagship retail storefront ready for tenant fit-out, set inside a vibrant shopping concourse during golden hour. Clean glass facade with bold black architectural framing, completely blank empty signage panel above the entrance — pure black empty space ready for a logo, no text, no letters, no symbols. Polished light marble floor, dynamic modern interior visible through the glass with no products, soft daylight from above mixing with warm interior lighting, sculptural geometric architectural details. Anamorphic widescreen, shot on ARRI Alexa, shallow depth of field, lens flare, slight film grain, balanced vibrant cinematic color grade, crisp blacks and whites, energetic confident mood, ultra-detailed, 4K, modern Nike or Sephora flagship style.
```

---

## 10. Asset hosting — Cloudinary

The user is uploading all assets to **Cloudinary** (cloud name: `dwo1snivu`). The existing project already uses this Cloudinary account heavily.

**Suggested folder structure:**
```
american-dream/
├── audio/theme
├── video/cold-open
├── video/loops/{hub,audience,luxury,retail,dining,entertainment}
├── images/{hub-aerial,cover-luxury,cover-retail,cover-dining,cover-entertainment,cover-events,cta-hero,storefront-empty}
└── images/brands/{template-luxury-gold,template-minimal-white,template-classic-black,template-warm-bronze,template-modern-retail}
```

**URL pattern (with optimization):**
- Videos: `https://res.cloudinary.com/dwo1snivu/video/upload/f_auto,q_auto:good,vc_h264/{public_id}.mp4`
- Images: `https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/{public_id}.jpg`

**The user is sending the URLs directly** (their preference) rather than relying on a strict naming convention. So expect a list of URLs with each asset description.

---

## 11. Code rebuild plan (8 phases, 4–5 days)

### Phase 1 — Foundation (Day 1)
- Audit current 14-slide deck — keep structural pieces (providers, modal, sub-decks); replace `DeckEngine.tsx` content
- Wire 60-sec cold open as new entry experience (autoplay, click-to-skip, mute toggle)
- Music track autoplay with subtle mute toggle (top-right)
- Replace splash slide
- New global state for "where in the deck am I"

### Phase 2 — The Hub, Beat 2 (Day 1–2)
- Build interactive aerial map using `hub-aerial` Cloudinary URL as background
- 5 glowing hotspots positioned over Luxury / Retail / Dining / Entertainment / Events zones
- Hotspots animate (pulse, glow on hover, ripple on click)
- Live activity ticker bar overlay
- Background `loop-hub` video plays subtly behind everything

### Phase 3 — The Drawers, Beat 4 (Day 2)
- Build drawer drill-down system — clicking a hotspot opens a side drawer
- Each drawer plays its loop video as background
- 3 key data points + a CTA per drawer
- Smooth slide animation, ESC-to-close
- Drawers stack (Luxury → click "Available spaces" → opens Leasing sub-deck)

### Phase 4 — The Audience, Beat 3 (Day 2–3)
- Kinetic typography animations (Fraunces editorial)
- Animated stat counters (count up on entry)
- NYC metro radius overlay map
- `loop-audience` video as background

### Phase 5 — Imagine Your Brand Here, Beat 5 ⭐ (Day 3)
- Text input UI ("Enter your brand")
- Brand → template matching logic (`pickTemplate(brand)` from section 6.4)
- Clearbit Logo API integration: `https://logo.clearbit.com/{guessed-domain}`
- Domain guessing: try `{slug}.com` → fall back to text-based logo
- Browser-side compositing via canvas or CSS: storefront image + overlaid logo + brand color tint
- Reveal animation (storefront fades in, logo materializes)
- "Email this to my team" button — generates a sharable image URL or downloads
- Cache famous brands in memory after first generation

### Phase 6 — The Ask, Beat 6 (Day 4)
- Final CTA screen with `cta-hero` background
- Three buttons: Lease / Sponsor / Book
- Each opens existing InquiryModal pre-filled for that path

### Phase 7 — Polish (Day 4–5)
- Custom cursor (magnetic snap on interactives, gold trail)
- Subtle sound design (gentle whoosh on drawer open, soft click on hotspots)
- Crossfade transitions between beats (no hard cuts)
- Microinteractions on every button
- Tablet responsive (sales reps demo on iPads)
- Lighthouse pass — target 90+ desktop performance

### Phase 8 — Deploy + Submit (Day 5–6)
- Push to Vercel
- Update `metadataBase` in `app/layout.tsx` to live URL
- Update README:
  - New architecture diagram
  - All AI tools used
  - **The "I need to be here" paragraph** (Medi specifically asked for this)
- Record 3-min Loom walkthrough demoing the deck
- Email medi@liat.ai: live URL + GitHub link + write-up

---

## 12. Critical tech constraints

### 12.1 Next.js 16 — IMPORTANT
The project's `CLAUDE.md` and `AGENTS.md` say:

> **This is NOT the Next.js you know.** This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code.

**Always check `node_modules/next/dist/docs/` before writing any Next.js routing, server component, or config code.** Don't assume Next 14/15 patterns work.

### 12.2 Existing tech stack (round 1)
- Next.js 16 (App Router, Turbopack, React 19)
- TypeScript (strict)
- Framer Motion 12
- Tailwind 4
- GSAP, Lenis (smooth scroll)
- Cloudinary (assets)
- Google Fonts via `next/font` — Montserrat, Fraunces, Geist primarily

### 12.3 Existing files to KEEP (don't break)
- `app/layout.tsx` (root metadata, providers) — only update URLs/metadata
- `providers/InquiryProvider.tsx` (modal management)
- `providers/SmoothScrollProvider.tsx` (Lenis)
- `components/InquiryModal.tsx` (works well, reused)
- `app/api/inquiry/route.ts` (validates + logs inquiries)
- `lib/leasing.ts`, `lib/venues.ts` (data — single source of truth)
- `app/leasing/`, `app/venues/` (sub-decks)
- `components/deck/LeasingDeck.tsx`, `components/deck/VenuesDeck.tsx`

### 12.4 Existing files to REPLACE
- `components/deck/DeckEngine.tsx` — full rewrite around 6 beats
- `components/deck/MenuDrawer.tsx` — adapt to 6-beat nav
- `app/page.tsx` — may stay the same, just renders DeckEngine
- `providers/PresentationProvider.tsx` — totals will change (6 instead of 14)

### 12.5 Existing files that can be DELETED
- Legacy unused: `components/Hero.tsx`, `WhyProperty.tsx`, `StorySlides.tsx`, `LuxurySection.tsx`, `ExperienceGrid.tsx`, `BrandMarquee.tsx`, `DiningSection.tsx`, `EventsSection.tsx`, `Footer.tsx`, `Navbar.tsx`
  - These are from a pre-deck scrolling-website version; not used by current `app/page.tsx`
  - Verify they're truly unused with grep before deletion

---

## 13. Submission requirements (May 3)

Email to **medi@liat.ai** with:
1. **Live URL** — Vercel deployment
2. **GitHub link** — public repo with clean code
3. **Write-up** (1–2 pages) explicitly addressing Medi's 5 criteria:
   - Visual & sophistication choices
   - How it's interactive, not presentation-shaped (hub-and-drawer, hotspots, persona)
   - All AI tools used (this README will list them)
   - The storytelling arc (6-beat crescendo)
   - **Dedicated paragraph: the "I need to be here" moment** — explain "Imagine Your Brand Here" and why a tenant/sponsor/event partner would react that way

---

## 14. Decisions made (and why)

| Decision | Reasoning |
|---|---|
| Cut 14 slides → 6 beats | Round 1 felt "stitched, not story." Fewer, denser screens with emotional arc = stronger pull. |
| Hub-and-drawer over wheel-advance | Directly answers Medi's "linear, presentation-shaped" complaint. |
| Killer feature = "Imagine Your Brand Here" | Directly answers "no I-need-to-be-here moment." Personal, sharable, instant. |
| Hybrid template + Clearbit logo (not pure AI brand renders) | Pollinations Flux Schnell garbled brand logos. Hybrid gives sharper logos AND better storefronts. |
| 5 storefront templates (not 10 brand renders) | Templates are reusable for ANY brand a user types via category matching. Infinite vs finite. |
| Cloudinary not local public/ | Existing project uses Cloudinary. Auto-optimization helps Lighthouse score Medi cares about. |
| All free AI tools | User is on a budget. Free tier stack is genuinely competitive in 2026. |
| Voice narration optional | Music carries the experience. Narration is "nice to have," not load-bearing. |

---

## 15. Where we are right now

**Status as of 2026-04-28:**

✅ **Completed:**
- Round 1 deck shipped, shortlisted
- Round 2 strategy locked
- Suno music track generated (`american-dream-theme.mp3`)
- 60-second cold open generated (7 Kling clips, edited in CapCut, ~180MB pre-Cloudinary)
- Pollinations approach for brand renders abandoned (quality issues)
- Hybrid template + Clearbit approach decided
- All prompts written for remaining assets (loops, stills, templates)

⏳ **In progress:**
- User is generating remaining assets in batches
- User uploading everything to Cloudinary
- User sending URLs to Claude as they upload

⏭️ **Next immediate steps for the next Claude:**
1. Wait for asset URLs from user (or read them from `.env`/somewhere if user committed them)
2. Begin Phase 1 of code rebuild (Foundation)
3. Don't start coding until at least the cold open URL + hub aerial URL are received — those are the foundation
4. Reference this file's section 11 for phase order
5. Reference section 12 for tech constraints (especially the Next.js 16 warning)

---

## 16. Author's note to the next Claude

If you're reading this in a fresh chat: the user is the candidate, not a teammate. They're trusting you to take this from prompts → shipped deck. They are NOT a developer in the classical sense — they should not be writing code. Your job is to:

1. Listen to their feedback on AI assets (they may iterate prompts)
2. Code the rebuild yourself end-to-end
3. Ship by May 3
4. Make this their best portfolio piece

Be confident, decisive, and move fast. They've trusted the plan; deliver on it.

The previous Claude (me) believed strongly that this plan, executed well, gives them a real shot at top 1–2. The "Imagine Your Brand Here" feature alone differentiates them from every other shortlisted candidate. Don't lose sight of that — protect that feature, polish it, and make it the centerpiece of the write-up.

Good luck. 🟡
