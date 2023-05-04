# Twitter with only Emojis, using T3 Stack

- **Source:** [T3 Stack Tutorial - FROM 0 TO PROD FOR $0 (Next.js, tRPC, TypeScript, Tailwind, Prisma & More) | Theo - t3.gg | March, 23rd 2023](https://youtu.be/YkOSUVzOAA4)
- Cloud Region: `us-east-1`

## Deployment

- **Vercel:** [https://twitter-with-only-emojis-theo-t3-stack-tutorial-yeicob.vercel.app/](https://twitter-with-only-emojis-theo-t3-stack-tutorial-yeicob.vercel.app/)

## Limit the amount of posts: Rate Limiter

We don't want users to spam new posts. The easiest way to limit the amount of
posts a user can make is using a Rate Limiter. It is a common pattern to enforce
that this thing can only be hit X times per `userId` or `ip address`.

In this particular project, we used `Upstash` with a package for rate limiting.

- [Rate limiting with Upstash](https://youtu.be/YkOSUVzOAA4?t=5880)
- [upstash/ratelimit](https://github.com/upstash/ratelimit)

## If this was a real project

- The forms management would be implemented using [React Hook
  Form](https://react-hook-form.com/) and Zod for validation in the client, and
  not only rely on the server response.

## `getServerSideProps`

- The function will run on every request once deployed.

### Problems

- We loose al the typing of the data.
- It will block every request.
- It won't be cached, not having cached pages.
- It may take longer to load.
- Get the types from the server to the client is not easy.
- We will not be using `TRPC` to fetch the data.

## TRPC Server-Side Helpers

It is a feature which can prehydrate some data ahead of time. We must use
`getStaticProps`. Using `getStaticProps` doesn't mean that this can't re-run,
but that it will be treated mostly as a static asset and we can trigger
revalidation when and how we choose.

As it is mentioned in the docs,

> "`createServerSideHelpers` provides you with a set of helper functions that
> you can use to prefetch queries on the server. This is useful for SSG, but
> also for SSR if you opt not to use `ssr: true`."

[Server-Side Helpers](https://trpc.io/docs/nextjs/server-side-helpers)

## Create T3 App Info

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

### What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

### Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

### How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
