<template>
  <div class="about">
    <v-card
      flat
      style="height: 100vh; background: url('') no-repeat center center fixed"
      class="pt-15 px-5 py-5 align-center justify-center"
    >
      <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row class="px-5">
            <v-col class="text-center">
              <v-img
                src="https://cdn.dribbble.com/users/37530/screenshots/2937858/drib_blink_bot.gif"
              />

              <h1 style="font-size: 3em" class="font-weight-black">
                SCAN<span class="teal--text text--accent-3">BOT</span>
              </h1>
            </v-col>
          </v-row>

          <v-row class="px-5">
            <v-col xl="12">
              <v-text-field
                append-icon="mdi-account-outline"
                label="Username"
                v-model="username"
                :rules="usernameRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="px-5">
            <v-col>
              <v-text-field
                type="password"
                label="Password"
                append-icon="mdi-lock-outline"
                v-model="password"
                :rules="passwordRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="px-5">
            <v-col class="text-center">
              <v-btn @click="onLogin()" block large dark color="teal accent-3"
                >Sign in <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row class="text-center">
            <v-col>
              <p class="text--secondary">
                Forgot password?
                <span class="teal--text text--accent-3"> Click here</span>
              </p>
            </v-col>
          </v-row>

          <v-row class="px-5">
            <v-col>
              <v-btn class="mx-2" dark color="black" block>
                <v-icon dark class="mr-2"> mdi-facebook </v-icon>
                facebook
              </v-btn>
            </v-col>
            <v-col>
              <v-btn class="mx-2" dark color="black" block>
                <v-icon dark class="mr-2"> mdi-google </v-icon>
                google
              </v-btn>
            </v-col>
          </v-row>

          <!-- <v-row class="px-5 text-center">
              <v-col>
                <a color="primary" class="text--secondary">Forgot password?</a>
              </v-col>
            </v-row> -->
        </v-form>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      // Inputs
      username: "",
      password: "",

      // Validators
      valid: true,
      usernameRules: [v => !!v || "Username is required"],
      passwordRules: [v => !!v || "Password is required"]
    };
  },
  methods: {
    onLogin() {
      if (this.$refs.form.validate()) {
        axios
          .post("http://localhost:3001/users/get", {
            user_username: this.username,
            user_password: this.password
          })
          .then(
            response => {
              console.log(response);
              if (response.data.status == "success") {
                this.$router.push("/Home");
              } else {
                alert("asd");
              }
            },
            error => {
              console.log(error);
            }
          );
      } else {
        console.log("asd");
      }
    }
  }
};
</script>
