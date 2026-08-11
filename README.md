# YashHacks

Personal security-engineering portfolio for [yashhacks.com](https://yashhacks.com).

## Design

- Semantic HTML, CSS, and vanilla JavaScript
- Interactive local-only portfolio shell
- No frontend framework or runtime package dependencies
- No analytics, cookies, authentication, database, or server-side user data
- Responsive and keyboard accessible

## Security posture

The production deployment is configured with a restrictive Content Security Policy and browser security headers in `vercel.json`, including HSTS, `nosniff`, frame protection, referrer policy, permissions policy, COOP, and CORP.

The terminal treats visitor commands only as text. It does not use `innerHTML`, `eval`, dynamic script execution, arbitrary URL navigation, or server-side command execution. Input length is bounded and external destinations are allowlisted.

A responsible-disclosure contact is published at `/.well-known/security.txt`.

## Local development

Serve the repository with any static HTTP server and open `index.html`. Test the deployed site as well because response security headers are applied by Vercel.

## Content

Professional information and credential links are intentionally limited to public portfolio data. Employer-confidential architecture, vulnerabilities, and internal project details are not published.
