# NC News 
This is a front-end web app built using the NC-News API I built previously (you can find that [here](https://nc-news-solo-kr.onrender.com/api)).

Before we go any further, you can launch NC-News [here](https://nc-news-kroo.netlify.app/)

The brief for this app was a *reddit-like* news app which aggregates articles and allows users to cast votes and make comments on articles.

NC-News is built using Vite + React and *styled* using ***Tailwind CSS*** and hosted on Netlify.

**EDIT:** I wasn't happy with NC News in it's first iteration, so, instead of tweaking and refactoring, I just... well, started all over again.
A couple of days later, including ~4 hours of pure, unadulterated TypeScript Whack-A-Mole, it's done. Well, the MVP at least.
I did implemented a few things in a much better way than in the previous version, please see below.

## ChangeLog:
- Rewrote entirely in TypeScript *-Yes, there are some dodgy Type escapes in there, I'll sort them as I grow more confident with Ts. Mainly strange behavior from dependency types.*
- Much better use of React Hooks, namely using context, refs, etc. Powerful stuff, no more prop-drilling.
- ***Styling:*** I hope you'll agree, this looks much cleaner and more Reddit-like, for a Reddit clone. There were really no excuses when using Tailwind.
- *Better* extraction of functions to separate files.
- *Better* clean(-ish) code practices in general *-there is some controversy over "clean code" specifically, I'm not sure I back the now infamous textbook.*
- Using URL to manage state, where possible: more efficient (?), definitely better UX - sharable links

## ToDo:
I'm still not totally happy, naturally. Technically this has less functionality than the original, at present. With that in mind, here's a selection of features to come:
- Unlimited scroll / pagination
- Store User in localStorage / "Remember me"
- **Actually implement User Auth**- *this is a HUGE job, as I will need to do a fair bit to the backend... and rewrite it to use TypeScript...*
- Add minor loaders for better UX/UI
- Add Users / User profile pages
- Minor date manipulation --> "days/hours/minutes ago" instead of the date it was posted for comments/articles etc.
- Post a new Article feature
- Sign up feature / Post a new User
- Many more...

### Help
- Log in to post comments * delete articles/comments
- Navigate using the navbar/burger button on smaller screens
- Browse and filter articles using the drop-downs provided
- Click on articles to open their respective pages
-   

## Features
Users are able to:
- Browse an array of articles
- Sort and filter articles by various queries
- Read, vote and comment on articles
- Vote on articles
- Delete articles and comments which they posted
- Browse an array of users
- View user's articles and comments and navigate to their respective pages


### To-Do:
- Login Validation for voting
- Voting on comments
- Editing articles and comments
- Search articles
- Create articles
  - Upload images
- Create topics for articles
- Create an account
  - Upload images
- My profile / Edit
- Fix styling
- Make accessible
- Embed the README into the app


## Getting Started

### Requirements
- Node.js v21.7.1


### Installation
Clone the repo:
`git clone https://github.com/Roodbaraky/nc-news-project`

Open the directory
`cd <path>/nc-news-project`

Set up the dependencies
`npm install`

### Launch the app
Run the dev server via:
`npm run dev`

Navigate to the link provided by Vite:
[http://localhost:5173/](http://localhost:5173/)

### Usage
#### Log In
At present, no password validation is in place, the default value of *username* is set to *jessjelly* for your convenience, but you can also log in as any of the following:

- tickle122
- grumpy19
- happyamy2016
- cooljmessy
- weegembump

#### Testing & Contributions
Please feel free to test the app's features. I ask that you report any bugs via github issues or alternatively you can [send me an email](mailto:kooroshr@hotmail.com).

### Acknowledgements
This project was completed as a part of Northcoders Software Development bootcamp. Thanks to the Nortcoders mentors for providing support and feedback during development.
