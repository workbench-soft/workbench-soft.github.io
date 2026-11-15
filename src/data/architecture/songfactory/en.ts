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
  },
};

export default arch;
