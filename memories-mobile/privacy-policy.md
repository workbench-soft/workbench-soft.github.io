---
title: Memories Privacy Policy
description: Memories keeps your photos, their places and your NAS login on your phone and your NAS. Google AdMob shows the ads in the app.
last_modified_at: 2026-10-27
---

# Memories Privacy Policy

Last updated: 27 October 2026

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
- **All files access** lets the app read the date and GPS point of the
  photos in your camera folder. It uploads them to your NAS when you ask.
  It moves the phone copies to the trash or deletes them when you ask.
- **Notifications** are daily reminders planned on the phone. No server
  sends them.

## Network connections the app makes

- **Your NAS** over WebDAV, to list folders, read files and upload the
  photos you choose.
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
inside the app. No photo location leaves the phone.

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

## Analytics, accounts

The app has no analytics of its own and no user accounts.

## This website

This website counts visits with Cloudflare Web Analytics. It sets no
cookies and keeps no data that tells one visitor from another. Read the
[Cloudflare privacy policy](https://www.cloudflare.com/privacypolicy/).
The app sends no data to Cloudflare.

## Contact

Email workbench.soft@gmail.com.
