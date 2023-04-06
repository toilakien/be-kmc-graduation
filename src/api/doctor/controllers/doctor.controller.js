const doctor_service = require("../services/doctor.services");
const enum_status = require("../../../enum/status-code.enum");
const adm_service = require("../../adminstrator/services/administrator.service");


const createDoctorCtl = async (req, res) => {
    const { firstName,lastName,email,gender,phoneNumber,dateOfBirth,address } = req.body;
    try {
        const doctor = await doctor_service.findOneDoctor({ email });
        if (!doctor) {
            const newDoctor = {
                email,
                firstName,
                lastName,
                gender,
                phoneNumber,
                dateOfBirth,
                address
            };
            doctor_service.createDoctor(newDoctor);
            return res.status(enum_status.CREATED).json({
                doctor:newDoctor,
                message:"Create successfully !"
            });
        } else {
            return res.status(enum_status.BAD_REQUEST).json({
                message:'"Email already exists!"'
            });

        }
    } catch (error) {
         res.status(enum_status.INTERNAL_SERVER_ERROR).json(error);
    }
};
const getAllDoctors=async (req,res,next)=>{
    try{
        const doctors = await doctor_service.findAllDoctor();
        if(doctors){
            return res.status(enum_status.OK).json({
                message:'Success',
                doctors
            })
        }else{
            return res.status(enum_status.BAD_REQUEST).json({
                message:'error'
            })
        }
    }catch (error){
        return res.status(enum_status.INTERNAL_SERVER_ERROR).json(error)
    }
}
const deleteDoctor=async (req,res,next)=>{
    try{
        const id = req.params.id;
        console.log(id)
        const doctor = await doctor_service.findByIdDoctor(id);
        if(doctor){
            const removeDoctor=await doctor_service.findByIdAndDeleteDoctor(id);
            console.log(removeDoctor)
            res.status(enum_status.OK).json({
                status: "Success",
                doctor
            });
        }
    }catch (error){
        return res.status(enum_status.INTERNAL_SERVER_ERROR).json(error);
    }


}
const editDoctor=async (req,res,next)=>{
    try{
        const id = req.params.id;
        const doctor = await doctor_service.findByIdDoctor(id);
        const { firstName,lastName,email,gender,phoneNumber,dateOfBirth,address } = req.body;
        if(firstName){
            doctor.firstName=firstName;
        }
        if(lastName){
            doctor.lastName=lastName;
        }
        if(email){
            doctor.email=email;
        }
        if(phoneNumber){
            doctor.phoneNumber=phoneNumber;
        }if(dateOfBirth){
            doctor.dateOfBirth=dateOfBirth;
        }
        if(gender){
            doctor.gender=gender;
        }
        if(address){
            doctor.address=address;
        }
            await doctor_service.findByIdAndUpdateDoctor(id,doctor);
            res.status(enum_status.OK).json({
                status: "Success",
                doctor:doctor
            });
    }catch (error){
        return res.status(enum_status.INTERNAL_SERVER_ERROR).json(error);
    }


}
const getDetailDoctors=async (req,res,next)=>{
    try{
        const id = req.params.id;
        const doctor = await doctor_service.findByIdDoctor(id);
        if(doctor){
            return res.status(enum_status.OK).json({
                message:'Success',
                doctor
            })
        }else{
            return res.status(enum_status.BAD_REQUEST).json({
                message:'error'
            })
        }
    }catch (error){
        return res.status(enum_status.INTERNAL_SERVER_ERROR).json(error)
    }
}
module.exports={
    createDoctorCtl,
    getAllDoctors,
    deleteDoctor,
    editDoctor,
    getDetailDoctors
}