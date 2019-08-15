function rankedQueue(queue, options) {
  return new Promise(function (resolve, reject) {
    const isQueueAvailable =
      (queue) ||
      (queue.length > options.playersPerMatch)
    if (!isQueueAvailable) {
      resolve(new Array())
    }

    queue.sort(function (a, b /* Users */) {
      return a.rate - b.rate
    })

    if (options.descend) {
      queue.reverse()
    }

    const groups = new Array()

    for (let i = 0; i < queue.length; i++) {
      groups[i] = new Array()

      for (let k = 0; k < options.playersPerMatch; k++) {
        let n = i * options.playersPerMatch

        function validate() {
          if (!queue[n + k] || queue[n + k].status !== 'matchmaking') {
            queue.splice(queue.indexOf(queue[n + k]), 1)
          }

          validate()
        }
        validate()

        groups[i].push(queue[n + k])
      }
    }

    resolve(groups)
  })
}

module.exports = rankedQueue