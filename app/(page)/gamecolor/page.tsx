"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../navbar/page";
import { FaRedo } from "react-icons/fa"; // Import ไอคอนรีเซ็ตจาก react-icons

export default function Game_CardflipColor() {
  const color = [
    { id: 1, color: "#e51c23", flipped: false, matched: false, error: 3 },
    { id: 2, color: "#259b24", flipped: false, matched: false, error: 3 },
    { id: 3, color: "#ffeb3b", flipped: false, matched: false, error: 3 },
  ];

  const [card, setCard] = useState(shuffleCards([...color, ...color]));
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);

  const hasStarted = useRef(false);
  const hasFlipped = useRef(false);
  const audioRef = useRef(new Audio());
  const isPlaying = useRef(false);

  function shuffleCards(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    if (!hasStarted.current) {
      playAudio("https://apipic.bxoks.online/public/uploads/startgame.mp3");
      hasStarted.current = true;
      setTimeout(() => {
        setCard((prevCards) =>
          prevCards.map((card) => ({ ...card, flipped: true }))
        );
      }, 4000);
      setTimeout(() => {
        if (!hasFlipped.current) {
          setCard((prevCards) =>
            prevCards.map((card) => ({ ...card, flipped: false }))
          );
          hasFlipped.current = true;
        }
      }, 9000);
    }
  }, []);

  const playAudio = (audioUrl: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      isPlaying.current = false;
    }

    audioRef.current.src = audioUrl;
    isPlaying.current = true;

    audioRef.current
      .play()
      .then(() => console.log("Audio played successfully"))
      .catch((error) => {
        console.error("Error playing audio:", error);
        isPlaying.current = false;
      });

    audioRef.current.onended = () => {
      isPlaying.current = false;
    };
  };

  const handleCardClick = (index: number) => {
    if (hasFlipped.current) {
      if (disabled || card[index].flipped || card[index].matched) return;
      const updatedCards = card.map((card, idx) =>
        idx === index ? { ...card, flipped: true } : card
      );
      setCard(updatedCards);

      const updatedSelected = [...selectedCards, index];
      setSelectedCards(updatedSelected);

      if (updatedSelected.length === 2) {
        checkMatch(updatedSelected, updatedCards);
      }
    }
  };

  const checkMatch = (selected: number[] | [any, any], updatedCards: any[]) => {
    const [first, second] = selected;
    setDisabled(true);

    if (updatedCards[first].id === updatedCards[second].id) {
      setCard(
        updatedCards.map((card, idx) =>
          idx === first || idx === second
            ? { ...card, matched: true, error: 1 }
            : card
        )
      );
      setScore(score + 1);
      setMatchedPairs(matchedPairs + 1);
      setSelectedCards([]);
      setDisabled(false);
    } else {
      setCard(
        updatedCards.map((card, idx) =>
          idx === first || idx === second ? { ...card, error: 0 } : card
        )
      );
      setSelectedCards([]);
      setMatchedPairs(matchedPairs + 1);
      setDisabled(false);
    }
  };

  const resetGame = () => {
    const newCards = shuffleCards([...color, ...color]);
    setCard(newCards);
    setSelectedCards([]);
    setDisabled(false);
    setScore(0);
    setMatchedPairs(0);
    hasStarted.current = false;
    hasFlipped.current = false;

    // รีเซ็ตและเริ่มต้นใหม่ทันที
    setTimeout(() => {
      setCard((prevCards) =>
        prevCards.map((card) => ({ ...card, flipped: true }))
      );
    }, 1000);
    setTimeout(() => {
      setCard((prevCards) =>
        prevCards.map((card) => ({ ...card, flipped: false }))
      );
      hasFlipped.current = true;
    }, 6000);
  };

  const isGameOver = card.every((card) => card.matched || card.error === 0);

  return (
    <div className="w-full h-full bg-fixed bg-gradient-to-br from-purple-200 via-blue-200 to-amber-300">
      <style jsx>{`
        .card {
          perspective: 1000px;
          transform-style: preserve-3d;
          transition: all 0.6s ease-in-out;
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }

        .card:hover {
          transform: scale(1.05) rotate(2deg);
        }

        .card.flipped .card-inner {
          transform: rotateY(180deg);
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        .card-front {
          transform: rotateY(180deg);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .card-back {
          transform: rotateY(0deg);
          background: linear-gradient(135deg, #4b6cb7, #182848);
        }

        .card-front.error {
          animation: shake 0.5s ease-in-out;
        }

        .card-front.matched {
          animation: bounce 0.8s ease-in-out;
        }

        @keyframes shake {
          0% {
            transform: rotateY(180deg) translateX(0);
          }
          25% {
            transform: rotateY(180deg) translateX(-10px);
          }
          50% {
            transform: rotateY(180deg) translateX(10px);
          }
          75% {
            transform: rotateY(180deg) translateX(-10px);
          }
          100% {
            transform: rotateY(180deg) translateX(0);
          }
        }

        @keyframes bounce {
          0% {
            transform: rotateY(180deg) scale(1);
          }
          50% {
            transform: rotateY(180deg) scale(1.1);
          }
          100% {
            transform: rotateY(180deg) scale(1);
          }
        }

        .score-text {
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .reset-button {
          position: fixed;
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
          background: linear-gradient(135deg, #ff6b6b, #ff8e53);
          padding: 12px;
          border-radius: 50%;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          color: white;
          border: none;
          cursor: pointer;
        }

        .reset-button:hover {
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
      `}</style>
      <Navbar />
      <div className="flex flex-col items-center w-full min-h-screen pt-10">
        <div className="font-mali md:text-4xl text-lg font-bold text-red-600 score-text">
          คะแนน: {score}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 p-6">
          {card.map((card, index) => (
            <div
              key={index}
              className={`w-[171px] h-[242px] cursor-pointer card ${
                card.flipped || card.matched ? "flipped" : ""
              }`}
              onClick={() => handleCardClick(index)}
            >
              <div className="card-inner">
                <div
                  className={`card-front ${
                    card.error === 0
                      ? "bg-red-300 error"
                      : card.error === 1
                      ? "bg-green-300 matched"
                      : ""
                  }`}
                  style={{ backgroundColor: card.flipped ? card.color : "" }}
                ></div>
                <div className="card-back">
                  <img
                    src="/images/cardback.png"
                    alt="Card Back"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {isGameOver && (
          <button className="reset-button" onClick={resetGame}>
            <FaRedo size={32} />
          </button>
        )}
      </div>
    </div>
  );
}
