<template>
  <div v-if="currentSong" class="edit-form">
    <h4>Song</h4>
    <form>
      <div class="form-group">
        <label for="title">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="currentSong.name"
        />
      </div>
      <div class="form-group">
        <label for="artist">Artist</label>
        <input
          type="text"
          class="form-control"
          id="artist"
          v-model="currentSong.artist"
        />
      </div>
      <div class="form-group">
        <label for="anime">Anime</label>
        <input
          type="text"
          class="form-control"
          id="anime"
          v-model="currentSong.anime"
        />
      </div>
      <div class="form-group">
        <label for="tags">Tags</label>
        <input
          type="text"
          class="form-control"
          id="tags"
          v-model="currentSong.tags"
        />
      </div>

      <div class="form-group">
        <label for="alias">Alias</label>
        <input
          type="text"
          class="form-control"
          id="alias"
          v-model="currentSong.alias"
        />
      </div>
    </form>

    <button class="badge badge-danger mr-2" @click="deleteSong">Delete</button>

    <button type="submit" class="badge badge-success" @click="updateSong">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Song...</p>
  </div>
</template>

<script>
import ApiService from "../services/ApiService";

export default {
  name: "song",
  data() {
    return {
      currentSong: null,
      message: "",
    };
  },
  methods: {
    getSong(id) {
      ApiService.get(id)
        .then((response) => {
          this.currentSong = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateSong() {
      const { _id, ...songEntities} = this.currentSong
      ApiService.update(_id, songEntities)
        .then((response) => {
          console.log(response);
          this.message = "The song was updated successfully!";
        })
        .catch((error) => {
          console.log(error);
          this.message = error;
        });
    },

    deleteSong() {
      ApiService.delete(this.currentSong._id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "songs" });
        })
        .catch((error) => {
          console.log(error);
          this.message = error;
        });
    },
  },
  mounted() {
    this.message = "";
    this.getSong(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}

.required label::after {
    content: " *";
    color: red;
}
</style>