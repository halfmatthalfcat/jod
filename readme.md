# JOliver Decor Website

This is a remake of a website I originally made my mom in 2014. 
The original was all framework-less PHP (eek) and was my first foray into full-stack development.


## Stack

### Frontend

Frontend is written completely in Typescript (1.8) using React.
I would have thrown Redux in there retrospectively but I didn't catch the Redux craze until a couple months ago.

Build system uses Webpack, which imo is the most seamless of FE build systems after using Gulp and Grunt.

### Backend

I decided to do it in Node as it has the lowest startup cost and fit my use case pretty well.
I'm using Express + MySQL (Relational ftw) as the core of the BE, both using Typescript (1.8).

Build system uses Gulp.

## Lessons learned

### Typescript

I love Typescript. If you check out my other repos, I heavily leverage strongly typed languages for their
security and ability to catch bugs at compile time (also partial to the JVM).

While there are other transpiled, strongly typed javascript variants such as PureScript and Elm, Typescript
felt the most natural from an OO based standpoint instead of a functional one, as is the dichotomy between
Scala and Haskell, and ES6 adds a lot of functional-type constructs that make using regular javascript 
much more bearable.

### Build Systems

I'm using Gulp for backend dev and Webpack for frontend dev. I also have experience with Grunt. Comparatively,
Gulp blows Grunt out of the water in terms of usability and Webpack, for FE bundling, takes the cake of them all.

My Webpack config is painfully small yet accomplishes what Gulp does in half the lines and Grunt probably by 75%.

### React

This is my first big project with React and it has been awesome. Throughout the codebase, you'll see areas where
I've found better best practices and slowly iterated on them (binding in render, stateless, etc) but overall, MV*
has given me the ability to build out controllers and utilities as I see fit instead of already providing them to 
me and having to adhere to more boilerplate as I've seen while using Angular.

Before I started, I was very anti-JSX. I decided to give it a go and have actually been pleased at the results.
Reduced a lot of code and the result is a very clean looking render function.