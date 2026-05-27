# Authentication Guards & Passport JWT Strategy in NestJS

A ground-up reference based on the ClipSynkJS API implementation.

---

## Table of Contents

1. [Overview](#overview)
2. [How NestJS Guards Work](#how-nestjs-guards-work)
3. [How Passport integrates with NestJS](#how-passport-integrates-with-nestjs)
4. [Setting up Passport JWT from Scratch](#setting-up-passport-jwt-from-scratch)
   - [Install dependencies](#1-install-dependencies)
   - [Create the JWT Strategy](#2-create-the-jwt-strategy)
   - [Create the JWT AuthGuard](#3-create-the-jwt-authguard)
   - [Register everything in the Module](#4-register-everything-in-the-module)
   - [Apply the guard to a route](#5-apply-the-guard-to-a-route)
5. [How the pieces connect (the implicit link)](#how-the-pieces-connect-the-implicit-link)
6. [Renaming the strategy](#renaming-the-strategy)
7. [Custom AuthGuard (without Passport)](#custom-authguard-without-passport)
8. [Skipping authentication on specific routes](#skipping-authentication-on-specific-routes)
9. [Scoped / purpose-specific guards](#scoped--purpose-specific-guards)
10. [Token delivery: Header vs Cookie](#token-delivery-header-vs-cookie)
11. [What lands on `req.user`](#what-lands-on-requser)
12. [Full file reference](#full-file-reference)

---

## Overview

NestJS authentication is built on two complementary layers:

| Layer | Responsibility |
|---|---|
| **Guard** (`CanActivate`) | Decides whether a request is allowed to proceed |
| **Passport Strategy** | Knows *how* to extract and validate a credential (e.g. a JWT) |

When you use `@nestjs/passport`, the guard delegates the actual validation work to a registered strategy. The guard and the strategy are linked by a **string name** — not by a direct import.

---

## How NestJS Guards Work

A guard is a class that implements `CanActivate`. NestJS calls `canActivate()` before the route handler. If it returns `false` (or throws), the request is rejected with a 403 by default.

```ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class MyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // inspect request, return true to allow or false to deny
    return true;
  }
}
```

Guards are applied with the `@UseGuards()` decorator, either on a single route or on an entire controller:

```ts
@UseGuards(MyGuard)          // on a single route
@Controller('auth')
@UseGuards(MyGuard)          // on the entire controller
```

Guards run **after middleware** and **before interceptors, pipes, and the handler itself**.

---

## How Passport integrates with NestJS

`@nestjs/passport` provides a bridge between NestJS guards and the Passport.js ecosystem. The bridge has two parts:

- **`PassportStrategy(Strategy, name?)`** — a class mixin that wraps a Passport strategy and registers it under a name.
- **`AuthGuard(name)`** — a factory that returns a guard class which delegates to the named strategy.

The runtime flow when a request hits a `@UseGuards(AuthGuard('jwt'))` route:

```
Request
  → AuthGuard('jwt').canActivate()
      → Passport.authenticate('jwt')
          → looks up strategy registered as 'jwt'
              → JwtStrategy.validate(payload)
                  → returns user object
                      → attached to req.user
                          → route handler runs
```

---

## Setting up Passport JWT from Scratch

### 1. Install dependencies

```bash
npm install @nestjs/passport passport passport-jwt
npm install -D @types/passport-jwt
```

`passport-jwt` handles JWT extraction and verification. `@nestjs/passport` bridges Passport into NestJS.

---

### 2. Create the JWT Strategy

`src/auth/guards/auth.passport.strategy.ts`

```ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { appconfig } from 'src/utils/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // How to extract the JWT from the incoming request.
      // This example reads from an httpOnly cookie named 'access_token'.
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.access_token ?? null,
      ]),
      ignoreExpiration: false,
      secretOrKey: appconfig.auth.jwtSecret,
    });
  }

  // Called after passport-jwt has verified the token signature and expiry.
  // Whatever you return here is attached to req.user.
  async validate(payload: any) {
    return { id: payload.id, email: payload.email };
  }
}
```

**Key points:**

- `PassportStrategy(Strategy)` — `Strategy` is `passport-jwt`'s strategy class. It self-registers under the name `'jwt'`. This is the default name and is what links it to `AuthGuard('jwt')`.
- `jwtFromRequest` — tells `passport-jwt` where to look for the token. Common extractors:
  - `ExtractJwt.fromAuthHeaderAsBearerToken()` — reads `Authorization: Bearer <token>`
  - `ExtractJwt.fromExtractors([...])` — custom extractor array (used here to read from a cookie)
- `validate(payload)` — receives the already-decoded JWT payload. You can enrich it here (e.g. fetch the full user from DB). The return value becomes `req.user`.

---

### 3. Create the JWT AuthGuard

`src/auth/guards/auth.guard.jwt.ts`

```ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

This is the guard applied to routes. `AuthGuard('jwt')` is what tells Passport to use the strategy registered under `'jwt'`. The string must match the strategy name exactly.

Creating a named class (`JwtAuthGuard`) instead of using `AuthGuard('jwt')` directly is purely for readability and reusability.

---

### 4. Register everything in the Module

`src/auth/auth.module.ts`

```ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './guards/auth.passport.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // ... other imports
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,   // <-- this is what registers the strategy with Passport at runtime
  ],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
```

**Why `JwtStrategy` must be in `providers`:**

NestJS instantiates every class in `providers` through its DI container. When `JwtStrategy` is instantiated, its `super()` call (inside `PassportStrategy`) registers the strategy in Passport's internal global registry under the name `'jwt'`. Without this, `AuthGuard('jwt')` would fail at runtime because no strategy would be found under that name.

`PassportModule.register({ defaultStrategy: 'jwt' })` sets the fallback name used when `AuthGuard()` is called with no argument. It is optional if you always pass the name explicitly.

---

### 5. Apply the guard to a route

`src/auth/auth.controller.ts`

```ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/auth.guard.jwt';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: Request) {
    // req.user is populated by JwtStrategy.validate()
    return await this.authService.getMe((req as any).user);
  }
}
```

---

## How the pieces connect (the implicit link)

This is the part that is not obvious from reading the files.

```
auth.guard.jwt.ts          auth.passport.strategy.ts       auth.module.ts
──────────────────         ──────────────────────────       ──────────────
AuthGuard('jwt')    ←─────  PassportStrategy(Strategy)  ←── providers: [JwtStrategy]
       ↑                           ↑
   string key             'jwt' is passport-jwt's
   matches                hardcoded default name
   strategy name
```

There is **no import** between `JwtAuthGuard` and `JwtStrategy`. The connection is purely at runtime through Passport's strategy registry, keyed by the string `'jwt'`. The registry is populated when NestJS instantiates `JwtStrategy` as a provider.

---

## Renaming the strategy

If you want to use a name other than `'jwt'`, change exactly two places:

**Strategy — pass the name as the second argument to `PassportStrategy`:**
```ts
// Before
export class JwtStrategy extends PassportStrategy(Strategy) { ... }

// After
export class JwtStrategy extends PassportStrategy(Strategy, 'my-strategy') { ... }
```

**Guard — match the new name:**
```ts
// Before
export class JwtAuthGuard extends AuthGuard('jwt') {}

// After
export class JwtAuthGuard extends AuthGuard('my-strategy') {}
```

Optionally update `PassportModule.register({ defaultStrategy: 'my-strategy' })` in the module.

---

## Custom AuthGuard (without Passport)

If you don't want Passport at all, implement `CanActivate` directly. This is what the `AuthGuard` class in `auth.guard.ts` does:

```ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest();

      const authHeader = request.headers['authorization'];
      if (!authHeader) return false;

      const token = authHeader.split(' ')[1];
      if (!token) return false;

      const secretKey = process.env.JWT_SECRET;
      if (!secretKey) throw new Error('JWT_SECRET is not set');

      const decoded = jwt.verify(token, secretKey as Secret) as JwtPayload;
      if (!decoded) return false;

      request.user = decoded; // attach for downstream use
      return true;
    } catch {
      return false;
    }
  }
}
```

**When to use this vs Passport:**

| | Custom `CanActivate` | Passport + `AuthGuard` |
|---|---|---|
| Setup | Minimal | More boilerplate |
| Token source | Manual | Configurable via `ExtractJwt` |
| Multiple strategies | Wire up yourself | Built-in via strategy name |
| `req.user` population | Manual (`request.user = decoded`) | Via `validate()` return value |
| Recommended for | Single simple token check | Multiple auth strategies, OAuth, etc. |

---

## Skipping authentication on specific routes

Use metadata decorators to signal a guard to skip a route, without removing the guard from the controller.

`src/auth/guards/skip.auth.ts`

```ts
import { SetMetadata } from '@nestjs/common';

export const SkipAuth = () => SetMetadata('skipAuth', true);
export const Public  = () => SetMetadata('isPublic', true);
```

The guard reads this metadata via `Reflector`:

```ts
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),  // check method-level metadata first
      context.getClass(),    // fall back to class-level metadata
    ]);
    if (isPublic) return true;

    // ... rest of token validation
  }
}
```

Usage on a route:

```ts
@Post('signup')
@SkipAuth()   // or @Public()
async signup(@Body() dto: SignupUserDto) { ... }
```

`getAllAndOverride` returns the first non-undefined value it finds, checking the handler (method) before the class (controller). This means a `@SkipAuth()` on a method will override a guard applied at the controller level.

---

## Scoped / purpose-specific guards

You can create guards for specific token scopes, not just general authentication. The `PasswordResetAuthGuard` in this codebase is an example — it validates that the JWT has `scope: 'password_reset'` and that the token version matches the user's current password hash.

```ts
@Injectable()
export class PasswordResetAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) return false;

    const decoded = jwt.verify(token, appconfig.auth.jwtSecret) as JwtPayload;

    // Scope check — this token is only valid for password resets
    if (decoded.scope !== 'password_reset') return false;

    const user = await this.userService.getOne(decoded.user);
    if (!user) return false;

    // Version check — invalidates the token once the password changes
    if (user.passwordHash.slice(-10) !== decoded.version) return false;

    return true;
  }
}
```

Applied like any other guard:

```ts
@Post('updatePassword')
@UseGuards(PasswordResetAuthGuard)
async updatePassword(@Body() dto: UpdatePasswordSubmitNewPassword) { ... }
```

---

## Token delivery: Header vs Cookie

Two common approaches for sending the JWT from the client:

### Authorization Header (Bearer token)
```
Authorization: Bearer <token>
```
Extracted with:
```ts
jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
```
Simple but requires the client to store the token (e.g. localStorage), which is XSS-vulnerable.

### HttpOnly Cookie
The server sets the cookie on login:
```ts
// auth.controller.ts
res.cookie('access_token', token, {
  httpOnly: true,     // JS on the page cannot read this
  secure: false,      // set true in production (requires HTTPS)
  sameSite: 'strict', // CSRF protection
  maxAge: 900000,     // 15 minutes in ms
});
```
The strategy reads from the cookie:
```ts
jwtFromRequest: ExtractJwt.fromExtractors([
  (req: Request) => req?.cookies?.access_token ?? null,
]),
```
HttpOnly cookies are not accessible to JavaScript, which prevents XSS token theft. `sameSite: 'strict'` mitigates CSRF.

---

## What lands on `req.user`

Whatever `JwtStrategy.validate()` returns becomes `req.user` for the duration of that request. It is set by Passport after successful validation and is available in any route handler, interceptor, or downstream guard.

```ts
// strategy
async validate(payload: any) {
  return { id: payload.id, email: payload.email };
  //       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  //       this object becomes req.user
}

// controller
@Get('me')
@UseGuards(JwtAuthGuard)
async getMe(@Req() req: Request) {
  console.log(req.user); // { id: '...', email: '...' }
}
```

Keep `validate()` lean. It runs on every authenticated request, so avoid heavy DB queries unless you need data that isn't in the token. In this codebase only the ID and email are carried forward; the full user record is fetched in `authService.getMe()` when actually needed.

---

## Full file reference

| File | Role |
|---|---|
| `src/auth/guards/auth.passport.strategy.ts` | Defines `JwtStrategy` — extracts the cookie, verifies the JWT, returns `req.user` shape |
| `src/auth/guards/auth.guard.jwt.ts` | Defines `JwtAuthGuard` — thin wrapper around `AuthGuard('jwt')` |
| `src/auth/guards/auth.guard.ts` | Custom guards: `AuthGuard` (header-based) and `PasswordResetAuthGuard` (scoped token) |
| `src/auth/guards/skip.auth.ts` | Metadata decorators: `@SkipAuth()`, `@Public()`, `@Roles()` |
| `src/auth/auth.module.ts` | Registers `PassportModule`, `JwtStrategy` in providers |
| `src/auth/auth.controller.ts` | Applies `@UseGuards(JwtAuthGuard)` on `GET /auth/me` |
| `src/auth/auth.service.ts` | `getMe()` uses `req.user.id` to fetch full user record |
