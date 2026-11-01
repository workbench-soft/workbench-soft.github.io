---
title: Memories Privacy Policy
description: Memories keeps your photos, their places and your NAS login on your phone and your NAS. Google AdMob shows the ads in the app.
last_modified_at: 2026-10-31
---

# Memories Privacy Policy

Last updated: 31 October 2026

Memories shows "on this day" photo memories from your own NAS. The app
sends no data to the developer. Your photos, their places and your NAS
login stay on your phone and your NAS. The ads in the app come from
Google AdMob, which collects the data listed under "Ads".

## What the app stores, and where

- **Photos and videos** stay on your NAS. The app streams them over your
  network and keeps a thumbnail cache on your phone.
- **The photo index** (capture dates, GPS points, place names) is a
  SQLite database on your phone. It leaves the phone only if you copy it
  yourself.
- **Your NAS login** is in the Android keystore on your phone.
- **Your home location** is saved on your phone. The app uses it to tell
  trips from home and to find your NAS.

## What the app does with phone permissions

- **Location** sets home on the first start, or when you set home again
  in Settings. Later the app compares the last known position with home,
  to pick the home or the remote NAS address. The position stays on the
  phone.
- **The DCIM folder** you grant in the Android folder picker. The app
  asks for no access to other files. Through this folder it reads the
  date and GPS point of your camera photos and uploads them to your NAS
  when you ask. Phone sort and auto sort rename the camera files and move
  them into dated folders inside DCIM. After an upload the app deletes
  the phone copy, unless you turn on "Keep a copy on the phone". Free up
  moves the phone copies to the trash or deletes them when you ask. You
  can take the grant back in Android Settings, Apps, Memories.
- **Notifications** are daily reminders planned on the phone. No server
  sends them.

## Network connections the app makes

- **Your NAS** over WebDAV, to list folders, read files and upload the
  photos you choose. On your home network this traffic may be plain
  http, as many NAS models serve it that way.
- **Your local network**, when you connect a NAS. The app looks for
  WebDAV and NAS services on your Wi-Fi with a local network scan
  (mDNS). The scan stays on your network.
- **OpenStreetMap tile servers** and **unpkg.com**, only when you open a
  map. The tile server sees the map area you view. unpkg.com serves the
  map code.
- **Google Maps**, only when you paste a short Google Maps link to set
  home. The app opens the link to read the point in it.
- **Google AdMob**, to load the ads. See "Ads" below.
- **GitHub**, only in the version installed from GitHub. On start it asks
  GitHub whether a newer version exists. The Google Play version gets its
  updates from Google Play.

GPS points from your photos are turned into place names by a database
inside the app. The app sends no photo location to the developer. A map
you open loads its area from OpenStreetMap.

## Ads

The app shows ads from Google AdMob: a banner under the photos on some
screens, and now and then a full screen ad when you close a photo.

- **What Google collects** the advertising ID of the phone, an
  approximate location from the IP address, how you interact with the
  ads, and crash and performance data from the ads code.
- **What for** to pick and measure ads, and to stop fraud. Google
  explains it at
  <https://policies.google.com/technologies/partner-sites>.
- **Your choice** in the EEA, the UK and Switzerland the app asks for
  consent before ads load. Settings, "Ad privacy choices" changes the
  answer. Elsewhere, Android Settings, Privacy, Ads resets or deletes the
  advertising ID.
- **No photo data** goes to Google. The ads code sees no photo, place
  name or NAS login.

## Remove ads purchase

Google Play handles the Remove ads payment. The app asks Google Play
whether you own it and gets a yes or a no. No card, account or payment
data reaches the app or the developer.

## Analytics, accounts

The app has no analytics of its own and no user accounts.

## Deleting your data

Uninstall the app, or clear its storage in Android Settings, Apps,
Memories, Storage. Either removes the photo index, your home location,
your NAS login and the thumbnails from the phone. The photos on your NAS
stay there, with you.

## Children

The app is not meant for children, and it doesn't knowingly collect
data from them.

## This website

This website counts visits with Cloudflare Web Analytics. It sets no
cookies and keeps no data that tells one visitor from another. Read the
[Cloudflare privacy policy](https://www.cloudflare.com/privacypolicy/).
The app sends no data to Cloudflare.

## Contact

Email <workbench.soft@gmail.com>.
