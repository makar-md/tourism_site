import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Str from './components/Str'
import './index.css'

function App() {

  const [data, setData] = useState("")
  const [postData, setPostData] = useState("")
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState("")
  const [newData, setNewData] = useState({
    text: '',
    num:''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({
      ...newData,  
      [name]: value 
    });
  };

  const fetchData = async () =>{
    setLoading(true);
    try{
        const res = await fetch("http://localhost:4200/get/test_str");
        if (!res.ok) throw new Error('Ошибка загрузки');
        const resData = await res.json();
        setData(resData.text)
    } catch (e){
        console.log(e.message)
    } finally{
        setLoading(false)
    }
  }
  const fetchDataId = async (id) =>{
    setLoading(true);
    if (!id) {
      alert("введите id")
      return;
    }
    try{
        const res = await fetch(`http://localhost:4200/get/test_str/${id}`);
        if (!res.ok){
          setData("строка не найдена")
          throw new Error('Ошибка загрузки');
        } 
        const resData = await res.json();
        setData(resData.text)
    } catch (e){
        console.log(e.message)
    } finally{
        setLoading(false)
    }
  }


  const sendPost = async () =>{
    setLoading(true);
    try{
        const res = await fetch("http://localhost:4200/create/test_str", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:  JSON.stringify(newData)
        });
        if (!res.ok) throw new Error('Ошибка загрузки');
        const resData = await res.json();
        setPostData(resData.message)
        setNewData({ text: '', num: '' })
    } catch (e){
        console.log(e.message)
    } finally{
        setLoading(false)
    }
  }
  // при загрузке страницы
  // useEffect(()=>{
  //     fetchData()
  // }, [])


  return (
    <>
      <div className='bg-zinc-900 h-screen p-4 flex flex-col gap-20'>
        <button className='p-1 bg-zinc-50 color-zinc-900' onClick={() => fetchData()}>Запрос</button>
        <div className=''>
          <input type="number" onChange={(e) => setId(e.target.value)} value={id} className='bg-white text-black'/>
        </div>
        <button className='p-1 bg-zinc-50 color-zinc-900' onClick={() => fetchDataId(id)}>Запрос с параметром</button>

        <div className='flex flex-col mt-12'>
          <p className='text-white text-xl font-bold'>{id}</p>
          {data && 
            <Str str={data}></Str>
          }
        </div>

        <div className='flex flex-col gap-10'>
          <h1 className='text-2xl text-white'>Post</h1>
          <button className='p-1 bg-zinc-50 color-zinc-900' onClick={() => sendPost()}>Запрос</button>
          <div className='flex flex-row gap-10'>
            <input className='p-1 bg-zinc-50 color-zinc-900 flex' type="text" name='num'  onChange={handleChange} value={newData.num}/>
            <input className='p-1 bg-zinc-50 color-zinc-900 flex' type="text" name='text' onChange={handleChange} value={newData.text}/>
          </div>
          {postData && <p className='text-xl text-white'>{postData}</p>}
        </div>
      </div>
    </>
  )
}

export default App
