<template>
  <div>
    <app-timer-clock
      :time-left="timeLeft"
      :time-limit="timeLimit"
    />
    <app-timer-controls
      @pauseTimer="pauseTimer"
      @resumeTimer="resumeTimer"
      @startTimer="startTimer"
    />
  </div>
</template>

<script>
import TimerClock from './TimerClock'
import TimerControls from './TimerControls'

const HOUR = 3600

export default {
  name: 'TimerContainer',
  components: {
    'app-timer-clock': TimerClock,
    'app-timer-controls': TimerControls,
  },
  data() {
    return {
      paused: false,
      timeLimit: 0,
      timePassed: 0,
      timerInterval: null,
    }
  },
  computed: {
    timeLeft() {
      return this.timeLimit - this.timePassed
    },
  },
  watch: {
    timeLeft(newValue) {
      if (newValue === 0) {
        this.onTimesUp()
      }
    },
    timePassed(newValue) {
      if (newValue !== 0 && this.timeLeft > 0) {
        this.saveTime()
      }
    },
  },
  mounted() {
    this.restoreTime()
  },
  methods: {
    saveTime() {
      if (this.timePassed > 0) {
        let data = {
          timeLimit: this.timeLimit,
          timePast: this.timePassed,
        }
        this.$store.dispatch('saveTime', data)
      }
    },
    resumeTimer() {
      this.paused = false
      this.start()
    },
    onTimesUp() {
      clearInterval(this.timerInterval)
    },
    pauseTimer() {
      this.paused = true
      this.timerInterval = clearInterval(this.timerInterval)
    },
    restoreTime() {
      let timeLimit = this.$store.getters.time.timeLimit
      let timePast = this.$store.getters.time.timePast
      if (timeLimit > 0) {
        this.timeLimit = timeLimit
        this.timePassed = timePast
        this.paused = true
      }
    },
    setTimeLimit(hours, minutes, seconds) {
      let secTotal = parseInt(seconds, 10)
      if (hours > 0) {
        secTotal += hours * HOUR
      }
      if (minutes > 0) {
        secTotal += minutes * 60
      }
      if (secTotal > 0) {
        this.timeLimit = secTotal
        return
      }
      this.timeLimit = 20
    },
    start() {
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000)
    },
    startTimer(data) {
      this.setTimeLimit(data.hours, data.minutes, data.seconds)
      this.paused = false
      if (this.timerInterval !== 0) {
        clearInterval(this.timerInterval)
      }
      this.timePassed = 0
      this.$store.dispatch('cleanTime')
      this.start()
    },
  },
}
</script>
