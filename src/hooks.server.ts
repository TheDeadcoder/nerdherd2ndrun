// src/hooks.server.ts
import { type Handle, redirect, error } from '@sveltejs/kit'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import { sequence } from '@sveltejs/kit/hooks'

async function supabase({ event, resolve }) {
    event.locals.supabase = createSupabaseServerClient({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event,
    })

    /**
     * a little helper that is written for convenience so that instead
     * of calling `const { data: { session } } = await supabase.auth.getSession()`
     * you just call this `await getSession()`
     */
    event.locals.getSession = async () => {
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession()
        return session
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range'
        },
    })
}

async function authorization({ event, resolve }) {
    // protect requests to all routes that start with /protected-routes
    if (event.url.pathname.startsWith('/learnerverified') && event.request.method === 'GET') {
        const session = await event.locals.getSession()
        if (!session) {
            // the user is not signed in
            throw redirect(303, '/')
        }
    }
    if (event.url.pathname.startsWith('/trainerverified') && event.request.method === 'GET') {
        const session = await event.locals.getSession()
        if (!session) {
            // the user is not signed in
            throw redirect(303, '/')
        }
    }
    if (event.url.pathname.startsWith('/adminverified') && event.request.method === 'GET') {
        const session = await event.locals.getSession()
        if (!session) {
            // the user is not signed in
            throw redirect(303, '/')
        }
    }
    if (event.url.pathname.startsWith('/commonverified') && event.request.method === 'GET') {
        const session = await event.locals.getSession()
        if (!session) {
            // the user is not signed in
            throw redirect(303, '/')
        }
    }

    // protect POST requests to all routes that start with /protected-posts
    if (event.url.pathname.startsWith('/learnerverified') && event.request.method === 'POST') {
        const session = await event.locals.getSession()
        if (!session) {
            // the user is not signed in
            throw error(303, '/')
        }
    }
    if (event.url.pathname.startsWith('/trainerverified') && event.request.method === 'POST') {
        const session = await event.locals.getSession()
        if (!session) {
            // the user is not signed in
            throw error(303, '/')
        }
    }
    if (event.url.pathname.startsWith('/adminverified') && event.request.method === 'POST') {
        const session = await event.locals.getSession()
        if (!session) {
            // the user is not signed in
            throw error(303, '/')
        }
    }
    if (event.url.pathname.startsWith('/commonverified') && event.request.method === 'POST') {
        const session = await event.locals.getSession()
        if (!session) {
            // the user is not signed in
            throw error(303, '/')
        }
    }



    return resolve(event)
}

export const handle: Handle = sequence(supabase, authorization)