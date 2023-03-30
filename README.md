# React Native Take Home Challenge
 This is a React Native application created as part of a take-home challenge for coding interview. 


## Resources

- API: [Pokemon TCG](https://pokemontcg.io)
- Design (Mobile screen only):
  - prototype: <https://www.figma.com/proto/GEbDoXIEkMvK8UrJlcz7Z7/Pokemon-TCG-Marketplace?node-id=1%3A34&scaling=contain&page-id=0%3A1&starting-point-node-id=1%3A34&show-proto-sidebar=1>

# Project Description
  - Typescript
  - React Native
  - React Query
  - Modal for React Native Navigation
  - React Custom Hooks
  - Jotai for state management

## Requirements

- ✅ Able to export apk or ipa (if you are using expo please use bare workflow)
- ✅ Create Login screen (doesn't include in design so can use simple design screen)
  - ✅ Implementing Authentication flow (api doesn't require authentication but you can include authentication header for simple demonstration)
  - ✅ Using react native navigation to navigate login to home page
- ✅ Card list:
  - [ ] Implement search/filter (**optional**):
    - [ ] Name
    - [ ] Type
    - [ ] Rarity
    - [ ] Set
  - ✅ Loading/PageSize limit: `12` cards on each api call
  - ✅ Implement `Loadmore` style pagination
- ✅ Use card `price` data from `cardmarket.prices.*`
- ✅ Use card's stock from `set.total`
- ✅ Cart:
  - ✅ Display selected cards as per design
  - ✅ Quantity must be able to increase, decrease & remove. Must respect the stock left limit
  - ✅ Display total number of selected cards
  - ✅ Display total price of all the cards
  - ✅ All cards should be clearable at once from cart


## Bonus

The following are some strategies to leave us with a better impression. But remember, **they're not required**.

- ✅ UI should look like as figma for both android & ios
- ✅ Using [react native navigation](https://reactnavigation.org/) for pop up modal
- ✅ Using [react query](https://tanstack.com/query/latest/docs/react/overview)
- ✅ Using React hooks
- ✅ Using TypeScript
- ✅ Meaningful git commit
- ✅ Well-structured and organized repository
## Installation
Before you begin, make sure you have the following installed on your system:

Node.js (version 10.0 or higher)
npm (version 6.0 or higher)
React Native CLI
You can install React Native CLI using npm:

```
npm install -g react-native-cli
```
Building and Running the App
To build and run the app, follow these steps:

Clone the repository to your local machine:

```
git clone https://github.com/khantsithu1998/reactnativetakehomechallenge.git
```

Navigate to the project directory:

```
cd reactnativetakehomechallenge
```

Install the dependencies:

yarn 

```sh
yarn install
```

or

npm
```sh
npm install
```


For iOS
```
cd ios
pod install 
cd ..
```

Run the app:

For Android

```
npx react-native run-android
``` 


For iOS

```
npx react-native run-ios
``` 

This will build the app and launch it on an Android or iOS emulator, depending on the platform you specified.

