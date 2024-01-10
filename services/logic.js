//BackEnd logic

//import db.js file
const db = require('../services/db')

//get all the employees details from the database

const getAllEmployees = ()=>{
    return db.employee.find().then((result)=>{//result - details of employee
        if(result){
            return{
                statusCode:200,
                employees:result
            }

        }
        else{
            return{
                statusCode:404,
                message:'cant find employee'
            }
          

        }

    })
}

//add a new employee details into the database
const addEmployee=(id,name,age,designation,salary)=>{
    return db.employee.findOne({id}).then((result)=>{
        if(result){//if the id already in the database
            return{
                statusCode:404,
                message:"Employee Details Exists"
            }
        }
        else{//The id is not in the database then it save to the database 
            const newEmployee = new db.employee({id,name,age,designation,salary})

            //save to the database
            newEmployee.save()
            return{
                statusCode:200,
                message:"Employee added successfully"
            }

        }
    
    })
}
//delete a employee from the database
const deletedata=(id)=>{
    return db.employee.deleteOne({id}).then((result)=>{
            return{
                statusCode:200,
                message:"delete successfully"
            }
    })
    .catch((error)=>{
        return{
            statusCode:401,
            message:"failed to delete "
        }
   })
}

//get a particular employee from the database
const viewdata=(id)=>{
    return db.employee.findOne({id}).then((result)=>{
        if(result){
            return{
                statusCode:200,
                employees:result
            }

        }
        else{
            return{
                statusCode:404,
                message:'cant find employee'
            }
          

        }
    })
}

//update an employee details
const updateAnEmployee=(id,name,age,designation,salary)=>{//updated data
    return db.employee.findOne({id}).then((result)=>{//result - details of employee
        if(result){
            //assiging updated information to the database values
            result.id = id;
            result.name = name;
            result.age = age;
            result.designation = designation;
            result.salary = salary

            //save updated details into db
            result.save()

            return{
                statusCode:200,
                message:"Employee data updated successfully"
            }

        }
        else{
            return{
                statusCode:404,
                message:'cant find employee'
            }
          

        }
    })
}
module.exports = {
    getAllEmployees,
    addEmployee,
    deletedata,
    viewdata,
    updateAnEmployee

}

