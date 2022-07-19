const userModel = require('../models/userModels')
const bcrypt = require ('bcrypt')

exports.registrasiUser = (data) =>
  new Promise(async(resolve, reject) => {
      
     const salt = bcrypt.genSaltSync(10)
     const encript = bcrypt.hashSync(data.password, salt)
     Object.assign(data, {
         password: encript
     })


    userModel.findOne({
        email: data.email
    }).then((sudahAdaUser) => {
        if (sudahAdaUser){
            reject ({
                status: false,
                msg: 'Email Sudah Terdaftar'
            })
        }else {
            userModel.create(data)
     .then(() => {
         resolve ({
             status: true,
             msg: 'Berhasil Membuat User Baru'
         })

     }).catch(err => {
        reject ({
            status: false,
            msg: 'Terjadi Kesalahan Pada Server'    
        })

     })

        }
    })

  })          
// LOGIN USER

  exports.loginUser = (data)=>
  new Promise (async (resolve, reject) => {
    const {userName, password} = data

    console.log(userName, password);

    userModel.findOne({userName: userName})
    .then((user) => {
        if (user) {
            const isValid = bcrypt.compareSync(password, user.password)

            if (!isValid) {
               return resolve({
                    status: false,
                    msg: "password Salah!"
                })
            }

            resolve({
                status: true,
                msg:"Login Berhasil",
                data: user
            })
        } else {
            reject ({
                status: false,
                msg: "Email Anda Tidak Terdaftar"
            })
        }
    })

  })