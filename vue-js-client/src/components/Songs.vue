<template>
  <div class="list row">
    <div class="col-md-8">
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
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(song, index) in songs"
          :key="index"
          @click="setActiveSong(song, index)"
        >
          {{ song.name }}
        </li>
      </ul>

    </div>
    <div class="col-md-6">
      <div v-if="currentSong">
        <h4>Song</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentSong.name }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentSong.artist }}
        </div>


        <a class="badge badge-warning"
          :href="'/songs/' + currentSong._id"
        >
          Edit
        </a>
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
    retrieveSongs() {
      ApiService.getAll()
        .then(response => {
          this.songs = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveSongs();
      this.currentSong = null;
      this.currentIndex = -1;
    },

    setActiveSong(song, index) {
      this.currentSong = song;
      this.currentIndex = index;
    },
    
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
    this.retrieveSongs();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>