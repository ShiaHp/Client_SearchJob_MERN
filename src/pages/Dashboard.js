import React,{ useEffect }  from 'react'


const Dashboard = () => {
  try {
    const fetchData = async () => {
      const response = await fetch('/api/v1')
      const data = await response.json();
      console.log(data)
    }
    useEffect(() =>{
      fetchData()
    },[])
  } catch (error) {
    console.log(error)
  }

  return (
    <h1>Dashboard</h1>
  )
}

export default Dashboard