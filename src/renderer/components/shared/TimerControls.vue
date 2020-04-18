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
  methods: {
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
      this.$emit('startTimer')
    },
  },
}
</script>
