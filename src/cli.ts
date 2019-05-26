#!/usr/bin/env node

import autorestart = require('.')

autorestart(process.argv[2], process.argv.slice(3))
