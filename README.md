# Credit Swag

## Preqequsites
...

## Set up
1. Clone repo `git clone https://github.com/AwesomeZaidi/Credit-Swag-Client`
2. Run `npm install` from root directory
3. `expo start`

## Understanding this codebase
This is a React Native, Redux state managed built on top of the expo development environment. React Native is just like React, but we use Native components. Styling is also weird. Redux is how the data is passed around and persisted through the app, more on that below. Expo is a development environment we chose to use over the React Native CLI because it is more developer friendly and meets all of our requirements.  

## Understaning React Native

Everything is a component. Navigation is a bit strange. Go into App.js and see we import all of our high level components (pages) here. Then we throw them into these StackNavigators that we attach to a Main Navigator that is used in our App Class Component at the bottom. Strange, but you'll see how it flows soon. Don't worry about the syntax of things too much, we're following very good practices, just start getting used to things being like this. Look at the App Component, it has a Provider, I'll explain this deeper later but basically in order to connect your Redux store  to your React app, you have to wrap  the up  top  level App Component, in a Provider and pass in the store, then we enable magic for ourselves,m  sorta!

## Pages

*Enter*

This page  is a class component and it's really big right now, we'll break it down into smaller components later, for the sake of better readability, but it works great right now.

So if you wanna have text or images, anything rendered into the client users DOM, you have to import it like we do right at the top. Then you'll see I import some redux functions,  styles, third party stuff and more.

Every component can have internal  state or it can be passed down global state by Redux. We usually use  Redux for most things, but  things like forms, internal state is best and quickest to use. 

Basically, whent this page mounts, we check if the app  alreaedy has a user, we redirect  em to the dashboard - we can optimize this flow later but it works great right now.

If you  hit submit on login or signup, we pass  that data into a Redux function call. In  that file,  you'll see the API  call happen, the response get set in an object and sent over to update the Redux store values! More coming soon below on Redux!

# Shared Components


# Redux Store


# Navigation

In `app.js` you'll see in the `render return` we use a MainNavigator that is a AppContainer that takes in a SwitchNavigator
this allows for us to switch between different navigation flows for different parts  of the app, `App` that has a createBottomTabNavigator for the bottom navigation you see when logged in. 

