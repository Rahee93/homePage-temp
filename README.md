# CST8334 Team Codeck

# Development Environment Setup

1. Install node 14 using the link https://nodejs.org/en/download/

2. Install git using the link https://git-scm.com/downloads. After installing git, you can clone the repo to your local.

3. For IDE, you could use VSCode to develop the React projects.

4. Now, we have the repo (called `21s-cst8334-310-team-5`) in the local, open the command line and `cd` to the repo in your local, inside the repo, we can see the following folder structure:
```
 21s-cst8334-310-team-5
        |----- microbit-main                           // the project for the main website
        |----- microbit-temperature-collector          // the project for the temperature-collectorwebsite
        |----- microbit-terryfox-run                   // the project for the terryfox-run website
```

5. For example, if now we want to develop the `microbit-main` project, then 
     1. `cd` to this folder 
     2. At the first time, we need to run `npm install` to install all the thrid-party lib needed by this project
     3. Run `npm run start` to start the React local server, then you can see the web page in your localhost.


# Deploy the websites
After development and the code changes are merged to the `dev` branch, then we can deploy the latest code.

1. In your local repo, check out to dev branch and do git pull: `git checkout dev` and `git pull origin dev`

2. After pulling the latest code, if it is the first time to deploy, then do `npm install` under the root of the repo, this will install the third-party lib for the build script

3. Then do `npm run build`

4. You will find a folder called `microbit-build` is created in the root of your local repo, this is the build folder we will deploy to netlify, and this folder is not under git control, so you do not need to delete it.

5. Go to netlify and login in using the gmail account and password, then click the `mymicrobit`
![image](https://user-images.githubusercontent.com/62402998/120517652-ac6ce980-c39e-11eb-9cbf-9aca3a8f49ab.png)

6. Then click `Delopys` on the top, and drag and drop the folder `microbit-build` to this page. After uploading, you should see the latest changes on our [website ](https://mymicrobit.netlify.app).

# React
Tutorials of the basic concept of React https://reactjs.org/docs/getting-started.html 

# Redux
The terryfox run website also uses Redux to manage the React state, and it is a more advanced topic for state management. If you want you can learn it here https://redux.js.org/. But you do not have to use it when you adding codes for React, because React has its own state management without Redux.

# Instructions for cloning git repo using ssh
1.  First follow this instruction to generate the ssh key in local (follow until complete `Adding your SSH key to the ssh-agent`) https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent


2. After generating the ssh key.  go to your settings
![image](https://user-images.githubusercontent.com/62402998/120737308-da941b80-c4bb-11eb-802e-f12d674eabcc.png)

3. Then click `New SSH key`
![image](https://user-images.githubusercontent.com/62402998/120738615-2942b500-c4be-11eb-9b9f-e12d1f091b89.png)

4. Then in your git bash, do `cat ~/.ssh/id_ed25519.pubs`, you can see the public key.  Sometimes, you may have a different public key file name, just see what is the file name under `~/.ssh` folder like
![image](https://user-images.githubusercontent.com/62402998/120738246-8722cd00-c4bd-11eb-81ff-0b5f139cf2d1.png)

5. Then, copy the public key content of the public key file to the github 
![image](https://user-images.githubusercontent.com/62402998/120738339-b3d6e480-c4bd-11eb-8202-c5bed9a574a9.png)  and save the ssh key

6. then go to git bash, do `git clone git@github.com:algonquin-college-sat/21s-cst8334-310-team-5.git`, then you can clone the repo to your local

# Suggested workflow for how to work with git
If now you start working on the new issue:
