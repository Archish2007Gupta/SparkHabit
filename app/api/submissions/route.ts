import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/config/supabaseClient';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { user_id, challenge_id, challenge_title, file_url, file_type } = body;

        if (!user_id || !challenge_id || !file_url) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('submissions')
            .insert([{
                user_id,
                challenge_id,
                challenge_title,
                file_url,
                file_type,
                created_at: new Date().toISOString(),
            }])
            .select();

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: 'Submission saved successfully', data },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        let query = supabase.from('submissions').select('*');

        if (userId) {
            query = query.eq('user_id', userId);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { data },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}