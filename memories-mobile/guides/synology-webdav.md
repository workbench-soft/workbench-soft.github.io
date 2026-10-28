---
layout: guide
title: How to turn on WebDAV on a Synology NAS
description: Install WebDAV Server in DSM, turn on HTTP on port 5005, give your user access to the photo folder and open it from an Android phone.
date: 2026-10-27
last_modified_at: 2026-10-27
nav_order: 2
seo:
  type: Article
---

# How to turn on WebDAV on a Synology NAS

Install the WebDAV Server package from Package Center in DSM, open it and tick "Enable HTTP" on port 5005. Then give your user read and write rights on the photo folder, and an Android app can open it over WebDAV.

WebDAV is file access over plain HTTP, the same protocol a web page uses. Memories reads your photos over it, so the steps below are the whole NAS setup for the app.

## Turn WebDAV on

1. Log in to DSM in a browser as an administrator.
2. Open Package Center, search for WebDAV Server and press Install.
3. Open WebDAV Server from the main menu.
4. In Settings, tick "Enable HTTP". The port is 5005.
5. Press Apply.

HTTPS runs on port 5006 when you tick "Enable HTTPS" as well. The ports come from the Synology help page [WebDAV Server](https://kb.synology.com/en-global/DSM/help/WebDAV/webdav_desc).

## Give your user access to the photo folder

1. Open Control Panel, Shared Folder.
2. Pick the folder that holds your photos, such as `photo`, and press Edit.
3. Open the Permissions tab and tick Read/Write for your user. Read only lets you look at photos, and an upload from the phone then fails.
4. Press Save.

The Synology help page [Shared Folder Permissions](https://kb.synology.com/en-global/DSM/help/DSM/AdminCenter/file_share_privilege) explains each right.

## The WebDAV address and path

The address is the NAS IP, the port, then the shared folder name:

```text
http://192.168.1.120:5005/photo
```

- **IP** DSM shows it in Control Panel, Network, Network Interface. Your router lists it too.
- **Port** 5005 for HTTP, unless you changed it in WebDAV Server.
- **Path** the name of the shared folder. A folder inside it goes after a slash: `/photo/Family`.

Memories finds the address on its own. It lists the NAS among the devices on your Wi-Fi and tries ports 80, 8081, 5005 and 5000. Type the address only when the NAS doesn't show up, or when WebDAV runs on another port.

## HTTP or HTTPS?

At home, HTTP on 5005 is enough: the photos stay inside your Wi-Fi. Away from home, open the NAS through Tailscale rather than a router port. Tailscale encrypts the link between the phone and the NAS, and the NAS stays closed to the internet. [NAS photos away from home](nas-photos-away-from-home) shows the setup.

## When Synology WebDAV is not working

| What you see                      | Fix                                                                                                                          |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| The app can't find the NAS        | Check "Enable HTTP" is ticked in WebDAV Server, then type the address with port 5005. The phone has to be on the same Wi-Fi. |
| The login fails                   | Log in to DSM in a browser with the same user to check the password.                                                         |
| The folder is missing             | The user lacks rights on it. Tick Read/Write in the folder's Permissions tab.                                                |
| Photos open, and the upload fails | The user has Read only. Tick Read/Write.                                                                                     |
| It works at home only             | The NAS address is local. See [NAS photos away from home](nas-photos-away-from-home).                                        |

## Next

1. [Download Memories]({{ site.download_url }}) and open it on your Android phone.
2. Pick the NAS, log in with the user from above and open the photo folder.
3. The phone indexes the folder in the background. [On this day photos from your NAS](on-this-day-photos-from-nas) explains what it shows next.
