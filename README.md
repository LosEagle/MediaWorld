# MediaWorld
Software for organizing TV shows you are currently watching or would like to watch in the future. It's still in development and some of the features might be unstable.

# Build
Install required dependencies using yarn. You should be perfectly able to get this project running with npm but yarn's lockfile is used to ensure dependency versions are same on all devices this software will run on so yarn is preferred.

    yarn install
    
 Bundle modules using webpack (preferably local)
 
    yarn webpack:bundle

Run Electron

    yarn electron

# Package
Electron-packager is used to handle the packaging. You can either simply package the app for all platforms

    yarn pack
Or you can choose specific platform

    yarn pack:win64
Alternatively, you can use electron-packager CLI using local binary. Example of packaging 64bit version for Linux.

    ./node_modules/.bin/electron-packager . mediaworld --platform=linux --arch=x64

# Privacy
MediaWorld doesn't collect any kind of data at all as you can see in the code but third parties might. Most notable of them being TVMaze that provides API for getting all relevant information about shows and YouTube that is used for displaying trailers.