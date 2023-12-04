import instance from "./CustomAxios";

const getAllUser=()=>{
    return instance.get('/user')
}

const getAllTask=()=>{
    
    return instance.get('/task')
}
const registerUser = (Email:string, Name:string, Role:number) => {
    
    return instance.post('/user', {
        Email,
        Name,
        Role,
      })
      
  };
  
const addTask =(UserMail:string,ProjectId:number,TimeStart:string,TimeEnd:string,UserName:string,Status:number,Note:string,ProjectName:string,prjStart:string,prjEnd:string)=>{
      // ('UserMail','ProjectId','TimeStart','TimeEnd','Status','Note')
      console.log('success')
   
    return instance.post('/task',{
        UserMail,
        ProjectId,
        TimeStart,
        TimeEnd,
        UserName,
       
        Status,
        Note,
        ProjectName,
        prjStart,
        prjEnd
       



    })
}
const getAllProject =() =>{
    return instance.get('/project')
}
const updateUser=(Email:string,Name:string,Role:number)=>{
    return instance.put('/user',{
        Email,
        Name,
        Role
    })
}
const addNewProject=(Name:string,Payment:number,Note:string,Priority:number,TimeStart:string,TimeEnd:string)=>{
    return instance.post('/project',
    {
        Name,
        Payment,
        Note,
        Priority,
        TimeStart,
        TimeEnd
    }
    )
}
const DeleteUser = (Email: string) => {
    return instance.delete('/user', {
      data: {
        Email,
      },
    });
  };
  const updateProject=(Id:number,Name:string,Payment:number,TimeStart:string,TimeEnd:string,Note:string,Priority:number)=>{
    return instance.put('/project',{
        Id,
        Name,
        Payment,
        TimeStart,
        TimeEnd,
        Note,
        Priority



    })
  }
  const deleteProject=(Id:number)=>{
    return instance.delete('/project',{
        data: {
            Id,
          },
    })
  }
  const deleteTask=(Id:number)=>{
    return instance.delete('/task',{
      data:{
        Id,
      }
    })
  }
  // raw.UserMail,raw.ProjectId,raw.TimeStart,raw.TimeEnd,raw.Status,raw.Note,raw.Id
  const editTask=(Id:number,UserMail:string,ProjectId:number,TimeStart:string,TimeEnd:string,Status:number,Note:string)=>{
    return instance.put('/task',{
    Id,
    UserMail,
    ProjectId,
    TimeStart,
    TimeEnd,
    Status,
    Note
        

      
    })
  }
  const getProjectByUser=(UserMail:string)=>{
    return instance.get('/GetProjectByUser',{
      data:{
        UserMail
      }
    })
  }
 
export {getAllUser,getAllTask,addTask,registerUser,getAllProject,addNewProject,updateUser,DeleteUser,updateProject,deleteProject,deleteTask,editTask,getProjectByUser}