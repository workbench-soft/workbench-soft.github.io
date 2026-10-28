---
layout: guide
title: On this day photos from your QNAP or Synology NAS
description: See the photos you took on this day in past years, straight from your own NAS, with a daily reminder, the places and the trips abroad.
date: 2026-10-27
last_modified_at: 2026-10-27
nav_order: 3
seo:
  type: Article
---

# On this day photos from your QNAP or Synology NAS

Memories, an Android app, shows the photos and videos you took on today's date in each earlier year. It reads them straight from your NAS over WebDAV, and a reminder each day tells you what it found, such as "3 years ago in Japan".

The photos stay on the NAS. The phone keeps a small index of dates and places, and loads each photo from the NAS when you open it.

## What you need

- **A NAS that serves WebDAV** such as QNAP, Synology or TrueNAS. Set it up with the [QNAP guide](qnap-webdav) or the [Synology guide](synology-webdav).
- **An Android phone** with [Memories]({{ site.download_url }}) on it.
- **Photos in any folder layout** the app finds the date of each file on its own.

## How the app finds the date of each photo

Folder names don't matter. The phone reads the first bytes of each file, where the camera wrote the capture time and the GPS point.

- **Photos** JPEG, HEIC, PNG, TIFF and WebP.
- **Videos** MP4, MOV, M4V, AVI, MTS, M2TS and 3GP. Videos stream from the NAS.
- **No date inside** the app reads it from the file name, such as `IMG_20230415_123456.jpg` or `2023-04-15 12.34.56.jpg`.

Only those first bytes cross the network, and the index fills in the background. A library of hundreds of thousands of files indexes faster with the optional indexer on the NAS, which runs in a container.

## What the Today tab shows

1. A chip for each year with photos on this date. Abroad, the chip shows the country.
2. The photos of the picked year, in runs by place: "Kyoto, Japan", then "Osaka, Japan".
3. A link to the whole trip when you were abroad that day, with its route on a map.

Day, Week and Month widen the view to the week or the month around the date. A tap on the date picks any other day.

## The daily reminder

A notification comes at the time you pick, such as 9:00. The app picks the year it names:

1. A year when you were abroad on this day wins.
2. Otherwise last year shows on half the days.
3. Otherwise a random year with photos on this date.

The app loads the reminder's photos ahead of time, so they open at once from the notification. A day without photos gets no reminder.

## Places without a cloud service

A GPS point turns into a place name such as "Kyoto, Japan" from a database of [GeoNames](https://www.geonames.org/) places inside the app. No photo location leaves the phone, and the app sends no photo data to the developer. The [privacy policy](../privacy-policy) lists what the app stores.

## Start

1. Turn on WebDAV: [QNAP](qnap-webdav) or [Synology](synology-webdav).
2. Install [Memories]({{ site.download_url }}) and pick the photo folder.
3. Pick the reminder time in Settings.
