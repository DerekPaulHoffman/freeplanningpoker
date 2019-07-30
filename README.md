## Yo

Take this project and run the below script in webprod-templates. 

rsync -av --exclude='/node_modules/*' --exclude='/package-lock.json' boilerplate/parcel-react/ <destination>

If this doesn't work, us the below command:

mv boilerplate <destination>

and then make sure you commit just your new folder and then reset hard on webprod templates so you don't push up a deleted boilerplate folder.

This script will run and copy everything over for you. Then run NPM INSTALL and you'll be ready to go.

Make sure you update the local storage name for the state and all gulp related things.