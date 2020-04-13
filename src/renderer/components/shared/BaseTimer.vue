<template>
  <div class="base-timer">
    <svg
      class="base-timer__svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="base-timer__circle">
        <circle
          class="base-timer__path-elapsed"
          cx="50"
          cy="50"
          r="45"
        />
        <path
          :stroke-dasharray="circleDasharray"
          class="base-timer__path-remaining"
          :class="remainingPathColor"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        />
      </g>
    </svg>
    <span class="base-timer__label">{{ formattedTimeLeft }}</span>
    <v-container class="mt-5">
      <v-row justify="center">
        <v-col
          cols="3"
          sm="1"
          md="4"
        >
          <v-text-field
            v-model="timeHours"
            label="hours"
            outlined
            type="number"
          />
        </v-col>
        <v-col
          cols="3"
          sm="1"
          md="4"
        >
          <v-text-field
            v-model="timeMinutes"
            label="minutes"
            outlined
            type="number"
          />
        </v-col>
        <v-col
          cols="3"
          sm="1"
          md="4"
        >
          <v-text-field
            v-model="timeSeconds"
            label="seconds"
            outlined
            type="number"
          />
        </v-col>
      </v-row>
    </v-container>
    <div>
      <v-btn
        class="mr-5"
        @click="startTimer"
      >
        Start
      </v-btn>
      <v-btn
        v-if="paused"
        @click="continueTimer"
      >
        Continue
      </v-btn>
      <v-btn
        v-else
        @click="pauseTimer"
      >
        Pause
      </v-btn>
    </div>
  </div>
</template>

<script>
const ALERT_THRESHOLD = 5
const FULL_DASH_ARRAY = 283
const HOUR = 3600
const WARNING_THRESHOLD = 10

const COLOR_CODES = {
  info: {
    color: 'green',
  },
  warning: {
    color: 'orange',
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: 'red',
    threshold: ALERT_THRESHOLD,
  },
}

export default {
  name: 'BaseTimer',
  data() {
    return {
      paused: false,
      timeHours: 0,
      timeLimit: 20, // seconds
      timeMinutes: 0,
      timePassed: 0,
      timeSeconds: 0,
      timerInterval: null,
    }
  },

  computed: {
    circleDasharray() {
      return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`
    },
    formattedTimeLeft() {
      let pad = function(num, size) {
          return ('000' + num).slice(size * -1)
        },
        time = parseFloat(this.timeLeft).toFixed(3),
        hours = Math.floor(time / 60 / 60),
        minutes = Math.floor(time / 60) % 60,
        seconds = Math.floor(time - minutes * 60)
      return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`
    },
    timeLeft() {
      return this.timeLimit - this.timePassed
    },
    timeFraction() {
      const rawTimeFraction = this.timeLeft / this.timeLimit
      return rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction)
    },
    remainingPathColor() {
      const { alert, warning, info } = COLOR_CODES

      if (this.timeLeft <= alert.threshold) {
        return alert.color
      } else if (this.timeLeft <= warning.threshold) {
        return warning.color
      } else {
        return info.color
      }
    },
  },

  watch: {
    timeLeft(newValue) {
      if (newValue === 0) {
        this.onTimesUp()
      }
    },
  },

  methods: {
    continueTimer() {
      this.paused = false
      this.start()
    },
    setTimeLimit() {
      let seconds = parseInt(this.timeSeconds, 10)
      if (this.timeHours > 0) {
        seconds += this.timeHours * HOUR
      }
      if (this.timeMinutes > 0) {
        seconds += this.timeMinutes * 60
      }
      if (seconds > 0) {
        this.timeLimit = seconds
        return
      }
      this.timeLimit = 20
    },
    onTimesUp() {
      clearInterval(this.timerInterval)
    },
    pauseTimer() {
      this.paused = true
      this.timerInterval = clearInterval(this.timerInterval)
    },
    start() {
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000)
    },
    startTimer() {
      this.setTimeLimit()
      this.paused = false
      if (this.timerInterval !== 0) {
        clearInterval(this.timerInterval)
      }
      this.timePassed = 0
      this.start()
    },
  },
}
</script>

<style scoped lang="scss">
.base-timer {
  position: relative;
  width: 300px;
  height: 300px;

  &__svg {
    transform: scaleX(-1);
  }

  &__circle {
    fill: none;
    stroke: none;
  }

  &__path-elapsed {
    stroke-width: 7px;
    stroke: grey;
  }

  &__path-remaining {
    stroke-width: 7px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 1s linear all;
    fill-rule: nonzero;
    stroke: currentColor;

    &.green {
      color: rgb(65, 184, 131);
    }

    &.orange {
      color: orange;
    }

    &.red {
      color: red;
    }
  }

  &__label {
    position: absolute;
    width: 300px;
    height: 300px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
  }
}
</style>
