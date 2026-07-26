'use client';

import { Volume2 } from 'lucide-react';
import { useState } from 'react';

interface VoiceButtonProps {
    textToSpeak: string;
}

export default function VoiceButton({ textToSpeak }: VoiceButtonProps) {
    const [loading, setLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    const handlePlayVoice = async () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
                audio.currentTime = 0;
                setIsPlaying(false);
            } else {
                audio.play();
                setIsPlaying(true);
            }
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: textToSpeak }),
            });

            if (!response.ok) {
                throw new Error('TTS Request failed');
            }

            const blob = await response.blob();
            const audioUrl = URL.createObjectURL(blob);
            const newAudio = new Audio(audioUrl);

            // Reset state when audio finishes naturally
            newAudio.onended = () => {
                setIsPlaying(false);
                newAudio.currentTime = 0;
            };

            setAudio(newAudio);
            newAudio.play();
            setIsPlaying(true);
        } catch (err) {
            console.error('Voice playback failed:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handlePlayVoice}
            disabled={loading}
            className="flex items-center gap-2 cursor-pointer"
        >
            <Volume2 
                className={`transition-opacity ${isPlaying ? "opacity-50" : "opacity-100"}`} 
                size={16}
            />
            <span className="text-xs font-medium text-left">
                {loading
                    ? 'Generating...'
                    : isPlaying
                    ? 'Stop Voice'
                    : ''}
            </span>
        </button>
    );
}