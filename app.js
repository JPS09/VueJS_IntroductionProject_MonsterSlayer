function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      round: 0,
      winner: null,
      logs: [],
    };
  },
  methods: {
    attackMonster() {
      this.round++;
      const attackValue = getRandomValue(5, 12);
      (this.monsterHealth -= attackValue) < 0
        ? (this.monsterHealth = 0)
        : (this.monsterHealth -= attackValue);
        this.battleLog('player', 'attack', attackValue)
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      (this.playerHealth -= attackValue) < 0
        ? (this.playerHealth = 0)
        : (this.playerHealth -= attackValue);
        this.battleLog('monster', 'attack', attackValue)
    },
    specialAttackMonster() {
      this.round++;
      const attackValue = getRandomValue(10, 25);
      (this.monsterHealth -= attackValue) < 0
        ? (this.monsterHealth = 0)
        : (this.monsterHealth -= attackValue);
        this.battleLog('player', 'Special attacked', attackValue)
      this.attackPlayer();
    },
    healPlayer() {
      this.round++;
      const healValue = getRandomValue(8, 20);
      (this.playerHealth += healValue) > 100
        ? (this.playerHealth = 100)
        : (this.playerHealth += healValue);
        this.battleLog('player', 'healed', healValue)
      this.attackPlayer();
    },
    resetGame() {
      this.round = 0;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.logs = [];
    },
    surrenderButton() {
      this.winner = "surrender";
    },
    battleLog(who, what, value) {
      this.logs.unshift(`${who} ${what} for ${value}`);
    },
  },
  computed: {
    monsterBar() {
      if (this.monsterHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBar() {
      if (this.playerHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.round % 3 !== 0;
    },
    mayUseHeal() {
      return this.round % 4 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
});

app.mount("#game");
