<template>
  <div class="container">
    <div class="row" v-if="isNotlogged">
      <form class="col-4 mx-auto mt-5" @submit.prevent="login()">
        <h2>Login</h2>
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input
            v-model="user.email"
            type="email"
            name="email"
            class="form-control"
            :class="{ 'is-invalid': errors.email }"
          />
          <div v-if="errors.email" class="invalid-feedback">
            {{ errors.email[0] }}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input
            v-model="user.password"
            type="password"
            name="password"
            class="form-control"
            :class="{ 'is-invalid': errors.password }"
          />
          <div v-if="errors.password" class="invalid-feedback">
            {{ errors.password[0] }}
          </div>
        </div>

        <button type="submit" class="btn btn-primary">
          <span class="spinner-border" v-if="loading"></span>Login
        </button>
        <div v-if="mess" class="text-danger">
          {{ mess }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BaseRequest from '../core/BaseRequest';
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      isNotlogged: false,
      errors: {},
      mess: "",
      loading: false,
    };
  },
  mounted() {
    this.checkLoggedIn();
  },
  methods: {
    login: function () {
      this.loading = true;
      BaseRequest
        .post("login", this.user)
        .then((response) => {
          window.localStorage.setItem("token", response.data.token);
          this.$router.push({ name: "dashboard" });
        })
        .catch((error) => {
           console.log(error.response);
          this.loading = false;
          if (error.response.data.mess) {
            this.mess = error.response.data.mess;
          } else {
            this.mess = "";
          }
          if (error.response.data.errors) {
            this.errors = error.response.data.errors;
          }
        });
    },
    checkLoggedIn: function () {
      
        BaseRequest
          .get("user")
          .then(() => {
            this.isNotlogged = false;
            this.$router.push({ name: "dashboard" });
          })
          .catch(() => {
            this.isNotlogged = true;
          });
      
    },
  },
};
</script>

<style>
</style>