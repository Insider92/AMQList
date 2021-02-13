<template>
  <div class="list row">
    <div class="col-md-12">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Songs List</h4>

    </div>
    <div class="col-md-6">
      <div v-if="currentSong">
      </div>
      <div v-else>
        <br />
        <p>Please click on a Song...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "../services/ApiService";

export default {
  name: "songs",
  data() {
    return {
      songs: [],
      currentSong: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    
    searchTitle() {
      ApiService.findByTitle(this.title)
        .then(response => {
          this.songs = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
  }
};
</script>

<style>
.list {
  text-align: left;
  margin: auto;
}
</style>