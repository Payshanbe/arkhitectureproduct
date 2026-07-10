# 03 — CMS Architecture

## Purpose

The website must include a CMS so the agency can manage content without editing code.

The CMS should allow the client to:

* add new projects;
* edit existing projects;
* delete or unpublish projects;
* upload and organize project images;
* choose featured projects for the homepage;
* edit studio information;
* edit contact information;
* manage basic SEO fields.

## Recommended CMS

Use Payload CMS.

Payload is a good fit because the project is already based on:

* Next.js
* React
* TypeScript
* dynamic project content
* image-heavy portfolio pages
* custom admin experience

The CMS should be integrated into the same Next.js application.

## Architecture

```txt
Next.js Application
│
├── Frontend Website
│   ├── Home
│   ├── Work
│   ├── Project Detail
│   ├── Studio
│   └── Contact
│
├── Payload CMS
│   ├── Admin Panel
│   ├── Collections
│   ├── Globals
│   ├── Media Library
│   └── API
│
└── Database
    └── PostgreSQL
```

## Main Collections

The CMS should include these collections:

```txt
Projects
Project Categories
Media
Pages
Team Members
Journal / Press — optional
```

## Globals

The CMS should include these global settings:

```txt
Site Settings
Contact Information
Navigation
SEO Defaults
Social Links
```

## Projects Collection

The Projects collection is the most important part of the CMS.

Fields:

```txt
title
slug
category
location
year
area
status
role
coverImage
galleryImages
shortDescription
conceptText
materialsText
featured
order
published
seoTitle
seoDescription
```

## Project Field Details

### title

Project name.

Example:

```txt
Casa Atrium
```

### slug

URL-friendly project identifier.

Example:

```txt
casa-atrium
```

Used for:

```txt
/work/casa-atrium
```

### category

Relationship to Project Categories.

Examples:

```txt
Residential
Commercial
Hospitality
Cultural
Interior
Architecture
```

### location

Project location.

Example:

```txt
Milan, Italy
```

### year

Project year.

Example:

```txt
2025
```

### area

Optional field.

Example:

```txt
240 m²
```

### status

Project status.

Examples:

```txt
Built
Concept
In Progress
Completed
```

### role

Studio role.

Examples:

```txt
Architecture
Interior Design
Full Scope
Concept Design
```

### coverImage

Main project image.

Used on:

* homepage selected works;
* work page;
* project detail hero;
* SEO image.

### galleryImages

Multiple project images.

Used on project detail pages.

Each image should support optional metadata:

```txt
image
caption
altText
orientation
```

### shortDescription

Short editorial project description.

Used on project cards or project intro.

### conceptText

Main project concept text.

Should be short, refined, and editorial.

### materialsText

Optional text about materials, atmosphere, light, or design approach.

### featured

Boolean.

Used to select projects for homepage.

### order

Number.

Used to manually control project order.

### published

Boolean.

If false, the project should not appear on the frontend.

### seoTitle

Custom SEO title.

### seoDescription

Custom SEO description.

## Project Categories Collection

Fields:

```txt
title
slug
description
order
```

Used for filtering projects on the Work page.

## Media Collection

The Media collection should support:

```txt
image upload
alt text
caption
width
height
focal point
```

Images should be optimized and served through Next.js where possible.

## Pages Collection

Optional but useful for editable static pages.

Can include:

```txt
Home
Studio
Contact
```

Fields can be modular, but should remain controlled.

Avoid giving the client too much freedom to break the design.

## Team Members Collection

Optional.

Fields:

```txt
name
role
photo
bio
order
published
```

## Site Settings Global

Fields:

```txt
siteName
siteDescription
logo
defaultSeoTitle
defaultSeoDescription
defaultSeoImage
```

## Contact Information Global

Fields:

```txt
email
phone
address
googleMapUrl
instagram
linkedin
behance
pinterest
```

## Navigation Global

Fields:

```txt
label
url
order
visible
```

Keep navigation minimal.

Recommended frontend navigation:

```txt
Home
Work
Studio
Contact
```

## SEO Defaults Global

Fields:

```txt
defaultTitle
titleTemplate
defaultDescription
defaultImage
```

## Publishing Rules

Projects should only appear on the public website if:

```txt
published = true
```

Homepage selected works should only show projects where:

```txt
featured = true
published = true
```

Project ordering should follow:

```txt
order ASC
year DESC
createdAt DESC
```

## Frontend Data Usage

### Home Page

Uses:

```txt
featured projects
site settings
studio intro content
contact information
```

### Work Page

Uses:

```txt
all published projects
project categories
filters
```

### Project Detail Page

Uses:

```txt
single project by slug
gallery images
metadata
next project
```

### Studio Page

Uses:

```txt
studio page content
team members
contact information
```

### Contact Page

Uses:

```txt
contact information
social links
```

## Admin Experience

The admin panel should be clean and simple.

The client should not need to understand code.

The most important admin actions are:

1. Add project
2. Upload images
3. Edit project text
4. Mark project as featured
5. Publish or unpublish project
6. Edit contact information

## Design Control

The CMS should not allow the client to destroy the visual system.

Avoid fully free page builders.

Use controlled fields and repeatable blocks instead.

The frontend should control:

* layout;
* typography;
* animation;
* spacing;
* image behavior;
* page transitions.

The CMS should control:

* content;
* images;
* metadata;
* ordering;
* publishing.

## Technical Notes

Use:

```txt
Payload CMS
Next.js App Router
TypeScript
PostgreSQL
Media upload
Access control
Draft / published workflow if needed
```

Payload should be configured so that:

* frontend can fetch published content;
* admin users can manage all content;
* media files are optimized;
* slugs are unique;
* project pages are generated dynamically;
* SEO metadata is generated from CMS fields.

## Access Control

At minimum:

```txt
Admin users can create, update, delete content.
Public users can only read published content.
Draft/unpublished content should not be visible publicly.
```

## Future Expansion

The CMS should be flexible enough to add later:

```txt
Journal
Press
Awards
Services
Testimonials
Multilingual content
```

But the first version should stay focused on:

```txt
Projects
Studio
Contact
SEO
Media
```

## Main Rule

Payload should support the website.

It should not define the design.

The frontend design system remains the source of truth for how content looks and moves.
