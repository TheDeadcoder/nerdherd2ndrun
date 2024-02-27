import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';
import TokenServerImport from 'agora-token';
const { RtcRole, RtcTokenBuilder } = TokenServerImport; // CJS module import
import type { PageServerLoadEvent } from '../$types';

let commonuserNow;
let isTrainer = false;
let userNow;
let classNow;
let classLive;

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

        const {
            data: { user }
        } = await event.locals.supabase.auth.getUser();

        let { data: dttt, error: err } = await event.locals.supabase
            .from('commonuser')
            .select("*")
            .eq('email', user.email)


        commonuserNow = dttt[0];
        console.log(commonuserNow)


        if (commonuserNow.istrainer) {
            isTrainer = true;

            let { data: dt1, error: err } = await event.locals.supabase
                .from('teacher')
                .select("*")
                .eq('email', user.email)

            userNow = dt1[0];
        }
        else {
            isTrainer = false;
            let { data: dt1, error: err } = await event.locals.supabase
                .from('student')
                .select("*")
                .eq('email', user.email)

            userNow = dt1[0];
        }


        let { data: classlive, error: err3 } = await event.locals.supabase
            .from('classlive')
            .select("*")
            .eq('id', channel)

        classLive = classlive[0];

        let { data: classes, error: err1 } = await event.locals.supabase
            .from('classes')
            .select("*")
            .eq('id', classLive.classid)

        classNow = classes[0];




        //console.log(userNow, isTrainer);




        return { token, uid, channel, isTrainer, userNow, classLive, classNow };
    } catch (e) {
        throw error(400, `json expected: ${JSON.stringify(e)}`);
    }
}