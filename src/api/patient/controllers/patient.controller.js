const enum_status = require("../../../enum/status-code.enum");
const Patient = require("../../../models/patient.schema");

const createPatientCtl = async (req, res) => {
    try{
        const {name,gender,age,symptom,address,code}=req.body;
        const checkName=await Patient.findOne({name});
        if(!checkName){
            const patient=await Patient.create({
                name,gender,age,symptom,code,address
            })
            res.status(enum_status.CREATED).json({
                message:'Create success!',
                patient
            })
        }else{
            res.status(enum_status.CREATED).json({
                message:'Patient is exits!',

            })
        }
    }catch (e){
        console.log(e)
    }
}
const getAllPatient= async (req,res)=>{
    let perPage = 9;

        const {page}=req.query;
        await Patient.find()
            .skip((Number(page) - 1) * Number(perPage))
            .limit(Number(perPage))
            .then((data) => {
                res.status(enum_status.OK).json({
                    message: "Success",
                    doctors: data,
                    currentPage: Number(page),
                    pageCount: 0,
                });
            })
            .catch((error) => {
                return res.status(enum_status.INTERNAL_SERVER_ERROR).json(error);
            });

}
const deletePatient= async (req,res)=>{
    try{
        const {id}=req.params;
        const patient= await Patient.findById(id);
        console.log(patient)
        if(patient){
            await Patient.findByIdAndDelete(id);
            res.status(enum_status.OK).json({
                message:'Success!'
            })

        }else{
            res.status(enum_status.BAD_REQUEST).json({
                message:'Patient not find!'
            })
        }
    }catch (e){
       res.status(enum_status.BAD_REQUEST).json(e)
    }

}
const editPatient= async (req,res)=>{
    try{
        const {id}=req.params;
        const {name,gender,age,symptom,address,code}=req.body;
        const patient= await Patient.findOne({id});
        if(name){
            patient.name=name;
        }
        if(gender){
            patient.gender=gender;
        }
        if(name){
            patient.name=name;
        }
        if(age){
            patient.age=age;
        }
        if(symptom){
            patient.symptom=symptom;
        }
        if(address){
            patient.address=address;
        }
        if(code){
            patient.code=code;
        }
        await Patient.findByIdAndUpdate(id,patient);
        res.status(enum_status.OK).json({
            message:'Success!',
            patient
        })
    }catch (e){
        res.status(enum_status.BAD_REQUEST).json(e)
    }

}
module.exports={
    getAllPatient,
    createPatientCtl,
    deletePatient,
    editPatient
}