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

        this.battleState = {};
        this.initializeGame();
        this.setupEventListeners();
    }

    initializeGame() {
        this.resetBattle();
    }

    setupEventListeners() {
        document.getElementById('newBattleBtn').addEventListener('click', () => this.resetBattle());
        document.getElementById('modalBtn').addEventListener('click', () => {
            this.hideModal();
            this.resetBattle();
        });
    }

    resetBattle() {
        const playerIndex = Math.floor(Math.random() * this.pokemonData.length);
        let opponentIndex;
        do {
            opponentIndex = Math.floor(Math.random() * this.pokemonData.length);
        } while (opponentIndex === playerIndex);

        this.battleState = {
            playerPokemon: JSON.parse(JSON.stringify(this.pokemonData[playerIndex])),
            opponentPokemon: JSON.parse(JSON.stringify(this.pokemonData[opponentIndex])),
            turn: 'player',
            battleLog: ["A new battle begins! Choose your move!"],
            isBattleActive: true,
            isAnimating: false,
        };
        
        this.updateUI();
    }
    
    updateUI() {
        this.updatePokemonDisplay('player', this.battleState.playerPokemon);
        this.updatePokemonDisplay('opponent', this.battleState.opponentPokemon);
        this.updateMovesDisplay();
        this.updateBattleLog();
        document.getElementById('newBattleBtn').disabled = this.battleState.isAnimating;
    }

    updatePokemonDisplay(pokemonRole, pokemon) {
        document.getElementById(`${pokemonRole}PokemonImage`).src = pokemon.image;
        document.getElementById(`${pokemonRole}PokemonName`).textContent = pokemon.name;
        document.getElementById(`${pokemonRole}PokemonLevel`).textContent = pokemon.level;
        document.getElementById(`${pokemonRole}HpText`).textContent = `${pokemon.hp}/${pokemon.maxHp}`;

        const hpBar = document.getElementById(`${pokemonRole}HpBar`);
        const hpPercentage = (pokemon.hp / pokemon.maxHp) * 100;
        hpBar.style.width = `${hpPercentage}%`;

        hpBar.classList.remove('low', 'critical');
        if (hpPercentage <= 20) {
            hpBar.classList.add('critical');
        } else if (hpPercentage <= 50) {
            hpBar.classList.add('low');
        }
    }

    updateMovesDisplay() {
        const movesGrid = document.getElementById('movesGrid');
        movesGrid.innerHTML = '';

        this.battleState.playerPokemon.moves.forEach(move => {
            const moveCard = document.createElement('div');
            moveCard.className = 'move-card';
            const isDisabled = !this.battleState.isBattleActive || this.battleState.turn !== 'player' || move.pp === 0 || this.battleState.isAnimating;
            
            if(isDisabled) {
                moveCard.setAttribute('disabled', true);
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
            
            if (!isDisabled) {
                moveCard.addEventListener('click', () => this.executeTurn('player', move));
            }

            movesGrid.appendChild(moveCard);
        });
    }

    updateBattleLog() {
        const logContainer = document.getElementById('battleLog');
        logContainer.innerHTML = this.battleState.battleLog.map(entry => `<div class="log-entry">${entry}</div>`).join('');
        logContainer.scrollTop = logContainer.scrollHeight;
    }

    calculateDamage(attacker, defender, move) {
        if (move.power === 0) return 0;
        const baseDamage = Math.floor(((2 * attacker.level / 5 + 2) * move.power * attacker.attack / defender.defense) / 50 + 2);
        const randomFactor = Math.random() * (1.2 - 0.8) + 0.8;
        return Math.floor(baseDamage * randomFactor);
    }

    async executeTurn(turnExecutor, move) {
        if (!this.battleState.isBattleActive || this.battleState.isAnimating) return;

        this.battleState.isAnimating = true;
        this.updateUI();

        const attacker = turnExecutor === 'player' ? this.battleState.playerPokemon : this.battleState.opponentPokemon;
        const defender = turnExecutor === 'player' ? this.battleState.opponentPokemon : this.battleState.playerPokemon;

        this.battleState.battleLog.push(`${attacker.name} used ${move.name}!`);

        const accuracyCheck = Math.random() * 100 < move.accuracy;
        if (!accuracyCheck) {
            this.battleState.battleLog.push("But it missed!");
            this.updateBattleLog();
        } else {
            const damage = this.calculateDamage(attacker, defender, move);
            defender.hp = Math.max(0, defender.hp - damage);
            move.pp--;
            
            if(damage > 0) {
                this.battleState.battleLog.push(`It dealt ${damage} damage!`);
            }
            
            await this.showAttackAnimation(turnExecutor, defender.name === this.battleState.playerPokemon.name ? 'player' : 'opponent', damage);
        }

        this.updateUI();
        
        if (defender.hp === 0) {
            await this.sleep(500);
            this.endBattle(attacker.name);
            return;
        }

        this.battleState.turn = (this.battleState.turn === 'player') ? 'opponent' : 'player';

        if (this.battleState.turn === 'opponent') {
            this.battleState.isAnimating = false; // Release lock for opponent's turn
            setTimeout(() => this.opponentTurn(), 1000);
        } else {
             this.battleState.isAnimating = false;
             this.updateUI(); // Re-enable player moves
        }
    }

    async opponentTurn() {
        const availableMoves = this.battleState.opponentPokemon.moves.filter(move => move.pp > 0);
        if (availableMoves.leng
