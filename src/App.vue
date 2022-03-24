<template>
  <div class="background d-flex align-items-center">
    <div class="black-stripe">
    <div class="container">
      <!-- Search -->
      <div class="">

        <div class="search-section text-center">
        <h1>Lyrics Search App</h1>

        <form @submit.prevent="submit" @submit="checkForm">
          <input
            type="text"
            class="artist-input mx-2 mt-4"
            placeholder="Artist"
            v-model="artist"
            @keyup.enter="getLyrics"
          />

          <input
            type="text"
            class="song-input"
            placeholder="Song"
            v-model="song"
            @keyup.enter="getLyrics"
          />
          

          <button class="btn btn-success">SEARCH</button>

          <p class="required" v-if="errors.length"> {{errors}} </p>
          <p class="required" v-else></p>
        </form>
        
      </div>

      </div>
      

      <!-- Lyrics -->
      <div class="lyrics-section text-center" id="lyrics-space">
        <h2 class="title-styles mb-5"> {{ artist.toUpperCase() }} {{ song.toUpperCase() }} </h2>
        <p class="lyrics-styles mb-5" v-html="lyrics"></p>
      </div>
    </div>
    <!-- container -->
    </div>
    <!-- franja negra -->
  </div>
  <!-- background -->
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      artist: "",
      song: "",
      lyrics: "",
      errors: [],
    };
  },
  methods: {
    async getLyrics() {
      try {
        console.log("llegue");
        const data = await fetch(
          `https://api.lyrics.ovh/v1/${this.artist}/${this.song}`
        );
        const lyricsData = await data.json();
        // const { lyrics } = lyricsData;
        if (lyricsData.error) {
          this.lyrics = lyricsData.error;
        }
        if (lyricsData.lyrics) {
          this.lyrics = lyricsData.lyrics.replace(/\r\n|\n|\r/g, "<br>");
          console.log(lyricsData.lyrics);
        }

        } catch (error) {
          console.log(error);
          throw error;
        }
      },

    checkForm: function (e) {
      if (this.artist && this.song) {
        return true;
      }

      this.errors = [];

      if (!this.artist) {
        this.errors.push('Artist is required.');
      }
      if (!this.song) {
        this.errors.push('Song is required.');
      }
    },

    async submit() {
      console.log("Se ejecuta el método submit");
      const lyrics = await this.getLyrics();
    }

  },
  

  created() {
    // this.getLyrics();
  },
};
</script>

<style scoped>



h1 {
  color: white;
  font-size: 60px;
  font-family: "Bebas Neue", cursive;
  position: relative;
  top: 20px;
}

h2 {
  color: white;
  position: relative;
  top: 40px;
  position: relative;
  top: 100px;
}

input {
  position: relative;
  top: 20px;
  left: 28px;
}

button {
  position: relative;
  top: 18px;
  left: 35px;
  height: 33px;
  font-size: 12px;
  font-weight: 300;
}

.required {
  color: white;
  font-size: 12px;
  position: relative;
  top: 20px;
}

.container {
  min-height: 100vh;
  padding: 0;
}

.background {
  background-image: url("./assets/fondo4.jpg");
  background-size: 1599px;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
}

.black-stripe {
 background-color: rgba(0, 0, 0, 0.178);
 width: 1295px;
}

.container {
  position: relative;
  top: -60px;
}

.search-section {
  /* background-color: rgb(236, 86, 27); */
  background-image: url("./assets/fondo7.jpg");
  background-size: 500px;
  height: 280px;
  border-radius: 0px 0px 80px 80px;
  position: relative;
  top: 50px;
  padding-top: 30px;
  /* box-shadow: 0px 20px 40px rgb(26, 25, 25); */
}

.lyrics-section {
  height: 100%;
  min-height: 100vh;

}

.lyrics-styles {
  color: white;
  position: relative;
  top: 100px;
}

.artist-input {
  width: 300px;
}

.song-input {
  width: 280px;
}
</style>
