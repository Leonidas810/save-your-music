"use client";

import { useEffect, useRef } from "react";
import { animate, splitText, stagger, createScope, Scope } from "animejs";
import { LinkButton } from "./molecules";

export default function AnimatedHero() {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const scope = useRef<Scope | null>(null);

    useEffect(() => {
        if (!rootRef.current) return;
        const heroTitle: HTMLElement | null = rootRef.current.querySelector(".hero-title");
        if (!heroTitle) return;

        scope.current = createScope({ root: rootRef.current }).add(self => {
            animate(
                '.hero-dot',
                {
                    translateY: [-10, 10],
                    opacity: [0.6, 1],
                    duration: 2200,
                    direction: "alternate",
                    loop: true,
                    easing: "easeInOutSine",
                    delay: (el, i) => i * 120,
                }
            );
            animate('.hero-sub', { opacity: [0, 1], translateY: [12, 0], duration: 1000, delay: 200, easing: "easeOutCubic" });

            const { chars } = splitText(heroTitle, { words: false, chars: true }) || {};
            animate(chars, {
                // Property keyframes
                y: [
                    { to: '-2.75rem', ease: 'outExpo', duration: 600 },
                    { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
                ],
                // Property specific parameters
                rotate: {
                    from: '-1turn',
                    delay: 0
                },
                delay: stagger(50),
                ease: 'inOutCirc',
            });
        });

        return () => {
            if (scope.current) scope.current.revert();
        };
    }, []);

    return (
        <section ref={rootRef} className="relative flex w-full items-center justify-center">
            <div className="absolute inset-0 z-10">
                <div className="absolute left-1/4 top-5 opacity-30">
                    <div className="hero-dot w-40 h-40 rounded-full bg-rose-300/60" />
                </div>
                <div className="absolute right-1/4 top-20 opacity-25">
                    <div className="hero-dot w-56 h-56 rounded-full bg-sky-300/50" />
                </div>
                <div className="absolute left-8 bottom-10 opacity-20">
                    <div className="hero-dot w-28 h-28 rounded-full bg-emerald-300/50" />
                </div>
            </div>

            <div className="mx-auto max-w-3xl px-6 text-center z-10">
                <h1 className="hero-title text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl mb-4">Save your Music</h1>
                <h2 className="hero-sub text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-3xl mb-2">Migrate playlists between YouTube &amp; Spotify</h2>
                <p className="hero-sub mt-4 text-lg text-gray-600 dark:text-zinc-300 mb-2">Quickly transfer your favorite playlists with intelligent track matching and batch insertion.</p>

                <div className="mt-8 flex items-center justify-center gap-4">
                    <LinkButton href="/migrate">Start migration</LinkButton>
                </div>
            </div>
        </section>
    );
}
