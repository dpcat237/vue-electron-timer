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
  </div>
</template>

<script>
const ALERT_THRESHOLD = 10
const FULL_DASH_ARRAY = 283
const WARNING_THRESHOLD = 25

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
  name: 'TimerClock',
  props: {
    timeLeft: {
      type: Number,
      default: 0,
    },
    timeLimit: {
      type: Number,
      default: 20, // seconds
    },
  },
  data() {
    return {
      fivePast: false,
      quartPast: false,
      percentage: 100,
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
        time = this.timeLeft.toFixed(3),
        hours = Math.floor(time / 60 / 60),
        minutes = Math.floor(time / 60) % 60,
        seconds = Math.floor(time - minutes * 60)
      return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`
    },
    timeFraction() {
      const rawTimeFraction = this.timeLeft / this.timeLimit
      return rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction)
    },
    remainingPathColor() {
      const { alert, warning, info } = COLOR_CODES
      if (this.percentage <= alert.threshold) {
        return alert.color
      } else if (this.percentage <= warning.threshold) {
        return warning.color
      } else {
        return info.color
      }
    },
  },
  watch: {
    timeLeft(newValue) {
      this.percentage = (newValue / this.timeLimit) * 100
    },
    timeLimit() {
      this.fivePast = false
      this.quartPast = false
      this.percentage = 100
    },
  },
}
</script>

<style scoped lang="scss">
.base-timer {
  position: relative;
  width: 300px;
  height: 300px;
  margin: auto;

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
