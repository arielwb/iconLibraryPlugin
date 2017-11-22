# Turistur icons

This projects is used to generate an svg icon sprite, to be used on Turistur App and Admin.


## Getting started:

### Install the dependencies

```bash
$ npm install
```


### Folder structure:


```
...
│   gulpfile.js 
│	...
└───icons
    └───sprite
        │   sprite.stack.html
        └───svg
        	│   icons.svg
    └───svg
    	│   ...
    └───temp
        │   ...
```

**gulpfile** - The task file

**icons/svg folder** - The individual icons directory. 
The gulp task uses this as an entry point for the svg files.
*The filename is used to name the icons.*

**icons/sprite folder** - The output folder with the generated sprite placed in svg/icons.svg and a [sprite.stack.html demo file.](https://git.cwi.com.br/Turistur/Icons/blob/master/icons/sprite/sprite.stack.html)

**sprite.stack.html** - A file that displays all icons with usage examples. Inside this file, there is and array variable *allIcons*, that list the names of all icons.


## How to use 

* Place individual svg icons inside the svg folder
* Run the gulp task
* The sprite will be generated on sprite/svg/icons.svg

```bash
$ cd into-root-folder
$ gulp svgicons
```
