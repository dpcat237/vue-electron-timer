<template>
  <div>
    <v-container class="mt-5">
      <v-row justify="center">
        <v-col
          cols="3"
          sm="2"
          md="4"
        >
          <v-text-field
            v-model="timeHours"
            label="hours"
            outlined
            type="number"
            @focusin="selectText"
          />
        </v-col>
        <v-col
          cols="3"
          sm="2"
          md="4"
        >
          <v-text-field
            v-model="timeMinutes"
            label="minutes"
            outlined
            type="number"
            @focusin="selectText"
          />
        </v-col>
        <v-col
          cols="3"
          sm="2"
          md="4"
        >
          <v-text-field
            v-model="timeSeconds"
            label="seconds"
            outlined
            type="number"
            @focusin="selectText"
          />
        </v-col>
      </v-row>
    </v-container>
    <div>
      <v-btn
        class="mr-5"
        color="success"
        @click="startTimer"
      >
        Start
      </v-btn>
      <v-btn
        v-if="paused"
        color="primary"
        @click="resumeTimer"
      >
        Resume
      </v-btn>
      <v-btn
        v-else
        color="secondary"
        @click="pauseTimer"
      >
        Pause
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimerControls',
  data() {
    return {
      paused: true,
      timeHours: null,
      timeLimit: 20, // seconds
      timeMinutes: null,
      timePassed: 0,
      timeSeconds: null,
      timerInterval: null,
    }
  },
  mounted() {
    this.keyListener()
  },
  methods: {
    cleanData() {
      this.timeHours = 0
      this.timeMinutes = 0
      this.timeSeconds = 0
    },
    keyListener() {
      let $el = this
      window.addEventListener('keypress', function (e) {
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
    pauseTimer() {
      this.paused = true
      this.$emit('pauseTimer')
    },
    resumeTimer() {
      this.paused = false
      this.$emit('resumeTimer')
    },
    selectText(e) {
      e.target.select()
    },
    startTimer() {
      let data = {
        hours:
          typeof this.timeHours !== 'undefined' && this.timeHours !== null && this.timeHours !== ''
            ? this.timeHours
            : 0,
        minutes:
          typeof this.timeMinutes !== 'undefined' &&
          this.timeMinutes !== null &&
          this.timeMinutes !== ''
            ? this.timeMinutes
            : 0,
        seconds:
          typeof this.timeSeconds !== 'undefined' &&
          this.timeSeconds !== null &&
          this.timeSeconds !== ''
            ? this.timeSeconds
            : 0,
      }
      if (data.hours === 0 && data.minutes === 0 && data.seconds === 0) {
        return
      }

      this.paused = false
      this.$emit('startTimer', data)
      this.cleanData()
    },
  },
}
</script>
