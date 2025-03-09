# fragments
This repo is for develops a REST API based on node.js using express framework for CCP555 course

# How to run various server start up script 

1. npm run lint - running eslint to make sure that there are no errors which need to be fixed
2. npm start - to start the server normally (the way we would do with node filename.js
3. npm run dev - to run the server locally via nodeman, which shows logs of change currently being made to the file and reflect those changes in the running server as well by restarting it (something like how I did it with React apps in WEB422, to see the chnages happeninig live)
4. npm run debug - to run similarly how it runs with dev but further starts ndoe inspector on port 9229 which allows to attach a debugger such as VS code

# Things to remember:

1. _**Never use "git add ."**_ as it often add files and folders I don't want to add. Easy to keep it simlpe by being explicit with git about what I want to do, or suffer the consequences of it deciding things for you. just add the files I need to add ,type it manually or use a glob pattern for similar fienames.

2. _**Creating a .prettierignore file for the project**_ to ingnore changing formats for files such as node_modules/ or alter the package.json or package-lock.json files

3. _**Always make sure that dependancies are installed**_, I tought I ran the command to insall pino, and when I ran the server I faced error saying pino module not found. I thought I had ran it, but then I checked the dependancy and figured pino was not there so I ran the npm install command for pino and made sured dependancy for pino is added and then ran the server and it ran successfully.

4. _**How to use the VSCode debugger**_, including setting breakpoints, and inspecting variables see:
   
   https://code.visualstudio.com/docs/editor/debugging

   https://code.visualstudio.com/docs/nodejs/nodejs-debugging

5. More notes are handwritten in my Notebook for this subject 
