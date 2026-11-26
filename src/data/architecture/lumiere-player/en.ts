import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'One Kotlin app for Android phones and Google TV plays files from the phone, a USB stick or an SMB share on libVLC. The libraries and the places stay on the device in SQLite, and the APK from GitHub adds online music.',
  parts: [
    {
      name: 'Kotlin and Android Views',
      role: 'the screens for the remote and for touch, in one app for the phone and the TV.',
    },
    { name: 'libVLC', role: 'plays the video and the music, reads the tags and browses the SMB shares.' },
    { name: 'SQLite', role: 'the positions, the music, book and video libraries, and the place in each book.' },
    {
      name: 'Media3',
      role: 'the music session with the notification, the lock screen controls and the Bluetooth buttons.',
    },
    { name: 'WorkManager', role: 'scans the music, book and video folders in the background.' },
    { name: 'sherpa-onnx', role: 'the keyword spotter that hears Hey Lumi on the phone.' },
    {
      name: 'Chaquopy and yt-dlp',
      role: 'the online module with MusicBrainz names and YouTube sound, in the GitHub APK only.',
    },
    { name: 'Google Play Billing and AdMob', role: 'the Pro and Remove ads purchases, and the banner on a phone.' },
  ],
  flow: [
    'The person adds a phone folder, a USB stick or an SMB share.',
    'A background scan reads the names and tags into SQLite on the device.',
    'The home screen lists the files, the songs, the books and the videos.',
    'A tap, a remote key or a voice command picks what plays.',
    'libVLC plays it, and the app saves the place as it goes.',
  ],
  links: [
    { to: 'guitar-upscale', text: 'Find tabs opens Guitar Upscale on the song that plays, through an Android link.' },
    { to: 'spotthecam', text: 'Hey Lumi shares the microphone with Hey Spot, so both phrases work at once.' },
    { to: 'keeppad', text: 'Hey Lumi uses the same keyword model as Hey Keep and shares the microphone with it.' },
    { to: 'GitHub', text: 'The APK and its updates come from GitHub releases.' },
    { to: 'Google Play', text: 'The Play build, its updates and the Pro and Remove ads purchases.' },
  ],
  design: {
    scale: [
      'One APK for Android phones and Google TV, one person per install. The libraries are indexed on the device.',
      'The video scan reads names only, with no tag reads, so a big share indexes without opening each file.',
      'Two ABIs ship, armeabi-v7a and arm64-v8a, to keep the libVLC APK small.',
    ],
    data: [
      'SQLite on the device: positions.db, library.db, books.db, book-places.db and videos.db.',
      'positions.db keys a row by the URI without the NAS login, and a USB file also by name plus size.',
      'Android backup keeps positions and book places, and leaves out nas.xml and the databases that hold a NAS login.',
    ],
    interfaces: [
      'libVLC reads file://, content:// and smb:// sources. A Media3 MediaSessionService gives the notification, the lock screen and the Bluetooth buttons.',
      'Voice uses the on-device SpeechRecognizer, and sherpa-onnx spots the Hey Lumi wake phrase. Guitar Upscale opens through an Android VIEW link.',
      'The online module calls MusicBrainz and Wikidata, and YouTube through yt-dlp, in the GitHub APK only.',
    ],
    reliability: [
      'The player saves its position every 5 seconds, on pause, on stop and on exit, so a crash loses seconds.',
      'ScanWorker runs on WorkManager for a new folder, at app start and daily on Wi-Fi, and lookups run slowly on one worker thread.',
      'A silent Bluetooth device sends the sound back to the speaker.',
    ],
    security: [
      'No account and no server of its own. Names and tags stay on the device.',
      'The NAS list with its passwords sits in nas.xml, which Android backup leaves out.',
      'SponsorBlock gets only a hash prefix of the YouTube id. The wake microphone runs as a foreground service.',
    ],
    performance: [
      'libVLC plays each file directly, and a Media3 player wraps it for audio, so one engine serves video and music.',
      'LoudnessGate feeds the keyword model only loud frames and the half second before them, so a quiet room skips it.',
      'Covers decode at their size with a cache, and the word index lists each word once with its books.',
    ],
    operations: [
      'A push to main starts Checks and Release side by side. Release signs the APK and publishes it once Checks pass.',
      'Each build runner keeps its Gradle state, so Gradle rebuilds only what changed. The release list keeps the newest 3.',
      'The APK updates from GitHub Releases at launch. The Play bundle leaves out the updater and the online module.',
    ],
    tradeoffs: [
      'Native Kotlin with plain Views over Expo, because the player is a libVLC view driven by remote keys and focus.',
      'libVLC unmodified over Media3 ExoPlayer, for MKV tracks, SMB browsing and Windows-1251 subtitles, at the cost of an LGPL notice and a large APK.',
      'SMB through libVLC over a separate library, so no extra dependency, but a NAS listing gives no file size.',
      'One Pro purchase over a subscription per app, so one check, Entitled.pro(), gates every screen.',
    ],
  },
  features: {
    'Direct folder browsing and playback':
      'USB folders open through the Android file system, and libVLC browses the SMB shares. The saved NAS list stays on the device, out of Android backup.',
    Resume:
      'The player saves each position to SQLite every 5 seconds and on exit. The file list reads the same table for the bar under each file.',
    'Subtitles and audio':
      'libVLC lists the embedded tracks and the subtitle files in the folder. Text subtitles read as UTF-8, or as Windows-1251 when they are not.',
    Controls:
      'The player drives libVLC for the skips and the speed. A queue module keeps the play order, shuffle and repeat.',
    Updates:
      'At launch the APK reads the newest release on GitHub and downloads a newer APK. The Android installer then asks the person to confirm.',
    Ads: 'AdMob shows the banner on a phone after Google’s consent form. One check hides it after a Remove ads or Pro purchase, and a TV shows none.',
    Languages:
      'Android string resources hold the 9 languages. The AppCompat language API applies the pick from Settings, or the device language.',
    'Touch on a phone':
      'A gesture layer over the video turns taps and drags into skips, scrubs, brightness and volume. The TV remote passes over that layer.',
    'Panel buttons':
      'The picked set stays in the player preferences on the device. The player builds its button row from that set, and libVLC scales the picture.',
    'Sponsor skip':
      'The player reads the SponsorBlock chapters in the file, or asks the SponsorBlock API by a hash of the video ID. libVLC then jumps over each segment.',
    'Phone speaker':
      'A silent audio track that prefers the built-in speaker pulls the libVLC sound with it. A check each second sends a silent Bluetooth back to the speaker.',
    Look: 'Plain Android Views built in code share one set of colours, type and the focus pill. The wordmark uses Instrument Serif.',
    'Music library':
      'A WorkManager job walks each folder and reads the tags through libVLC. The songs go into SQLite on the device, out of Android backup.',
    'Music player':
      'A Media3 session plays the songs over libVLC with no video. It draws the notification and the lock screen controls, and the bar follows it on each screen.',
    'MusicBrainz and YouTube':
      'MusicBrainz names the songs, artists and albums. yt-dlp runs in Python through Chaquopy and plays their sound from YouTube, in the GitHub APK.',
    Audiobooks:
      'A scan groups the audio files into books from the OPF file, the tags and the folder names. Wikidata names the author, and SQLite keeps the place in each book.',
    'Video library':
      'The scan keeps only the path of each video in SQLite. A parser reads the show, season and episode from the names, and Wikidata adds their other names. The phone reads and writes the film facts of the LG TV in a file beside the films on the NAS, over SMB with smbj.',
    'Find tabs':
      'The player bar sends an Android link with the artist and title to Guitar Upscale. The button shows only when Android finds that app.',
    'Google Play build':
      'A second build type drops the self-updater, all files access and the online module. Google Play then updates it.',
    'Voice commands':
      'sherpa-onnx hears Hey Lumi on the phone, and Android speech recognition takes the command. A matcher finds the song, book or video, and text to speech answers.',
    'Online music':
      'The online module runs yt-dlp in Python through Chaquopy. MusicBrainz names the songs and YouTube gives the sound, in the GitHub APK on a 64-bit phone.',
    'Lumiere Pro':
      'Google Play Billing sells one Pro product, and the app asks Google Play at each start. One check in the app opens the voice features and hides the banner.',
    'LG webOS app':
      "A web page in TypeScript plays through the TV's own video player. A Node service in the same webOS package lists USB sticks and the NAS over WebDAV, and streams the files to the page.",
    'Optional library setup and NAS finder':
      "NasFind knocks on port 445 across the TV's /24 network and asks NetBIOS for each name. The login lists the shares through libVLC, and Library folders keeps a kind per folder in SharedPreferences.",
    'Windows and Mac app':
      'Electron runs the webOS page and its Node service unchanged. The page loads from its own lumiere:// origin, and the service lists the home folder and drives in place of USB sticks.',
    'Continue Watching':
      'Both apps build the rows from the saved places, newest first, up to 20. A place at 95% counts as watched, and a watched episode gives way to the next one.',
    'Film look':
      "A grain layer drawn above the video costs the decoder nothing, so HDR and hardware decoding stay. On Android 12 and newer the player passes the film's frame rate to Surface.setFrameRate.",
    'Caught songs':
      'A receiver in the GitHub APK checks that SongCatcher sent the catch, then saves it in liked-songs.db. A song the folders hold points at its file, and another keeps its YouTube address.',
    'Titles of films, series and books':
      'The film lookup asks Wikidata for the Russian and English title and the year. One function per app builds the line: Titles.label on Android, titleLine on webOS.',
    'Library scan':
      'Each library folder is a job with a phase. One function turns the jobs into the share done and the time left: ScanProgress.kt on Android and scan-progress.ts on webOS, with the same tests. Folders group by device, and 3 groups run at once.',
  },
};

export default arch;
