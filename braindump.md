I'm creating a web app for music producers to submit their songs for feadback, my goal is to set up the website in a way that prompts and promotes well thought out feadback on various asspects of a users song. Additionally I'd like to create a features that incorporates some sort of tier/ranking system, not inorder to gameifying music but instead with the intent that users would be able to see what sort of feadback people at "higher ranks" are receiving as well as common pit falls and mistakes that other producers at their rank are making. I'm curious if... 

1. This is something you think there is a need for or you could see your self using
2. What are the specific/core asspects of creating music you think I should focus on when prompting users to give feadback
3. What specific questions/phrasing I could use to encourage thoughtfull feadback and discussion
4. Any ideas on how to make the raking system work (I already have some ideas but I'm curious how you might imagine how to accomplish this goal)
5. Any and all ideas/input you have for me, everythings appriciated

I really appriciate you taking the time for this, I know it's a lot of questions so if you don't wanna spend all the time answering everything, question 1 and 2 are really what I'm most conserned with. That being said, the more feedback I get the more this website might look like something that could be a great tool for you.

users should be able to...

- make an account
- review songs from others
- submit their own songs for review
- view some sort of ladder
- view other's profiles
- follow other users
- message other users
- view song profiles
- see about page

## pages we'll have

- profile page
- - add profile pic
- - customize which genre they specialize in (choose which they can review)
- - manage songs that apeare for review
- - random info (years experience, age, social links, etc...)
- - aggragate score (rank)
- - break down of scores (goove, musicality, sound design, mix, etc...)

- song profile page
- - Cover picture
- - embeded link (sound cloud, youtube, spotify, bandcamp?) (look into this)
- - mapped list of past reviews (reviewer, rating, view review button)

- view review
- - cards in grid with data from the review (stars and text)

- create review/critique page
- - embeded link (sound cloud, youtube, spotify, bandcamp?) (look into this)
- - form stuff (arrangment, groove, mixing, mastering, sound design)
- - submit button

- login
- - loggin with (google, fb, whatever...)
- - log in with account + button
- - link to /register

- register
- - register with (google, fb, whatever...)
- - noraml register input boxes + button
- - link to /register

- splash/about
- - info about idea of page
- - info about how ranking work and explaination

## components

- Profile page
- - Profile main component
- - Profile edit component
- - Song card component
- - Socials component

- Song profile page
- - Song preview component (card with album cover and embedded link)
- - Review preview component

- Create Critique Page
- - Song preview component (card with album cover and embedded link)
- - Form stuff component (break it into tiny little parts)

- Splash
- - Splash main
- - About

- Log in/Sign-up
- - left side right side deal
- - after account creation send to profile edit page
- - Profile edit component

- Extra stuff
- - nav

## databases

- user table
- - user name
- - password
- - email
- - social link
- - about

- user query info
- - genre ['edm', 'riddim', 'dnb']
- - ranking
- - total score in each catagory

- song table
- - user_id
- - title
- - album cover
- - embedded link
- - electronic 
- - experimental 
- - bass 

- song genre table
- - id
- - pop T/F
- - rap T/F

- sub genre rap
- - drill 
- - slowed reverbed

- sub genre electronic
- - song 
- - drill 
- - slowed reverbed


- review table
- - rating (each section)
- - comments (each section)


## Feedback Notes
- core asppects
- - melody
- - musicality/music theory stuff (can be kinda genre dependant (riddim, experimental stuff)) * 
- - rhythm *
- - drums
- - bass
- - composition/arrangment *
- - sound design *
- - mixing/mastering *
- - eq
- - sample quality
- - lyrics 
- - bpm? (people keep saying that to me but doesn't make sense in my mind)
- - originality/fresh take *

ones with * I like personally, create questions based on these

- Ranking System
- - note (song based rank or producer based rank, both?)
- - 1. agragate score from points system for categories to create ranking
- - 2. Hearthstone style, after being reviewed you song is put up against a song of similar tier/rank for a beat battle
- - 3. combination of both with beat battle part being worth like 40% of score of something (maybe this is how account ranking is calculated)
- - 4. part of ranking comes from quality of reviews (discourage bad, unthought-out outreviews)

- Misc
- - monthly tournaments 
- - time stampable reviews
- - mobile or pc? (been thinking pc who knows tho)
- - duolingo type streak feature, encourage doing a review a day, good for warm up/ear training maybe?
- - users should have to rate other music before they can receive feadback their self

- questions like... (not a lot of feedback on this. Not a huge fan of these questions for this app)
- - what emotions did you feel listening to this (good for developing personal sound)
- - what activity would you do while you listen to this (good for developing personal sound)
- - were there parts you liked/didn't like why (time stamp feature would be nice)


