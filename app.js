function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      round: 0,
    };
  },
  methods: {
    attackMonster() {
      this.round++;
      const attackValue = getRandomValue(5, 12);
      (this.monsterHealth -= attackValue) < 0
        ? (this.monsterHealth = 0)
        : (this.monsterHealth -= attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      (this.playerHealth -= attackValue) < 0
        ? (this.playerHealth = 0)
        : (this.playerHealth -= attackValue);
    },
    specialAttackMonster() {
      this.round++;
      const attackValue = getRandomValue(10, 25);
      (this.monsterHealth -= attackValue) < 0
        ? (this.monsterHealth = 0)
        : (this.monsterHealth -= attackValue);
      this.attackPlayer();
    },
    healPlayer(){
      const healValue = getRandomValue(8,20);
      this.playerHealth += healValue;
    }
  },
  computed: {
    monsterBar() {
      return { width: this.monsterHealth + "%" };
    },
    playerBar() {
      return { width: this.playerHealth + "%" };
    },
    disableButtonRound(){
      return this.round % 3 !== 0
    }
  },
});

app.mount("#game");
