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

export default {
  name: 'TimerContainer',
  components: {
    'app-timer-clock': TimerClock,
    'app-timer-controls': TimerControls,
  },
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
    this.keyListener()
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
    keyListener() {
      let $el = this
      window.addEventListener('keypress', function(e) {
        // Space
        if (e.keyCode === 32) {
          if ($el.paused) {
            $el.resumeTimer()
          } else {
            $el.pauseTimer()
          }
        }
        // Enter
        if (e.keyCode === 13) {
          $el.startTimer()
        }
      })
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
      this.$store.dispatch('cleanTime')
      this.start()
    },
  },
}
</script>
