import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';
import TokenServerImport from 'agora-token';
const { RtcRole, RtcTokenBuilder } = TokenServerImport; // CJS module import
import type { PageServerLoadEvent } from '../$types';

export async function load(event: PageServerLoadEvent) {
    const { params, url } = event;
    let uid = url.searchParams.get('uid');
    try {
        const channel = new URLSearchParams(params).get('classid');
        console.log(channel, uid);

        if (!channel) {
            throw error(400, 'channel is required');
        }

        if (!uid) {
            uid = '0';
        }

        const token = RtcTokenBuilder.buildTokenWithUid(
            publicEnv.PUBLIC_APP_ID,
            env.APP_CERTIFICATE,
            channel,
            parseInt(uid),
            RtcRole.PUBLISHER,
            600,
            600
        );

        return { token, uid, channel };
    } catch (e) {
        throw error(400, `json expected: ${JSON.stringify(e)}`);
    }
}