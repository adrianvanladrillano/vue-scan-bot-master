<template>
  <div class="about">
    <v-card
      flat
      style="height: 100vh; background: url('') no-repeat center center fixed"
      class="pt-15 px-5 py-5 align-center justify-center"
    >
      <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col>
              <h1>Register here.</h1>
              <p class="subtitle-2 text--secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="name"
                dense
                outlined=""
                label="Name"
                :rules="nameRules"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-autocomplete
                dense
                outlined=""
                label="Gender"
                v-model="gender"
                :items="gender_select"
                :rules="genderRules"
              >
              </v-autocomplete>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                dense
                outlined=""
                v-model="username"
                label="Username"
                :rules="usernameRules"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                dense
                v-model="email"
                outlined=""
                label="Email Address"
                :rules="emailRules"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                dense
                outlined=""
                v-model="password"
                label="Password"
                :rules="passwordRules"
              >
              </v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                dense
                outlined=""
                v-model="confirm"
                label="Confirm Password"
                :rules="confirmRules"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-btn block dark color="black" @click="onValidate()">
                Register
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  components: {},
  data() {
    return {
      //Form inputs
      gender_select: ["Male", "Female"],
      name: "",
      gender: "",
      email: "",
      username: "",
      password: "",
      confirm: "",

      //   Validators
      valid: true,
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 30) || "Name must be less than 30 characters"
      ],

      genderRules: [v => !!v || "Gender is required"],
      emailRules: [
        v => !!v || "E-mail is required",
        v => (v && v.length <= 30) || "E-mail must be less than 30 characters",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      usernameRules: [
        v => !!v || "Username is required",
        v => (v && v.length <= 30) || "Username must be less than 30 characters"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v =>
          (v && v.length <= 30) || "Password must be less than 30 characters",
        v => (v && this.password != this.confirm) || "Must match"
      ],
      confirmRules: [
        v => !!v || "Confirm Password is required",
        v =>
          (v && v.length <= 30) ||
          "Confirm Password must be less than 30 characters",
        v => (v && this.password != this.confirm) || "Must match"
      ]
    };
  },
  methods: {
    onValidate() {
      if (this.$refs.form.validate()) {
        this.onConfirm();
      }
    },
    onConfirm() {
      axios
        .post("http://localhost:3001/users", {
          user_username: this.username,
          user_password: this.password,
          user_email: this.email,
          user_name: this.name,
          user_created: moment().format(),
          user_type: "regular"
        })
        .then(
          response => {
            console.log(response);
            this.$router.push("/");
          },
          error => {
            console.log(error);
          }
        );
    },
    onReset() {
      this.$refs.form.reset();
    },
    onResetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>
