---
layout: guide
title: See your NAS photos away from home with Tailscale
description: Open the photos on a QNAP or Synology NAS from your Android phone anywhere, through Tailscale, with no open router port.
date: 2026-10-27
last_modified_at: 2026-10-27
nav_order: 5
seo:
  type: Article
---

# See your NAS photos away from home with Tailscale

Install Tailscale on the NAS and on the phone, sign both in to the same account, and the phone reaches the NAS from anywhere. The NAS stays closed to the internet, and no router port opens.

[Tailscale](https://tailscale.com) is a private network between your own devices. It encrypts the link between them, and the personal plan is free. Memories goes to the NAS directly at home, and switches to the Tailscale address on its own when you leave.

## On the NAS

1. Install Tailscale. On QNAP it is in App Center, on Synology in Package Center.
2. Open Tailscale from the NAS menu and press the login link. Sign in, or create an account with Google or another login.
3. Open the [Tailscale admin page](https://login.tailscale.com/admin/machines) and find the NAS. Open its `...` menu and pick "Disable key expiry". Without it the NAS drops out of Tailscale after 180 days.
4. Copy the NAS address there. It starts with `100.`, such as `100.101.102.103`.

Tailscale's own guides cover each NAS: [QNAP](https://tailscale.com/kb/1186/qnap) and [Synology](https://tailscale.com/kb/1187/synology). The 180 days come from its page on [key expiry](https://tailscale.com/kb/1129/key-expiry).

## On the phone

1. Install Tailscale from Google Play and sign in with the same account.
2. Turn Tailscale on. Android shows it as a VPN. It has to be on for the phone to reach the NAS away from home.
3. In Memories open Settings, NAS and sync, "NAS IP in Tailscale".
4. Type only the NAS IP from the Tailscale app, such as `100.101.102.103`. The app adds the port of the home address.
5. Press "Test this address", then "Apply".

## Check it works

Turn the phone's Wi-Fi off and open Settings, NAS and sync. The line under the buttons should say "the Tailscale address", and the photos should open.

## Mobile data

The first sync on mobile data asks whether it may use it. Settings, NAS and sync, "Sync over mobile data" changes the answer later. Off, the sync and the upload of phone photos wait for Wi-Fi. The photos you open still load: "Full photos over mobile data" decides whether they load in full or as a small preview.

## Why not open a router port?

A port forward puts the NAS login page on the internet, where bots try passwords all day. Tailscale lets in only the devices signed in to your account. Memories needs no change on the router.

## Not set up yet?

1. Turn on WebDAV: [QNAP](qnap-webdav) or [Synology](synology-webdav).
2. Install [Memories]({{ site.download_url }}) and connect at home first.
3. Add the Tailscale address as above.
