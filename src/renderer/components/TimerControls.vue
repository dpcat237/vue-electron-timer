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
        @click="startTimer"
      >
        Start
      </v-btn>
      <v-btn
        v-if="paused"
        @click="resumeTimer"
      >
        Resume
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
export default {
  name: 'TimerControls',
  data() {
    return {
      paused: false,
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
    pauseTimer() {
      this.$emit('pauseTimer')
    },
    resumeTimer() {
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
      this.$emit('startTimer', data)
    },
  },
}
</script>
