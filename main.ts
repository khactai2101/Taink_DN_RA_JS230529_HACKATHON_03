interface Player {

    name: string;
    point: number;
    ranking: "no-ranking" | "top-ranking";
}

const initialPlayers: Player[] = [
    { name: "Khắc Tài", point: 1, ranking: "no-ranking" },
    { name: "Văn Tú", point: 3, ranking: "no-ranking" },
    { name: "NSƯT Phước Thắng", point: 10, ranking: "no-ranking" },
];

if (!localStorage.getItem("players")) {
    localStorage.setItem("players", JSON.stringify(initialPlayers));
}

const players: Player[] = JSON.parse(localStorage.getItem("players") || "[]");
// Function to Render Players
function renderPlayers(players: any) {

    function calculateTotalPoints(): number {
        let totalPoints = 0;
        for (let i = 0; i < players.length; i++) {
            totalPoints += Number(players[i].point);
        }
        return totalPoints;
    }
    const totalPoints: number = calculateTotalPoints();

    const pointBoardElement = document.querySelector(".point-board") as HTMLElement;
    let pointBoardContent = `<table>
      <tr>
          <td>Players:</td>
          <td>${players.length}</td>
      </tr>
      <tr>
          <td>Total Points:</td>
          <td>${totalPoints}</td>
      </tr>
    </table>`;

    const mainElement = document.querySelector("main") as HTMLElement;
    let mainElementContent = "";
    for (let i = 0; i < players.length; i++) {
        mainElementContent += `<section class="player-info">
        <div class="group-icon">
            <i class="fa-solid fa-xmark" onclick="handleDelete(${i})"></i>
            <i class="fa-solid fa-trophy ${players[i].ranking}" id="${players[i].name}"></i>
            <p class="player-name">${players[i].name}</p>
        </div>
  
        <div class="point-grade">
            <i class="fa-solid fa-minus pg icon-minus" onclick="handleMinus(${i})"></i>
            <span class="point pg">${players[i].point}</span>
            <i class="fa-solid fa-plus pg" onclick="handlePlus(${i})"></i>
        </div>
      </section>`;

    }
    pointBoardElement.innerHTML = pointBoardContent;
    mainElement.innerHTML = mainElementContent;
    // const maxId = players.reduce((max, user) => Math.max(max, user.id), 0);


    //update color maxPoint
    const maxPoint = Math.max(...players.map((item: any) => item.point));
    const maxPointsArray = players.filter((item: any) => item.point === maxPoint);
    for (let i = 0; i < maxPointsArray.length; i++) {
        const nameElement = document.getElementById(
            `${maxPointsArray[i].name}`
        ) as HTMLElement;
        nameElement.style.color = "red";
    }
}

renderPlayers(players);

// Function to Add Players
function handleAdd() {
    const inputPlayerName = (document.querySelector(".input-player") as HTMLInputElement).value;

    const newPlayer: Player = {
        name: inputPlayerName,
        point: 0,
        ranking: "no-ranking",
    };

    players.push(newPlayer);

    localStorage.setItem("players", JSON.stringify(players));
    (document.querySelector(".input-player") as HTMLInputElement).value = "";
    renderPlayers(players);
}

// Function to Increase & Decrease Points
function handlePlus(index: number) {
    const players: Player[] = JSON.parse(localStorage.getItem("players") || "[]");
    players[index].point++;

    localStorage.setItem("players", JSON.stringify(players));
    renderPlayers(players);
}

function handleMinus(index: number) {
    const players: Player[] = JSON.parse(localStorage.getItem("players") || "[]");
    players[index].point--;
    if (players[index].point < 0) {
        players[index].point = 0;
    }
    localStorage.setItem("players", JSON.stringify(players));
    renderPlayers(players);
}



function handleDelete(i: number) {
    const players: Player[] = JSON.parse(localStorage.getItem("players") || "[]");

    if (players.length === 1) {
        alert("Xóa hết sao mà chơi!");
        return;
    }

    players.splice(i, 1);
    localStorage.setItem("players", JSON.stringify(players));

    renderPlayers(players);
}







