<template>
  <div>
    <qrcode-stream
      @decode="onDecode"
      @init="onInit"
      v-if="this.choose == false"
      style="height: 85vh; position: fixed"
    />
    <StreamBarcodeReader v-if="this.choose == 'sadasds'"></StreamBarcodeReader>

    <v-dialog v-model="showDialog" persistent>
      <v-card class="px-2 py-2">
        <div class="text-center mt-5" v-if="this.loader == true">
          <h1 class="text-uppercase title">LOADING QR CODE</h1>
          <p class="text--secondary">Please wait for a second..</p>
          <img
            style="width: 100%"
            src="https://i.pinimg.com/originals/19/c2/d0/19c2d0843f5c5e952c5ae50af9678fd1.gif"
            alt=""
          />
        </div>

        <div v-if="this.loader == false">
          <v-card-title> Results </v-card-title>
          <v-card-subtitle> Scanned item result. </v-card-subtitle>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row class="px-5">
              <v-col>
                <p>{{ this.result }}</p>
              </v-col>
            </v-row>

            <v-row class="px-5">
              <v-col>
                <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  dense
                  outlined
                  label="Name"
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row class="px-5">
              <v-col>
                <v-textarea v-model="description" outlined label="Description">
                </v-textarea>
              </v-col>
            </v-row>

            <v-row class="px-5">
              <v-col>
                <v-subheader style="padding: 0">Attachments</v-subheader>
                <Test @GetImage="onGetImage" v-if="this.choose == true" />
              </v-col>
            </v-row>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="" text @click="onRescan()"> Re-scan </v-btn>
              <v-btn dark @click="validate()"> Confirm </v-btn>
            </v-card-actions>
          </v-form>
        </div>
      </v-card>
    </v-dialog>

    <v-snackbar top right v-model="snackbarStatus" :color="snackbarColor">
      {{ snackbarText }}
      <p>{{ snackbarDesc }}</p>
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbarStatus = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
import { StreamBarcodeReader } from "vue-barcode-reader";
import Test from "@/components/Test.vue";
import moment from "moment";
import axios from "axios";

export default {
  components: {
    QrcodeStream,
    StreamBarcodeReader,
    Test
  },

  data() {
    return {
      // Validators
      valid: true,
      nameRules: [
        v => !!v || "Name is required"
        // v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],

      // Snackbars
      snackbarStatus: false,
      snackbarText: "",
      snackbarDesc: "",
      snackbarColor: "",

      loader: false,
      name: "",
      choose: "sadasds",
      result: "",
      description: "",
      error: "",
      img: "",
      showButton: false,
      showDialog: false,
      showDialog2: false
    };
  },
  mounted() {},

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.onConfirm();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    onGetImage(img) {
      console.log(img);
      this.img = img;
    },
    onRescan() {
      this.result = "";
      this.showDialog = false;
      this.choose = false;
    },
    onConfirm() {
      const self = this;
      axios
        .post("http://localhost:3001/files", {
          scanned_img: this.img
        })
        .then(
          response => {
            axios
              .post("http://localhost:3001/scans", {
                // scanned_name: this.name,
                // scanned_desc: this.description,
                // scanned_created: moment().format(),
                // scanned_time: moment().format("hh:mm:ss a"),
                // scanned_result: this.result,
                // scanned_img: this.img,
                // scanned_user: 1
                scanned_name: self.name,
                scanned_desc: self.description,
                scanned_created: moment().format(),
                scanned_time: moment().format("hh:mm:ss a"),
                scanned_result: this.result,
                scanned_img: response.data.file_path,
                scanned_user: 1
              })
              .then(
                response => {
                  console.log(response);

                  this.snackbarStatus = true;
                  this.snackbarText = "Success";
                  this.snackbarDesc = "Record Successfully Created";
                  this.snackbarColor = "black";

                  this.$store.commit("createScanned", {
                    scanned_id: response.data.insert_id,
                    scanned_created: moment().format(),
                    scanned_img: response.data.payload.scanned_img,
                    scanned_result: this.result,
                    scanned_desc: this.description,
                    scanned_name: this.name,
                    scanned_time: moment().format("hh:mm:ss a")
                  });

                  // this.$refs.form.reset();
                  // this.$refs.form.resetValidation();
                  // this.img = "";
                },
                error => {
                  console.log(error);

                  self.snackbarStatus = true;
                  self.snackbarText = "Failed";
                  self.snackbarDesc = "Failed to create record";
                  self.snackbarColor = "black";
                }
              );

            // this.$store.dispatch("createScanned", { description: this.description });
          },
          error => {
            console.log(error);
          }
        );
      this.showDialog = false;
      this.choose = false;
      this.showDialog2 = true;
    },
    onDecode(result) {
      this.loader = true;
      setTimeout(() => {
        this.loader = false;
      }, 2000);

      this.result = result;
      this.name = result;
      this.choose = true;
      this.showButton = true;
      this.showDialog = true;
    },

    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    }
  }
};
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>
