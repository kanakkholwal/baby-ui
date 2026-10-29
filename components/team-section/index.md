---
title: Team Section
description: "The people behind a product as round faces in a ruled grid, portrait cards, or rows with links, grouped by team if you like."
component: team-section
category: blocks
tags: [team, about, marketing]
---

Put one `TeamSectionMember` per person in a `TeamSectionList`; wrap lists in
`TeamSectionGroup` with a `TeamSectionGroupTitle` to split by department.

- `TeamSectionMemberAvatar` picks its size and shape from the variant and shows initials until
  the photo loads.
- `TeamSectionMemberLink` renders an icon button; give it a `label` that names the destination.
