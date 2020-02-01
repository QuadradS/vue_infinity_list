<template>
    <div class="container">
        <h2 class="container--title">
            Users
        </h2>
        <div v-if="usersStatus === 'UPDATING' || usersStatus === 'UN_TOUCHED'">
            Wait
        </div>
        <div class="container--list" v-on:scroll="this.handleScroll">

            <div class="list-item" v-if="users !== 'ERROR'" v-for="u in users">
                <img class="list-item--img" v-bind:src="!!u.picture['large'] && u.picture.large "/>
                <p class="list-item--title">{{`Name: ${u.name.title} ${u.name.first}`}}</p>
                <p class="list-item--title">{{`Email: ${u.email}`}}</p>
                <p class="list-item--title">{{`Login: ${u.login.username}`}}</p>
                <p class="list-item--title">{{`Phone: ${u.phone}`}}</p>
            </div>
            <div class="container--error" v-if="users === 'ERROR'">
                Oppps smth is wrong :-(
            </div>

        </div>

    </div>
</template>

<script>

  import { debounce } from '@utils'

  export default {
    data: () => ({
      usersStatus: 'UN_TOUCHED',
      users: []
    }),
    methods: {
      handleScroll: debounce(function (evt) {
        if (evt.target.scrollTop > evt.target.scrollHeight - 920 && this.usersStatus !== 'UPDATED') {
          this.usersStatus = 'UPDATING'
          this.$http
              .get('https://randomuser.me/api/?results=40')
              .then((res) => {
                this.users = [...this.users, ...res.body.results]
                this.usersStatus = 'SUCCESS'
              })
              .catch((e) => this.users = 'ERROR')
        }
      }, 500)
    },
    mounted() {
      this.$http
          .get('https://randomuser.me/api/?results=40')
          .then((res) => {
            this.users = res.body.results
            this.usersStatus = 'SUCCESS'
          })
          .catch(() => this.users = 'ERROR')
    }
  }
</script>


<style scoped lang="scss">
    .container {

        margin: 40px 0;

        &--title {
            font-size: 20px;
            background: $light-grey;
            border: 1px solid $border-grey;
            border-radius: 4px;
            padding: 20px;
            box-sizing: border-box;
        }

        &--list {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin: 30px 0;
            max-height: 600px;
            overflow-y: auto;
        }

        &--error {
            width: 100%;
            text-align: center;
            font-size: 23px;
            color: #ff4855;
        }
    }

    .list-item {
        width: 49%;
        border-bottom: 2px solid $light-blue;
        padding: 10px 0;
        margin-bottom: 30px;

        &:nth-child(odd) {
            margin-right: 1%;
        }

        &:nth-child(even) {
            margin-left: 1%;
        }

        &--title {
            font-size: 18px;
            font-weight: 600;
            margin-top: 20px;
        }

        &--img {
            max-width: 100%;
            display: block;
            margin: auto;
            background: $light-grey;
            border-radius: 5px;
            border: 1px solid $border-grey;
            box-sizing: border-box;
        }
    }
</style>
