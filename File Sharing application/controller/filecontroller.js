const multer = require("multer")
const { v4: uuidv4 } = require('uuid');
const path = require("path")
const fileModel = require('../model/filemodel')

const uploadFolder = "uploads"

const storage = multer.diskStorage({
    destination:(req,file,cb)=>cb(null,uploadFolder),
    filename:(req,file,cb)=>{
        const filename = uuidv4() + path.extname(file.originalname);
        cb(null,filename)
    }
})


const upload = multer({
    storage:storage
}).single('attachment')


const uploadFile = (req,res)=>{
    upload(req,res,async(err)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                message:"File Uplaod fail",
                error:err
            })
        }

        
        if(!req.file){
            return res.json({
                message:"Please upload a file",
                
            })
        }

        const storefileData = {
            originalName:req.file.originalname,
            NewFileName:req.file.filename,
            Size:req.file.size
        }

        const storedData = await fileModel.create(storefileData)

        // console.log(storefileData);

        return res.status(200).json({
            message:"File has been uploaded sucessfull",
            fileId:storedData._id
        })
    })

}


const shareAbleLink = async (req,res)=>{

    const fileId = req.params.fileId;

    const linkToBeShared = `/app/file/download/${fileId}`

        res.json({
            message:"shareable link api",
            fileLink:linkToBeShared
        })
}


const downloadFile = async (req,res) =>{

    const fileid = req.params.fileID;

        const result = await fileModel.findById(fileid)
        const path = `uploads/${result.NewFileName}`

    res.download(path,result.originalName)
}



const fileController = {
    uploadFile,
    shareAbleLink,
    downloadFile,

}

module.exports = fileController