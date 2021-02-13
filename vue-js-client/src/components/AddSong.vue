<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <form>
        <div
          class="form-group required" :class="{ 'form-group--error': $v.name.$error }"
        >
          <label for="title">Name</label>
          <input
            class="form-control"
            v-model.trim="$v.name.$model"
          />
        </div>
        <div class="error" v-if="!$v.name.required">Field is required</div>
        <div class="form-group">
          <label for="artist">Artist</label>
          <input
            type="text"
            class="form-control"
            id="artist"
            required
            v-model="artist"
          />
        </div>
        <div class="form-group required">
          <label for="anime">Anime</label>
          <input
            type="text"
            class="form-control"
            id="anime"
            required
            v-model="anime"
          />
        </div>
        <div class="form-group">
          <label for="tags">Tags</label>
          <input
            type="text"
            class="form-control"
            id="tags"
            v-model="tags"
          />
        </div>

        <div class="form-group">
          <label for="alias">Alias</label>
          <input
            type="text"
            class="form-control"
            id="alias"
            v-model="alias"
          />
        </div>
      </form>
      <button @click="saveSong" class="btn" :disabled="$v.$invalid">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newSong">Add</button>
    </div>
  </div>
</template>

<script>
import ApiService from "../services/ApiService";
import { required, minLength } from "vuelidate/lib/validators";

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
       minLength: minLength(4)
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
    }
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}

.required label::after {
  content: " *";
  color: red;
}
</style>