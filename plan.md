# GTA — METRO CITY

A playable, GTA-style open-world crime game that runs in the browser. No build step, no external assets — open it on GitHub Pages or any static server.

**Build rule:** one file → tick it below → commit → push. Every single time.
`[ ]` = to do · `[x]` = created, committed and pushed.

---

## 1. Decisions

| Topic | Choice |
|---|---|
| Rendering | Three.js (vendored in `vendor/`, works offline, no CDN) |
| Code | Plain ES modules + import map. No bundler, no npm needed to play |
| View | Third-person 3D, low-poly look |
| Physics | Arcade, planar (XZ). OBB/circle collisions, drift-capable car model |
| Assets | 100% procedural: city, textures, car models, sounds, radio music |
| Platforms | Desktop (keyboard + mouse) and phones (touch controls) |
| Traffic side | Right-hand (flip `DRIVE_ON_LEFT` in `config.js`) |

## 2. What "functional" means here

**World** — 8×8 block city (~650 m) with roads, lane markings, crosswalks, sidewalks, parks, downtown towers, suburbs, island edge and sea. Landmarks: Safehouse, Hospital, Police Station, Pay 'n' Spray, Gun Store.

**Player** — walk, run, third-person camera, aim, shoot, melee, reload, switch weapons, enter/exit vehicles, carjack drivers. Health + armor. WASTED (death) and BUSTED (arrest) with respawn and penalty.

**Vehicles** — sedan, sports, taxi, SUV, van, police car, SWAT van. Handbrake drifts, collision damage, smoke, fire, explosions, wrecks, horn, headlights, sirens.

**City life** — pedestrians that wander, panic and die. Lane-following traffic with traffic lights, obstacle braking, and spawn/despawn around the player.

**Law** — 5-star wanted level. Crimes add heat, police cars and foot cops chase you, evade to cool down. Pay 'n' Spray clears stars.

**Missions** — 6 story missions (goto, steal, deliver, kill, race, evade), cash rewards, fail conditions, plus pickups and 10 hidden packages.

**Presentation** — HUD, circular minimap, day/night cycle with lit windows and street lamps, procedural radio (3 stations) and SFX, pause menu, quality settings, autosave.

## 3. Controls

| Action | Keyboard / mouse | Touch |
|---|---|---|
| Move / steer | `WASD` | left stick |
| Look | mouse | drag right side |
| Run | `Shift` | push stick far |
| Shoot / punch | left click | FIRE |
| Aim | right click | AIM |
| Reload | `R` | RELOAD |
| Weapon | `Q`/`E`, `1`–`5`, wheel | WEAPON |
| Enter / exit vehicle | `F` | ENTER |
| Accelerate / brake | `W` / `S` | pedals |
| Handbrake | `Space` | HBRAKE |
| Horn | `H` | HORN |
| Radio (in car) | `E` next · `Q` previous | RADIO |
| Camera distance | `C` | — |
| Pause | `Esc` / `P` | ⏸ |

## 4. Architecture

Coordinates: metres, Y up, ground at y=0, sidewalk top at y=0.2. Yaw rotates about Y; forward = `(sin yaw, cos yaw)` in (x, z).

City grid: road width 14, block lot 66, pitch 80, 8×8 blocks, roads centred on multiples of 80.

Frame order in `game.js`:
`input → player → vehicles → pedestrians → traffic → police → weapons → collisions → pickups → missions → effects → camera → day/night → HUD + minimap → render`

Modules talk through the `game` object (shared state) and a tiny event bus (`crime`, `pedKilled`, `vehicleExploded`, `cash`, `missionPassed`, …). DOM-touching code (input, audio, hud, minimap) is kept apart from simulation code so the simulation can be tested headlessly.

## 5. File checklist

### Plan
- [x] `plan.md` — this file

### Foundation
- [x] `vendor/three.core.min.js` — Three.js core (vendored)
- [x] `vendor/three.module.min.js` — Three.js module build (vendored)
- [ ] `js/config.js` — all tunable constants (world size, speeds, damage, wanted levels, colours)
- [ ] `js/utils.js` — math helpers, seeded RNG, event bus, canvas-texture helper
- [ ] `js/physics.js` — spatial hash, OBB/circle collision, ray tests
- [ ] `js/input.js` — keyboard, mouse + pointer lock, touch joystick and buttons
- [ ] `js/audio.js` — WebAudio synth: engines, tyres, horn, guns, explosions, sirens, radio stations

### World
- [ ] `js/world.js` — procedural city, roads, buildings, props, colliders, road graph, landmarks
- [ ] `js/effects.js` — particles, smoke, fire, explosions, tracers, muzzle flash, floating text
- [ ] `js/daynight.js` — sky, sun, fog, lit windows, street lamps, headlight cones

### Actors
- [ ] `js/vehicle.js` — vehicle types, models, arcade physics, damage, fire, explosion
- [ ] `js/weapons.js` — weapon table, hitscan shooting, melee, reload, ammo
- [ ] `js/player.js` — on-foot controller, humanoid model, health/armor, enter/exit, carjack
- [ ] `js/pedestrians.js` — civilians: wander, cross roads, panic, die, drop cash
- [ ] `js/traffic.js` — lane-following AI cars, traffic lights, spawner
- [ ] `js/police.js` — wanted level, police cars, foot cops, busted/wasted handling
- [ ] `js/pickups.js` — health, armor, cash, weapons, gun store, hidden packages
- [ ] `js/missions.js` — mission data + stage runner (goto, getVehicle, deliver, kill, race, evade)

### Presentation and glue
- [ ] `js/camera.js` — third-person rig (on foot, aim, driving, collision-safe)
- [ ] `js/minimap.js` — pre-rendered city map + rotating circular radar with blips
- [ ] `js/hud.js` — health, armor, cash, stars, ammo, clock, subtitles, toasts, overlays
- [ ] `js/save.js` — localStorage save/load, settings
- [ ] `js/game.js` — game class: state machine, update order, respawn, quality settings
- [ ] `js/main.js` — boot, loading screen, menu wiring
- [ ] `css/style.css` — HUD, menus, touch controls, overlays
- [ ] `index.html` — canvas, HUD markup, import map, menus
- [ ] `README.md` — how to play, run and deploy

## 6. Test checklist (ticked only after it has actually been run)

- [ ] Boots with no console errors (headless Chrome with WebGL)
- [ ] Simulation soak test: no NaNs, nothing escapes the map, no entity stuck inside a wall
- [ ] Walk, run, look; enter a car, drive, drift, exit
- [ ] Collisions with buildings, cars and pedestrians behave
- [ ] Shooting, damage, reload and weapon switching work
- [ ] Wanted level rises, police chase, cool-down clears it
- [ ] WASTED and BUSTED respawn correctly
- [ ] All 6 missions can be started and completed
- [ ] Save and load round-trip
- [ ] Touch controls appear on a phone-sized viewport
