"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaSearch,
} from "react-icons/fa";

const songs = [
  {
    cover: "https://i.scdn.co/image/ab67616d0000b27371d62ea7ea8a5be92d3c1f62",
    title: "Blue",
    artist: "Billie Eilish",
    src: "https://ts17.tarafdari.com/contents/user874885/content-sound/blue_-_billie_eilish_.mp3",
  },
  {
    cover: "https://i1.sndcdn.com/artworks-dv6XQx0FDehs-0-t500x500.jpg",
    title: "Welcome To NewYork",
    artist: "Taylor Swift",
    src: "https://s15.uupload.ir/files/foxlyrics/mp3/2023-10/Welcome%20To%20New%20York%20(Taylor%20s%20Version)%20(320).mp3",
  },
  {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png",
    title: "Blinding Lights",
    artist: "The Weeknd",
    src: "https://dl.dibasmusic.com/dl/1401/11/The-Weeknd-Blinding-Lights-dibamusics-320.mp3",
  },
  {
    cover:
      "https://albumart.publicradio.org/mb/5f/5f898a60-acc5-48fc-a11b-2926084c0924_f1a4.jpg",
    title: "Midnight City",
    artist: "M83",
    src: "https://files.musicfeed.ir/2020/05/M83-Midnight-City.mp3",
  },
  {
    cover:
      "https://m.media-amazon.com/images/M/MV5BZjMwNjI4ODAtMDY2Yy00MWEwLTkxMWQtNDIwNjQ1ODlkMTYwXkEyXkFqcGc@._V1_.jpg",
    title: "Save Your Tears",
    artist: "The Weeknd",
    src: "http://irdl.rasamusic.ir//%DB%B0%DB%B0/%DB%B3/The%20Weeknd%20-%20Save%20Your%20Tears.mp3",
  },
  {
    cover:
      "https://i1.sndcdn.com/artworks-eb0MriwCeIEzf4mo-bUQc2A-t500x500.jpg",
    title: "Save Your Tears",
    artist: "Justin Bieber",
    src: "https://dl.dibasmusic.com/dl/1401/09/Justin-Bieber-Peaches-dibamusics.com-320.mp3",
  },
  {
    cover:
      "https://i1.sndcdn.com/artworks-qDFv7RtUQj4oRrIV-R6EZIA-t500x500.jpg",
    title: "Montero",
    artist: "Lil Nas X",
    src: "https://dl.melovy.ir/2022/11/Lil-Nas-X-MONTERO-(Call-Me-By-Your-Name)1.mp3",
  },
  {
    cover:
      "https://ahaang.com/wp-content/uploads/2021/07/The-Kid-Laroi-Stay.jpg",
    title: "Stay",
    artist: "The Kid Laroi & Justin Bieber",
    src: "https://dl.dibasmusic.com/song/1401/06/The-Kid-Laroi-Justin-Bieber%C2%A0-Stay-dibamusics-320.mp3",
  },
  {
    cover: "https://cdn.europosters.eu/image/1300/116581.jpg",
    title: "Bad Habits",
    artist: "Ed Sheeran",
    src: "https://files.musicfeed.ir/2021/11/ed_sheeran_bad_habits.mp3",
  },
  {
    cover:
      "https://m.media-amazon.com/images/M/MV5BZDkyZmMxOTktYTdiOC00ZTQ4LTk4OTItNmY2MWVjYmE2ODk3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    title: "good 4 u",
    artist: "Olivia Rodrigo",
    src: "https://files.musicfeed.ir/dir/2021/5/Olivia%20Rodrigo%20-%20good%204%20u.mp3",
  },
  {
    cover:
      "https://cdn-p.smehost.net/sites/a6700d2fbaf642099802a57af8b10fe6/wp-content/uploads/2021/04/Kiss-Me-More-Art.jpg",
    title: "Kiss Me More",
    artist: "Doja Cat ft. SZA",
    src: "https://dl.ememay.ir/Music/Doja-Cat/songs/Kiss-Me-More-feat-SZA-Doja-Cat-SZA-320.mp3",
  },
  {
    cover: "https://i1.sndcdn.com/artworks-oIHnpJTjJDYs-0-t500x500.jpg",
    title: "Industry Baby",
    artist: "Lil Nas X & Jack Harlow",
    src: "https://dlmain.gandommusic.ir/mp3/1/Lil%20Nas%20X%20%20Jack%20Harlow%20-%20INDUSTRY%20BABY%20%28%20GandomMusic.ir%20%29.mp3",
  },
];

interface Star {
  top: string;
  left: string;
  size: number;
  duration: number;
}

