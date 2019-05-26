# autorestart

[![npm version](http://img.shields.io/npm/v/autorestart.svg?style=flat)](https://npmjs.org/package/autorestart)

Small tool that automatically restarts processes instead of me. I use it when developing Electron apps.
```
$ autorestart electron .
```

Usually I run it parallel to my TypeScript watch process using [concurrently](https://www.npmjs.com/package/concurrently):
```
$ concurrently "tsc -w" "autorestart electron ."
```
