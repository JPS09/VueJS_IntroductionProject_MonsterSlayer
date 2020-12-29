function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
    };
  },
  methods: {
    attackMonster() {
      const attackValue = getRandomValue(5, 12);
      (this.playerHealth -= attackValue) < 0
        ? (this.playerHealth = 0)
        : (this.playerHealth -= attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      (this.playerHealth -= attackValue) < 0
        ? (this.playerHealth = 0)
        : (this.playerHealth -= attackValue);
    },
    specialAttackMonster() {
      const attackValue = getRandomValue(10, 25);
      (this.monsterHealth -= attackValue) < 0
        ? (this.monsterHealth = 0)
        : (this.monsterHealth -= attackValue);
      this.attackPlayer();
    },
  },
  computed: {
    monsterBar() {
      return { width: this.monsterHealth + "%" };
    },
    playerBar() {
      return { width: this.playerHealth + "%" };
    },
  },
});

app.mount("#game");
