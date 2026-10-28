---
layout: guide
title: Move Android photos to a NAS in dated folders
description: Back up the Android camera folder to a QNAP or Synology NAS over WebDAV, sorted into year, place and day folders, then free up the phone.
date: 2026-10-27
last_modified_at: 2026-10-27
nav_order: 4
seo:
  type: Article
---

# Move Android photos to a NAS in dated folders

Memories, an Android app, copies the photos and videos in the phone's camera folder to your NAS over WebDAV. Each file lands in a folder for its year, place and day, and leaves the phone only once the NAS holds all of its bytes.

It works with any NAS that serves WebDAV. Set yours up with the [QNAP guide](qnap-webdav) or the [Synology guide](synology-webdav) first. The NAS user needs read and write rights on the photo folder.

## Where the photos go

The app reads the capture time and the GPS point from each file. It then builds the folder and the name from them:

```text
2024/Kyoto, Japan/03.15 - 03.17/2024-03-15 10-00-00 Kyoto, Japan (IMG_2) - Pixel 7.jpg
2024/No place/03.15/2024-03-15 10-00-00 (IMG_1) - Pixel 7.jpg
```

- **Year** the top folder.
- **Place** the town in your home country, or the town and the country abroad, such as `Sydney` or `Kyoto, Japan`. Photos without GPS go to `No place`.
- **Days** a run of days at one place shares a folder, such as `03.15 - 03.17`.
- **Name** the date and time first, so the files list in the order you took them. The camera's own name and the phone model stay in it.

A folder you named yourself, such as `03.15 - 03.17 Wedding`, keeps its name. The photos of those days join it.

## Move the photos

1. Open the Organize tab in Memories.
2. Press "Allow access to the photos on the phone". Android opens "All files access". Turn it on for Memories and go back.
3. The card "From the phone to the NAS" counts the photos that are only on the phone. Press "Move to the NAS".
4. Agree to remove the originals from the phone, or turn on "Keep a copy on the phone" first.

A bar shows the progress, the file under way and the time left. Swipe the app away and the upload goes on with a notification.

## Why a photo can't get lost

- **Full size first** a file leaves the phone only after the NAS reports its full size.
- **Same bytes twice** a file the NAS already holds counts as uploaded, and the NAS keeps one copy.
- **Phone trash** "Free up the phone" puts the files in the phone trash for 30 days. Turn off "Move to the trash" to delete them at once.

## Keep it going on its own

"Move new photos to the NAS on their own" is on from the start. The app then uploads the new camera photos every few hours, with the app closed. Settings, "Sync over mobile data" decides whether it may use mobile data. Off, it waits for Wi-Fi.

## Free up the phone after a copy

Kept a copy on the phone? The card "Free up the phone" finds the phone files the NAS already has. It reads each NAS copy in full and compares every byte with the phone file. A review screen shows each pair before anything goes.

## Sort the photos already on the NAS

The same Organize tab lists the NAS folders with unsorted photos. "Sort them all" moves them into the layout above. Files only move, and a file whose new folder already holds the same bytes shows once.

Away from home? The upload works through Tailscale too, see [NAS photos away from home](nas-photos-away-from-home).
