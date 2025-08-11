class PokemonBattleSimulator {
    constructor() {
        this.pokemonData = [
            {
                id: 1,
                name: "Charizard",
                level: 50,
                hp: 150,
                maxHp: 150,
                attack: 84,
                defense: 78,
                speed: 100,
                type: ["Fire", "Flying"],
                image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
                moves: [
                    { name: "Flamethrower", type: "Fire", power: 90, accuracy: 100, pp: 15, maxPp: 15 },
                    { name: "Dragon Claw", type: "Dragon", power: 80, accuracy: 100, pp: 15, maxPp: 15 },
                    { name: "Air Slash", type: "Flying", power: 75, accuracy: 95, pp: 20, maxPp: 20 },
                    { name: "Earthquake", type: "Ground", power: 100, accuracy: 100, pp: 10, maxPp: 10 }
                ]
            },
            {
                id: 2,
                name: "Blastoise",
                level: 50,
                hp: 160,
                maxHp: 160,
                attack: 78,
                defense: 100,
                speed: 78,
                type: ["Water"],
                image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
                moves: [
                    { name: "Hydro Pump", type: "Water", power: 110, accuracy: 80, pp: 5, maxPp: 5 },
                    { name: "Ice Beam", type: "Ice", power: 90, accuracy: 100, pp: 10, maxPp: 10 },
                    { name: "Flash Cannon", type: "Steel", power: 80, accuracy: 100, pp: 10, maxPp: 10 },
                    { name: "Skull Bash", type: "Normal", power: 130, accuracy: 100, pp: 10, maxPp: 10 }
                ]
            },
            {
                id: 3,
                name: "Venusaur",
                level: 50,
                hp: 170,
                maxHp: 170,
                attack: 82,
                defense: 83,
                speed: 80,
                type: ["Grass", "Poison"],
                image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
                moves: [
                    { name: "Solar Beam", type: "Grass", power: 120, accuracy: 100, pp: 10, maxPp: 10 },
                    { name: "Sludge Bomb", type: "Poison", power: 90, accuracy: 100, pp: 10, maxPp: 10 },
                    { name: "Leech Seed", type: "Grass", power: 0, accuracy: 90, pp: 10, maxPp: 10 },
                    { name: "Sleep Powder", type: "Grass", power: 0, accuracy: 75, pp: 15, maxPp: 15 }
                ]
            },
            {
                id: 4,
                name: "Pikachu",
                level: 50,
                hp: 120,
                maxHp: 120,
                attack: 90,
                defense: 60,
                speed: 110,
                type: ["Electric"],
                image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
                moves: [
                    { name: "Thunderbolt", type: "Electric", power: 90, accuracy: 100, pp: 15, maxPp: 15 },
                    { name: "Quick Attack", type: "Normal", power: 40, accuracy: 100, pp: 30, maxPp: 30 },
                    { name: "Iron Tail", type: "Steel", power: 100, accuracy: 75, pp: 15, maxPp: 15 },
                    { name: "Electro Ball", type: "Electric", power: 60, accuracy: 100, pp: 20, maxPp: 20 }
                ]
            },
            {
                id: 5,
                name: "Gengar",
                level: 50,
                hp: 130,
                maxHp: 130,
                attack: 95,
                defense: 70,
                speed: 110,
                type: ["Ghost", "Poison"],
                image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
                moves: [
                    { name: "Shadow Ball", type: "Ghost", power: 80, accuracy: 100, pp: 15, maxPp: 15 },
                    { name: "Sludge Bomb", type: "Poison", power: 90, accuracy: 100, pp: 10, maxPp: 10 },
                    { name: "Dark Pulse", type: "Dark", power: 80, accuracy: 100, pp: 15, maxPp: 15 },
                    { name: "Confuse Ray", type: "Ghost", power: 0, accuracy: 100, pp: 10, maxPp: 10 }
                ]
            },
            {
                id: 6,
                name: "Alakazam",
                level: 50,
                hp: 110,
                maxHp: 110,
                attack: 95,
                defense: 65,
                speed: 120,
                type: ["Psychic"],
                image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/65.png",
                moves: [
                    { name: "Psychic", type: "Psychic", power: 90, accuracy: 100, pp: 10, maxPp: 10 },
                    { name: "Shadow Ball", type: "Ghost", power: 80, accuracy: 100, pp: 15, maxPp: 15 },
                    { name: "Recover", type: "Normal", power: 0, accuracy: 100, pp: 20, maxPp: 20 },
                    { name: "Focus Blast", type: "Fighting", power: 120, accuracy: 70, pp: 5, maxPp: 5 }
                ]
            }
        ];

        this.typeColors = {
            Fire: "#ef4444",
            Water: "#3b82f6",
            Grass: "#10b981",
            Poison: "#8b5cf6",
            Flying: "#06b6d4",
            Dragon: "#7c3aed",
            Ground: "#f59e0b",
            Ice: "#06b6d4",
            Steel: "#6b7280",
            Normal: "#9ca3af",
            Electric: "#eab308",
            Ghost: "#7c3aed",
            Psychic: "#ec4899",
            Dark: "#374151",
            Fighting: "#ea580c"
        };

        this.battleState = {
            playerPokemon: null,
            opponentPokemon: null,
            turn: 'player',
            battleLog: [],
            isBattleActive: false,
            isAnimating: false
        };

        this.selectedMove = null;
        this.initializeGame();
        this.setupEventListeners();
    }

    initializeGame() {
        this.resetBattle();
        this.updateUI();
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // New battle button
        document.getElementById('newBattleBtn').addEventListener('click', () => {
            this.resetBattle();
        });

        // Modal button
        document.getElementById('modalBtn').addEventListener('click', () => {
            this.hideModal();
            this.resetBattle();
        });
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');

        // Update info tab if switching to it
        if (tabName === 'info') {
            this.updateInfoTab();
        }
    }

    resetBattle() {
        // Select random Pokemon for player and opponent
        const playerIndex = Math.floor(Math.random() * this.pokemonData.length);
        let opponentIndex = Math.floor(Math.random() * this.pokemonData.length);
        
        // Ensure different Pokemon
        while (opponentIndex === playerIndex) {
            opponentIndex = Math.floor(Math.random() * this.pokemonData.length);
        }

        // Deep copy Pokemon data
        this.battleState.playerPokemon = JSON.parse(JSON.stringify(this.pokemonData[playerIndex]));
        this.battleState.opponentPokemon = JSON.parse(JSON.stringify(this.pokemonData[opponentIndex]));
        
        // Reset HP and PP
        this.battleState.playerPokemon.hp = this.battleState.playerPokemon.maxHp;
        this.battleState.opponentPokemon.hp = this.battleState.opponentPokemon.maxHp;
        
        this.battleState.playerPokemon.moves.forEach(move => {
            move.pp = move.maxPp;
        });
        
        this.battleState.opponentPokemon.moves.forEach(move => {
            move.pp = move.maxPp;
        });

        this.battleState.turn = 'player';
        this.battleState.battleLog = ["New battle started! Choose your move!"];
        this.battleState.isBattleActive = true;
        this.battleState.isAnimating = false;

        this.selectedMove = null;
        this.updateUI();
    }

    updateUI() {
        this.updatePokemonDisplay();
        this.updateMovesDisplay();
        this.updateBattleLog();
        this.updateTurnIndicator();
        this.updateInfoTab();
    }

    updatePokemonDisplay() {
        const player = this.battleState.playerPokemon;
        const opponent = this.battleState.opponentPokemon;

        // Player Pokemon
        document.getElementById('playerPokemonImage').src = player.image;
        document.getElementById('playerPokemonName').textContent = player.name;
        document.getElementById('playerPokemonLevel').textContent = player.level;
        document.getElementById('playerHpText').textContent = `${player.hp}/${player.maxHp}`;
        document.getElementById('playerAttack').textContent = player.attack;
        document.getElementById('playerDefense').textContent = player.defense;
        document.getElementById('playerSpeed').textContent = player.speed;

        // Player HP Bar
        const playerHpBar = document.getElementById('playerHpBar');
        const playerHpPercentage = (player.hp / player.maxHp) * 100;
        playerHpBar.style.width = `${playerHpPercentage}%`;
        
        // Update HP bar color based on health
        playerHpBar.classList.remove('low', 'critical');
        if (playerHpPercentage <= 20) {
            playerHpBar.classList.add('critical');
        } else if (playerHpPercentage <= 50) {
            playerHpBar.classList.add('low');
        }

        // Player Types
        const playerTypesContainer = document.getElementById('playerPokemonTypes');
        playerTypesContainer.innerHTML = '';
        player.type.forEach(type => {
            const badge = document.createElement('span');
            badge.className = `type-badge type-${type.toLowerCase()}`;
            badge.textContent = type;
            playerTypesContainer.appendChild(badge);
        });

        // Opponent Pokemon
        document.getElementById('opponentPokemonImage').src = opponent.image;
        document.getElementById('opponentPokemonName').textContent = opponent.name;
        document.getElementById('opponentPokemonLevel').textContent = opponent.level;
        document.getElementById('opponentHpText').textContent = `${opponent.hp}/${opponent.maxHp}`;
        document.getElementById('opponentAttack').textContent = opponent.attack;
        document.getElementById('opponentDefense').textContent = opponent.defense;
        document.getElementById('opponentSpeed').textContent = opponent.speed;

        // Opponent HP Bar
        const opponentHpBar = document.getElementById('opponentHpBar');
        const opponentHpPercentage = (opponent.hp / opponent.maxHp) * 100;
        opponentHpBar.style.width = `${opponentHpPercentage}%`;
        
        // Update HP bar color based on health
        opponentHpBar.classList.remove('low', 'critical');
        if (opponentHpPercentage <= 20) {
            opponentHpBar.classList.add('critical');
        } else if (opponentHpPercentage <= 50) {
            opponentHpBar.classList.add('low');
        }

        // Opponent Types
        const opponentTypesContainer = document.getElementById('opponentPokemonTypes');
        opponentTypesContainer.innerHTML = '';
        opponent.type.forEach(type => {
            const badge = document.createElement('span');
            badge.className = `type-badge type-${type.toLowerCase()}`;
            badge.textContent = type;
            opponentTypesContainer.appendChild(badge);
        });
    }

    updateMovesDisplay() {
        const movesGrid = document.getElementById('movesGrid');
        movesGrid.innerHTML = '';

        this.battleState.playerPokemon.moves.forEach((move, index) => {
            const moveCard = document.createElement('div');
            moveCard.className = 'move-card';
            
            if (!this.battleState.isBattleActive || this.battleState.turn !== 'player' || move.pp === 0 || this.battleState.isAnimating) {
                moveCard.disabled = true;
            }

            if (this.selectedMove === move) {
                moveCard.classList.add('selected');
            }

            moveCard.innerHTML = `
                <div class="move-name">${move.name}</div>
                <div class="move-details">
                    <span class="type-badge type-${move.type.toLowerCase()}">${move.type}</span>
                    <div class="move-stats">
                        <div>PWR: ${move.power}</div>
                        <div>PP: ${move.pp}/${move.maxPp}</div>
                    </div>
                </div>
            `;

            moveCard.addEventListener('click', () => {
                if (!moveCard.disabled) {
                    this.executeMove(move);
                }
            });

            movesGrid.appendChild(moveCard);
        });
    }

    updateBattleLog() {
        const logContainer = document.getElementById('battleLog');
        logContainer.innerHTML = '';

        this.battleState.battleLog.forEach(entry => {
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            logEntry.textContent = entry;
            logContainer.appendChild(logEntry);
        });

        // Scroll to bottom
        logContainer.scrollTop = logContainer.scrollHeight;
    }

    updateTurnIndicator() {
        const turnIndicator = document.getElementById('turnIndicator');
        const battleStatus = document.getElementById('battleStatus');
        const animationStatus = document.getElementById('animationStatus');
        const battleCenter = document.querySelector('.battle-center');

        // Update turn indicator styling
        battleCenter.classList.remove('player-turn', 'opponent-turn');
        
        if (this.battleState.turn === 'player') {
            turnIndicator.textContent = 'Your Turn';
            battleCenter.classList.add('player-turn');
        } else {
            turnIndicator.textContent = "Opponent's Turn";
            battleCenter.classList.add('opponent-turn');
        }

        // Update battle status
        battleStatus.textContent = this.battleState.isBattleActive ? 'Battle in progress...' : 'Battle finished!';

        // Update animation status
        if (this.battleState.isAnimating) {
            animationStatus.textContent = 'Animating...';
        } else {
            animationStatus.textContent = '';
        }

        // Update new battle button
        const newBattleBtn = document.getElementById('newBattleBtn');
        newBattleBtn.disabled = this.battleState.isAnimating;
    }

    updateInfoTab() {
        const player = this.battleState.playerPokemon;
        const opponent = this.battleState.opponentPokemon;

        // Player info
        document.getElementById('playerInfoName').textContent = player.name;
        document.getElementById('playerInfoHp').textContent = `${player.hp}/${player.maxHp}`;
        document.getElementById('playerInfoAttack').textContent = player.attack;
        document.getElementById('playerInfoDefense').textContent = player.defense;
        document.getElementById('playerInfoSpeed').textContent = player.speed;

        // Opponent info
        document.getElementById('opponentInfoName').textContent = opponent.name;
        document.getElementById('opponentInfoHp').textContent = `${opponent.hp}/${opponent.maxHp}`;
        document.getElementById('opponentInfoAttack').textContent = opponent.attack;
        document.getElementById('opponentInfoDefense').textContent = opponent.defense;
        document.getElementById('opponentInfoSpeed').textContent = opponent.speed;
    }

    calculateDamage(attacker, defender, move) {
        const baseDamage = Math.floor(((2 * attacker.level / 5 + 2) * move.power * attacker.attack / defender.defense) / 50 + 2);
        const randomFactor = Math.random() * 0.4 + 0.8; // Random factor between 0.8 and 1.2
        return Math.floor(baseDamage * randomFactor);
    }

    async executeMove(move) {
        if (!this.battleState.isBattleActive || this.battleState.turn !== 'player' || this.battleState.isAnimating) {
            return;
        }

        this.battleState.isAnimating = true;
        this.selectedMove = move;
        this.updateMovesDisplay();
        this.updateTurnIndicator();

        // Check accuracy
        const accuracyCheck = Math.random() * 100 <= move.accuracy;
        if (!accuracyCheck) {
            this.battleState.battleLog.push(`${this.battleState.playerPokemon.name}'s ${move.name} missed!`);
            this.updateBattleLog();
            
            await this.sleep(1000);
            this.battleState.turn = 'opponent';
            this.battleState.isAnimating = false;
            this.updateTurnIndicator();
            
            setTimeout(() => this.opponentTurn(), 500);
            return;
        }

        // Calculate damage
        const damage = this.calculateDamage(this.battleState.playerPokemon, this.battleState.opponentPokemon, move);
        const newOpponentHp = Math.max(0, this.battleState.opponentPokemon.hp - damage);

        // Show attack animation
        await this.showAttackAnimation('player');
        
        // Show damage
        await this.showDamage('opponent', damage);

        // Update opponent HP
        this.battleState.opponentPokemon.hp = newOpponentHp;
        move.pp--;

        // Add to battle log
        this.battleState.battleLog.push(`${this.battleState.playerPokemon.name} used ${move.name}!`);
        this.battleState.battleLog.push(`It dealt ${damage} damage!`);

        this.updatePokemonDisplay();
        this.updateMovesDisplay();
        this.updateBattleLog();

        // Check for victory
        if (newOpponentHp === 0) {
            await this.sleep(500);
            this.endBattle('victory');
            return;
        }

        // Switch to opponent's turn
        this.battleState.turn = 'opponent';
        this.battleState.isAnimating = false;
        this.updateTurnIndicator();

        setTimeout(() => this.opponentTurn(), 1000);
    }

    async opponentTurn() {
        if (!this.battleState.isBattleActive || this.battleState.isAnimating) {
            return;
        }

        this.battleState.isAnimating = true;
        this.updateTurnIndicator();

        // Get available moves
        const availableMoves = this.battleState.opponentPokemon.moves.filter(move => move.pp > 0);
        if (availableMoves.length === 0) {
            this.battleState.battleLog.push(`${this.battleState.opponentPokemon.name} has no moves left!`);
            this.updateBattleLog();
            
            this.battleState.turn = 'player';
            this.battleState.isAnimating = false;
            this.updateTurnIndicator();
            return;
        }

        // Select random move
        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];

        // Check accuracy
        const accuracyCheck = Math.random() * 100 <= randomMove.accuracy;
        if (!accuracyCheck) {
            this.battleState.battleLog.push(`${this.battleState.opponentPokemon.name}'s ${randomMove.name} missed!`);
            this.updateBattleLog();
            
            await this.sleep(1000);
            this.battleState.turn = 'player';
            this.battleState.isAnimating = false;
            this.updateTurnIndicator();
            return;
        }

        // Calculate damage
        const damage = this.calculateDamage(this.battleState.opponentPokemon, this.battleState.playerPokemon, randomMove);
        const newPlayerHp = Math.max(0, this.battleState.playerPokemon.hp - damage);

        // Show attack animation
        await this.showAttackAnimation('opponent');
        
        // Show damage
        await this.showDamage('player', damage);

        // Update player HP
        this.battleState.playerPokemon.hp = newPlayerHp;
        randomMove.pp--;

        // Add to battle log
        this.battleState.battleLog.push(`${this.battleState.opponentPokemon.name} used ${randomMove.name}!`);
        this.battleState.battleLog.push(`It dealt ${damage} damage!`);

        this.updatePokemonDisplay();
        this.updateBattleLog();

        // Check for defeat
        if (newPlayerHp === 0) {
            await this.sleep(500);
            this.endBattle('defeat');
            return;
        }

        // Switch to player's turn
        this.battleState.turn = 'player';
        this.battleState.isAnimating = false;
        this.updateTurnIndicator();
    }

    async showAttackAnimation(attacker) {
        const imageElement = document.getElementById(`${attacker}PokemonImage`);
        imageElement.classList.add('attacking');
        
        await this.sleep(300);
        imageElement.classList.remove('attacking');
    }

    async showDamage(target, damage) {
        const imageElement = document.getElementById(`${target}PokemonImage`);
        const damageIndicator = document.getElementById(`${target}DamageIndicator`);
        
        // Show shake animation
        imageElement.classList.add('damaged');
        
        // Show damage number
        damageIndicator.textContent = `-${damage}`;
        damageIndicator.classList.add('show');
        
        await this.sleep(500);
        
        imageElement.classList.remove('damaged');
        damageIndicator.classList.remove('show');
    }

    endBattle(result) {
        this.battleState.isBattleActive = false;
        this.battleState.isAnimating = false;
        
        if (result === 'victory') {
            this.battleState.battleLog.push(`${this.battleState.playerPokemon.name} won the battle!`);
            this.showModal('victory', 'Victory!', `${this.battleState.playerPokemon.name} won the battle!`);
        } else {
            this.battleState.battleLog.push(`${this.battleState.opponentPokemon.name} won the battle!`);
            this.showModal('defeat', 'Defeat!', `${this.battleState.opponentPokemon.name} won the battle!`);
        }
        
        this.updateBattleLog();
        this.updateTurnIndicator();
    }

    showModal(type, title, message) {
        const modal = document.getElementById('battleModal');
        const modalContent = modal.querySelector('.modal-content');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');

        modalContent.className = `modal-content ${type}`;
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        
        modal.classList.add('show');
    }

    hideModal() {
        const modal = document.getElementById('battleModal');
        modal.classList.remove('show');
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PokemonBattleSimulator();
});