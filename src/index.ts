import { spawn } from 'cross-spawn'

export = function autorestart(command: string, args: string[]): void {
	let childProcess: ReturnType<typeof spawn>
	function run() {
		if (childProcess) {
			childProcess.removeAllListeners('error')
			childProcess.removeAllListeners('close')
			childProcess.removeAllListeners('exit')
			childProcess.kill()
		}

		childProcess = spawn(command, args)
		childProcess.on('error', (error) => {
			console.error(error)
			process.exit(1)
		})

		childProcess.stdout && childProcess.stdout.pipe(process.stdout)
		childProcess.stderr && childProcess.stderr.pipe(process.stderr)

		function closeExitHandler(code: number): void {
			if (code === 0) {
				setTimeout(run, 0)
			} else {
				console.error(`"${process.argv.slice(2).join(' ')}" exited with code ${code}`)
				process.exit(1)
			}
		}

		childProcess.on('close', closeExitHandler)
		childProcess.on('exit', closeExitHandler)
	}

	run()
}

