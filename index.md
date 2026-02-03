---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Luke's Blog"
  text: ""
  tagline: <Typewriter :strings="['Hi, I\'m Luke!', 'I love coding.', 'Welcome to my blog!']" :loop="true" />

  actions:
    - theme: brand
      text: About Me
      link: /about/
    - theme: alt
      text: Browse Posts
      link: /timeline
---
