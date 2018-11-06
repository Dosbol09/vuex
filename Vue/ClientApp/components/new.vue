<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" v-model.lazy="username" name="username" class="form-control"  />
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model.lazy="password" name="password" class="form-control"  />

            </div>
            <div class="form-group">
                <button type="submit" class="btn-submit" >Login</button>
              </div>
        </form>
    </div>
</template>

<script>
import {AUTH_REQUEST} from '../store/actions/auth'

export default {

  name: 'login',
    data () {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      login: function () {
        const { username, password } = this
        this.$store.dispatch(AUTH_REQUEST, { username, password }).then((response) => {
          console.log(response.data);
        }).
        catc((error)=>{
          console.log(error);
        })
      }

    }
};
</script>
