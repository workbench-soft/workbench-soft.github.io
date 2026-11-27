import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Shuttrix is an Expo app whose screens are React Native, over a Kotlin camera module on CameraX and Camera2. Each photo is built and saved on the phone, with no server.',
  parts: [
    {
      name: 'Expo and React Native',
      role: 'the camera screen, the dials, Simple mode, the gallery and Settings in TypeScript.',
    },
    {
      name: 'CameraX and Camera2',
      role: 'CameraX runs the lifecycle and the streams, with Camera2 values for the manual dials.',
    },
    {
      name: 'Kotlin camera module',
      role: 'binds the lenses, applies the dials and runs a pass per mode on each saved photo.',
    },
    { name: 'OpenCV', role: 'stitches Panorama, lines up the Macro focus stack and renders the Portrait lens blur.' },
    { name: 'ML Kit', role: 'reads QR codes off the preview and finds the subject for Portrait.' },
    { name: 'ONNX Runtime', role: 'runs a depth model on the phone for the Portrait and Mini blur.' },
    { name: 'Rust photo crate', role: 'develops raw sensor frames into a photo for the Raw photo switch.' },
    { name: 'MediaStore', role: 'saves each shot to the camera folder, where Memories and other galleries find it.' },
  ],
  flow: [
    'The person picks a mode and moves a dial or a slider.',
    'The screen passes the values to the Kotlin camera view as props.',
    'CameraX and Camera2 apply them, and the dials show the live values of each frame.',
    'A press captures the photo, and the passes of the mode run on the saved file.',
    'MediaStore saves the result to the camera folder, and the gallery shows it.',
  ],
  links: [
    {
      to: 'memories',
      text: 'Shuttrix lives in the Memories repo and shares its photo editor, viewer and place names. Memories reads the shots from the camera folder.',
    },
    { to: 'app-updater', text: 'WBS Updater installs the same APK from the shared releases.' },
    { to: 'GitHub', text: 'The build from outside a store finds its new version in the public releases.' },
    { to: 'Google Play', text: 'Google Play Billing sells Plus and Remove ads.' },
    { to: 'Google AdMob', text: 'AdMob shows the gallery banner after the consent form.' },
  ],
  design: {
    scale: [
      'One person per phone, with no server: each photo is built and saved on the phone.',
      'A Portrait photo costs about 7 s per 12 MP on a Pixel 7 Pro CPU, and the depth model is a 26 MB download.',
      'A merged photo holds 5 full size frames of about 18 MB each in memory.',
    ],
    data: [
      'Settings are one JSON value in the Android shared preferences, read at the first render, so the camera opens as it was left.',
      'Shots are WebP, JPEG, PNG or MP4 files in DCIM/Camera, listed through MediaStore rows the app owns. RAW adds a DNG.',
      'The place, the white balance calibration and the live values stay in memory while the camera is open.',
    ],
    interfaces: [
      'React Native passes the dial values to the Kotlin camera view as props, and the module sends live values back 4 times a second.',
      'CameraX runs the lifecycle and use cases, and Camera2 interop sets ISO, shutter, focus distance and white balance gains.',
      'Shots land in MediaStore under DCIM/Camera, where Memories reads them, and the app answers the Android camera intents.',
    ],
    reliability: [
      'The dials go back on the camera each time it opens, from the saved settings.',
      'A 512 px draft shows in the gallery until the final file lands.',
      'A lens without the Night extension falls back to a slow frame rate with strong noise reduction, and CameraX falls back to the closest supported size.',
    ],
    security: [
      'Photos stay on the phone. The app has no account and no server of its own.',
      'Location is read only while the camera is open, and the place goes into the EXIF tags of the saved file.',
      "AdMob asks for consent in the gallery on the first open, not at launch, so a quick shot isn't delayed.",
    ],
    performance: [
      'Zero shutter lag fires on touch down, so the shot keeps the moment of the press.',
      'A plain photo asks for a 60 frame range, so auto exposure keeps the shutter at 1/60 s or faster.',
      'The Portrait blur renders on a 2048 px layer, and Enhance and Mini run as GPU passes.',
      'A ring holds the last 5 frames for the merged photo and the last 8 raw frames for the Rust develop step.',
    ],
    operations: [
      'A push to main starts the camera checks and the release build side by side, and release-gate.sh publishes only when checks pass.',
      'Tags are shuttrix-v with a date, and the APK goes to a release in the public site repo, where the app and the updater find it.',
      'The Play bundle builds once a day at 19:00 Sydney when the camera changed, and the Play build holds a stub for the updater.',
      'A separate workflow builds the ONNX Runtime and OpenCV libraries and publishes them as a prerelease.',
    ],
    tradeoffs: [
      'Expo with a Kotlin module over CameraX over react-native-vision-camera, which has no manual focus distance, ISO, shutter or kelvin.',
      "Night through the CameraX extension over stacking frames in Kotlin, so the phone's own pipeline runs and leaves white balance and EV to it.",
      'Depth Anything V2 Small over a larger model for its Apache licence, at a 26 MB download and about 7 s per photo.',
      'A monorepo with Memories over a repo of its own, to share the editor and viewer, at the cost of path based CI.',
    ],
  },
  features: {
    'Simple and Pro':
      'Both modes drive one camera view. Simple hands focus and exposure to auto, and Pro hands them to the dials.',
    'Simple mode':
      'React Native draws the lens icons, the zoom rail and the sliders over the camera view. A settings store keeps each value and turns it into camera props.',
    Night:
      'The Kotlin module runs the CameraX Night extension, which is the night pipeline of the phone. A lens without it gets a slow frame rate with strong noise reduction.',
    Astro:
      'The module takes up to 24 frames of a quarter second and aligns them on the stars. A tone pass then takes off the sky glow and lifts the stars.',
    Moon: 'A 2.5 second burst keeps the 8 sharpest frames around the moon and averages them. A second pass sharpens the result and sets the levels.',
    'Long exposure':
      'A frame stream gathers 3 seconds of frames held in the hand and aligns them. The blend keeps the sharpest frame where the scene held still.',
    Portrait:
      'ML Kit finds the subject at the focus spot, and a depth model gives the distances. OpenCV then renders the blur by depth on the phone.',
    Mini: 'A GPU blur sits over the sharp photo through a gradient mask, with stronger colour. One GPU filter draws the same look on the preview and the video.',
    Macro:
      'The app picks the back lens that focuses closest and works out the frame width. An OpenCV focus stack merges 6 to 10 frames into one sharp photo.',
    Panorama:
      'The rotation sensor keeps a frame each time the phone turns far enough, up to 12. OpenCV bends each onto a cylinder and stitches the strips by matched features.',
    'Slow motion':
      'A CameraX high speed session records at the fastest fixed rate the lens offers. CameraX writes the slowed MP4 itself.',
    'Time lapse':
      'A second frame stream feeds a frame each half second into an H.264 encoder. Each frame gets a fixed time stamp, so the speed stays at 15 times.',
    Lenses:
      'The module reads each lens and its range from the camera, and one zoom ratio picks the lens. On the selfie camera the faces it reports set the fit.',
    Focus:
      'The face detector of the camera finds faces on each frame. The module points focus and metering at the target face or the tapped spot.',
    'White balance':
      'Camera2 sets the presets and the gains. For kelvin the module measures each preset once per lens and places the value between the 2 nearest.',
    Exposure:
      'Camera2 interop sets ISO and shutter by hand, or leaves them to auto exposure. The lens gives the compensation range, and auto darkens dim scenes by up to 2 EV.',
    'Auto tune':
      'A pure function reads the metered light and the kelvin auto white balance found. It returns the Light, Warmth and Color picks for the scene.',
    Color:
      'Camera2 has no saturation control, so a colour matrix pass rewrites each saved photo. The preview gets the same matrix as a live effect.',
    'Photo, video and flash':
      'CameraX fires the photo on touch down with zero shutter lag. A hold binds the video streams, records and binds the photo ones again.',
    'Place and camera tags':
      'The Android location service keeps a fresh fix while the camera is open. An EXIF pass then writes the place, the dials and the lens heading into the file.',
    'Photo and video size':
      'Settings offer 3 photo tiers and 4 video tiers. CameraX falls back to the closest size each lens supports.',
    'Photo format and originals':
      'A file module encodes each photo as WebP, JPEG or PNG and copies its EXIF tags. It can keep the camera original and a Color-only copy, and RAW adds a DNG.',
    'Multi-frame photo':
      'A ring holds the last 5 full size frames while the camera runs. A press merges the frames from before the touch, with the newest one as the reference.',
    'Enhance photos':
      'With Enhance on, a GPU shader lifts shadows and adds colour and sharpness to the saved JPEG. With it off, Camera2 asks for a plain sRGB tone curve where the camera allows.',
    'Raw photo':
      'A Camera2 session of its own holds the last 8 raw sensor frames. A Rust crate aligns and merges them, then develops the photo on the phone.',
    'QR codes':
      'The bundled ML Kit scanner reads each preview frame on the phone. CameraX maps the box of each code to the screen for the brackets.',
    Clock:
      'A React Native layer draws the time in the strip the hidden status bar leaves. One timer fires each minute, and taps pass through to the preview.',
    Gallery:
      'The gallery lists the shots the app saved through MediaStore and groups the versions of one photo. The Android share sheet sends the picked files.',
    Plus: 'Google Play Billing sells the one time product, and the app checks it on the first gallery open. A counter on the phone keeps the 3 free shots of each Plus mode. After the third shot is saved, the Plus sheet opens with the price from Google Play.',
    Ads: 'AdMob shows one banner under the gallery grid and asks for consent on the first open. The same Google Play check hides it after Remove ads or Plus.',
    'Edit photos':
      'The shared editor package of the Memories repo runs inside an Expo DOM component. The Kotlin module saves the result over the file or as a new JPEG, with its metadata.',
    'Quick start':
      'The app answers the Android camera intents, so a double press of power opens it. A Quick Settings tile and a lock screen activity open it over the lock screen.',
    Updates:
      'A shared update package checks the GitHub releases at launch and on each return. The Google Play build swaps it for a stub with no check.',
    'Bug reports':
      'A Kotlin handler saves a crash with its logcat lines, and Android notes native crashes for the next start. The app posts the log to a Rust Worker that keeps it in KV for 30 days.',
    Languages:
      'i18next holds a catalog per language, and a test checks each one has every key. The camera module keeps the Settings pick next to the dials.',
    'Light, blur and fonts':
      'The shared photo editor runs these on the finished pixels, so its blur uses an ellipse with no depth data. Camera-only settings stay out of it.',
    'iPhone app':
      'A Swift twin of the camera module runs on AVFoundation with the same calls. Core Image runs the photo passes, and the built modes use the video frames.',
  },
};

export default arch;
