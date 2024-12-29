const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('backend/data/db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.use(jsonServer.bodyParser)
server.post('/todos/toggle/:id', (req, res) => {
    const id = req.params.id
    const todo = router.db.get('todos').find({id: parseInt(id)}).value()
    if (todo) {
        todo.completed = !todo.completed
        router.db.get('todos').find({id: parseInt(id)}).assign(todo).write()
        res.json(todo)
    } else {
        res.sendStatus(404)
    }
});


// Use default router
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})
