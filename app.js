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
      if ((this.monsterHealth -= attackValue) < 0) {
        this.monsterHealth = 0;
      } else {
        this.monsterHealth -= attackValue;
      }
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      if ((this.playerHealth -= attackValue) < 0) {
        this.playerHealth = 0;
      } else {
        this.playerHealth -= attackValue;
      }
      console.log(this.playerHealth);
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
