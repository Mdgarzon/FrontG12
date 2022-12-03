import React from "react";
import { Link } from 'react-router-dom';

const Login = () => {
  const [usuario, setUsuario ] = useState({
    
    email:'',
    password:'',
    
  });
  const {  email, password, } = usuario;
  const onChange = (e) =>{
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
};

const crearCuenta = async () =>{
  // los dos password deben ser iguales
  if(password !== confirmar){
    console.log('diferntes');
    const mensaje = "Las contraseñas son diferentes.";
    swal({
      title:'Error',
      text: mensaje,
      icon: 'error',
      buttons:{
        confirm:{
          text: 'OK',
          value: true,
          visible: true,
          className: 'btn btn-danger',
          closeModal: true
        }
      }
    });

  }else{
    const data = {
      nombre: usuario.nombre,
      email: usuario.email,
      password: usuario.password
    }
    console.log(data);
    const response = await crud.POST(`/api/usuarios`, data);
    const mensaje = response.msg;
    //console.log(mensaje);
    if(mensaje === "El usuario ya existe"){
      const mensaje = "El usuario ya existe";
    swal({
      title:'Error',
      text: mensaje,
      icon: 'error',
      buttons:{
        confirm:{
          text: 'OK',
          value: true,
          visible: true,
          className: 'btn btn-danger',
          closeModal: true
        }
      }
    });
    }else{
      const mensaje = "El usuario fue creado correctamente";
      swal({
        title:'Información',
        text: mensaje,
        icon: 'success',
        buttons:{
          confirm:{
            text: 'OK',
            value: true,
            visible: true,
            className: 'btn btn-primary',
            closeModal: true
          }
        }
      });

      setUsuario({
        nombre:'',
        email:'',
        password:'',
        confirmar:''
      })
      //redireccionar nuevamente a la pagina de login
      navigate("/");

    };
  }
  
  
  
  
  
};

const onSubmit = (e) =>{
  e.preventDefault();
  crearCuenta();
}
    
return (
   <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
   <div className='md:w-2/3 lg:w-2/5'>
   <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
      G12 Iniciar sesión Ecommerce
    </h1>
    <form className="my-10 bg-white shadow rounded-lg p-10">
      <div className="my-5">
        <label className="uppercase text-gray-600 block text-lx font-bold">Email</label>
        <input 
        type="email"
        placeholder="Email de Registro"
        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
        />

        <label className="uppercase text-gray-600 block text-lx font-bold">Password</label>
        <input 
        type="password"
        placeholder="Password de Registro"
        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
        />
      </div>
      <input 
          type="submit"
          value="Iniciar Sesión"
          className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-300 transition-colors"
            />

      <Link
        className="block text-center my-5 "
      to={"/crear-cuenta"}
      >
        Crear Cuenta
      </Link>
  </form>

   </div>
    
   </main>
    );
}

export default Login;