---
layout: post
date: 2021-03-25
title: "Reacting to custom hooks"
categories: react programming customhooks
tags: ["post"]
cover: /assets/images/posts/2021-03-25/screenshot.png
---

I'm probably late to the game and it wasn't until I saw [Tanner Linsley's talk on JSCon](https://www.youtube.com/watch?v=J-g9ZJha8FE&t=1251s), that I was inspired to separate the logic from components by wrapping the logic in custom hooks which can be shared among other components. He happens to be the creator behind React Table, React Form, and React Query, which are libraries based heavily on React hooks. Check out his [Tan Stack](https://tanstack.com/).

As practice to be a full-stack developer, I write both the front and back-end. I have written many lines of axios and useEffect over the months. That I clean up my cluttered components by moving the calls to a hook, where the results and handlers can be accessed easily.

I created a little demo which was almost a copy of the [Axios crash course from Brad Traversy](https://www.youtube.com/watch?v=6LyagkoRWYA).

I'm working a contacts management react app, which requires me to make an api request and have the UI update to reflect either a successful or erroneous response.

The demo make request to the [jsonplacholder fake Rest API](https://jsonplaceholder.typicode.com/).

I've wrapped the axios requests and responses in a usePosts() hook, which provide methods to various actions and their responses.

You can call the hook by passing a base url or api endpoint. The actions perform the basic CRUD operations.

```javascript
const { results, message, getAllPosts, addPost, updatePost, deletePost } =
  usePosts("https://jsonplaceholder.typicode.com");
```

See the demo [here](https://project-hooks.herokuapp.com)

For each action, the response and a custom message is set, which can be output into the frontend.

I can see how adopting this way of writing code, will make components cleaner and easy to work with. Keeping components stateless and clean, also makes them much more reusable and easier to maintain.

If you have used libraries which utilised hooks and wrote state components in your apps before, it shouldn't be hard to understand how to write your own hooks. But I must confess, it did take me some time to understand, because I wasn't probably because I wasn't sold on the idea before, until I realised how powerful React Table was as a library, built solely on React hooks.

I learnt how to write my own custom hooks from:

- [React Official Documentation on Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html)
- [Learn Custom Hooks in 10 Minutes by Web Dev Simplified](https://www.youtube.com/watch?v=6ThXsUwLWvc&t=339s)
