// config.js — every tunable number lives here. Safe to import from Node (no DOM access at load time).

const qs = (typeof location !== 'undefined') ? new URLSearchParams(location.search) : new URLSearchParams('');

/** URL flags, handy for testing: ?god  ?mute  ?debug  ?q=low|medium|high  ?seed=42  ?cash=99999 */
export const FLAGS = {
  god: qs.has('god'),
  mute: qs.has('mute'),
  debug: qs.has('debug'),
  seed: Number(qs.get('seed')) || 1337,
  quality: qs.get('q'),
  cash: qs.has('cash') ? Number(qs.get('cash')) : null,
};

export const STORAGE_KEY = 'metro-city-save-v1';

// ---------------------------------------------------------------- world layout
const BLOCKS = 8, ROAD_W = 14, LOT = 66, PITCH = ROAD_W + LOT;

export const WORLD = {
  BLOCKS,                // blocks per side
  ROAD_W,                // road width (m)
  LOT,                   // block lot size incl. sidewalk ring (m)
  PITCH,                 // road centre to road centre (m)
  SIDEWALK: 4,           // sidewalk ring width inside each lot (m)
  CURB_H: 0.2,           // sidewalk height above the road (m)
  LANE: 3.5,             // lane centre offset from the road centre line (m)
  ROAD_EXTENT: (BLOCKS * PITCH) / 2,                    // outermost road centre line (320)
  BOUNDS: (BLOCKS * PITCH) / 2 + ROAD_W / 2 + 9,        // hard limit: barrier wall (336)
  DRIVE_ON_LEFT: false,
};

/** Road centre-line coordinate for road index k (0..BLOCKS). */
export const roadCoord = (k) => (k - BLOCKS / 2) * PITCH;
/** Block centre coordinate for block index b (0..BLOCKS-1). */
export const blockCenter = (b) => (b - (BLOCKS - 1) / 2) * PITCH;

export const TIME = {
  DAY_SECONDS: 600,      // real seconds for one 24h in-game day
  START_HOUR: 9,
};

// ---------------------------------------------------------------- actors
export const PLAYER = {
  WALK: 3.4, RUN: 6.6,
  RADIUS: 0.42, HEIGHT: 1.8,
  MAX_HP: 100, MAX_ARMOR: 100,
  ENTER_RANGE: 3.6,
  TURN: 14,              // facing smoothing (1/s)
  ACCEL: 30,             // walk acceleration (m/s²)
};

export const PED = {
  WALK: 1.45, RUN: 5.2,
  RADIUS: 0.4, HEIGHT: 1.75,
  HP: 40,
  SPAWN_MIN: 45, SPAWN_MAX: 105, DESPAWN: 125,
  PANIC_TIME: 9,
};

export const TRAFFIC = {
  SPAWN_MIN: 75, SPAWN_MAX: 150, DESPAWN: 180,
  CRUISE: 13,            // m/s
  LIGHT_GREEN: 9, LIGHT_YELLOW: 2,    // seconds
  PARKED_COUNT: 26,
};

export const WANTED = {
  MAX: 5,
  THRESH: [0, 16, 50, 110, 200, 340],     // heat needed to reach 0..5 stars
  MAX_HEAT: 420,
  CRIME: {
    shot: 1, pedHit: 5, pedKill: 16, copHit: 22, copKill: 55,
    carjack: 14, theft: 3, explosion: 12, ram: 2,
  },
  COOL_RATE: 4,          // heat lost per second while hidden from police
  HIDE_DELAY: 6,         // seconds unseen before cooling starts
};

export const POLICE = {
  CARS: [0, 1, 2, 3, 4, 5],              // max chasing cars per star level
  FOOT: [0, 2, 3, 4, 6, 8],              // max foot cops per star level
  SWAT_FROM: 4,
  SPAWN_MIN: 90, SPAWN_MAX: 140, DESPAWN: 230,
  SIGHT: 75,
  BUST_TIME: 1.6, BUST_RADIUS: 2.3,
};

export const ECON = {
  START_CASH: 500,
  WASTED_FEE: 0.10, WASTED_FEE_MIN: 100,
  BUSTED_FEE: 0.15, BUSTED_FEE_MIN: 150,
  PAY_N_SPRAY: 100,
  PED_CASH: [4, 38],
  COP_CASH: [15, 55],
  RESPAWN_DELAY: 3.6,
};

// ---------------------------------------------------------------- camera
export const CAMERA = {
  FOV: 62, NEAR: 0.3, FAR: 560,
  FOOT: { dist: 5.0, height: 1.9, shoulder: 0.8 },
  AIM:  { dist: 2.5, height: 1.75, shoulder: 0.95, fov: 46 },
  CAR:  { dist: 8.2, height: 3.3 },
  SENS: 0.0022,
  SMOOTH: 9,
};

// ---------------------------------------------------------------- graphics presets
export const QUALITY = {
  low:    { pixelRatio: 1,    shadows: false, shadowSize: 0,    fog: 230, traffic: 10, peds: 16 },
  medium: { pixelRatio: 1.25, shadows: true,  shadowSize: 1024, fog: 310, traffic: 16, peds: 26 },
  high:   { pixelRatio: 2,    shadows: true,  shadowSize: 2048, fog: 400, traffic: 24, peds: 38 },
};

export const CAR_COLORS = [
  0xb0302a, 0x2a5db0, 0xe8e4da, 0x1c1c20, 0x7a8590, 0x2f7d4f,
  0xd9a21b, 0x6b3fa0, 0xd2551f, 0x3aa5b5, 0x8c8c3a, 0x9b1f4f,
];
