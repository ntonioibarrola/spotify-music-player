<a name="readme-top" />

<br /> <!-- PROJECT LOGO -->

<div align="center">
  <a href="https://github.com/ntonioibarrola/spotify-music-player">
    <img src="public/spotify.svg" alt="Logo" width="80" height="80">
  </a>

  # ♫🔹**Spotify Music Player**🔹♪
  ![GitHub Last Commit][github-last-commit-url] 
  ![GitHub Repo Size][github-repo-size-url] 
  [![Demo][demo-badge]][demo-url]
  
  <br />
  <div align="left">
    <img src="/public/showcase-playlist.gif" width="80%" height="auto" style="border-radius:30px;"/>
  </div>
  <br /><br />
  <div align="right">
    <img src="/public/showcase-preview-track.gif" width="80%" height="auto" />
  </div>
  <br /><br />
  <div align="left">
    <img src="/public/showcase-player.gif" width="80%" height="auto" />
  </div>
  <br /><br />
  <div align="right">
    <img src="/public/showcase-responsiveness.gif" width="80%" height="auto" />
  </div>
  <br />
</div>



<br /> <!-- TABLE OF CONTENTS -->
## Table of contents

1. [Introduction](#introduction)
   - [Features](#features)
   - [Built With](#built-with)
2. [Getting Started](#getting-started)
   - [Preview](#preview)
   - [Full](#full)
3. [Limitations](#limitations)
   - [Spotify Web API](#spotify-web-api)
   - [Autoplay Policies](#autoplay-policies)
4. [Contact](#contact)
5. [Acknowledgments](#acknowledgments)



<br /> <!-- ABOUT THE PROJECT -->
## Introduction

This is a simple themed music player based on the [Spotify Web API](https://developer.spotify.com/documentation/web-api/). Authenticated users can see all their Spotify playlists and use the player to play/pause songs, to skip to the previous/next song, and to adjust the music's volume. The implementation is loosely based on Sonny Sangha's Spotify Clone [tutorial](https://www.youtube.com/watch?v=3xrko3GpYoU&t=13678s), and the design was inspired by an amalgamation of three different Spicetify [themes](https://github.com/spicetify/spicetify-themes) and Hayden Bleasel's Spotify [demo](https://spotify-preview-demo-48v3ox9kk-beskar-labs.vercel.app/).

### Features

🔒 **Authentication** - Login using your own Spotify account  
🎸 **No Authentication** - Alternatively, you have access to a stripped-down version of the app without authentication  
🎶 **Playlists** – View all of your Spotify playlists and songs  
🎧 **Preview Song** - Play a 30-second preview of a song when hovering your mouse over the song   
⏯️ **Custom Player** – See currently playing song, play/pause song, skip to next/previous song, and adjust volume  
📱 **Responsiveness** – The app is responsive to all screen sizes  

### Built With

This project was setup with <a href="https://create.t3.gg/">Create T3 App</a> and deployed on <a href="https://vercel.com/">Vercel</a>.

[![React][react-badge]][react-url]
[![Typescript][typescript-badge]][typescript-url]
[![TailwindCSS][tailwindcss-badge]][tailwindcss-url]
[![Next][next-badge]][next-url]
[![NextAuth][nextauth-badge]][nextauth-url]
[![SpotifyAPI][spotify-badge]][spotify-url]

<div align="right"><a href="#readme-top">back to top ↑</a></div>



<br /> <!-- GETTING STARTED -->
## Getting Started

There are two ways to access this project, **Preview** and **Full**.

With the **Preview** method, you will have limited access to the project and the Spotify API. You will only have access to one playlist (one of my own), and you will only be able to play a 30-second preview of every song. A Spotify Premium account is not required. **This method is for users who simply want to get a rough idea of the features of this project without having to do any setup.**

With the **Full** method, you will have access to all the features available in this project. You will be able to view playlists from your own Spotify account, and you will be able to play songs for the entirety of its duration. Most of the features used in this project that are provided by the Spotify API are available only to premium members of Spotify. **As a result, this method requires Spotify Premium.**

### Preview

To access this method, simply go to the [website](https://spotify-music-player-alpha.vercel.app) and click on "See Preview".

### Full

#### 1. Register an application with Spotify

* Go to the [Dashboard](https://developer.spotify.com/dashboard/) page at the Spotify Developer website and login using your Spotify account.
* Once logged in, create a new app by clicking on "Create an App". Fill in the prompt however you like and click "Create".
* Click on "Edit Settings", and add the url, [http://localhost:3000/api/auth/callback/spotify](http://localhost:3000/api/auth/callback/spotify/), to the "Redirect URIs" section. Click "Save" to save your changes.
* Take note of the Client ID and the Client Secret.

#### 2. Clone the repository

```sh
git clone https://github.com/ntonioibarrola/spotify-music-player.git
cd spotify-music-player
```
#### 3. Replace the code in .env.example with the given code, and rename the file to .env

```sh
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=123

SPOTIFY_CLIENT_ID=       # Replace with Client ID provided in step 1
SPOTIFY_CLIENT_SECRET=   # Replace with Client Secret provided in step 1

# Should look similar to this:
# SPOTIFY_CLIENT_ID=55520ed37c70a8174d29cb9390d08d30
# SPOTIFY_CLIENT_SECRET=55520ed37c70a8174d29cb9390d08d30
```

#### 4. Install dependencies and run locally

```sh
npm install
npm run dev   # Open http://localhost:3000 in your browser
```

#### 5. Login using your Spotify account

* Go to the url, http://localhost:3000, in your browser.
* Click on "Login with Spotify" and login using your Spotify account.
* You should now have access to my app!
* Note: Please have a Spotify app (desktop or browser) running in the background. For more information, go to [Limitations](#limitations).

<div align="right"><a href="#readme-top">back to top ↑</a></div>



<br /> <!-- LIMITATIONS -->
## Limitations

### Spotify Web API

As mentioned earlier, many of the services provided by Spotify API are available only to premium members. This means that in order to have the Full experience of this project, a Spotify Premium account is required.

Moreover, music is streamed from an authenticated user's Spotify device and not from this project — this project acts more like a remote control to an open Spotify device. This means that a running Spotify application (desktop or browser) is required in the background. If this behavior is not as expected, please take a look at the [Spotify Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk/) for developing websites that can stream music as its own Spotify device.

### Autoplay Policies

Most modern browsers employ strict autoplay policies to provide more control for users in deciding what can be played automatically, and to prevent any unexpected media playback from surprising users upon visiting a site. For this project, these policies automatically mute the on-mouse-hover song previews when first entering the site. Most autoplay policies require some kind of user interaction (click, tap, etc.) to allow autoplay with sound. The workaround is to include a popup modal in which the user is required to click in order to close. Consequently, this would mean that this modal would pop up every time the user first enters the page, including page refreshes.

<div align="right"><a href="#readme-top">back to top ↑</a></div>



<br /> <!-- CONTACT -->
## Contact

[![Gmail][gmail-badge]][gmail-action]
[![LinkedIn][linkedin-badge]][linkedin-url]
[![GitHub][github-badge]][github-url]

<div align="right"><a href="#readme-top">back to top ↑</a></div>



<br /> <!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api/)
* [Sonny Sangha's Spotify Clone Tutorial](https://www.youtube.com/watch?v=3xrko3GpYoU&t=13678s)
* [Spicetify Themes](https://github.com/spicetify/spicetify-themes)
* [Spicetify Dribbblish Theme](https://github.com/spicetify/spicetify-themes/tree/master/Dribbblish)
* [Spicetify Ziro Theme](https://github.com/spicetify/spicetify-themes/tree/master/Ziro)
* [Spicetify Turntable Theme](https://github.com/spicetify/spicetify-themes/tree/master/Turntable)
* [Hayden Bleasel's Spotify Preview Demo](https://github.com/beskar-co/spotify-preview-demo)
* [Othneil Drew's Best README Template](https://github.com/othneildrew/Best-README-Template)
* [Hero Icons](https://heroicons.com/)
* [Autoplay Policies for Chrome](https://developer.chrome.com/blog/autoplay/)
* [Autoplay Policies for Chrome and Safari](https://bitmovin.com/autoplay-policies-safari-14-chrome-64/)

<div align="right"><a href="#readme-top">back to top ↑</a></div>



<!-- MARKDOWN LINKS & IMAGES -->
[demo-badge]: https://img.shields.io/badge/-Demo_↪-555555.svg?style=for-the-badge&logo=spotify&logoColor=white
[demo-url]: https://spotify-music-player-alpha.vercel.app/
[gmail-badge]: https://img.shields.io/badge/Gmail-c0392b?style=for-the-badge&logo=gmail&logoColor=white
[gmail-action]: mailto:ntonio.ibarrola@gmail.com
[github-badge]: https://img.shields.io/badge/-GitHub-black.svg?style=for-the-badge&logo=github&colorB=555
[github-url]: https://github.com/ntonioibarrola
[github-project-url]: https://github.com/ntonioibarrola/spotify-music-player
[github-last-commit-url]: https://img.shields.io/github/last-commit/ntonioibarrola/spotify-music-player?style=for-the-badge&color=5175AE
[github-repo-size-url]: https://img.shields.io/github/repo-size/ntonioibarrola/spotify-music-player?style=for-the-badge&color=5175AE
[linkedin-badge]: https://img.shields.io/badge/LinkedIn-0e76a8?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://www.linkedin.com/in/antonio-ibarrola
[next-badge]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[nextauth-badge]: https://img.shields.io/badge/nextauth.js-BD34FE?style=for-the-badge&logo=nextdotjs&logoColor=white
[nextauth-url]: https://next-auth.js.org/
[react-badge]: https://img.shields.io/badge/react-4A4A55?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[spotify-badge]: https://img.shields.io/badge/spotify_api-1ED760?&style=for-the-badge&logo=spotify&logoColor=white
[spotify-url]: https://developer.spotify.com/documentation/web-api/
[tailwindcss-badge]: https://img.shields.io/badge/tailwind_css-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwindcss-url]: https://tailwindcss.com/
[typescript-badge]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
