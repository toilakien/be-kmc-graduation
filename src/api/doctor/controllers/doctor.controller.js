const doctor_service = require("../services/doctor.services");
const enum_status = require("../../../enum/status-code.enum");


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
module.exports={
    createDoctorCtl,
    getAllDoctors
}