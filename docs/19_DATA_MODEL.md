# 19 — Data Model

## Purpose

This document defines the data architecture of the website.

It specifies every entity, relationship, field, and content structure used by the application.

The data model should remain clean, scalable, and independent from the visual design.

The frontend defines presentation.

The CMS defines content.

---

# Entity Overview

The project consists of the following entities:

```text
Projects
Categories
Media
Pages
Team Members
Navigation
Site Settings
Contact Information
SEO
Users
```

Relationships between entities should remain simple and explicit.

---

# Entity Relationship Diagram

```text
Category
    │
    │ 1 → N
    ▼
Projects
    │
    ├────────► Media (Gallery)
    │
    ├────────► Cover Image
    │
    └────────► SEO

Pages
    │
    └────────► SEO

Site Settings
    │
    └────────► SEO

Navigation

Contact Information

Team Members

Users
```

---

# Projects

The Projects collection is the primary content type.

Each project represents one architectural or interior design project.

Required fields:

```text
id
title
slug
category
coverImage
published
```

Recommended fields:

```text
title
slug
category
location
country
year
status
services
area
client
photographer
coverImage
gallery
concept
materials
credits
featured
published
order
seo
createdAt
updatedAt
```

---

# Project Slug

Every project must have a unique slug.

Example:

```text
minimal-villa
```

URL:

```text
/work/minimal-villa
```

---

# Category

Projects belong to one category.

Examples:

```text
Residential
Commercial
Hospitality
Interior
Architecture
```

Relationship:

```text
Category

↓

Projects
```

---

# Gallery

A project contains multiple gallery images.

Gallery item:

```text
Image

Caption

Alt Text

Orientation

Order
```

Gallery order should be editable.

---

# Services

Projects may reference one or more services.

Examples:

```text
Architecture

Interior Design

Master Planning

Furniture Design

Landscape
```

---

# SEO

Every major entity should support SEO.

Fields:

```text
title

description

image

canonical

keywords
```

---

# Categories

Fields:

```text
title

slug

description

order
```

Relationship:

```text
One Category

↓

Many Projects
```

---

# Media

The Media collection stores uploaded assets.

Fields:

```text
filename

alt

caption

width

height

mimeType

filesize

orientation

photographer
```

Media should remain reusable.

Do not duplicate uploads.

---

# Team Members

Fields:

```text
name

role

photo

bio

linkedin

order

published
```

---

# Pages

Pages are editable through Payload.

Supported pages:

```text
Studio

Contact
```

Home is primarily driven by structured data and featured projects rather than free-form content.

---

# Navigation

Fields:

```text
label

url

order

visible
```

Navigation should remain minimal.

---

# Site Settings

Fields:

```text
siteName

tagline

defaultSEO

logo

favicon

socialLinks
```

---

# Contact Information

Fields:

```text
email

phone

address

googleMaps

instagram

linkedin

behance

pinterest
```

---

# Users

Payload authentication users.

Roles:

```text
Admin

Editor
```

Permissions:

Admin

* full access

Editor

* content only

---

# Publishing Workflow

Every Project supports:

```text
Draft

↓

Published
```

Only published projects appear publicly.

---

# Featured Projects

Homepage queries:

```text
featured = true

published = true
```

Ordered by:

```text
order ASC
```

---

# Sorting

Recommended sorting:

Projects

↓

Order

↓

Year

↓

CreatedAt

---

# Localization

Version 1:

Single language.

Future:

Payload localization should support:

```text
English

Russian

Macedonian
```

without changing the schema.

---

# Validation Rules

Examples:

```text
Title

Required

Slug

Required
Unique

Category

Required

Cover Image

Required

Gallery

Minimum 3 images

Concept

Recommended

SEO Title

Optional

SEO Description

Optional
```

---

# API Principles

Frontend should never query unnecessary fields.

Create optimized queries for:

Home

↓

Work

↓

Project Detail

↓

Studio

↓

Contact

Avoid over-fetching.

---

# Type Generation

Payload should generate TypeScript types automatically.

Frontend should consume generated types instead of manually duplicating interfaces.

---

# Future Expansion

The data model should allow adding:

```text
Journal

Awards

Testimonials

Services

Partners

Careers

Multi-language

Search
```

without restructuring existing entities.

---

# Final Principle

The data model should remain stable even if the visual design changes.

Content is long-term.

Design evolves.

The schema should support both.
