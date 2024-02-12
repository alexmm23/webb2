const express = require( 'express' );
const app = express();
app.use(express.json());
let users = [
    {
        id: 1,
        nombre: 'John Doe',
    },
    {
        id: 2,
        nombre: 'Juan'
    },
    {
        id:3,
        nombre:'Alex'
    }
]

app.listen(3000, () => console.log('Server is running on port 3000'))

app.get('/', (req, res)=>{
    res.send('hello world!')
})
app.get('/user/:id',(req, res)=>{
    let user=users.find((item) => item.id === parseInt(req.params.id));
        res.send({msg:"Tu usuario", user});
})
app.get('/users', (req, res)=>{
    res.send(users)
})

app.post('/create/user/', (req, res)=>{
    const {nombre,id}= req.body
    users.push({nombre,id})
    console.log('create user')
    res.send({msg:"User created", users})
})

app.patch('/update/user/:id', (req,res)=> {
    const {body} = req
    const {params} = req
    let user = users.find((user) => user.id == parseInt(params.id))
    user.nombre = body.nombre;
    res.send({ msg: "User updated", users })
})

app.delete('/delete/user/:id', (req,res)=> {
    const {id} = req.params
    console.log(id)
    let newUsers = users.filter((user)=> user.id!=parseInt(id))
    users = newUsers
    res.send({msg:"User deleted", users})
})
