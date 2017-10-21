# MediaWorld
Software for organizing TV shows you are currently watching or would like to watch in the future. It's still in development and some of the features might be unstable.

# Build
It's recommended to use npm 5+ as it introduces support of lockfiles and will ensure that all of the dependency versions are same as described in package-lock.json. You can build the project like this:

    npm install
    
 Bundle modules using webpack (preferably local)
 
    npm run webpack:bundle

Run Electron

    npm run electron

# Package
Electron-packager is used to handle the packaging. You can either simply package the app for all platforms

    npm run pack
Or you can choose specific platform

    npm run pack:win64
Alternatively, you can use electron-packager CLI using local binary. Example of packaging 64bit version for Linux.

    ./node_modules/.bin/electron-packager . mediaworld --platform=linux --arch=x64

# Privacy
MediaWorld doesn't collect any kind of data at all as you can see in the code but third parties might. We use TVMaze that provides API for getting all relevant information about shows.