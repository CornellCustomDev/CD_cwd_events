# Transpiling localist ECMAScript 6 with webpack/babel

babel info: http://ccoenraets.github.io/es6-tutorial-data/babel-webpack/

Typical ussage:

clone repository:<br/>
```git clone https://github.com/psw58/CD_cwd_events.git```

move to dev directory:<br/>
```cd dev```

install requirements:<br/>
```npm install```

start server for testing see index.html:<br/>
```npm start```

to build cwd_events.js run webpack:<br/>
```npm run webpack```

includes webpack sass support, does not support image loading

## DEV Folder can be removed for production distribution of Drupal Module 

## NPM Security 
https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities

Check package for vulnerabilities

```npm audit```

Check package for vulnerabilities
```npm audit```

If security vulnerabilities are found and updates are available

```npm audit fix```

remove http-server dev dpendency due to github warning you must run

`npm install http-server -g`