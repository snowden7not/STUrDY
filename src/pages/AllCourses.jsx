import React, { useEffect, useState } from 'react'

import Course_Card from '../components/core/Catalog/Course_Card'
import { apiConnector } from '../services/apiConnector';
import { courseEndpoints } from '../services/apis';
import  SearchBar  from "../components/Common/SearchBar"
import noSearchResult from "../assets/Images/9214777.svg"

const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const [getAllCourses,setgetAllCourses] = useState([])
    const [loading, setLoading] = useState(false)
    //const[isSearch,setIsSearch]=useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try{
              setLoading(true)
              const response = await apiConnector("GET",courseEndpoints.GET_ALL_COURSE_API);
              console.log("All courses file reesponse: ",response)
              setCourses(response.data.data); 
              setgetAllCourses(response.data.data); 
            }
            catch(error){
              console.log("Could not fetch Categories.", error)
            }
            finally{
              setLoading(false)
            }
        };
        fetchData();
    }, []);
    
    //search-notes
  const onSearchNote = async(query)=>{
    try{
        setLoading(true);
        //const response=await apiConnector("GET",`http://localhost:4000/api/v1/course/searchCourses?query=${query}`)
        const response=await apiConnector("GET",`${courseEndpoints.GET_SEARCH_COURSE_API}?query=${query}`);
        //console.log("search api reasponse is: ",response)

      if(response.data && response.data.success){
        //setIsSearch(true);
        setCourses(response.data.data);
      }
    }
    catch(error){
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  }

  const handleClearSearch=()=>{
    //setIsSearch(false);
    setCourses(getAllCourses)
  }


    const [searchQuery,setSearchQuery]=useState("");

    const handleSearch=() => {
      if(searchQuery){
        onSearchNote(searchQuery);
      }
    }
  
    const onClearSearch=()=>{
      setSearchQuery("");
      handleClearSearch();
    }

    if (loading) {
      return (
        <div className="grid flex-1 place-items-center">
          <div className="spinner"></div>
        </div>
      )
    }

  return (
    <div className=' flex-col '>
        <div className='w-full'>
        <SearchBar value={searchQuery} 
                    onChange={({target})=>{setSearchQuery(target.value)}} 
                    handleSearch={handleSearch} 
                    onClearSearch={onClearSearch}
        />
        </div>
        
        <div >
            {courses.length>0
                ?
                  <div className="max-md:ml-[10%] mx-[3%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 " >
                    {courses?.map((course, _id) => (
                        <Course_Card course={course} key={_id} Height={"h-[400px]"} />
                    ))}
                  </div>
                : 
                  <div className='flex flex-col justify-center items-center '>
                    <div className='w-[20%] max-md:w-[50%]'>
                        <img src={noSearchResult} className='' />
                    </div>
                    <p className='text-white'>NO Courses Found</p>
                  </div>
            }
        </div>

    </div>
  )
}

export default AllCourses