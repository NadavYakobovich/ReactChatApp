<h1 align="center">
  <img src="https://user-images.githubusercontent.com/80215741/165474084-8f6d693c-df78-4b55-bd0a-1759f91b4f38.png" width="12%" alt="logo"/>
  <br/>
  Welcome to our Chat App
  <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="30px" alt="waveEmoji"/>
</h1>

<h2 align="center">
   This is a responsive chat app built using html, css, bootstrap, javascript, jquery and react
</h2>

<br/>

# Table of Contents
* [Features](#features)
* [Upcoming Features](#upcoming)
* [Installation](#install)
* [Run](#run)
* [User For Testing](#user)
* [Credits](#credit)

<br/>

# :heavy_check_mark: Features <a name="features"/>
<img src="https://user-images.githubusercontent.com/80215741/165361358-46b0d597-6dd0-4d33-b722-845963576009.png" width="70%" alt="userFeat"/>

1. **User Management** - sign-in, sign-up and logout :
   - intuitive and responsive feedback forms
   - toggle to show / hide passwords fields
   - 2 way profile picture upload : file upload or camera capture
   - uploaded image profile preview
   - progress bar for sign up

\
\
<img src="https://user-images.githubusercontent.com/80215741/165364963-7e98bcc8-8848-4c83-990f-1c040b81aa29.png" width="70%" alt="sideFeat"/>

2. **Powerful Sidebar** :
   - chats organized by recent conversations
   - search for contacts
   - see last messages in a glance
   - easily start new conversation with every user

\
\
<img src="https://user-images.githubusercontent.com/80215741/165365242-d0f9ec1d-cbce-4dba-ad18-1a599a061b09.png" width="70%" alt="convFeat"/>

3. **Rich Conversation Page** :
   - distinguishable chat bubble colors
   - time and date stamp for each message
   - supports various types of contents : text, image, video and audio.

\
\
<img src="https://user-images.githubusercontent.com/80215741/165366801-c8a2b763-5282-4f49-966b-1bf6c8176484.png" width="70%" alt="logFeat"/>

4. **Advance Input** :
   - shortcut to quickly record and send voice messages
   - sleek dropdown menu for attachments
   - 2 way image upload : file upload or camera capture
   - 2 way video upload : file upload or camera recording


<br/>

# :construction_worker: Upcoming Features <a name="upcoming"/>
1. **Emoji picker**
2. **Add Caption** - add text to image or video in the preview pane
3. **Redesign Scroll Bar**

<br/>

# :wrench: Installation <a name="install"/>

Linux Guide :
1. First step would be to make sure you linux system and packages are updated :
```sh
sudo apt -y update && sudo apt -y upgrade
```
<br/>

2. Second step will be to install Node.js bundled with NPM, we will install them using the curl library provider
   which is recommended by the node.js devs, lastly we will install the latest stable versions by this time of writing
   which are node.js version 16 and npm version 8 by running these commands :
```sh
sudo apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```
<br/>

3. Third step will be to make sure you are able to compile native addons from npm, for\
   such support you will need to install the development tools :
```sh
sudo apt install -y build-essential
```
<br/>

4. The forth and last step will be to download the project files from git to your project directory of choice,\
now , we will install the npm addons needed for this project :\
\
**Notice : make sure you run this command from the project directory !**
```sh
npm install
```
<br/>

_That's it !_ you are few steps away from enjoying our chat app,
continue and run it using the run guide below.

<br/>

# :arrow_forward: Run <a name="run"/>

**Notice : make sure you run these command from the project directory !**
1. First we will build the app for production to the build folder,
   It correctly bundles React in production mode and optimizes the build for the best performance.
   The build is minified and the filenames include the hashes.
   after this command the app is ready to be deployed!
```sh
npm run build
```
<br/>

2. Second, they only thing left to do is run the app,
   this command will run the app in the development mode and the app will open automatically in your default browser,
   if it doesn't Open http://localhost:3000 in your browser.
```sh
npm start
```

<br/>

For any errors with these commands please refer to this webpage : [Troubleshooting](https://create-react-app.dev/docs/troubleshooting/).

<br/>

# :man_scientist: User For Testing <a name="user"/>

- Peleg Shlomo
   - Username : a@b
   - Password : 2910

<br/>

# :trophy: Credits <a name="credit"/>
> Nadav Yakobovich

> Peleg Shlomo

<br/>