<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <b-form>
        <div class="form-group" label="Name">
          <label for="name">Name <span class="text-danger">*</span></label>
          <input
            class="form-control"
            placeholder="Name of the song"
            :class="{ 'is-invalid': validationStatus($v.name) }"
            v-model.trim="$v.name.$model"
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
      </b-form>
      <button
        @click="saveSong"
        class="btn btn-success mr-2"
        :disabled="$v.$invalid"
      >
        Submit
      </button>

      <button class="btn badge-info" @click="discardSong">Discard</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newSong">Add</button>
    </div>
  </div>
</template>

<script>
import ApiService from "../services/ApiService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "add-song",
  data() {
    return {
      id: null,
      name: "",
      artist: "",
      anime: "",
      tags: "",
      alias: "",
      submitted: false,
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
    saveSong() {
      const data = {
        name: this.name,
        artist: this.artist,
        anime: this.anime,
        tags: this.tags,
        alias: this.alias,
      };

      ApiService.create(data)
        .then((response) => {
          this.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          //this.$router.push({ name: "songs" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    newSong() {
      this.submitted = false;
      this.song = {};
    },

    discardSong() {
      this.$router.push({ name: "songs" });
    },
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },
  },
};
</script>

<style>
.submit-form {
  margin: auto;
}
</style>