const users = [];

const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    const existingUser = users.find((item)=> item.room === room && item.name === name)
    
    console.log("users", users)
    if(existingUser){
        return { error: "Username is taken"}
    }


    const user = {id, name, room}
    
    users.push(user)

    return {user}
}

const removeUser = (id) => {
    const index = users.findIndex((item)=>item.id ===id)
    
    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => users.find(item=>item.id === id)

const getUsersInRoom = (room) => users.filter(item=>item.room === room)

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}