export default function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [stars, setStars] = useState<Star[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playlistRef = useRef<HTMLUListElement | null>(null);

  // Generate background stars
  useEffect(() => {
    const newStars: Star[] = [];
    for (let i = 0; i < 150; i++) {
      newStars.push({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 10,
      });
    }
    setStars(newStars);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    const next = currentSong < songs.length - 1 ? currentSong + 1 : 0;
    setCurrentSong(next);
    if (isPlaying)
      setTimeout(() => audioRef.current?.play().catch(() => {}), 50);
  };

  const playPrev = () => {
    const prev = currentSong > 0 ? currentSong - 1 : songs.length - 1;
    setCurrentSong(prev);
    if (isPlaying)
      setTimeout(() => audioRef.current?.play().catch(() => {}), 50);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setCurrentTime(Number(e.target.value));
    }
  };

  const handleEnded = () => playNext();

  // Play automatically when song changes
  useEffect(() => {
    if (isPlaying && audioRef.current) audioRef.current.play().catch(() => {});
  }, [isPlaying, currentSong]);

  // Filter songs based on search query
  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto-scroll to currently playing song
  useEffect(() => {
    if (!playlistRef.current) return;
    const listItems = Array.from(playlistRef.current.children) as HTMLElement[];
    const activeIndexInFiltered = filteredSongs.findIndex(
      (song) => songs.indexOf(song) === currentSong
    );
    if (activeIndexInFiltered >= 0) {
      const activeItem = listItems[activeIndexInFiltered];
      activeItem?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [currentSong, filteredSongs]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden text-white bg-black">
      {/* Background stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-cyan-400 opacity-80"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: star.top,
            left: star.left,
            boxShadow: `0 0 6px cyan`,
            animation: `starMove ${star.duration}s linear infinite`,
          }}
        />
      ))}

      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-700 via-cyan-400 to-cyan-700 animate-gradientBackground"></div>

      {/* Cover image and info */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 z-10">
        <div
          className={`w-64 h-64 rounded-3xl overflow-hidden shadow-xl mb-6 ${
            isPlaying ? "animate-pulse-glow" : ""
          }`}
        >
          <Image
            src={songs[currentSong].cover}
            alt="cover"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold text-center">
          {songs[currentSong].title}
        </h1>
        <h2 className="text-lg text-gray-300 text-center">
          {songs[currentSong].artist}
        </h2>
      </div>

      {/* Search box */}
      <div className="w-full max-w-md mb-2 px-4 z-10">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search songs or artists..."
            className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Time slider */}
      <div className="w-full max-w-md mb-4 px-4 z-10">
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full accent-cyan-400"
        />
        <div className="flex justify-between text-sm text-gray-300 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-8 mb-6 z-10">
        <button
          onClick={playPrev}
          className="text-2xl text-cyan-400 hover:text-white transition-shadow hover:shadow-cyan-400/70"
        >
          <FaStepBackward />
        </button>
        <button
          onClick={togglePlay}
          className="text-4xl bg-cyan-400/30 hover:bg-cyan-400/50 transition-shadow hover:shadow-cyan-400/70 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button
          onClick={playNext}
          className="text-2xl text-cyan-400 hover:text-white transition-shadow hover:shadow-cyan-400/70"
        >
          <FaStepForward />
        </button>
      </div>

      {/* Playlist */}
      <div className="w-full max-w-md bg-black/30 rounded-xl p-4 overflow-y-auto max-h-52 mb-6 z-10 custom-scrollbar">
        <h2 className="text-lg font-bold mb-2 text-cyan-400">Playlist</h2>
        <ul ref={playlistRef} className="space-y-2">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song) => {
              const songIndex = songs.indexOf(song);
              return (
                <li
                  key={songIndex}
                  onClick={() => {
                    setCurrentSong(songIndex);
                    setIsPlaying(true);
                    setTimeout(
                      () => audioRef.current?.play().catch(() => {}),
                      50
                    );
                  }}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
                    songIndex === currentSong
                      ? "bg-cyan-400 animate-pulse-glow text-black font-bold"
                      : "bg-gray-700/50 hover:bg-gray-600"
                  }`}
                >
                  <span className="w-6 text-right">{songIndex + 1}.</span>
                  <div className="w-10 h-10 rounded overflow-hidden">
                    <Image
                      src={song.cover}
                      alt={song.title}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{song.title}</span>
                    <span className="text-xs text-gray-300">{song.artist}</span>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="text-center text-gray-400 py-4">Not Found</li>
          )}
        </ul>
      </div>

      <audio
        ref={audioRef}
        src={songs[currentSong].src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <style jsx>{`
        @keyframes starMove {
          0% {
            transform: translateY(0px) scale(0.5);
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(1200px) scale(1);
            opacity: 0;
          }
        }
        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 10px cyan;
          }
          50% {
            box-shadow: 0 0 20px cyan;
          }
          100% {
            box-shadow: 0 0 10px cyan;
          }
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        @keyframes gradientBackground {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradientBackground {
          background-size: 200% 200%;
          animation: gradientBackground 15s ease infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 255, 0.6);
          border-radius: 8px;
          border: 2px solid rgba(0, 0, 0, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 255, 0.9);
        }
      `}</style>
    </div>
  );
}
