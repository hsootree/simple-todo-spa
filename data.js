let todoSeq = 1
const todos = [
  {
    id: todoSeq++,
    title: "have to do",
    complete: false
  },
  { 
    id: todoSeq++,
    title: "..ing to do",
    complete: true
  },
  { 
    id: todoSeq++,
    title: "completed to do",
    complete: true
  } 
]

function addTodo({title}) {
  const newTodo = {
    id: todoSeq++,
    title,
    complete: false
  }
  todos.push(newTodo)
  return newTodo
}

function updateTodo(id, source) {
  const todo = todos.find(item => item.id === id)
  if (todo) {
    Object.assign(todo, source)
    return todo
  } else {
    throw new Error('해당 id를 갖는 요소가 없습니다.')
  }
}

function deleteTodo(id) {
  const index = todos.findIndex(item => item.id === id)
  if (index !== -1) {
    todos.splice(index, 1)
  }
}

module.exports = { // 서버의 데이타 모듈을 데이타파일에 공개함.
  todos,
  addTodo,
  updateTodo,
  deleteTodo
}
