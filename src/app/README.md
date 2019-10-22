# Transpiling localist ECMAScript 6 with webpack/babel

[babel info]( http://ccoenraets.github.io/es6-tutorial-data/babel-webpack/)

Typical usage:

clone repository:  
```git clone https://github.com/psw58/CD_cwd_events.git```

move to dev directory:  
```cd dev```

install requirements:  
```npm install```

to build cwd_events.js run webpack:  
```npm run dev```

includes webpack sass support, does not support image loading

## DEV Folder can be removed for production distribution of Drupal Module

## NPM Security

[Security Audit fix](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities)

Check package for vulnerabilities  
```npm audit```

Check package for vulnerabilities  
```npm audit```

If security vulnerabilities are found and updates are available  
```npm audit fix```

remove http-server dev dependency due to github warning you must run  
`npm install http-server -g`

Check if a package can be updated

```bash
npm install -g npm-check-updates
ncu -u
npm update
npm install
```
