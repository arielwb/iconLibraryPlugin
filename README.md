# Icon Library Plugin 

This projects is used to generate an svg icon sprite.
The idea came from the necessity of a shared icon library between the content manager and client code.
Also, inside the folder iconPickerPlugin, we have a bootstrap/jquery plugin to easily pick an icon to associate with some data.

[Demo](https://arielwb.github.io/demos/iconPickerPlugin/)


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
│   └───sprite
│       │   icons.svg
│   └───svg
│  	│   ...
│   └───temp
│       │   ...
└───iconPickerPlugin
    └───example
    |   ttIcons.js
    |   ttIcons.min.js
```

**gulpfile** - The tasks file

**icons/svg folder** - The individual icons directory. 
The gulp task uses this as an entry point for the svg files.
*The filename is used to name the icons.*

**icons/sprite folder** - The output folder with the generated icons.svg sprite file.

**iconPickerPlugin folder** - Contains the plugin script file and it´s minified version.

**iconPickerPlugin/example folder** - A sample project using the plugin. To view in browser:

```bash
$ cd ./iconPickerPlugin/example
$ gulp serve
```

## How to use 

* Place individual svg icons inside the svg folder
* Run the gulp task
* The sprite will be generated on icons/sprite/icons.svg
* The plugin script files will be generated on iconPickerPlugin/

```bash
$ cd into-root-folder
$ gulp
```
