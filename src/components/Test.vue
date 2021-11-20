<template>
  <div>
    <v-row>
      <v-col>
        <v-card class="px-5 py-5">
          <h2>Current Camera</h2>
          <!-- <code v-if="device">{{ device.label }}</code> -->

          <div class="border">
            <vue-web-cam
              class="mt-4"
              ref="webcam"
              :device-id="deviceId"
              :width="this.width"
              :height="this.height"
              @started="onStarted"
              @stopped="onStopped"
              @error="onError"
              @cameras="onCameras"
              @camera-change="onCameraChange"
            />
            <img
              :src="img"
              style="width: 100%; height: 100%"
              v-if="stopCamera == true"
            />
          </div>
          <v-btn
            block
            @click="onCapture"
            color="black"
            dark
            v-if="stopCamera == false"
          >
            Capture Photo
          </v-btn>
          <v-btn
            block
            color="black"
            dark
            @click="onRetake"
            v-if="stopCamera == true"
          >
            Retake Photo
          </v-btn>

          <select v-model="camera" style="width: 100%" class="mt-2">
            <option>-- Select Device --</option>
            <option
              v-for="device in devices"
              :key="device.deviceId"
              :value="device.deviceId"
            >
              {{ device.label }}
            </option>
          </select>
          <!-- <v-select
            label="label"
            :items="devices"
            v-model="camera"
            :key="device.deviceId"
            :value="device.deviceId"
            :text="device.label"
            autocomplete
          >
          </v-select> -->
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { WebCam } from "vue-web-cam";

export default {
  name: "App",
  components: {
    "vue-web-cam": WebCam
  },
  data() {
    return {
      width: "100%",
      height: "100%",
      stopCamera: false,
      img: null,
      camera: null,
      deviceId: null,
      devices: []
    };
  },
  computed: {
    device: function() {
      return this.devices.find(n => n.deviceId === this.deviceId);
    }
  },
  watch: {
    camera: function(id) {
      this.deviceId = id;
    },
    devices: function() {
      // Once we have a list select the first one
      const [first, ...tail] = this.devices;
      console.log(first);
      console.log(tail);
      if (first) {
        this.camera = first.deviceId;
        this.deviceId = first.deviceId;
      }
    }
  },
  methods: {
    onCapture() {
      this.stopCamera = true;
      this.width = "1%";
      this.height = "1%";
      this.img = this.$refs.webcam.capture();
      this.$emit("GetImage", this.$refs.webcam.capture());
      this.onStop();
    },
    onRetake() {
      this.img = "";
      this.width = "100%";
      this.height = "100%";
      this.onStart();
      this.stopCamera = false;
    },
    onStarted(stream) {
      console.log("On Started Event", stream);
    },
    onStopped(stream) {
      console.log("On Stopped Event", stream);
    },
    onStop() {
      this.$refs.webcam.stop();
    },
    onStart() {
      this.$refs.webcam.start();
    },
    onError(error) {
      console.log("On Error Event", error);
    },
    onCameras(cameras) {
      this.devices = cameras;
      console.log("On Cameras Event", cameras);
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
      console.log("On Camera Change Event", deviceId);
    }
  }
};
</script>
