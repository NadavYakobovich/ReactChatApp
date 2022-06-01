<h1 align="center">
  <img src="https://user-images.githubusercontent.com/80215741/165474084-8f6d693c-df78-4b55-bd0a-1759f91b4f38.png" width="12%" alt="logo"/>
  <br/>
  Welcome to our Chat App
  <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="5%" alt="waveEmoji"/>
</h1>

<h2 align="center">
   This is a responsive chat app built using html, css, bootstrap, javascript, jquery and react
    <br/>    <br/>
*:new:* .net core RESTful api server fused with signalR for realtime chat experience.

</h2>

<br/>

# Table of Contents
* [Features](#features)
* [Upcoming Features](#upcoming)
* [Installation](#install)
* [Run](#run)
* [Configuration](#config)
* [Users For Testing](#users)
* [Credits](#credit)

<br/>

# :heavy_check_mark: Features <a name="features"/>
<img src="https://user-images.githubusercontent.com/80215741/165361358-46b0d597-6dd0-4d33-b722-845963576009.png" width="70%" alt="userFeat"/>

1. **User Management** - sign-in, sign-up and logout :
    - intuitive and responsive feedback forms
    - toggle to show / hide passwords fields
    - progress bar for sign up

\
\
<img src="https://user-images.githubusercontent.com/80215741/165364963-7e98bcc8-8848-4c83-990f-1c040b81aa29.png" width="70%" alt="sideFeat"/>

2. **Powerful Sidebar** :
    - chats organized by recent conversations
    - search for contacts
    - see last messages in a glance
    - easily start new conversation with another user (even pick his nickname !)

\
\
<img src="https://user-images.githubusercontent.com/80215741/165365242-d0f9ec1d-cbce-4dba-ad18-1a599a061b09.png" width="70%" alt="convFeat"/>

3. **Rich Conversation Page** :
    - distinguishable chat bubble colors
    - time and date stamp for each message

\
\
<img src="https://user-images.githubusercontent.com/80215741/165366801-c8a2b763-5282-4f49-966b-1bf6c8176484.png" width="70%" alt="logFeat"/>

4. **Realtime chat** :
    - send messages to any other user using the app
    - cross server communication in real time



<br/>

# :construction_worker: Upcoming Features <a name="upcoming"/>
1. **Emoji picker**
2. **Add Caption** - add text to image or video in the preview pane
3. **Redesign Scroll Bar**
4. **Rich Content** - send image, video, voice message and more !

<br/>

# :wrench: Installation <a name="install"/>

First thing to do will be to download all of the git files in this repository,
we will notice that we have 6 folders, we will focus on two of the folders: 

##### chatServerAPI and chatServerReact. 

\
as you can implicate the API folder will host the files necessary to run the api server and the React folder the chat server app itself.

1. Prepare the api server : \
in order to run the .net core RESTful api server we need an IDE of choice : we recommend **Rider** by jetbrain OR **visual studio** by microsoft. \
install the IDE of your choice and open existing project by locating the "chatServer.sln" file in the main repo folder. 


<br/>

2. Prepare the react app : \
here you can either use an IDE such as: **VSCode** or **Rider/Webstorm** by jetbrain, \
you will need to set up the chatAppReact as your main directory. \
after that you can continue to the linux guide below. 

<br/>
<br/>

###### Linux Guide For installing your react app :
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
   **Notice : make sure you run this command from the project directory (repoExtractedFolder/chatAppReact/) !**
```sh
npm install
```
<br/>

_That's it !_ you are few steps away from enjoying our chat app,
continue and run it using the run guide below.

<br/>

# :arrow_forward: Run <a name="run"/>

**Running the api server :** 

running from the IDE of your choice is as simple as running the Run configuration that automatically was created when you opened the project.

<br/>

**Running the react app :**

**Notice : make sure you run this command from the project directory (repoExtractedFolder/chatAppReact/) !**
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

# :gear: Configuration <a name="config"/>

in fact you can choose you own port for your api server or react project, we will show you how in this guide :

Setting up custom port for you api server :
1. to change the port of your api server head over to <br/> "../repoExtractedFolder/chatServerAPI/Program.cs" and under "profiles" your will see 
    ```sh
    "applicationUrl": "http://localhost:XXXX"
    ```
    from here you can pick any 4 digit port for you local server to run on.
in order for the server to approve connection from another servers or users head over to "../repoExtractedFolder/chatServerAPI/Program.cs" and in line 72 you will see the "AddCors" function, 
you will see 2 polices we have added, one for servers and the other for apps,
   - to add new server simply add the line :
       ```sh
       builder.WithOrigins("http://localhost:XXXX").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
       ```
       to the "cors_policy". 

    <br/>

   - to add new app simply add the line : 
       ```sh
       .WithOrigins("http://localhost:XXXX")
       ```
       to the "ClientPermission" policy.
   
     <br/>
   - we have already added for you 2 servers on the ports 5125 and 5126 and 4 app ports on 3000 - 3003.

<br/>

2. Setting up custom port for you react app :

    head over to "../repoExtractedFolder/chatAppReact/package.json" and look for scripts, there you will see this line :
    ```sh
    "start": "set PORT=XXXX && react-scripts start",
    ```
    simply replace XXXX to any local port you set up your react app to run on,
dont forget to choose a port that exist in the "ClientPermission" policy in the server from step 1.
   
<br/>

3. Set up react app to work with your server :

    head over to  "../repoExtractedFolder/chatAppReact/src/App.js" and you will see right after the import a variable named "server",
    ```sh
    let server = "http://localhost:XXXX";
    ```
    simply replace XXXX to the local port you set up your api server to in step 1.

# :man_scientist: Users For Testing <a name="users"/>

- Peleg 
    - Username : pelegs29
    - Password : 2910

- Nadav
   - Username : nadavyk
   - Password : 1234

- itamar
   - Username : itamarb
   - Password : 1111111

<br/>

# :trophy: Credits <a name="credit"/>
> Nadav Yakobovich

> Peleg Shlomo

<br/>

serverContext for easily debug and change server url in the react project,
to change it -> head over to the App.js and change the server var
