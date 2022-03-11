# phase-1-project-worderbytes
Worderbytes - SPA word game for competitively building off other players' words

# Phase 1 Project Guidelines

## Learning Goals

- Design and architect features across a frontend
- Communicate and collaborate in a technical environment
- Integrate JavaScript and an external API
- Debug issues in small- to medium-sized projects
- Build and iterate on a project MVP

## Introduction

Welcome to JavaScript Project Mode!

You’ve worked so hard to get here and have learned a ton. Now it's time to bring
it all together!

For this project, you're going build a Single Page Application (**SPA**).
Building this application will be challenging because it will integrate
everything you've learned up to this point. Your frontend will be built with
HTML, CSS, and JavaScript and will communicate with a public API.

### Project Requirements

1. Your app must be a HTML/CSS/JS frontend that accesses data from a public API.
   All interactions between the client and the API should be handled
   asynchronously and use JSON as the communication format.

2. Your entire app must run on a single page. There should be NO redirects. In
   other words, your project will contain a single HTML file.

3. Your app needs to incorporate at least 3 separate event listeners
   (DOMContentLoaded, click, change, submit, etc).

4. Some interactivity is required. This could be as simple as adding a "like"
   button or adding comments. These interactions do not need to persist after
   reloading the page.

5. Follow good coding practices. Keep your code DRY (Do not repeat yourself) by
   utilizing functions to abstract repetitive code.

### Stretch Goals

1. Use [json-server][] in your project to persist your app's interactivity.

## Strategy, Timeline, and Tips

### Planning

- Plan out your features
- Develop user stories
  - “As [ a user ], I want [ to perform this action ] so that
    [ I can accomplish this goal ].”
  - Features should not need you there to explain them to users
- Plan out the structure of your JSON requests

### Project Pitches

Before you start working on your project, you'll pitch your project idea to your
instructors for approval and feedback.

For your project pitch, you should include:

- The basic story of your application
- The core features of your MVP
- The API data you'll be using and how you'll use it
- Challenges you expect to face
- How you are meeting the requirements of the project

Feel free to send this pitch to your instructor via slack asynchronously.

### MVP ASAP

- Build a Minimum Viable Product (MVP) as quickly as possible.
  - Pick an API and explore it early on to ensure it will work for your need

### Instructor Guidance

You should strive to solve problems independently, but you also shouldn't waste
your time stuck on a problem. A good guideline for a small bug is the rule of
10s:

- 10 minutes debugging the code
- 10 minutes using Google and StackOverflow to try to find an answer
- 10 minutes asking your fellow students for help
- Asking an instructor

If you seek out instructor guidance on your design from the start, they might
help steer you into design and architectural decisions that will help you down
the road. That will also give the instructors context for what your app is
supposed to do, so you won't need to explain everything to them when asking for
help debugging.

### Guidelines for Staying Organized

**Write down** the decisions you make about your project. This will not only
help you think more clearly, it will also help you communicate your project to
instructors when asking for help. In addition to writing everything down, we
also recommend the following to help stay organized and on track:

- Describe/sketch your ideas (use diagrams!).
- Start by creating a frontend directory with the basic files you'll need
- Next, build enough code to get some API data to work with. Don't worry about
  building all of your async code yet, just get to the point where you can
  access one endpoint on an API, then start working on getting that data
  displayed.
- Then, continue to build additional async code and frontend features.
- Continue building features one by one.

Check in with your instructors to make sure your scope and timeline are
manageable.

### JSON Server Instructions

> **Note**: Using `json-server` is a stretch goal, so make sure you have a
> working MVP before trying to set up `json-server`!

You can use this [json-server template][] to generate your backend code. Using
this template will make it easier to deploy your backend later on.

[json-server template]: https://github.com/learn-co-curriculum/json-server-template

If you prefer, instead of using the template, you can create a `db.json` file
with a structure in the root of your project that looks like this:

```json
{
  "toys": [
    {
      "id": 1,
      "name": "Woody",
      "image": "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png",
      "likes": 8
    },
    {
      "id": 2,
      "name": "Buzz Lightyear",
      "image": "http://www.pngmart.com/files/6/Buzz-Lightyear-PNG-Transparent-Picture.png",
      "likes": 14
    }
  ]
}
```

Then, assuming you have `json-server` installed globally, you can run this
command to run the server:

```console
$ json-server --watch db.json
```

Whatever top-level keys exist in your `db.json` file will determine the routes
available. In the example above, since we have a key of `toys` pointing to an
array of toy objects, `json-server` will generate the following routes:

- `GET /toys`
- `POST /toys`
- `GET /toys/:id`
- `PATCH /toys/:id`
- `DELETE /toys/:id`

You can consult the [json-server docs][] for more information.

[json-server docs]: https://www.npmjs.com/package/json-server

## Resources

- [Public APIs](https://github.com/public-apis/public-apis)
- [Fun APIs](https://apilist.fun/)
- [json-server][]

[json-server]: https://www.npmjs.com/package/json-server

Worderby Project Presentation Elements:

1. Title animation
  a. Switch case on interval

2. Intial prompt word randomizer
  a. Fetch request to random word api 

3. Unusable prompt text
  a. Event Listener - click alert pop-up to notify player that first letter is not allowed to be used and briefly apply red color

4. Usable prompt text
  a. Pop-up displaying player is able to select usable prompt letters with shift + arrow keys
  b. Event listener - keydown (shift + arrow left / right) to select letters
  c. Event listener - click to select which letter player wants to use
  d. Dimming / highlight formatting upon selection
  e. Pop-up alerting player that at least one letter must be selected to play

5. Word submission
  a. Pop-up alerting player that at least one letter must be typed in input field before submitting
  b. Event listener - input event to dynamically resize input field depending on text input
  c. Event listener - submit event for fetch request to dictionary api for word input
  d. Displays pop-up alerting player if word is not found in dictionary
  e. Append word and score to scorecard below
  f. Append word to frankenword
  g. Expand / Collapse button
  h. Event listener - click event to expand / collapse scorecards
  
6. Voice
  a. Voice button
    1. Event listener - click event to toggle voice read of frankenword on/off
  b. Frankenword
    2. Event listener - click frankenword for voice read
    
7. New game button
  a. Event listener - click event to start new game

8. Gameover overlay display
  a. After 5 rounds game is over and overlay displays:
    1. Final frankenword (voice readable)
    2. Final scorecard
    3. New game button

9. Pop-ups
  a. Event listener - click event to hide
