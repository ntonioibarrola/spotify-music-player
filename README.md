<a name="readme-top" />

<br /> <!-- PROJECT LOGO -->

<div align="center">
  <a href="https://github.com/ntonioibarrola/spotify-music-player">
    <img src="public/spotify.svg" alt="Logo" width="80" height="80">
  </a>

  # ♫🔹**Spotify Music Player**🔹♪
  ![GitHub Last Commit][GitHub-last-commit-url] 
  ![GitHub Repo Size][GitHub-repo-size-url] 
  [![LinkedIn][linkedin-shield]][linkedin-url]
</div>

---

<br /> <!-- TABLE OF CONTENTS -->
## Table of contents[![](./docs/img/pin.svg)](#table-of-contents)

1. [Introduction](#introduction)
   - [Features](#features)
   - [Built With](#built-with)
2. [Getting Started](#getting-started)
   - [Full](#full)
   - [Preview](#preview)
3. [Limitations](#limitations)
4. [Contact](#contact)
5. [Acknowledgements](#acknowledgements)

---

<br /> <!-- ABOUT THE PROJECT -->
## Introduction

There are many great README templates available on GitHub; however, I didn't find one that really suited my needs so I created this enhanced one. I want to create a README template so amazing that it'll be the last one you ever need -- I think this is it.

Here's why:
* Your time should be focused on creating something amazing. A project that solves a problem and helps others
* You shouldn't be doing the same tasks over and over like creating a README from scratch
* You should implement DRY principles to the rest of your life :smile:

Of course, no one template will serve all projects since your needs may be different. So I'll be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue. Thanks to all the people have contributed to expanding this template!

Use the `BLANK_README.md` to get started.

<br />

### Features

🎸 **playing now** - current state of track with real-time progress bar  
🎬 **ended state** – when track is ended badge transitions to this state  
⏸ **paused state** - when current track is paused in player  
📭 **idle state** – not playing

<br />

### Built With

This project was setup with <a href="https://create.t3.gg/">Create T3 App</a> and deployed on <a href="https://vercel.com/">Vercel</a>.

[![React][React.js]][React-url]
[![Typescript][Typescript]][Typescript-url]
[![TailwindCSS][TailwindCSS]][TailwindCSS-url]
[![Next][Next.js]][Next-url]
[![NextAuth][NextAuth.js]][NextAuth-url]
[![SpotifyAPI][SpotifyAPI]][SpotifyAPI-url]

<div align="right"><a href="#readme-top">back to top ↑</a></div>

---

<br /> <!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Full

#### 1. Register an application with Spotify

* Go to the [Dashboard](https://developer.spotify.com/dashboard) page at the Spotify Developer website and login using your Spotify account.
* Once logged in, create a new app by clicking on "Create an App". Fill in the prompt however you like and click "Create".
* Click on "Edit Settings" and add the url, [http://localhost:3000/api/auth/callback/spotify](http://localhost:3000/api/auth/callback/spotify), to the "Redirect URIs" section. Click "Save" to save your changes.
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

DISCORD_CLIENT_ID=123
DISCORD_CLIENT_SECRET=123
```

#### 4. Install dependencies & run locally

```sh
npm install
npm run dev   # Open http://localhost:3000 in your browser
```

#### 5. Login using your Spotify account

* Go to the url, http://localhost:3000, in your browser.
* Click on "Login with Spotify" and login using your Spotify account.
* You should now have access to my app!

</br>

### Preview

<div align="right"><a href="#readme-top">back to top ↑</a></div>

---

<br /> <!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<div align="right"><a href="#readme-top">back to top ↑</a></div>

---

<br /> <!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<div align="right"><a href="#readme-top">back to top ↑</a></div>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[GitHub-last-commit-url]: https://img.shields.io/github/last-commit/ntonioibarrola/spotify-music-player?style=for-the-badge&color=5175AE
[GitHub-repo-size-url]: https://img.shields.io/github/repo-size/ntonioibarrola/spotify-music-player?style=for-the-badge&color=5175AE
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[NextAuth.js]: https://img.shields.io/badge/nextauth.js-BD34FE?style=for-the-badge&logo=nextdotjs&logoColor=white
[NextAuth-url]: https://next-auth.js.org/
[React.js]: https://img.shields.io/badge/react-4A4A55?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[SpotifyAPI]: https://img.shields.io/badge/spotify_api-1ED760?&style=for-the-badge&logo=spotify&logoColor=white
[SpotifyAPI-url]: https://developer.spotify.com/documentation/web-api/
[TailwindCSS]: https://img.shields.io/badge/tailwind_css-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
