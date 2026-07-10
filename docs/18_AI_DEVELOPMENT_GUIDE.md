# 18 — AI Development Guide

## Purpose

This document explains how AI agents should work on this project.

It ensures that every implementation follows the same architectural, design, and engineering standards.

This guide applies to:

* Codex
* Claude Code
* Cursor
* Gemini CLI
* any future AI coding assistant

---

# General Rule

The AI should never start coding immediately.

Before making changes, it should:

1. Understand the task.
2. Read the relevant documentation.
3. Understand the design intention.
4. Plan the implementation.
5. Implement.
6. Verify.
7. Refactor if necessary.

---

# Documentation First

Before implementing any feature, read the relevant documents.

Examples:

Building the Hero?

Read:

* Design Brief
* Visual Direction
* Motion System
* Component System
* Page Blueprints

Building Payload?

Read:

* CMS Architecture
* Project Structure
* Development Rules

Never implement features without context.

---

# Work Incrementally

Never generate the whole website in one step.

Implement one feature at a time.

Example:

Project Setup

↓

Header

↓

Menu

↓

Hero

↓

Selected Projects

↓

Studio Intro

↓

Footer

Each feature should be completed before starting the next.

---

# Respect Existing Architecture

Do not:

* move files without reason;
* rename folders arbitrarily;
* introduce new architectural patterns;
* duplicate components.

Reuse existing systems whenever possible.

---

# Component Guidelines

Before creating a component:

Check whether a similar component already exists.

Prefer extending existing components over creating new ones.

Every component should have one responsibility.

---

# Animation Guidelines

Do not invent new animation styles.

Always follow:

Motion System

Animations should use:

* GSAP
* ScrollTrigger
* Lenis

Avoid CSS animations for major interactions.

---

# CMS Guidelines

Payload controls content.

Frontend controls presentation.

Do not move presentation logic into Payload.

---

# Styling Guidelines

Follow the design system.

Do not introduce:

* random spacing;
* random colors;
* random typography;
* random shadows;
* random border radius.

Everything should come from the documented system.

---

# Code Quality

Generated code should be:

* readable;
* typed;
* modular;
* accessible;
* performant.

Avoid unnecessary abstraction.

Avoid premature optimization.

---

# Performance

Always consider:

* bundle size;
* hydration;
* image optimization;
* lazy loading;
* animation cost.

Do not sacrifice performance for visual effects.

---

# Accessibility

Every new feature should work with:

* keyboard navigation;
* screen readers;
* reduced motion;
* sufficient color contrast.

Accessibility is not optional.

---

# Before Finishing a Task

Always verify:

* TypeScript
* ESLint
* Responsive behavior
* Accessibility
* Performance

Fix problems before considering the task complete.

---

# Communication Style

When responding, the AI should:

* explain what was changed;
* explain why it was changed;
* mention affected files;
* identify potential follow-up tasks.

Avoid unnecessary explanations unrelated to the task.

---

# If Requirements Are Unclear

Do not guess.

Instead:

* explain the ambiguity;
* propose options;
* recommend the best solution;
* wait for confirmation before implementing major architectural changes.

---

# Long-Term Thinking

Every implementation should make future work easier.

Avoid one-off solutions.

Build reusable systems.

---

# Definition of Done

A task is complete only if:

* it follows the documentation;
* it integrates cleanly with the project;
* it passes quality checks;
* it is maintainable;
* it does not introduce unnecessary complexity.

---

# Final Principle

The AI is an implementation partner.

It should not redesign the project.

It should faithfully implement the documented vision while maintaining high engineering quality.
