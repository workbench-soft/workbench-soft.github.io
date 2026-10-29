---
title: Guides
description: Set up WebDAV on a QNAP or Synology NAS, see on this day photos, back up Android photos to the NAS and open them away from home.
last_modified_at: 2025-10-27
---

# Guides

Step by step setup for Memories and your NAS.

{% assign guides = site.pages | where: "layout", "guide" | sort: "nav_order" %}
{% for guide in guides %}

## [{{ guide.title }}]({{ guide.url | relative_url }})

{{ guide.description }}
{% endfor %}
