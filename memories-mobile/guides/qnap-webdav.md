---
layout: guide
title: How to turn on WebDAV on a QNAP NAS
description: Turn on WebDAV in QTS, give your user access to the photo folder, find the WebDAV address and port, and fix the usual login and folder errors.
date: 2025-10-27
last_modified_at: 2025-10-27
nav_order: 1
seo:
  type: Article
---

# How to turn on WebDAV on a QNAP NAS

Open Control Panel in QTS, then Network & File Services, Win/Mac/NFS/WebDAV, WebDAV, and tick "Enable WebDAV". Then give your user read and write rights on the photo folder, and any WebDAV app can open it.

WebDAV is file access over plain HTTP, the same protocol a web page uses. Memories reads your photos over it, so the steps below are the whole NAS setup for the app.

## Turn WebDAV on

1. Log in to QTS in a browser as an administrator.
2. Open Control Panel, Network & File Services, Win/Mac/NFS/WebDAV, then the WebDAV tab. On QTS 4.5 it sits in Control Panel, Applications, Web Server, WebDAV.
3. Tick "Enable WebDAV".
4. Pick "Shared folder permission". WebDAV then follows the rights each folder already has.
5. Leave the port as it is, or set HTTP port 8081.
6. Press Apply.

The steps follow the QNAP guide [Configuring WebDAV Settings](https://docs.qnap.com/operating-system/qts/5.0.x/en-us/configuring-webdav-settings-CDDF133D.html) for QTS 5.

## Give your user access to the photo folder

1. Open Control Panel, Privilege, Shared Folders.
2. Find the photo folder, such as `Multimedia`. Press the "Edit Shared Folder Permission" icon in its Action column.
3. Tick RW (read and write) for your user. RO lets you look at photos, and an upload from the phone then fails.
4. Press Apply.
5. Open Control Panel, Privilege, Users. Press "Edit Application Privilege" for your user and check that WebDAV is allowed.

Picked "WebDAV permission" in step 4 above? Then each folder has a second list of rights for WebDAV. In the "Edit Shared Folder Permission" window, switch "Select permission type" to "WebDAV access" and tick RW for your user there.

## The WebDAV address and path

The address is the NAS IP, the port, then the shared folder name:

```text
http://192.168.1.110:8081/Multimedia
```

- **IP** QTS shows it in Control Panel, Network & Virtual Switch. Your router lists it too.
- **Port** the one from step 5 of the first list.
- **Path** the name of the shared folder. A folder inside it goes after a slash: `/Multimedia/Photos`.

Memories finds the address on its own. It lists the NAS among the devices on your Wi-Fi and tries ports 80, 8081, 5005 and 5000. Type the address only when the NAS doesn't show up, or when WebDAV runs on another port.

## When QNAP WebDAV is not working

| What you see                      | Fix                                                                                                                     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| The app can't find the NAS        | Check "Enable WebDAV" is ticked, then type the address with its port. The phone has to be on the same Wi-Fi as the NAS. |
| The login fails                   | Check WebDAV is allowed in the user's application privileges, step 5 of the second list.                                |
| The folder is missing or empty    | With "WebDAV permission" picked, the folder needs RW in its "WebDAV access" list as well.                               |
| Photos open, and the upload fails | The user has RO. Tick RW on the folder.                                                                                 |
| It works at home only             | The NAS address is local. See [NAS photos away from home](nas-photos-away-from-home).                                   |

## Next

1. [Download Memories]({{ site.download_url }}) and open it on your Android phone.
2. Pick the NAS, log in with the user from above and open the photo folder.
3. The phone indexes the folder in the background. [On this day photos from your NAS](on-this-day-photos-from-nas) explains what it shows next.
