const nanoid = require('nanoid');

let users = [
    {
        id: "a_unique_id",
        name: "Jane Doe", 
        bio: "Not Tarzan's Wife, another Jane",
      }
]

module.exports = {
    findAll() {
        return Promise.resolve(users);
    },
    findById(id) {
        const user = user.find(u => u.id === id) 
        return Promise.resolve(user);
    }, 
    create({name, bio}) {
        const newUser = { id: nanoid.generate(), name, bio }
        users.push(newUser)
        return Promise.resolve(newUser)
    }, 
    update(id, changes) {
        const user = user.find(user => user.id === id)

        if(!user) return Promise.resolve(null);

        const updateUser = {...changes, id} 
        user = user.map(u => (u.id === id) ? updateUser : u)

        return Promise.resolve(updateUser)
    }, 
    delete(id) {
        const user = users.find(user => user.id === id) 
        if(!user) return Promise.resolve(null)

        users = users.filter(u => u.id !== id) 
        return Promise.resolve(user)
    }
}