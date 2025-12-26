const cardGame = document.getElementById("cardGame");
let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

// Fill up to 4 cards
function getGameSubjects() {
    const gameSubjects = [...subjects];
    while (gameSubjects.length < 4) {
        gameSubjects.push(null); 
    }
    return gameSubjects.slice(0, 4);
}

// Shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Load flip game
function loadFlipGame() {
    cardGame.innerHTML = "";
    const gameSubjects = getGameSubjects();
    shuffle(gameSubjects);

    gameSubjects.forEach(subject => {
        const card = document.createElement("div");
        card.className = "flip-card w-[90%] h-[350px] cursor-pointer";

        card.innerHTML = `
            <div class="flip-inner">
                <div class="flip-face flip-front bg-gray-800 text-white rounded-[30px] flex items-center justify-center">
                    <!-- front unknown -->
                </div>
                <div class="flip-face flip-back bg-white text-black rounded-[30px] flex items-center justify-center">
                    ${subject ? subject.title : "No Subject"}
                </div>
            </div>
        `;

        // Click flips only this card
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });

        cardGame.appendChild(card);
    });
}

// CSS for flipping
const style = document.createElement("style");
style.textContent = `
.flip-card { perspective: 1000px; margin: auto; }
.flip-inner { width: 100%; height: 100%; transition: transform 0.6s; transform-style: preserve-3d; position: relative; }
.flip-card.flipped .flip-inner { transform: rotateY(180deg); }
.flip-face { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 600; }
.flip-back { transform: rotateY(180deg); }
`;
document.head.appendChild(style);

// Initialize default unknown cards
function initUnknownCards() {
    cardGame.innerHTML = "";
    for (let i = 0; i < 4; i++) {
        const div = document.createElement("div");
        div.className = "w-[90%] h-[350px] cursor-pointer bg-gray-800 rounded-[30px]";
        cardGame.appendChild(div);
    }
}

// Initial render
initUnknownCards();
