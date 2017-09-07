(function (window, document) {

  /**
   * 서버에서 할일 템플릿과 할일 데이터를 가져온 후, #todos 요소 안에 렌더링하는 함수
   */
  function loadTodos() {
    console.log('start loadTodos')
    render({
      target: '#todos',
      templatePath: '/templates/todos.ejs',
      dataPath: '/api/todos'
    }).then(todosEl => {
      todosEl.querySelectorAll('.todo-item').forEach(todoItem => {
        const id = todoItem.dataset.id

        // 체크박스 클릭시
        // 낙관적 업데이트: optimistic - event 발생시 ajax 요청, 화면 갱신 - 즉각대응. 요즘 많이 사용하는 응답성
        const checkboxEl = todoItem.querySelector('.todo-checkbox')
        checkboxEl.addEventListener('click', e => {
          axios.patch(`/api/todos/${id}`, {
            complete: e.currentTarget.checked
          }).then(res => {
            loadTodos()
          })
        })

        // 삭제 아이콘 클릭시
        // 비관적 업데이트: pessimistic - event 발생시 ajax 요청, 화면 갱신 미리 준비
        const removeLink = todoItem.querySelector('.todo-remove')
        removeLink.addEventListener('click', e => {
          axios.delete(`/api/todos/${id}`).then(res => {
            loadTodos()
          })
        })
      })
    })
  }

  document.querySelector('#todo-form').addEventListener('submit', e => {
    e.preventDefault() // 가장 많이 사용하는 소스로 폼의 기본동작. a tag 클릭시 작동하는 그 기능을 취소하는 메소드
    // e.stopPropagation() // 찾아볼 것. 이벤트가 더 이상 버블링되지 않게 멈추게 하는 것.
    //

    const form = e.currentTarget
    axios.post('/api/todos', {
      title: form.elements.title.value // title 속성 값
    })
      .then(loadTodos)
      .then(() => {
        form.elements.title.value = null
      })
  })

  loadTodos()

})(window, document)


// data-id="1" dataset.id 하면 문자열(숫자인지 모르므로)

