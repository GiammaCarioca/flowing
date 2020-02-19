// choo
var choo = require('choo')

// models
var editor = require('./app/model/editor')
var node = require('./app/model/node')

// load main view
var mainView = require('./app/view/main')

// initialize choo
var app = choo()

// app state
app.use((state, emitter) => {

    state.mouse =  {x: 0, y: 0}
    state.canvas = {x: 0, y: 0, diff_x: 0, diff_y: 0, dragging: false}
    state.nodes = [{id: idgen(), x: 100, y: 100}]

    editor(state, emitter)
    node(state, emitter)

    emitter.on('createNode', () => {
      const x = state.mouse.x - state.canvas.x -20
      const y = state.mouse.y - state.canvas.y -20
      state.nodes.push({id: idgen(), x, y})
      emitter.emit('render')
    })

    function idgen() {
      return (+new Date).toString(32)
    }
    
})

// create routes
app.route('/', mainView)

// start app
app.mount('body')