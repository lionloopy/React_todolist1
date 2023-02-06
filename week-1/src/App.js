import React, { useState } from 'react'
import './App.css'

const App = () => {

  //초기값 설정
  const [initial, setInitial] = useState([
    {id:0, what:'', when:'', isDone:''}
  ])

  //클릭하면 달라지는 값을 위해 useState를 활용한다.
  //현재상태:all, 바뀐 최신상태:setAll, 초기값:useState()괄호 안의 값
  //isDone이 false면 진행중, isDone이 true면 완료
  const [all, setAll] = useState([
    {id:1, what:'공부하기', when:'목요일까지', isDone:false},
    {id:2, what:'운동하기', when:'금요일까지', isDone:true},
  ])

  //input에 입력 값
  const [what, setWhat] = useState('')
  const [when, setWhen] = useState('')

  const writeWhat = (event) => {
    setWhat(event.target.value)
  }
  const writeWhen = (event) => {
    setWhen(event.target.value)
  }

  //버튼을 누르면 값이 추가되도록 한다.
  //setAll안에 현재 상태인 all과, 추가한 후 새롭게 바뀐 addList를 넣어준다.
  const addButton = () => {
    //제목과 내용 모두 채워야 추가 가능
    if(what.trim()===''|| when.trim()==="")return; 
    const addList = {
      id: all.length + 1,
      what:what,
      when:when
    }
    setAll([...all, addList])
  }

  //버튼을 누르면 삭제되도록 한다.
  //id값을 잡고, filter로 잡은 id값과 all안의 id값이 같지 않으면 걸러지도록 한다.(삭제됨)
  const removeButton = (id) => {
    const newAll = all.filter(all => all.id !== id)
    setAll(newAll)
  }

  //버튼을 누르면 완료-진행중 상태를 변경하도록 한다.
  //map함수로 돌리는데, 조건을 걸어서
  //만약 all안의 id와 잡아온 id의 값이 같으면 isDone의 상태를 반대로 바꿔준다.
  //아니라면 그대로 하도록 한다.
  const onAdd = (id) => {
    const addWorkiing = all.map((initial) => {
      if(initial.id === id){
        return{
          ...initial,
          isDone: !initial.isDone,
        }
      }else {
        return{...initial}
      }
    })
    setAll(addWorkiing)
  }

  //---jsx부분---
  return (
    <section>
      <div className='wrap'>
        <div className='nav'>MY TODO LIST</div>
        <div className='write'>
          <div>
            <label>제목</label>
            <input value={what} onChange={writeWhat} />
            <label>내용</label>
            <input value={when} onChange={writeWhen} />
          </div>
          <button onClick={addButton}>+</button>
        </div>
        {/* ----- */}
        <div className='addList'>
        <div className='working'>Working 🔥</div>
          {
            all.map((item) => {
              if(!item.isDone){
              return (
                <div key = {item.id}>
                  <div className='checkList'>
                  <div>🐈‍ {item.what} / {item.when}</div>
                  <div className='buttons'>
                  <button onClick={() => onAdd(item.id)}>
                    {item.isDone? 'cancel' : 'check'}
                  </button>
                <button onClick={()=> removeButton(item.id)}>X</button>
                </div>
                </div>
                </div>
              )
            }else {
              return null;
            }
          })}
        </div>

        <div className='addDoneList'>
        <div className='done'>Done 🎉</div>
          {
            all.map((item) => {
              if(item.isDone){
              return (
                <div key = {item.id}>
                  <div className='checkList'>
                  <div>🐈‍ {item.what} / {item.when}</div>
                  <div className='buttons'>
                  <button onClick={() => onAdd(item.id)}>
                    {item.isDone? 'cancel' : 'check'}
                  </button>
                <button onClick={()=> removeButton(item.id)}>X</button>
                </div>
                </div>
                </div>
              )
            }else{
              return null;
            }
          })}
        </div>
      </div>
    </section>
  )
}

export default App