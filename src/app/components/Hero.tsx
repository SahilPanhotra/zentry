"use client"
import React, { useEffect, useRef, useState } from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/all";
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);
const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [hasClicked, setHasClicked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loadedVideos, setLoadedVideos] = useState<number>(0);
    const totalVideos = 4;
    const nextVideoRef = useRef<HTMLVideoElement>(null);
    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
    
    useEffect(() => {
        if (loadedVideos === totalVideos - 1) {
            setIsLoading(false);
        }
    }, [loadedVideos]);
    // This is like a magic spell that watches when you click on a video
    // It's waiting for you to say "I want to see the next video!"
    useGSAP(() => {
        // First, we check if you clicked the video
        if (hasClicked) {
            // When you click, we make the next video visible
            // It's like taking a blanket off to show what's underneath!
            gsap.set('#next-video', {
                visibility: 'visible',
            })

            // Then we make the next video grow big and fill the screen
            // Like when you blow up a balloon, it gets bigger and bigger!
            gsap.to('#next-video', {
                transformOrigin: 'center center', // This tells where to start growing from
                scale: 1,                        // How big it should get
                width: '100%',                   // Make it as wide as the screen
                height: '100%',                  // Make it as tall as the screen
                duration: 1,                     // Takes 1 second to grow
                ease: 'power1.inOut',           // Makes the growing look smooth
                onStart: () => {                 // When it starts growing...
                    nextVideoRef.current?.play();// Start playing the video!
                },
            })

            // And the current video shrinks away
            // Like when you squeeze a sponge, it gets smaller!
            gsap.from('#current-video', {
                transformOrigin: 'center center', // Start shrinking from the middle
                scale: 0,                        // Shrink down to nothing for the start of the animation
                duration: 1.5,                   // Takes 1.5 seconds to shrink
                ease: 'power1.inOut',           // Makes the shrinking look smooth
            })
        }
    }, { dependencies: [currentIndex], revertOnUpdate: true })

    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
            borderRadius: "0% 0% 40% 10%",
        });
        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0% 0% 0% 0%",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: true,
            },
        });
    })

   
    const handleMiniVideoClick = () => {
        setHasClicked(true);

        setCurrentIndex(upcomingVideoIndex);
    }
    const getVideoSrc = (index: number) => {
        return `/videos/hero-${index}.mp4`;
    }
    const handleVideoLoad = () => {
        setLoadedVideos((prevLoadedVideos) => prevLoadedVideos + 1);
    }
    console.log(loadedVideos)
    console.log(isLoading)
    return (
        <div className='relative h-dvh w-screen overflow-x-hidden'>
            {isLoading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                    </div>
                </div>
            )}
            <div id='video-frame' className=' relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
                <div>
                    <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                        <div onClick={handleMiniVideoClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                            {/* This is the video that you hover over to see the next video*/}
                            <video ref={nextVideoRef} src={getVideoSrc(upcomingVideoIndex)} loop muted id='current-video' className='size-64 origin-center scale-150 object-cover object-center' onLoadedData={handleVideoLoad} />
                        </div>
                    </div>
                    {/* This is the video that slowly grows in size and pops up when you click on the mini video*/}
                    <video ref={nextVideoRef} src={getVideoSrc(currentIndex)} loop muted id='next-video' className='absolute-center invisible absolute z-20 size-64 object-cover object-center' onLoadedData={handleVideoLoad} />
                    {/* This is the video that gets into the background in fullscreen mode first*/}
                    <video src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)} autoPlay loop muted className='absolute left-0 top-0 size-full object-cover object-center' onLoadedData={handleVideoLoad} />
                </div>
                <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 '>
                    G<b>a</b>ming
                </h1>
                <div className='absolute left-0 top-0 z-40 size-full'>
                    <div className='mt-24 px-5 sm:px-10'>
                        <h1 className='special-font hero-heading text-blue-100'>redefi<b>n</b>e</h1>
                        <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
                            Enter the Metagame Layer <br />
                            Unleash the Play Economy
                        </p>
                        <Button id='watch-trailer' title='Watch Trailer' leftIcon={<TiLocationArrow />} containerClass='!bg-yellow-300  flex-center gap-1 ' />
                    </div>
                </div>
            </div>
            <h1 className='special-font hero-heading absolute bottom-5 right-5 text-black '>
                G<b>a</b>ming
            </h1>
        </div>
    )
}

export default Hero