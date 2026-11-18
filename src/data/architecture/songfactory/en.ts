import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'A Python command line tool runs on the Windows PC with ffmpeg and the local GPU. It turns a theme folder into a YouTube video, and a desktop window or Archon drives it.',
  parts: [
    { name: 'Python and uv', role: 'the songfactory command and its modules, run through uv.' },
    { name: 'ffmpeg', role: 'mixes the songs, loops the clip and encodes on the GPU with NVENC.' },
    { name: 'numpy and Apollo', role: 'rebuild the top band a lossy encoder cut off.' },
    { name: 'Claude CLI', role: 'writes the topics, the lyrics and the YouTube text on the Claude subscription.' },
    { name: 'Playwright', role: 'drives the Suno site in Chromium to make and download the songs.' },
    { name: 'ComfyUI', role: 'draws the background clip on the local GPU from a prompt.' },
    { name: 'YouTube Data API', role: 'uploads the video with its thumbnail, the AI label and the publish time.' },
    { name: 'tkinter', role: 'the desktop window that cleans or enhances the picked songs in 9 languages.' },
  ],
  flow: [
    'Songs come from a theme folder or from the Suno tile.',
    'ffmpeg cleans each song and keeps the original.',
    'ffmpeg joins the songs with crossfades over a looping clip.',
    'The build writes the chapters, the description and the thumbnail.',
    'The YouTube Data API uploads the video with a publish time.',
  ],
  links: [
    { to: 'archon', text: "Archon's Songs tab draws the tiles and runs each one through the songfactory command." },
    { to: 'Suno', text: 'Suno makes the songs, and Playwright downloads them.' },
    { to: 'YouTube', text: 'The videos go up through the YouTube Data API, about 6 a day.' },
    { to: 'Claude', text: 'The Claude CLI writes the text on the subscription with no API account.' },
  ],
  design: {
    scale: [
      'One creator on one Windows PC with a GPU. The daily run uploads about 6 videos at most.',
      'Each upload costs about 1,600 of the 10,000 daily YouTube quota units, and that quota sets the ceiling.',
      'The local GPU makes about 5 s of video at 720p per run, so each background is a looping clip.',
    ],
    data: [
      'State is files in the theme folder: theme.toml holds the settings, out/upload.json marks a theme as done, and out/claude.json keeps the text Claude wrote.',
      'A project keeps its ten tiles in pipeline.json, each with kind, enabled and params.',
      'Cleaned songs go to out/clean/ as FLAC, and the originals stay. Secrets sit in a folder outside the repo.',
    ],
    interfaces: [
      'The CLI has bg, clean, build, upload, publish, run, enhance, clips and tile commands. The Archon Songs tab reads songfactory project and runs songfactory tile.',
      'ffmpeg and ffprobe run as subprocesses, and ComfyUI gets workflows/loop.json over HTTP with the prompt and seed filled in.',
      'upload.py calls videos.insert and thumbnails.set of the YouTube Data API after an OAuth desktop sign in.',
      'progress.py prints step, file i/n and progress NN% lines that the launcher turns into bars.',
    ],
    reliability: [
      "upload.json is written as soon as YouTube returns the video id, so a failed thumbnail doesn't cause a second upload.",
      'run skips folders that start with _ or a dot, and goes on to the next theme when one fails.',
      'claude.py is optional. A missing CLI or a failed call prints one line, and the theme goes on with the folder name as its title.',
      'A tile turned off passes its input on, and an audio tile takes the files of the closest earlier tile that ran.',
    ],
    security: [
      'The YouTube OAuth token and the other secrets sit in a folder outside the repo.',
      'claude -p runs with the API key variable removed, so it bills the signed in subscription and no API account.',
      'Uploads set containsSyntheticMedia, and they stay private until Google audits the project.',
    ],
    performance: [
      'h264_nvenc encodes on the GPU when the PC has one, and libx264 takes over otherwise.',
      'The clip loops with -stream_loop and ping-pong, so a 5 s clip covers a long video with no long render.',
      'Cleanup is one ffmpeg call with a fixed gain, highpass, afftdn and a dynamic 7 kHz cut, with no neural model.',
      'A batch enhance runs through one CLI process, so it writes one compare.html for every song.',
    ],
    operations: [
      'A Windows scheduled task runs mise run daily at 03:00 on the PC that holds the songs, the token and the GPU.',
      'checks.yml runs lint, tests and uv build on the self-hosted Windows runner at each push to main.',
      'release.yml builds the wheel and the sdist beside Checks, and release-gate.sh publishes once Checks pass. A failed Checks run cancels the build.',
      'mise run doctor prints one line per prerequisite, ok or MISSING, and as JSON for the launcher.',
    ],
    tradeoffs: [
      'ffmpeg on the command line over a Python video library, so mixing, looping and the NVENC encode sit in one tool, but filter graphs are strings and a typo shows at run time.',
      'A short looping clip over a clip as long as the songs, since the GPU makes about 5 s per run.',
      'Plain files per theme over a database, so one file answers whether a theme was uploaded, but moving a folder loses its link to the upload.',
      'The local Task Scheduler over a CI cron job, since songs and token sit outside git, but the PC has to be on at 03:00.',
    ],
  },
  features: {
    'Audio workbench':
      'A tkinter window runs the clean or enhance command over the picked files. A name check stops the batch before two outputs collide.',
    'Tile pipeline':
      'Each project keeps its 10 tiles and their settings in a JSON file. A runner feeds each tile the output of the one before, and Archon draws the tiles.',
    'Per-song videos':
      'The clips module reuses the theme, cleanup and encoder to make one looping video per song. ffmpeg joins them with straight cuts on request.',
    'Install and check the setup':
      'A PowerShell script installs mise, the pinned tools and the packages. A doctor module checks each prerequisite and prints what to fix.',
    'Long video from a playlist':
      'ffmpeg mixes the songs with a crossfade and repeats the clip to the audio length. The encode runs on NVENC when the GPU has it.',
    'Cleanup of AI artifacts':
      'One ffmpeg filter chain sets a fixed gain and takes out rumble, hiss and loud shimmer. The cleaned copy goes to a FLAC file beside the original.',
    'Enhance a song':
      'numpy rebuilds the top band a lossy encoder cut off from the band below it. The Apollo model on the GPU can do the job instead, and a page shows both spectrograms.',
    'Seamless loop':
      'ffmpeg plays the clip forward and then backward before it loops. The jump between the last and the first frame goes away.',
    'Chapters and thumbnail':
      'The chapter times come from the song lengths minus the crossfades. Pillow writes the title on a frame of the clip.',
    'Scheduled upload':
      'The YouTube Data API uploads the video with the AI label and a publish time. Windows Task Scheduler runs the daily build at 03:00.',
    'Text from Claude':
      'The Claude CLI writes the empty title, description and tags from the song names. A file in the theme folder keeps the answer for the next build.',
    'Background from ComfyUI':
      'The tool sends the prompt to a ComfyUI workflow on the local GPU. The clip it returns becomes the looping background.',
    'ComfyStack video and robot pictures':
      'songfactory workflows sync presses the download buttons of comfystack.online in Playwright and keeps each job in workflows/comfystack/, in UI and API format. comfy_graph.py fills in the picture, the song piece and the prompt by node type, and pictures.py asks the aspirationstyle robot for a cover, moving to the next site on a 429 or 502.',
  },
};

export default arch;
