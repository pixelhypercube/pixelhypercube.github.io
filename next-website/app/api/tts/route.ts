import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import { NextResponse } from 'next/server';

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const audioStream = await elevenlabs.textToSpeech.convert(
      process.env.ELEVENLABS_VOICE_ID!,
      {
        text,
        modelId: 'eleven_multilingual_v2',
        voiceSettings: {
          stability: 0.5,
          similarityBoost: 0.6,
          style: 0.5,
          useSpeakerBoost: true,
          speed: 1.12,
        },
      }
    );

    // Pass the Web ReadableStream straight into NextResponse
    return new NextResponse(audioStream as any, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error) {
    console.error('ElevenLabs Error:', error);
    return NextResponse.json({ error: 'TTS failed' }, { status: 500 });
  }
}