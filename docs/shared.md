# Shared Documentation

## Purpose of `shared/`

The `shared/` folder contains definitions and constants used by both backend and frontend. It is the common contract between the two packages.

## Shared folders

- `shared/consts/` — application constants such as route paths, auth values, exercise values, etc.
- `shared/models/` — TypeScript models for entities like user, workout, exercise, meal, and program
- `shared/utils/` — small utilities such as `getTempId.ts`
- `shared/validations/` — shared validation schemas

## Why use shared files

- Keeps API and UI aligned on the same data shapes
- Reduces duplicate type definitions
- Ensures frontend and backend agree on business logic expectations

## When to update shared files

- Add a new entity type that both frontend and backend use
- Change a field on a shared entity or DTO
- Add or update validation rules used by both sides

## Example usage

- Backend controllers can import shared models and validations
- Frontend services can import shared models for request/response typing
- Route constants in shared files can be used by both frontend and backend when needed
