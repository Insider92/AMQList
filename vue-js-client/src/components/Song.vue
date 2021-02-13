<template>
  <div v-if="existingSong" class="edit-form">
    <h4>Song</h4>
    <form>
      <div class="form-group">
        <label for="name">Name <span class="text-danger">*</span></label>
        <input
          class="form-control"
          placeholder="Name of the song"
          :class="{ 'is-invalid': validationStatus($v.name) }"
          v-model="$v.name.$model"
        />
        <div v-if="!$v.name.required" class="invalid-feedback">
          Field is required
        </div>
      </div>
      <div class="form-group">
        <label for="artist">Artist</label>
        <input class="form-control" placeholder="Name of the artist" v-model="artist" />
      </div>
      <div class="form-group">
        <label for="anime">Anime <span class="text-danger">*</span></label>
        <input
          class="form-control"
          placeholder="Name of the anime"
          :class="{ 'is-invalid': validationStatus($v.anime) }"
          v-model="$v.anime.$model"
        />
        <div v-if="!$v.anime.required" class="invalid-feedback">
          Field is required
        </div>
      </div>

      <div class="form-group">
        <label for="tags">Tags</label>
        <b-form-tags
          v-model="tags"
          placeholder="Enter new tags separated by space, comma or semicolon..."
          separator=" ,;"
        ></b-form-tags>
      </div>

      <div class="form-group">
        <label for="alias">Alias</label>
        <b-form-tags
          v-model="alias"
          placeholder="Enter new alias separated by space, comma or semicolon..."
          separator=" ,;"
        ></b-form-tags>
      </div>
    </form>

    <button class="btn btn-danger mr-2" @click="deleteSong">Delete</button>

    <button
      type="submit"
      class="btn btn-success mr-2"
      :disabled="$v.$invalid"
      @click="updateSong"
    >
      Update
    </button>

    <button class="btn badge-info" @click="discardSong">Discard</button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>
      Please click on a Song - the song with the id
      <b>{{ $route.params.id }}</b> is not in the database :(
    </p>
  </div>
</template>

<script>
import ApiService from "../services/ApiService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "song",
  data() {
    return {
      id: "",
      name: "",
      artist: "",
      anime: "",
      tags: [],
      alias: [],
      message: "",
      existingSong: false,
    };
  },
  validations: {
    name: {
      required,
    },
    anime: {
      required,
    },
  },
  methods: {
    getSong(id) {
      ApiService.get(id)
        .then((response) => {
          const { _id, name, artist, anime, tags, alias } = response.data;
          this.id = _id;
          this.name = name;
          this.artist = artist;
          this.anime = anime;
          this.tags = tags;
          this.alias = alias;
          this.existingSong = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateSong() {
      const toBeUpdatedSong = {
        name: this.name,
        artist: this.artist,
        anime: this.anime,
        tags: this.tags,
        alias: this.alias,
      };

      console.log(this.alias);
      ApiService.update(this.id, toBeUpdatedSong)
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
      ApiService.delete(this.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "songs" });
        })
        .catch((error) => {
          console.log(error);
          this.message = error;
        });
    },

    discardSong() {
      this.$router.push({ name: "songs" });
    },

    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
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
  margin: auto;
}
</style>